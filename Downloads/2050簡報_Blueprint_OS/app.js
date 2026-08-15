/**
 * Motorcycle Quiz App - Core Logic (app.js)
 * Implements: Data loading, SPA Router, Filters, Question Browse, Random Quiz,
 *             Timed Exam Simulator, Wrong Book persistence, Statistics dashboard,
 *             Web Audio API Synthesized sound effects, and Image zoom lightbox.
 */

// --- Global Application State (AppStore) ---
const AppStore = {
    // Original raw dataset
    questions: [],
    hazardQuestions: [],
    
    // Filtered/Active subset of questions based on filters/search
    activeList: [],
    
    // State indicators
    currentMode: 'browse', // 'browse', 'quiz', 'exam', 'wrong', 'stats'
    currentIndex: 0,       // Pointer to activeList
    progress: {},          // Saves the current index per mode+filter combination
    
    // Quiz mode state
    quizHistory: [],       // Array of indexes shuffled
    
    // Exam mode state
    examQuestions: [],     // 50 questions selected for current exam
    examAnswers: {},       // Map of question ID -> user selected option index (1-based)
    examTimer: null,       // Timer interval
    examTimeRemaining: 2700, // 45 minutes in seconds
    isExamSubmitted: false, // Exam results viewing state
    
    // Persisted User Data (synced with localStorage)
    wrongBook: new Set(),  // Set of question IDs
    bookmarks: new Set(),  // Set of question IDs
    stats: {
        totalAnswered: 0,
        correctCount: 0,
        categoryStats: {}  // Map of category -> { total: X, correct: Y }
    },
    
    // App settings
    soundEnabled: true,
    theme: 'light'
};

// --- Video Embed Link Helper ---
function getHazardVideoUrl(videoCode) {
    return `public/videos/${videoCode}.mp4`;
}

// --- Web Audio API Synthesizer for Audio Feedback ---
const SoundEffects = {
    audioCtx: null,

    init() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    },

    playCorrect() {
        if (!AppStore.soundEnabled) return;
        try {
            this.init();
            const now = this.audioCtx.currentTime;
            
            // First note (clearest bell tone)
            const osc1 = this.audioCtx.createOscillator();
            const gain1 = this.audioCtx.createGain();
            
            osc1.type = 'triangle';
            osc1.frequency.setValueAtTime(523.25, now); // C5
            osc1.frequency.setValueAtTime(659.25, now + 0.08); // E5
            
            gain1.gain.setValueAtTime(0.15, now);
            gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            
            osc1.connect(gain1);
            gain1.connect(this.audioCtx.destination);
            
            osc1.start(now);
            osc1.stop(now + 0.3);
        } catch (e) {
            console.warn("Audio Context blocked or failed:", e);
        }
    },

    playWrong() {
        if (!AppStore.soundEnabled) return;
        try {
            this.init();
            const now = this.audioCtx.currentTime;
            
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(180, now);
            osc.frequency.linearRampToValueAtTime(110, now + 0.2); // Pitch fall
            
            // Low-pass filter to make it less harsh
            const filter = this.audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(400, now);
            
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
            
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.audioCtx.destination);
            
            osc.start(now);
            osc.stop(now + 0.25);
        } catch (e) {
            console.warn("Audio Context blocked or failed:", e);
        }
    }
};

// --- Initialization & Setup ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Load data from localStorage
    loadLocalUserData();
    
    // 2. Fetch the JSON Database
    fetchQuestions();
    
    // 3. Bind UI event listeners
    bindEvents();
});

// --- Local Storage Management ---
function loadLocalUserData() {
    try {
        const storedWrong = localStorage.getItem('motorcycle_wrong_book');
        if (storedWrong) {
            AppStore.wrongBook = new Set(JSON.parse(storedWrong));
            updateWrongBadge();
        }
        
        const storedBookmarks = localStorage.getItem('motorcycle_bookmarks');
        if (storedBookmarks) {
            AppStore.bookmarks = new Set(JSON.parse(storedBookmarks));
        }
        
        const storedStats = localStorage.getItem('motorcycle_stats');
        if (storedStats) {
            AppStore.stats = JSON.parse(storedStats);
        }
        
        const soundPref = localStorage.getItem('motorcycle_sound_pref');
        if (soundPref !== null) {
            AppStore.soundEnabled = soundPref === 'true';
            document.getElementById('toggle-sound').checked = AppStore.soundEnabled;
        }
        
        const themePref = localStorage.getItem('motorcycle_theme_pref');
        if (themePref) {
            AppStore.theme = themePref;
            document.getElementById('toggle-theme').checked = AppStore.theme === 'dark';
            if (AppStore.theme === 'dark') {
                document.body.classList.add('dark-mode');
            }
        }
        
        const storedProgress = localStorage.getItem('motorcycle_progress');
        if (storedProgress) {
            AppStore.progress = JSON.parse(storedProgress);
        } else {
            AppStore.progress = {};
        }
    } catch (e) {
        console.error("Failed to load local storage data:", e);
    }
}

function saveLocalUserData() {
    try {
        localStorage.setItem('motorcycle_wrong_book', JSON.stringify([...AppStore.wrongBook]));
        localStorage.setItem('motorcycle_bookmarks', JSON.stringify([...AppStore.bookmarks]));
        localStorage.setItem('motorcycle_stats', JSON.stringify(AppStore.stats));
        localStorage.setItem('motorcycle_sound_pref', AppStore.soundEnabled.toString());
        localStorage.setItem('motorcycle_theme_pref', AppStore.theme);
        localStorage.setItem('motorcycle_progress', JSON.stringify(AppStore.progress));
        updateWrongBadge();
    } catch (e) {
        console.error("Failed to save data to localStorage:", e);
    }
}

function updateWrongBadge() {
    const wrongCountEl = document.getElementById('wrong-count');
    if (wrongCountEl) {
        wrongCountEl.textContent = AppStore.wrongBook.size;
    }
}

// --- Fetch Data ---
function fetchQuestions() {
    const progressText = document.getElementById('progress-text');
    
    // Check if the data is already loaded globally (from local js files to bypass CORS)
    if (typeof DB_QUESTIONS !== 'undefined' && typeof DB_HAZARD_QUESTIONS !== 'undefined') {
        AppStore.questions = DB_QUESTIONS;
        AppStore.hazardQuestions = DB_HAZARD_QUESTIONS;
        
        let changed = false;
        const validIds = new Set(AppStore.questions.map(q => q.id));
        AppStore.wrongBook.forEach(id => {
            if (!validIds.has(id)) {
                AppStore.wrongBook.delete(id);
                changed = true;
            }
        });
        AppStore.bookmarks.forEach(id => {
            if (!validIds.has(id)) {
                AppStore.bookmarks.delete(id);
                changed = true;
            }
        });
        if (changed) {
            saveLocalUserData();
        }
        
        buildFilters();
        applyFilters();
        renderCurrentQuestion();
        return;
    }
    
    Promise.all([
        fetch('data/questions.json').then(response => {
            if (!response.ok) throw new Error("HTTP error " + response.status);
            return response.json();
        }),
        fetch('data/hazard_video_questions.json').then(response => {
            if (!response.ok) throw new Error("HTTP error " + response.status);
            return response.json();
        })
    ])
    .then(([questionsData, hazardData]) => {
        AppStore.questions = questionsData;
        AppStore.hazardQuestions = hazardData;
        
        // Clean up any ghost IDs in wrongBook or bookmarks (if question bank updated)
        let changed = false;
        const validIds = new Set(AppStore.questions.map(q => q.id));
        AppStore.wrongBook.forEach(id => {
            if (!validIds.has(id)) {
                AppStore.wrongBook.delete(id);
                changed = true;
            }
        });
        AppStore.bookmarks.forEach(id => {
            if (!validIds.has(id)) {
                AppStore.bookmarks.delete(id);
                changed = true;
            }
        });
        if (changed) {
            saveLocalUserData();
        }
        
        buildFilters();
        applyFilters();
        renderCurrentQuestion();
    })
    .catch(err => {
        console.error("Failed to fetch questions databases:", err);
        if (progressText) {
            progressText.innerHTML = `<span style="color: var(--color-danger)">資料載入失敗，請確認題庫資料是否完整。</span>`;
        }
    });
}

