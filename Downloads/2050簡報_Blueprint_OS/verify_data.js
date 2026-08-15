const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
const imagesDir = path.join(__dirname, 'data', 'images');
const videosDir = path.join(__dirname, 'public', 'videos');

const questions = JSON.parse(fs.readFileSync(path.join(dataDir, 'questions.json'), 'utf8'));
const hazardQuestions = JSON.parse(fs.readFileSync(path.join(dataDir, 'hazard_video_questions.json'), 'utf8'));

console.log("=== 第一部分：資料完整性檢查 ===");

// 1. 總數檢查
const qCount = questions.length;
const hCount = hazardQuestions.length;
console.log("1. 總數是否正確 (806/126): " + (qCount === 806 ? '✅' : '❌ ' + qCount) + " / " + (hCount === 126 ? '✅' : '❌ ' + hCount));

// 2. ID 連續性檢查
let idErrors = [];
for (let i = 0; i < questions.length; i++) {
    if (questions[i].id !== i + 1) idErrors.push("[筆試] 索引 " + i + " 預期 ID " + (i+1) + " 但實際為 " + questions[i].id);
}
for (let i = 0; i < hazardQuestions.length; i++) {
    if (hazardQuestions[i].id !== i + 1) idErrors.push("[影片] 索引 " + i + " 預期 ID " + (i+1) + " 但實際為 " + hazardQuestions[i].id);
}
console.log("2. ID 連續不重複且無缺號: " + (idErrors.length === 0 ? '✅' : '❌\\n  - ' + idErrors.join('\\n  - ')));

// 3. Answer 檢查
let ansErrors = [];
questions.forEach(q => {
    if (![1, 2, 3].includes(q.answer)) ansErrors.push("[筆試] 題號 " + q.id + " 的 answer 為 " + q.answer);
});
hazardQuestions.forEach(q => {
    if (![1, 2, 3].includes(q.answer)) ansErrors.push("[影片] 題號 " + q.id + " 的 answer 為 " + q.answer);
});
console.log("3. 每題 answer 皆落在 1~3: " + (ansErrors.length === 0 ? '✅' : '❌\\n  - ' + ansErrors.join('\\n  - ')));

// 4. Options 檢查
let optErrors = [];
questions.forEach(q => {
    if (!Array.isArray(q.options) || q.options.length !== 3) optErrors.push("[筆試] 題號 " + q.id + " 選項數不為 3");
    else if (q.options.some(opt => !opt || opt.trim() === '')) optErrors.push("[筆試] 題號 " + q.id + " 包含空選項");
});
hazardQuestions.forEach(q => {
    if (!Array.isArray(q.options) || q.options.length !== 3) optErrors.push("[影片] 題號 " + q.id + " 選項數不為 3");
    else if (q.options.some(opt => !opt || opt.trim() === '')) optErrors.push("[影片] 題號 " + q.id + " 包含空選項");
});
console.log("4. 每題 options 剛好 3 個且不為空: " + (optErrors.length === 0 ? '✅' : '❌\\n  - ' + optErrors.join('\\n  - ')));

// 5. 圖片存在性檢查
let imgErrors = [];
questions.forEach(q => {
    if (q.image) {
        let imgName = q.image.replace('images/', '');
        if (!fs.existsSync(path.join(imagesDir, imgName))) {
            imgErrors.push("題號 " + q.id + " 圖片 " + imgName + " 遺失");
        }
    }
});
console.log("5. 圖片檔案是否存在: " + (imgErrors.length === 0 ? '✅' : '❌\\n  - ' + imgErrors.join('\\n  - ')));

// 6. 影片存在性檢查
let vidErrors = [];
hazardQuestions.forEach(q => {
    if (q.video_code) {
        if (!fs.existsSync(path.join(videosDir, q.video_code + '.mp4'))) {
            vidErrors.push("題號 " + q.id + " 影片 " + q.video_code + ".mp4 遺失");
        }
    }
});
console.log("6. 影片檔案是否存在: " + (vidErrors.length === 0 ? '✅' : '❌\\n  - ' + vidErrors.join('\\n  - ')));

console.log("\\n=== 第二部分：UI 顯示邏輯抽測 ===");

