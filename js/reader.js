// reader.html用のJavaScript

let currentFile = '';
let currentSections = [];
let currentSectionIndex = 0;

// URLパラメータからファイル名を取得
function getFileFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('file') || 'story.md';
}

// マークダウンファイルを読み込む
async function loadMarkdown(filePath) {
    try {
        // 相対パスはそのまま使用（web/フォルダ内から読み込む）
        const response = await fetch(filePath);
        
        if (!response.ok) {
            throw new Error(`ファイルの読み込みに失敗しました: ${response.status}`);
        }
        
        const text = await response.text();
        return text;
    } catch (error) {
        console.error('Error loading markdown:', error);
        return `# エラー\n\nファイルの読み込みに失敗しました。\n\nパス: ${filePath}\n\nエラー: ${error.message}`;
    }
}

// マークダウンをHTMLに変換して表示
async function renderMarkdown() {
    // 前のページのBGMを停止
    if (typeof audioManager !== 'undefined') {
        audioManager.stop(true);
    }
    
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '<div class="loading">読み込み中...</div>';
    
    currentFile = getFileFromURL();
    const markdown = await loadMarkdown(currentFile);
    
    // markedでHTMLに変換
    const html = marked.parse(markdown);
    contentDiv.innerHTML = html;
    
    // セクションに分割（h2タグで分割）
    splitIntoSections();
    
    // URLハッシュがある場合はそこへスクロール
    if (window.location.hash) {
        setTimeout(() => {
            const targetId = window.location.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    } else {
        // スクロール位置をリセット
        window.scrollTo(0, 0);
    }
    
    // スクロール進捗を更新
    updateScrollProgress();
    
    // 選択肢リンクにBGM停止イベントを追加
    addChoiceButtonListeners();
    
    // 音楽を自動再生（コンテンツに応じて）
    if (typeof audioManager !== 'undefined') {
        playMusicForContent(markdown, currentFile);
    }
}

// 選択肢ボタンにBGM停止イベントを追加
function addChoiceButtonListeners() {
    const choiceButtons = document.querySelectorAll('.choice-btn');
    choiceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 外部リンクの場合はBGMを停止
            const href = button.getAttribute('href');
            if (href && (href.startsWith('reader.html') || !href.startsWith('#'))) {
                if (typeof audioManager !== 'undefined') {
                    audioManager.stop(false); // 即座に停止
                }
            }
        });
    });
}

// コンテンツとファイル名に応じて音楽を再生
function playMusicForContent(content, filePath) {
    if (typeof audioManager === 'undefined') return;
    
    // 短い待機時間の後に音楽を再生（前の音楽の停止を確実にする）
    setTimeout(() => {
        // エンディングファイルの場合
        if (filePath.includes('ending_true')) {
            audioManager.play('trueEnd', { loop: false, fadeIn: true });
            return;
        }
        if (filePath.includes('ending_bad') || filePath.includes('ending_dead')) {
            audioManager.play('badDeadEnd', { loop: false, fadeIn: true });
            return;
        }
        
        // ルートファイルの場合
        if (filePath.includes('route_a')) {
            audioManager.play('routeAShield', { loop: true });
            return;
        }
        if (filePath.includes('route_b')) {
            audioManager.play('routeBWords', { loop: true });
            return;
        }
        
        // メインストーリー：コンテンツから自動検出
        audioManager.autoPlay(content);
    }, 500);
}

// コンテンツをセクションに分割
function splitIntoSections() {
    const contentDiv = document.getElementById('content');
    const h2Elements = contentDiv.querySelectorAll('h2');
    
    currentSections = [];
    currentSectionIndex = 0;
    
    if (h2Elements.length === 0) {
        // セクション分割なし
        document.getElementById('prev-section').disabled = true;
        document.getElementById('next-section').disabled = true;
        return;
    }
    
    // 各セクションの開始位置を記録（スクロール後に再計算）
    setTimeout(() => {
        h2Elements.forEach((h2, index) => {
            currentSections.push({
                element: h2,
                offset: h2.offsetTop
            });
        });
        updateSectionButtons();
    }, 100);
}

// セクションボタンの状態を更新
function updateSectionButtons() {
    const prevBtn = document.getElementById('prev-section');
    const nextBtn = document.getElementById('next-section');
    
    prevBtn.disabled = currentSectionIndex === 0;
    nextBtn.disabled = currentSectionIndex >= currentSections.length - 1;
}

// 前のセクションへ
function goToPrevSection() {
    if (currentSectionIndex > 0) {
        currentSectionIndex--;
        scrollToSection(currentSectionIndex);
    }
}

// 次のセクションへ
function goToNextSection() {
    if (currentSectionIndex < currentSections.length - 1) {
        currentSectionIndex++;
        scrollToSection(currentSectionIndex);
    }
}

// 指定セクションへスクロール
function scrollToSection(index) {
    if (currentSections[index]) {
        const targetOffset = currentSections[index].offset - 100; // ナビゲーション分のオフセット
        window.scrollTo({
            top: targetOffset,
            behavior: 'smooth'
        });
        updateSectionButtons();
    }
}

// スクロール進捗を更新
function updateScrollProgress() {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    const scrollPercent = Math.round((scrollTop / (docHeight - winHeight)) * 100);
    const clampedPercent = Math.max(0, Math.min(100, scrollPercent));
    
    document.getElementById('scroll-progress').textContent = `${clampedPercent}%`;
}

// イベントリスナー設定
document.getElementById('prev-section').addEventListener('click', goToPrevSection);
document.getElementById('next-section').addEventListener('click', goToNextSection);

// スクロール時に進捗を更新
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateScrollProgress, 100);
});

// キーボードショートカット
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        goToPrevSection();
    } else if (e.key === 'ArrowRight') {
        goToNextSection();
    }
});

// ページ遷移時にBGMを停止
window.addEventListener('beforeunload', () => {
    if (typeof audioManager !== 'undefined') {
        audioManager.stop(false); // 即座に停止
    }
});

// ページ読み込み時に実行
window.addEventListener('DOMContentLoaded', renderMarkdown);