// --- Filter Architecture ---
function buildFilters() {
    const categorySelect = document.getElementById('filter-category');
    if (!categorySelect) return;
    
    // Clear previous options except "All"
    categorySelect.innerHTML = '<option value="all">所有大類 (全部)</option>';
    
    // Collect unique categories
    const cats = [...new Set(AppStore.questions.map(q => q.category))].filter(Boolean);
    cats.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = `${cat} (${AppStore.questions.filter(q => q.category === cat).length} 題)`;
        categorySelect.appendChild(option);
    });
    
    // Handle subcategory dynamic rebuild on category change
    categorySelect.addEventListener('change', rebuildSubcategoryFilter);
    rebuildSubcategoryFilter();
}

function rebuildSubcategoryFilter() {
    const categorySelect = document.getElementById('filter-category');
    const subSelect = document.getElementById('filter-subcategory');
    if (!subSelect) return;
    
    const selectedCat = categorySelect.value;
    subSelect.innerHTML = '<option value="all">所有子類</option>';
    
    let filteredQuestions = AppStore.questions;
    if (selectedCat !== 'all') {
        filteredQuestions = AppStore.questions.filter(q => q.category === selectedCat);
    }
    
    const subs = [...new Set(filteredQuestions.map(q => q.subcategory))].filter(Boolean);
    subs.forEach(sub => {
        const option = document.createElement('option');
        option.value = sub;
        option.textContent = `${sub} (${filteredQuestions.filter(q => q.subcategory === sub).length} 題)`;
        subSelect.appendChild(option);
    });
}

function getCurrentFilterKey() {
    const catVal = document.getElementById('filter-category')?.value || 'all';
    const subVal = document.getElementById('filter-subcategory')?.value || 'all';
    const typeVal = document.getElementById('filter-type')?.value || 'all';
    const searchVal = document.getElementById('search-input')?.value.toLowerCase().trim() || '';
    return `${AppStore.currentMode}_${catVal}_${subVal}_${typeVal}_${searchVal}`;
}


function saveProgress() {
    if (AppStore.currentMode === 'browse' || AppStore.currentMode === 'hazard' || AppStore.currentMode === 'wrong') {
        const filterKey = getCurrentFilterKey();
        AppStore.progress[filterKey] = AppStore.currentIndex;
        saveLocalUserData();
    }
}

function applyFilters() {
    const catVal = document.getElementById('filter-category').value;
    const subVal = document.getElementById('filter-subcategory').value;
    const typeVal = document.getElementById('filter-type').value;
    const searchVal = document.getElementById('search-input').value.toLowerCase().trim();
    
    let list = [];
    
    // Mode specific filtering base
    if (AppStore.currentMode === 'hazard') {
        list = AppStore.hazardQuestions;
        if (searchVal) {
            list = list.filter(q => q.question.toLowerCase().includes(searchVal) || (q.options && q.options.some(opt => opt.toLowerCase().includes(searchVal))));
        }
        AppStore.activeList = list;
        
        // Restore Progress
        const filterKey = getCurrentFilterKey();
        if (AppStore.progress && AppStore.progress[filterKey] !== undefined) {
            AppStore.currentIndex = AppStore.progress[filterKey];
            if (AppStore.currentIndex >= AppStore.activeList.length) AppStore.currentIndex = 0;
        } else {
            AppStore.currentIndex = 0;
        }
        return;
    }
    
    if (AppStore.currentMode === 'wrong') {
        // Only load questions in wrong book
        list = AppStore.questions.filter(q => AppStore.wrongBook.has(q.id));
    } else {
        list = AppStore.questions;
    }
    
    // Filter by Category
    if (catVal !== 'all') {
        list = list.filter(q => q.category === catVal);
    }
    
    // Filter by Subcategory
    if (subVal !== 'all') {
        list = list.filter(q => q.subcategory === subVal);
    }
    
    // Filter by Type (Text / Image)
    if (typeVal === 'text') {
        list = list.filter(q => q.image === null);
    } else if (typeVal === 'image') {
        list = list.filter(q => q.image !== null);
    }
    
    // Filter by Search Keyword
    if (searchVal) {
        list = list.filter(q => {
            const questionMatch = q.question.toLowerCase().includes(searchVal);
            const optionMatch = q.options && q.options.some(opt => opt.toLowerCase().includes(searchVal));
            return questionMatch || optionMatch;
        });
    }
    
    AppStore.activeList = list;
    
    if (AppStore.currentMode === 'browse' || AppStore.currentMode === 'wrong') {
        const filterKey = getCurrentFilterKey();
        if (AppStore.progress && AppStore.progress[filterKey] !== undefined) {
            AppStore.currentIndex = AppStore.progress[filterKey];
            if (AppStore.currentIndex >= AppStore.activeList.length) AppStore.currentIndex = 0;
        } else {
            AppStore.currentIndex = 0;
        }
    } else {
        AppStore.currentIndex = 0;
    }
    
    // Shuffled queue for Quiz Mode
    if (AppStore.currentMode === 'quiz') {
        shuffleQuizQueue();
        
        // Hide any exam result card and ensure question card is visible
        const resultCard = document.getElementById('exam-result-card');
        if (resultCard) resultCard.style.display = 'none';
        const qCard = document.getElementById('question-card');
        if (qCard) qCard.style.display = 'flex';
        
        // Limit active question count based on limit selector
        const limitVal = document.getElementById('filter-quiz-limit').value;
        if (limitVal !== 'all') {
            const limit = parseInt(limitVal);
            AppStore.quizHistory = AppStore.quizHistory.slice(0, limit);
        }
    }
}

function shuffleQuizQueue() {
    // Create a copy index map and shuffle it
    AppStore.quizHistory = Array.from({ length: AppStore.activeList.length }, (_, i) => i);
    // Fisher-Yates shuffle
    for (let i = AppStore.quizHistory.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [AppStore.quizHistory[i], AppStore.quizHistory[j]] = [AppStore.quizHistory[j], AppStore.quizHistory[i]];
    }
}