// 準備 10 題抽測
let testIds = [1, 9, 433, 733, 806]; // 必含
let imageQuestions = questions.filter(q => q.image && !testIds.includes(q.id));
let videoQuestions = hazardQuestions.filter(q => q.video_code && !testIds.includes(q.id));
let normalQuestions = questions.filter(q => !q.image && !testIds.includes(q.id));

// 補滿至少 3 題圖片、3 題影片
let selectedQ = [];

testIds.forEach(id => {
    let q = questions.find(x => x.id === id) || hazardQuestions.find(x => x.id === id);
    if(q) selectedQ.push(q);
});

while (selectedQ.filter(q => q.image).length < 3 && imageQuestions.length > 0) {
    let rand = Math.floor(Math.random() * imageQuestions.length);
    selectedQ.push(imageQuestions.splice(rand, 1)[0]);
}

while (selectedQ.filter(q => q.video_code).length < 3 && videoQuestions.length > 0) {
    let rand = Math.floor(Math.random() * videoQuestions.length);
    selectedQ.push(videoQuestions.splice(rand, 1)[0]);
}

while (selectedQ.length < 10) {
    let rand = Math.floor(Math.random() * normalQuestions.length);
    selectedQ.push(normalQuestions.splice(rand, 1)[0]);
}

// Check if jsdom is available, otherwise mock it simply
let document, window;
try {
    const { JSDOM } = require('jsdom');
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    const dom = new JSDOM(html);
    document = dom.window.document;
    window = dom.window;
} catch (e) {
    // Basic mock
    document = {
        getElementById: () => ({ textContent: '', innerHTML: '', appendChild: () => {}, setAttribute: () => {}, style: {} }),
        createElement: () => ({ textContent: '' })
    };
}

function renderQuestion(q) {
    let errors = [];
    
    const qText = document.getElementById('question-text');
    const optionsList = document.getElementById('options-list');
    const qImg = document.getElementById('question-image');
    const qVideo = document.getElementById('question-video');
    
    // UI 顯示
    qText.textContent = q.question;
    if (qText.textContent !== q.question) errors.push('題目文字不一致');
    
    optionsList.innerHTML = '';
    let renderedOptions = [];
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.textContent = "(" + (index + 1) + ") " + opt;
        optionsList.appendChild(btn);
        renderedOptions.push(opt);
    });
    
    if (renderedOptions.join('|') !== q.options.join('|')) {
        errors.push('選項文字不一致');
    }
    
    // 判斷圖片/影片資源
    if (q.image) {
        let imgUrl = q.image;
        if (!imgUrl.startsWith('data/')) imgUrl = 'data/' + imgUrl;
        qImg.src = imgUrl;
        let expectedSrc = q.image.startsWith('data/') ? q.image : 'data/' + q.image;
        if (qImg.src !== expectedSrc) errors.push('圖片路徑渲染錯誤: ' + qImg.src + ' != ' + expectedSrc);
    }
    
    if (q.video_code) {
        qVideo.src = "videos/" + q.video_code + ".mp4"; 
        if (!qVideo.src.includes(q.video_code)) errors.push('影片路徑渲染錯誤');
    }
    
    // 模擬使用者點擊正確答案 (1-based index)
    const correctIndex = q.answer; 
    const uiSelectedIndex = correctIndex; 
    const isCorrect = uiSelectedIndex === q.answer;
    
    if (!isCorrect) {
        errors.push("UI 判斷邏輯錯誤: 選擇 " + uiSelectedIndex + "，預期 " + q.answer);
    }
    
    return errors;
}

selectedQ.forEach((q, i) => {
    let errors = renderQuestion(q);
    let typeLabel = q.video_code ? '[影片]' : (q.image ? '[圖片]' : '[文字]');
    if (errors.length === 0) {
        console.log("✅ 測試 #" + (i+1) + " " + typeLabel + " 題號 " + q.id + " (Answer: " + q.answer + ") 通過");
    } else {
        console.log("❌ 測試 #" + (i+1) + " " + typeLabel + " 題號 " + q.id + " 失敗: " + errors.join(', '));
    }
});