// --- Render Layout & DOM Manipulation ---
function renderCurrentQuestion() {
    // UI elements
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const scoreText = document.getElementById('score-text');
    
    const qCard = document.getElementById('question-card');
    const qCategory = document.getElementById('q-category');
    const qSubcategory = document.getElementById('q-subcategory');
    const qNumber = document.getElementById('q-number');
    const qText = document.getElementById('question-text');
    
    const imgContainer = document.getElementById('image-container');
    const qImg = document.getElementById('question-image');
    const optionsList = document.getElementById('options-list');
    
    const explanationBox = document.getElementById('explanation-box');
    const explanationText = document.getElementById('explanation-text');
    
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnShowAnswer = document.getElementById('btn-show-answer');
    
    const btnBookmark = document.getElementById('btn-bookmark');
    const btnAddWrong = document.getElementById('btn-add-wrong');
    const quickJumpPanel = document.getElementById('quick-jump-panel');
    
    // Clear styles
    qCard.classList.remove('shake', 'correct-pop');
    explanationBox.style.display = 'none';
    btnShowAnswer.disabled = false;
    
    // Hide Video Container initially
    const videoContainer = document.getElementById('video-container');
    const qVideo = document.getElementById('question-video');
    const videoLink = document.getElementById('video-external-link');
    if (videoContainer) videoContainer.style.display = 'none';
    if (qVideo) qVideo.src = '';
    
    // Special Layout Check: Exam Mode
    if (AppStore.currentMode === 'exam') {
        quickJumpPanel.style.display = 'none';
        renderExamQuestion();
        return;
    }
    
    // Regular Modes ('browse', 'quiz', 'wrong')
    quickJumpPanel.style.display = (AppStore.currentMode === 'browse') ? 'flex' : 'none';
    
    if (AppStore.activeList.length === 0) {
        // Empty State
        progressText.textContent = "無合適題目";
        scoreText.textContent = "正確率: --";
        progressFill.style.width = "0%";
        
        qCategory.textContent = "無項目";
        qSubcategory.textContent = "無項目";
        qNumber.textContent = "#0";
        qText.textContent = getEmptyStateMessage();
        imgContainer.style.display = 'none';
        optionsList.innerHTML = '';
        
        btnPrev.disabled = true;
        btnNext.disabled = true;
        btnShowAnswer.disabled = true;
        return;
    }
    
    // Calculate current item based on mode index
    let activePointer = AppStore.currentIndex;
    if (AppStore.currentMode === 'quiz' && AppStore.quizHistory.length > 0) {
        activePointer = AppStore.quizHistory[AppStore.currentIndex];
    }
    
    const q = AppStore.activeList[activePointer];
    if (!q) return;
    
    // Update Meta Indicators
    qCategory.textContent = q.video_code ? "危險感知" : (q.category || "無分類");
    qSubcategory.textContent = q.video_code ? "影片測驗" : (q.subcategory || "無細項");
    qNumber.textContent = `#${q.id}`;
    qText.textContent = q.question;
    
    // Set bookmark & wrong state visual flags
    if (AppStore.bookmarks.has(q.id)) {
        btnBookmark.classList.add('active');
        btnBookmark.querySelector('i').className = 'fa-solid fa-bookmark';
    } else {
        btnBookmark.classList.remove('active');
        btnBookmark.querySelector('i').className = 'fa-regular fa-bookmark';
    }
    
    if (AppStore.wrongBook.has(q.id)) {
        btnAddWrong.classList.add('active');
    } else {
        btnAddWrong.classList.remove('active');
    }
    
    // Bookmark and wrong book hide in hazard mode
    if (AppStore.currentMode === 'hazard') {
        btnBookmark.style.visibility = 'hidden';
        btnAddWrong.style.visibility = 'hidden';
    } else {
        btnBookmark.style.visibility = 'visible';
        btnAddWrong.style.visibility = 'visible';
    }
    
    // Reset options display
    optionsList.style.display = 'flex';
    
    // Handle Video or Image display
    if (q.video_code) {
        if (videoContainer) {
            videoContainer.style.display = 'flex';
            qVideo.src = getHazardVideoUrl(q.video_code);
            videoLink.href = `https://hpt.thb.gov.tw/video/play/${q.video_code}`;
            
            // Options hidden while video is playing
            optionsList.style.display = 'none';
            const btnSkipVideo = document.getElementById('btn-skip-video');
            if (btnSkipVideo) {
                btnSkipVideo.style.display = 'inline-flex';
                btnSkipVideo.onclick = () => {
                    qVideo.pause();
                    optionsList.style.display = 'flex';
                    btnSkipVideo.style.display = 'none';
                };
            }
            qVideo.onended = () => {
                optionsList.style.display = 'flex';
                if (btnSkipVideo) btnSkipVideo.style.display = 'none';
            };
            
            // Auto play if possible
            qVideo.play().catch(e => console.log("Auto-play blocked", e));
        }
        imgContainer.style.display = 'none';
        qImg.src = '';
    } else {
        if (q.image) {
            let imgUrl = q.image;
            if (!imgUrl.startsWith('data/')) {
                imgUrl = 'data/' + imgUrl;
            }
            qImg.src = imgUrl;
            imgContainer.style.display = 'block';
        } else {
            imgContainer.style.display = 'none';
            qImg.src = '';
        }
    }
    
    // Render Option Buttons
    optionsList.innerHTML = '';
    
    q.options.forEach((opt, idx) => {
        const optionIndex = idx + 1; // 1-based matching with 'answer'
        
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `
            <div class="option-main-row">
                <span class="option-marker">${optionIndex}</span>
                <span class="option-text">${escapeHtml(opt)}</span>
            </div>
        `;
        
        btn.addEventListener('click', () => handleOptionSelection(btn, optionIndex, q));
        optionsList.appendChild(btn);
    });
    
    // Update Progress
    const totalCount = AppStore.currentMode === 'quiz' ? AppStore.quizHistory.length : AppStore.activeList.length;
    const progressPercent = ((AppStore.currentIndex + 1) / totalCount) * 100;
    progressFill.style.width = `${progressPercent}%`;
    progressText.textContent = `題目: ${AppStore.currentIndex + 1} / ${totalCount}`;
    
    // Score tracking display
    if (AppStore.stats.totalAnswered > 0) {
        const rate = Math.round((AppStore.stats.correctCount / AppStore.stats.totalAnswered) * 100);
        scoreText.textContent = `答題正確率: ${rate}% (${AppStore.stats.correctCount}/${AppStore.stats.totalAnswered})`;
    } else {
        scoreText.textContent = `正確率: -- (尚未答題)`;
    }
    
    // Setup Nav Buttons
    btnPrev.disabled = AppStore.currentIndex === 0;
    btnNext.disabled = AppStore.currentIndex === totalCount - 1;
}

function getEmptyStateMessage() {
    if (AppStore.currentMode === 'wrong') {
        return "您的錯題本目前是空的！答題出錯時，系統會自動將該題收入錯題本。";
    }
    return "在當前篩選條件下，找不到相符的題目。請嘗試清除搜尋或更換大類。";
}

// --- Option Selection Logic ---
function handleOptionSelection(selectedBtn, selectedIndex, question) {
    const optionsList = document.getElementById('options-list');
    const buttons = optionsList.querySelectorAll('.option-btn');
    const explanationBox = document.getElementById('explanation-box');
    const explanationText = document.getElementById('explanation-text');
    const qCard = document.getElementById('question-card');
    
    // Rewind video to start and pause
    const qVideo = document.getElementById('question-video');
    if (question.video_code && qVideo) {
        qVideo.currentTime = 0;
        qVideo.pause();
    }
    
    // Prevent double clicking / selecting
    buttons.forEach(btn => btn.disabled = true);
    
    const isCorrect = selectedIndex === question.answer;
    
    // Trigger Stats Update
    updateStatistics(question.category, isCorrect);
    
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        qCard.classList.add('correct-pop');
        SoundEffects.playCorrect();
        
        // Remove from wrong book if answered correctly in WRONG BOOK mode
        if (AppStore.currentMode === 'wrong') {
            AppStore.wrongBook.delete(question.id);
            saveLocalUserData();
        }
        
        // Add correct reason
        const reasonDiv = document.createElement('div');
        reasonDiv.className = 'option-reason';
        reasonDiv.textContent = `✓ 正確原因：此選項描述完全符合現行交通安全法規與安全駕駛防禦觀念。`;
        selectedBtn.appendChild(reasonDiv);
    } else {
        selectedBtn.classList.add('wrong');
        qCard.classList.add('shake');
        SoundEffects.playWrong();
        
        // Auto add to wrong book
        AppStore.wrongBook.add(question.id);
        saveLocalUserData();
        
        // Add wrong reason
        const reasonDiv = document.createElement('div');
        reasonDiv.className = 'option-reason';
        reasonDiv.textContent = `✗ 錯誤原因：此選項描述不正確，不符合安全駕駛原則或違反交通規則。`;
        selectedBtn.appendChild(reasonDiv);
        
        // Highlight the correct answer
        buttons.forEach((btn, idx) => {
            if (idx + 1 === question.answer) {
                btn.classList.add('correct-dimmed');
                const corrReasonDiv = document.createElement('div');
                corrReasonDiv.className = 'option-reason';
                corrReasonDiv.textContent = `✓ 正確原因：此選項描述完全符合現行交通安全法規與安全駕駛防禦觀念。`;
                btn.appendChild(corrReasonDiv);
            }
        });
    }
    
    // Show answer/explanation
    explanationBox.style.display = 'block';
    explanationText.textContent = `正確答案為 (${question.answer})。您的選擇是 (${selectedIndex})。`;
    
    // Save state
    saveLocalUserData();
}

function updateStatistics(category, isCorrect) {
    AppStore.stats.totalAnswered++;
    if (isCorrect) {
        AppStore.stats.correctCount++;
    }
    
    // Category Breakdown
    if (!AppStore.stats.categoryStats[category]) {
        AppStore.stats.categoryStats[category] = { total: 0, correct: 0 };
    }
    
    AppStore.stats.categoryStats[category].total++;
    if (isCorrect) {
        AppStore.stats.categoryStats[category].correct++;
    }
}

// --- Dynamic Exam Simulator ---
function setupExam() {
    clearInterval(AppStore.examTimer);
    
    // Hide vertical review card if restarting from review state
    const verticalCard = document.getElementById('vertical-review-card');
    if (verticalCard) verticalCard.style.display = 'none';
    // Select 10 random video questions and 40 normal questions
    const totalNormals = AppStore.questions.length;
    const totalVideos = AppStore.hazardQuestions.length;
    
    if (totalNormals < 40 || totalVideos < 10) {
        alert("題庫庫存不足（需要至少 40 題普通題與 10 題影片題），無法生成模擬試卷。");
        return;
    }
    
    // Shuffle and pick 10 video questions
    const videoShuffled = [...AppStore.hazardQuestions];
    for (let i = videoShuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [videoShuffled[i], videoShuffled[j]] = [videoShuffled[j], videoShuffled[i]];
    }
    const selectedVideos = videoShuffled.slice(0, 10);
    
    // Shuffle and pick 40 normal questions
    const normalShuffled = [...AppStore.questions];
    for (let i = normalShuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [normalShuffled[i], normalShuffled[j]] = [normalShuffled[j], normalShuffled[i]];
    }
    const selectedNormals = normalShuffled.slice(0, 40);
    
    // Merge without shuffling to keep video questions at the very beginning
    const merged = [...selectedVideos, ...selectedNormals];
    
    AppStore.examQuestions = merged;
    AppStore.examAnswers = {};
    AppStore.currentIndex = 0;
    AppStore.isExamSubmitted = false;
    AppStore.examTimeRemaining = 2700; // 45 minutes
    
    // Show exam ui, hide dashboard
    document.getElementById('exam-dashboard').style.display = 'none';
    document.getElementById('quiz-layout').style.display = 'flex';
    document.getElementById('filter-panel').style.display = 'none';
    
    // Hide result card and ensure question card is visible
    const resultCard = document.getElementById('exam-result-card');
    if (resultCard) resultCard.style.display = 'none';
    const qCard = document.getElementById('question-card');
    if (qCard) qCard.style.display = 'flex';
    document.querySelector('.navigation-controls').style.display = 'flex';
    
    // Start countdown timer
    startExamTimer();
    
    // Render first exam question
    renderCurrentQuestion();
}

function startExamTimer() {
    const headerTitle = document.getElementById('header-title');
    
    AppStore.examTimer = setInterval(() => {
        AppStore.examTimeRemaining--;
        
        if (AppStore.examTimeRemaining <= 0) {
            clearInterval(AppStore.examTimer);
            alert("時間到！系統已自動幫您交卷。");
            submitExam();
            return;
        }
        
        const minutes = Math.floor(AppStore.examTimeRemaining / 60);
        const seconds = AppStore.examTimeRemaining % 60;
        const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        headerTitle.innerHTML = `<span style="color: #fbbf24;"><i class="fa-solid fa-clock"></i> 倒數: ${timeStr}</span>`;
    }, 1000);
}

function renderExamQuestion() {
    const q = AppStore.examQuestions[AppStore.currentIndex];
    if (!q) return;
    
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const scoreText = document.getElementById('score-text');
    
    const qCategory = document.getElementById('q-category');
    const qSubcategory = document.getElementById('q-subcategory');
    const qNumber = document.getElementById('q-number');
    const qText = document.getElementById('question-text');
    const imgContainer = document.getElementById('image-container');
    const qImg = document.getElementById('question-image');
    const optionsList = document.getElementById('options-list');
    const explanationBox = document.getElementById('explanation-box');
    const explanationText = document.getElementById('explanation-text');
    const btnShowAnswer = document.getElementById('btn-show-answer');
    
    // Hide Video Container initially
    const videoContainer = document.getElementById('video-container');
    const qVideo = document.getElementById('question-video');
    const videoLink = document.getElementById('video-external-link');
    if (videoContainer) videoContainer.style.display = 'none';
    if (qVideo) qVideo.src = '';
    
    // Setup header show/hide action button
    btnShowAnswer.innerHTML = AppStore.isExamSubmitted ? '<i class="fa-solid fa-square-poll-vertical"></i> 考試成績' : '<i class="fa-solid fa-cloud-arrow-up"></i> 提交試卷';
    btnShowAnswer.disabled = false;
    
    qCategory.textContent = q.video_code ? "危險感知" : (q.category || "無分類");
    qSubcategory.textContent = q.video_code ? "影片測驗" : (q.subcategory || "無細項");
    qNumber.textContent = `#${AppStore.currentIndex + 1}`;
    qText.textContent = q.question;
    
    // Reset options display
    optionsList.style.display = 'flex';

    // Handle Video or Image display
    if (q.video_code) {
        if (videoContainer) {
            videoContainer.style.display = 'flex';
            
            if (qVideo.getAttribute('data-current-video') !== q.video_code) {
                qVideo.src = getHazardVideoUrl(q.video_code);
                qVideo.setAttribute('data-current-video', q.video_code);
                videoLink.href = `https://hpt.thb.gov.tw/video/play/${q.video_code}`;
                
                // Options hidden while video is playing
                optionsList.style.display = 'none';
                const btnSkipVideo = document.getElementById('btn-skip-video');
                if (btnSkipVideo) {
                    btnSkipVideo.style.display = 'inline-flex';
                    btnSkipVideo.onclick = () => {
                        qVideo.pause();
                        optionsList.style.display = 'flex';
                        btnSkipVideo.style.display = 'none';
                    };
                }
                qVideo.onended = () => {
                    optionsList.style.display = 'flex';
                    if (btnSkipVideo) btnSkipVideo.style.display = 'none';
                };
                
                // Auto play if possible
                qVideo.play().catch(e => console.log("Auto-play blocked", e));
            } else {
                // If video is already loaded (e.g. user selected an answer and triggered re-render), keep options visible
                optionsList.style.display = 'flex';
                qVideo.currentTime = 0;
                qVideo.pause();
            }
        }
        imgContainer.style.display = 'none';
        qImg.src = '';
    } else {
        qVideo.setAttribute('data-current-video', '');
        if (q.image) {
            let imgUrl = q.image;
            if (!imgUrl.startsWith('data/')) imgUrl = 'data/' + imgUrl;
            qImg.src = imgUrl;
            imgContainer.style.display = 'block';
        } else {
            imgContainer.style.display = 'none';
            qImg.src = '';
        }
    }
    
    // Bookmark and wrong book hide in exam mode
    document.getElementById('btn-bookmark').style.visibility = 'hidden';
    document.getElementById('btn-add-wrong').style.visibility = 'hidden';
    
    // Render options
    optionsList.innerHTML = '';
    
    const selectedAnswer = AppStore.examAnswers[AppStore.currentIndex];
    
    q.options.forEach((opt, idx) => {
        const optionIndex = idx + 1;
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        
        // Highlight active choices
        if (selectedAnswer === optionIndex) {
            btn.classList.add('hover-mock'); // Custom visual highlight
            btn.style.borderColor = 'var(--accent-blue)';
            btn.style.backgroundColor = 'rgba(37, 99, 235, 0.08)';
        }
        
        btn.innerHTML = `
            <div class="option-main-row">
                <span class="option-marker">${optionIndex}</span>
                <span class="option-text">${escapeHtml(opt)}</span>
            </div>
        `;
        
        if (AppStore.isExamSubmitted) {
            // Evaluated Mode
            btn.disabled = true;
            if (optionIndex === q.answer) {
                // Correct one
                btn.className = 'option-btn correct';
                
                const reasonDiv = document.createElement('div');
                reasonDiv.className = 'option-reason';
                reasonDiv.textContent = `✓ 正確原因：此選項描述完全符合現行交通安全法規與安全駕駛防禦觀念。`;
                btn.appendChild(reasonDiv);
            } else if (selectedAnswer === optionIndex) {
                // User picked wrong one
                btn.className = 'option-btn wrong';
                
                const reasonDiv = document.createElement('div');
                reasonDiv.className = 'option-reason';
                reasonDiv.textContent = `✗ 錯誤原因：此選項描述不正確，不符合安全駕駛原則或違反交通規則。`;
                btn.appendChild(reasonDiv);
            }
        } else {
            // Active test taking
            btn.addEventListener('click', () => {
                AppStore.examAnswers[AppStore.currentIndex] = optionIndex;
                // Redraw to show selected highlight
                renderExamQuestion();
                
                // Auto-advance to next question after a short delay
                setTimeout(() => {
                    // Only auto-advance if they haven't submitted yet and are not at the end
                    if (!AppStore.isExamSubmitted && AppStore.currentIndex < AppStore.examQuestions.length - 1) {
                        // Check if the current answer is still the one they clicked (prevents jumping multiple times if they double click)
                        if (AppStore.examAnswers[AppStore.currentIndex] === optionIndex) {
                            AppStore.currentIndex++;
                            renderExamQuestion();
                        }
                    }
                }, 350);
            });
        }
        
        optionsList.appendChild(btn);
    });
    
    // Explanation display
    if (AppStore.isExamSubmitted) {
        explanationBox.style.display = 'block';
        if (selectedAnswer === q.answer) {
            explanationText.innerHTML = `<span style="color: var(--color-success); font-weight: 700;">答對了！</span> 正確答案為 (${q.answer})。`;
        } else {
            const userPick = selectedAnswer ? `(${selectedAnswer})` : "未答";
            explanationText.innerHTML = `<span style="color: var(--color-danger); font-weight: 700;">答錯了！</span> 正確答案應為 (${q.answer})，您選了 ${userPick}。`;
        }
    } else {
        explanationBox.style.display = 'none';
    }
    
    // Update progress bar
    const progressPercent = ((AppStore.currentIndex + 1) / 50) * 100;
    progressFill.style.width = `${progressPercent}%`;
    progressText.textContent = `考試題: ${AppStore.currentIndex + 1} / 50`;
    
    // Count answered
    const answeredCount = Object.keys(AppStore.examAnswers).length;
    scoreText.textContent = `已作答: ${answeredCount}/50 題`;
    
    // Nav disabled controls
    document.getElementById('btn-prev').disabled = AppStore.currentIndex === 0;
    document.getElementById('btn-next').disabled = AppStore.currentIndex === 49;
}

function submitExam() {
    clearInterval(AppStore.examTimer);
    
    // Calculate Score
    let correctCount = 0;
    AppStore.examQuestions.forEach((q, index) => {
        const userChoice = AppStore.examAnswers[index];
        const isCorrect = userChoice === q.answer;
        
        // Feed statistical history
        updateStatistics(q.category, isCorrect);
        
        if (isCorrect) {
            correctCount++;
        } else {
            // Push to wrong book
            AppStore.wrongBook.add(q.id);
        }
    });
    
    AppStore.isExamSubmitted = true;
    saveLocalUserData();
    
    const score = correctCount * 2;
    const isPassed = score >= 85;
    
    // Show results overlay
    const minutesUsed = Math.floor((2700 - AppStore.examTimeRemaining) / 60);
    const secondsUsed = (2700 - AppStore.examTimeRemaining) % 60;
    
    const resultHtml = `
        <div style="text-align: center; padding: 1.5rem 0;">
            <div style="font-size: 4.5rem; font-weight: 800; color: ${isPassed ? 'var(--color-success)' : 'var(--color-danger)'}; text-shadow: 0 0 15px ${isPassed ? 'var(--color-success-glow)' : 'var(--color-danger-glow)'}; line-height: 1;">
                ${score} <span style="font-size: 1.5rem">分</span>
            </div>
            <div style="font-size: 1.5rem; font-weight: 700; margin: 1rem 0; color: ${isPassed ? 'var(--color-success)' : 'var(--color-danger)'}">
                ${isPassed ? '🎉 恭喜及格！及格分數：85分' : '❌ 不及格，請多加練習！及格分數：85分'}
            </div>
            <div style="color: var(--text-secondary); margin-bottom: 2rem;">
                答對題數: ${correctCount} / 50 題 | 用時: ${minutesUsed} 分 ${secondsUsed} 秒
            </div>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button class="btn btn-primary" onclick="reviewExamPaper()"><i class="fa-solid fa-magnifying-glass"></i> 逐題檢視考卷</button>
                <button class="btn btn-primary" onclick="reviewExamWrongVertical()"><i class="fa-solid fa-list"></i> 列表檢視錯題</button>
                <button class="btn btn-secondary" onclick="setupExam()"><i class="fa-solid fa-rotate-right"></i> 再考一次</button>
            </div>
        </div>
    `;
    
    // Show results in a separate card instead of destroying question-card
    const quizLayout = document.getElementById('quiz-layout');
    let resultCard = document.getElementById('exam-result-card');
    if (!resultCard) {
        resultCard = document.createElement('div');
        resultCard.id = 'exam-result-card';
        resultCard.className = 'card exam-result-card';
        // Insert before navigation controls
        quizLayout.insertBefore(resultCard, document.querySelector('.navigation-controls'));
    }
    
    resultCard.innerHTML = resultHtml;
    resultCard.style.display = 'block';
    document.getElementById('question-card').style.display = 'none';
    
    // Adjust header title
    document.getElementById('header-title').textContent = "考試成績";
    
    // Hide controls
    document.querySelector('.navigation-controls').style.display = 'none';
    document.getElementById('quick-jump-panel').style.display = 'none';
}

function reviewExamPaper() {
    // Hide result card and show question card
    const resultCard = document.getElementById('exam-result-card');
    if (resultCard) resultCard.style.display = 'none';
    const verticalCard = document.getElementById('vertical-review-card');
    if (verticalCard) verticalCard.style.display = 'none';
    document.getElementById('question-card').style.display = 'flex';
    
    // Hide bookmark and add-wrong buttons during review
    document.getElementById('btn-bookmark').style.visibility = 'hidden';
    document.getElementById('btn-add-wrong').style.visibility = 'hidden';

    // Adjust header title
    document.getElementById('header-title').textContent = "檢視考卷錯題";
    
    // Setup review state
    AppStore.currentIndex = 0;
    renderCurrentQuestion();
    
    // Show navigation controls
    document.querySelector('.navigation-controls').style.display = 'flex';
}

// Global scope window triggers for inline button clicks
window.reviewExamPaper = reviewExamPaper;
window.reviewExamWrongVertical = reviewExamWrongVertical;
window.setupExam = setupExam;

function reviewExamWrongVertical() {
    const quizLayout = document.getElementById('quiz-layout');
    
    // Hide others
    const resultCard = document.getElementById('exam-result-card');
    if (resultCard) resultCard.style.display = 'none';
    document.getElementById('question-card').style.display = 'none';
    document.querySelector('.navigation-controls').style.display = 'none';
    document.getElementById('quick-jump-panel').style.display = 'none';
    
    // Adjust header title
    document.getElementById('header-title').textContent = "列表檢視錯題";
    
    // Create or get vertical card
    let verticalCard = document.getElementById('vertical-review-card');
    if (!verticalCard) {
        verticalCard = document.createElement('div');
        verticalCard.id = 'vertical-review-card';
        verticalCard.className = 'card vertical-review-card';
        verticalCard.style.maxHeight = '75vh';
        verticalCard.style.overflowY = 'auto';
        quizLayout.insertBefore(verticalCard, document.querySelector('.navigation-controls'));
    }
    
    verticalCard.style.display = 'flex';
    verticalCard.style.flexDirection = 'column';
    verticalCard.style.gap = '3.5rem';
    verticalCard.innerHTML = ''; // Clear old content
    
    // Find wrong questions
    const wrongQuestions = [];
    AppStore.examQuestions.forEach((q, index) => {
        if (AppStore.examAnswers[index] !== q.answer) {
            wrongQuestions.push({ q, index, userChoice: AppStore.examAnswers[index] });
        }
    });
    
    if (wrongQuestions.length === 0) {
        const noWrong = document.createElement('div');
        noWrong.textContent = "太棒了！您沒有答錯任何題目！";
        noWrong.style.textAlign = 'center';
        noWrong.style.fontSize = '1.2rem';
        noWrong.style.padding = '2rem';
        verticalCard.appendChild(noWrong);
    } else {
        wrongQuestions.forEach(item => {
            const { q, index, userChoice } = item;
            const qDiv = document.createElement('div');
            qDiv.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            qDiv.style.paddingBottom = '1.5rem';
            
            // Question Text
            const qText = document.createElement('div');
            qText.style.fontWeight = 'bold';
            qText.style.fontSize = '1.2rem';
            qText.style.marginBottom = '1rem';
            qText.style.lineHeight = '1.5';
            qText.textContent = `第 ${index + 1} 題：${q.question}`;
            qDiv.appendChild(qText);
            
            // Image/Video
            if (q.image) {
                const img = document.createElement('img');
                img.src = `images/${q.image}`;
                img.style.maxWidth = '100%';
                img.style.maxHeight = '200px';
                img.style.objectFit = 'contain';
                img.style.marginBottom = '1rem';
                img.style.borderRadius = '8px';
                qDiv.appendChild(img);
            } else if (q.video_code) {
                const vid = document.createElement('video');
                vid.src = `videos/${q.video_code}.mp4`;
                vid.controls = true;
                vid.style.maxWidth = '100%';
                vid.style.maxHeight = '250px';
                vid.style.marginBottom = '1rem';
                vid.style.borderRadius = '8px';
                qDiv.appendChild(vid);
            }
            
            // Options
            const optsDiv = document.createElement('div');
            optsDiv.style.display = 'flex';
            optsDiv.style.flexDirection = 'column';
            optsDiv.style.gap = '0.75rem';
            q.options.forEach((opt, optIdx) => {
                const optNum = optIdx + 1;
                const optEl = document.createElement('div');
                optEl.style.padding = '1rem';
                optEl.style.borderRadius = '8px';
                optEl.style.border = '2px solid var(--border)';
                optEl.textContent = `(${optNum}) ${opt}`;
                
                if (optNum === q.answer) {
                    optEl.style.background = 'var(--color-success-gradient)'; 
                    optEl.style.borderColor = 'var(--color-success)';
                    optEl.style.color = '#fff';
                    optEl.style.fontWeight = 'bold';
                    optEl.style.boxShadow = '0 4px 15px var(--color-success-glow)';
                    optEl.textContent += " ✓ (正確答案)";
                } else if (optNum === userChoice) {
                    optEl.style.background = 'var(--color-danger-gradient)'; 
                    optEl.style.borderColor = 'var(--color-danger)';
                    optEl.style.color = '#fff';
                    optEl.style.fontWeight = 'bold';
                    optEl.style.boxShadow = '0 4px 15px var(--color-danger-glow)';
                    optEl.textContent += " ✗ (您的選擇)";
                } else {
                    optEl.style.backgroundColor = 'var(--bg-secondary)';
                    optEl.style.color = 'var(--text-primary)';
                }
                
                optsDiv.appendChild(optEl);
            });
            qDiv.appendChild(optsDiv);
            
            // Reason
            const reasonDiv = document.createElement('div');
            reasonDiv.style.marginTop = '1rem';
            reasonDiv.style.paddingTop = '1rem';
            reasonDiv.style.borderTop = '1px solid var(--border)';
            reasonDiv.style.color = 'var(--text-secondary)';
            reasonDiv.style.fontSize = '0.9rem';
            reasonDiv.textContent = `💡 解析：官方標準答案為 (${q.answer})。`;
            qDiv.appendChild(reasonDiv);
            
            verticalCard.appendChild(qDiv);
        });
    }
    
    // Add Back button at the bottom
    const backBtnDiv = document.createElement('div');
    backBtnDiv.style.display = 'flex';
    backBtnDiv.style.justifyContent = 'center';
    backBtnDiv.style.marginTop = '1rem';
    backBtnDiv.style.paddingTop = '1rem';
    
    const backBtn = document.createElement('button');
    backBtn.className = 'btn btn-secondary';
    backBtn.innerHTML = '<i class="fa-solid fa-arrow-left"></i> 返回成績單';
    backBtn.onclick = () => {
        verticalCard.style.display = 'none';
        document.getElementById('exam-result-card').style.display = 'block';
        document.getElementById('header-title').textContent = "考試成績";
    };
    backBtnDiv.appendChild(backBtn);
    verticalCard.appendChild(backBtnDiv);
}

// --- Stats Page Population ---
function renderStatsDashboard() {
    const totalAnsweredEl = document.getElementById('stat-total-answered');
    const correctRateEl = document.getElementById('stat-correct-rate');
    const wrongCountEl = document.getElementById('stat-wrong-count');
    const statsListEl = document.getElementById('category-stats-list');
    
    if (!totalAnsweredEl) return;
    
    // Basic numerical aggregates
    totalAnsweredEl.textContent = AppStore.stats.totalAnswered;
    wrongCountEl.textContent = AppStore.wrongBook.size;
    
    if (AppStore.stats.totalAnswered > 0) {
        const rate = Math.round((AppStore.stats.correctCount / AppStore.stats.totalAnswered) * 100);
        correctRateEl.textContent = `${rate}%`;
    } else {
        correctRateEl.textContent = "0%";
    }
    
    // Build category list
    statsListEl.innerHTML = '';
    
    const categories = [...new Set(AppStore.questions.map(q => q.category))].filter(Boolean);
    
    if (categories.length === 0) {
        statsListEl.innerHTML = '<p class="text-muted">尚無題庫統計資料</p>';
        return;
    }
    
    categories.forEach(cat => {
        const record = AppStore.stats.categoryStats[cat] || { total: 0, correct: 0 };
        const percent = record.total > 0 ? Math.round((record.correct / record.total) * 100) : 0;
        
        const catQuestionsCount = AppStore.questions.filter(q => q.category === cat).length;
        
        const item = document.createElement('div');
        item.className = 'category-stat-item';
        item.innerHTML = `
            <div class="category-stat-info">
                <span class="category-stat-name">${cat} <span style="font-size: 0.8rem; color: var(--text-muted)">(${catQuestionsCount} 題)</span></span>
                <span class="category-stat-value">正確率: ${percent}% (已作答: ${record.total} 題)</span>
            </div>
            <div class="category-stat-progress-track">
                <div class="category-stat-progress-fill" style="width: ${percent}%; background: ${getProgressGradient(percent)}"></div>
            </div>
        `;
        statsListEl.appendChild(item);
    });
}

function getProgressGradient(percent) {
    if (percent >= 85) return 'var(--color-success-gradient)';
    if (percent >= 60) return 'var(--color-warning-gradient)';
    return 'var(--color-danger-gradient)';
}

// --- Navigation / Routing Logic ---
function switchMode(newMode) {
    // Hide result card and ensure question card is visible when switching modes
    const resultCard = document.getElementById('exam-result-card');
    if (resultCard) resultCard.style.display = 'none';
    const verticalCard = document.getElementById('vertical-review-card');
    if (verticalCard) verticalCard.style.display = 'none';
    const qCard = document.getElementById('question-card');
    if (qCard) qCard.style.display = 'flex';
    document.querySelector('.navigation-controls').style.display = 'flex';

    // Clean exam loops if moving away from exam
    if (AppStore.currentMode === 'exam' && newMode !== 'exam') {
        clearInterval(AppStore.examTimer);
        document.getElementById('btn-bookmark').style.visibility = 'visible';
        document.getElementById('btn-add-wrong').style.visibility = 'visible';
    }
    
    AppStore.currentMode = newMode;
    
    // Update Side menu active style
    document.querySelectorAll('.nav-item').forEach(btn => {
        if (btn.getAttribute('data-mode') === newMode) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update mobile nav active style
    document.querySelectorAll('.mobile-nav-item').forEach(btn => {
        if (btn.getAttribute('data-mode') === newMode) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Reset Header Title
    const headerTitle = document.getElementById('header-title');
    const filterPanel = document.getElementById('filter-panel');
    const quizLayout = document.getElementById('quiz-layout');
    const examDashboard = document.getElementById('exam-dashboard');
    const statsDashboard = document.getElementById('stats-dashboard');
    const searchContainer = document.getElementById('search-container');
    
    // Default displays
    filterPanel.style.display = 'none';
    quizLayout.style.display = 'none';
    examDashboard.style.display = 'none';
    statsDashboard.style.display = 'none';
    searchContainer.style.display = 'none';
    document.getElementById('quiz-limit-group').style.display = 'none';
    
    // Show elements depending on routing selection
    switch(newMode) {
        case 'browse':
            headerTitle.textContent = "題庫瀏覽";
            filterPanel.style.display = 'grid';
            quizLayout.style.display = 'flex';
            searchContainer.style.display = 'flex';
            applyFilters();
            renderCurrentQuestion();
            break;
            
        case 'quiz':
            headerTitle.textContent = "隨機刷題";
            filterPanel.style.display = 'grid';
            quizLayout.style.display = 'flex';
            document.getElementById('quiz-limit-group').style.display = 'flex';
            applyFilters();
            renderCurrentQuestion();
            break;
            
        case 'hazard':
            headerTitle.textContent = "危險感知影片測驗";
            filterPanel.style.display = 'none';
            quizLayout.style.display = 'flex';
            applyFilters();
            renderCurrentQuestion();
            break;
            
        case 'exam':
            headerTitle.textContent = "模擬考照";
            examDashboard.style.display = 'flex';
            break;
            
        case 'wrong':
            headerTitle.textContent = "錯題本練習";
            filterPanel.style.display = 'grid';
            quizLayout.style.display = 'flex';
            applyFilters();
            renderCurrentQuestion();
            break;
            
        case 'stats':
            headerTitle.textContent = "正確率統計";
            statsDashboard.style.display = 'flex';
            renderStatsDashboard();
            break;
    }
}

// --- Event Binding ---
function bindEvents() {
    // Mode toggles
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.getAttribute('data-mode');
            switchMode(mode);
        });
    });
    
    document.querySelectorAll('.mobile-nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.getAttribute('data-mode');
            switchMode(mode);
        });
    });
    
    // Nav Controls
    document.getElementById('btn-prev').addEventListener('click', () => {
        if (AppStore.currentIndex > 0) {
            AppStore.currentIndex--;
            saveProgress();
            renderCurrentQuestion();
        }
    });
    
    document.getElementById('btn-next').addEventListener('click', () => {
        const total = AppStore.currentMode === 'exam' ? 50 : AppStore.activeList.length;
        if (AppStore.currentIndex < total - 1) {
            AppStore.currentIndex++;
            saveProgress();
            renderCurrentQuestion();
        }
    });
    
    document.getElementById('btn-show-answer').addEventListener('click', () => {
        // Special case: Exam submit
        if (AppStore.currentMode === 'exam') {
            if (AppStore.isExamSubmitted) {
                // Show scorecard screen
                submitExam();
            } else {
                if (confirm("您確定要交卷嗎？")) {
                    submitExam();
                }
            }
            return;
        }
        
        // Regular reveal
        const activePointer = (AppStore.currentMode === 'quiz' && AppStore.quizHistory.length > 0) 
            ? AppStore.quizHistory[AppStore.currentIndex] 
            : AppStore.currentIndex;
            
        const q = AppStore.activeList[activePointer];
        if (!q) return;
        
                const optionsList = document.getElementById('options-list');
        const buttons = optionsList.querySelectorAll('.option-btn');
        
        // Highlight correct option and dim wrong choices
        buttons.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx + 1 === q.answer) {
                btn.classList.add('correct-dimmed');
                
                // Add reason if not already present
                if (!btn.querySelector('.option-reason')) {
                    const reasonDiv = document.createElement('div');
                    reasonDiv.className = 'option-reason';
                    reasonDiv.textContent = `✓ 正確原因：此選項描述完全符合現行交通安全法規與安全駕駛防禦觀念。`;
                    btn.appendChild(reasonDiv);
                }
            }
        });
        
        // Show explanation
        const explanationBox = document.getElementById('explanation-box');
        const explanationText = document.getElementById('explanation-text');
        explanationBox.style.display = 'block';
        explanationText.textContent = `正確答案為 (${q.answer})。`;
    });
    
    // Filter selectors
    document.getElementById('filter-category').addEventListener('change', () => {
        applyFilters();
        renderCurrentQuestion();
    });
    
    document.getElementById('filter-subcategory').addEventListener('change', () => {
        applyFilters();
        renderCurrentQuestion();
    });
    
    document.getElementById('filter-type').addEventListener('change', () => {
        applyFilters();
        renderCurrentQuestion();
    });
    
    document.getElementById('filter-quiz-limit').addEventListener('change', () => {
        applyFilters();
        renderCurrentQuestion();
    });
    
    // Search keyword query
    const searchInput = document.getElementById('search-input');
    let debounceTimer;
    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            applyFilters();
            renderCurrentQuestion();
        }, 300);
    });
    
    // Fast Jump
    document.getElementById('btn-jump').addEventListener('click', () => {
        const inputVal = parseInt(document.getElementById('jump-index').value);
        if (isNaN(inputVal) || inputVal < 1 || inputVal > AppStore.activeList.length) {
            alert(`請輸入有效的題號 (1-${AppStore.activeList.length})`);
            return;
        }
        
        AppStore.currentIndex = inputVal - 1;
        saveProgress();
        renderCurrentQuestion();
    });
    
    const btnRestart = document.getElementById('btn-restart-progress');
    if (btnRestart) {
        btnRestart.addEventListener('click', () => {
            AppStore.currentIndex = 0;
            saveProgress();
            renderCurrentQuestion();
        });
    }
    
    // Meta bookmarks & wrong actions
    document.getElementById('btn-bookmark').addEventListener('click', () => {
        const activePointer = (AppStore.currentMode === 'quiz' && AppStore.quizHistory.length > 0) 
            ? AppStore.quizHistory[AppStore.currentIndex] 
            : AppStore.currentIndex;
            
        const q = AppStore.activeList[activePointer];
        if (!q) return;
        
        if (AppStore.bookmarks.has(q.id)) {
            AppStore.bookmarks.delete(q.id);
        } else {
            AppStore.bookmarks.add(q.id);
        }
        
        saveLocalUserData();
        renderCurrentQuestion();
    });
    
    document.getElementById('btn-add-wrong').addEventListener('click', () => {
        const activePointer = (AppStore.currentMode === 'quiz' && AppStore.quizHistory.length > 0) 
            ? AppStore.quizHistory[AppStore.currentIndex] 
            : AppStore.currentIndex;
            
        const q = AppStore.activeList[activePointer];
        if (!q) return;
        
        if (AppStore.wrongBook.has(q.id)) {
            AppStore.wrongBook.delete(q.id);
        } else {
            AppStore.wrongBook.add(q.id);
        }
        
        saveLocalUserData();
        renderCurrentQuestion();
    });
    
    // Settings toggles
    document.getElementById('toggle-sound').addEventListener('change', (e) => {
        AppStore.soundEnabled = e.target.checked;
        saveLocalUserData();
    });
    
    document.getElementById('toggle-theme').addEventListener('change', (e) => {
        AppStore.theme = e.target.checked ? 'dark' : 'light';
        if (AppStore.theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        saveLocalUserData();
    });
    
    // Exam Dashboard Controls
    document.getElementById('btn-start-exam').addEventListener('click', setupExam);
    
    // Stats reset
    document.getElementById('btn-reset-stats').addEventListener('click', () => {
        if (confirm("警告！這將清除所有累積的答題紀錄與錯題本資料，確定要重設嗎？")) {
            AppStore.wrongBook.clear();
            AppStore.bookmarks.clear();
            AppStore.stats = {
                totalAnswered: 0,
                correctCount: 0,
                categoryStats: {}
            };
            saveLocalUserData();
            renderStatsDashboard();
            alert("重設完畢。");
        }
    });
    
    // Image zoom zoom lightbox binding
    document.getElementById('image-container').addEventListener('click', openImageZoom);
    document.getElementById('lightbox-close').addEventListener('click', closeImageZoom);
    document.getElementById('lightbox').addEventListener('click', (e) => {
        if (e.target.id === 'lightbox') closeImageZoom();
    });
}

// --- Image zoom lightbox ---
function openImageZoom() {
    const qImg = document.getElementById('question-image');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const qText = document.getElementById('question-text');
    
    if (!qImg || !lightbox || !lightboxImg) return;
    
    lightboxImg.src = qImg.src;
    lightboxCaption.textContent = qText.textContent;
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Lock background scroll
}

function closeImageZoom() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// --- Safe escape utility ---
function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
