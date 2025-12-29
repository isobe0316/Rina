// reader.html用のJavaScript

let currentFile = '';
let currentSections = [];
let currentSectionIndex = 0;

// ========== 背景画像管理 ==========
// ファイルごとの背景画像マッピング
const backgroundImages = {
    'story_ch1.md': 'images/bg_window_cloudy_day.jpg',
    'story_ch2.md': 'images/bg_rain_window_evening.jpg',
    'story_ch3.md': 'images/rain_window_day.jpg',
    'routes/route_a1.md': 'images/glass_meeting_room.jpg',
    'routes/route_a2.md': 'images/glass_meeting_room.jpg',
    'routes/route_a_cafe.md': 'images/cafe_window.jpg',
    'routes/route_a_end.md': 'images/glass_meeting_room.jpg',
    'routes/route_a_bad1.md': 'images/shattered_glass.jpg',
    'routes/route_a_bad2.md': 'images/shattered_glass.jpg',
    'routes/route_a_bad_end.md': 'images/shattered_glass.jpg',
    'routes/route_b1.md': 'images/rain_window.jpg',
    'routes/route_b2.md': 'images/office_night.jpg',
    'routes/route_b_end.md': 'images/office_night.jpg',
    'routes/route_c.md': 'images/rain_window.jpg',
    'endings/ending_true.md': 'images/empty_desk.jpg',
    'endings/ending_bad.md': 'images/shattered_glass.jpg',
    'endings/ending_dead.md': 'images/underwater_room.jpg',
    'endings/ending_normal.md': 'images/rainy_crossing.jpg'
};

// 背景画像を変更するヘルパー関数
function changeBg(imagePath) {
    const bgLayer = document.getElementById('bg-image');
    if (bgLayer) {
        bgLayer.style.backgroundImage = `url('${imagePath}')`;
        console.log('Background changed to:', imagePath);
    }
}

// デフォルト背景に戻す
function resetBg() {
    const bgLayer = document.getElementById('bg-image');
    if (bgLayer) {
        bgLayer.style.backgroundImage = '';
    }
}

// 現在のファイルに応じて背景画像を設定
function setBackgroundForFile(filePath) {
    if (backgroundImages[filePath]) {
        changeBg(backgroundImages[filePath]);
    } else {
        console.log('No background image defined for:', filePath);
    }
}

// グローバル関数として公開（必要に応じて手動で変更できるように）
window.changeBg = changeBg;
window.resetBg = resetBg;

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
    
    // 背景画像を設定
    setBackgroundForFile(currentFile);
    
    // セクションに分割（h2タグで分割）
    splitIntoSections();
    
    // 次のセクションボタンの状態を確認
    checkForwardButton();
    
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
                // 遷移先で履歴があることを示すフラグを設定
                sessionStorage.setItem('hasHistory', 'true');
                sessionStorage.removeItem('canGoForward');
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
        // route_a_cafe.md は別のBGM
        if (filePath.includes('route_a_cafe')) {
            audioManager.play('lostConnection', { loop: true });
            return;
        }
        if (filePath.includes('route_a')) {
            audioManager.play('misakiBoxTheme', { loop: true });
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

// コンテンツをセクションに分割（履歴ベースのナビゲーション用）
function splitIntoSections() {
    // ページ履歴ベースのナビゲーションに変更
    updateHistoryButtons();
}

// 履歴ボタンの状態を更新
function updateHistoryButtons() {
    const prevBtn = document.getElementById('prev-section');
    const nextBtn = document.getElementById('next-section');
    
    // 前のセクション（戻る）は履歴があれば有効
    // ページ読み込み直後はwindow.history.lengthが更新されていないため、
    // sessionStorageで履歴の有無を管理
    const hasHistory = sessionStorage.getItem('hasHistory') === 'true';
    prevBtn.disabled = !hasHistory;
    
    // 次のセクション（進む）は戻った後のみ有効
    const canGoForward = sessionStorage.getItem('canGoForward') === 'true';
    nextBtn.disabled = !canGoForward;
}

// 前のセクションへ（履歴を戻る）
function goToPrevSection() {
    // 戻る前に次のセクションを有効化するフラグをセット
    sessionStorage.setItem('canGoForward', 'true');
    // hasHistoryは削除しない（戻った先でも履歴は存在する）
    window.history.back();
}

// 次のセクションへ（履歴を進む）
function goToNextSection() {
    // sessionStorageのフラグを確認
    if (sessionStorage.getItem('canGoForward') === 'true') {
        sessionStorage.removeItem('canGoForward');
        sessionStorage.setItem('hasHistory', 'true');
        window.history.forward();
    }
}

// ページ読み込み後に履歴ボタンの状態を確認
function checkForwardButton() {
    // canGoForwardフラグがある場合は、戻ってきたページなので何もしない
    if (sessionStorage.getItem('canGoForward') === 'true') {
        return;
    }
    
    // 新規遷移の場合、履歴を設定
    // index.htmlからの最初のページかどうかをチェック
    const referrer = document.referrer;
    const isFromIndex = referrer.includes('index.html') || referrer === '';
    const isFromSameDomain = referrer.includes(window.location.hostname) || referrer === '';
    
    // 同じドメイン内の遷移で、index.htmlからでない場合は履歴あり
    if (isFromSameDomain && !isFromIndex) {
        sessionStorage.setItem('hasHistory', 'true');
    } else if (!isFromSameDomain && referrer !== '') {
        // 外部からの遷移の場合も履歴なし
        sessionStorage.removeItem('hasHistory');
    }
    // index.htmlからの場合は hasHistory を設定しない（初回ページ）
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

// 音量コントロール
const volumeSlider = document.getElementById('volume');
if (volumeSlider && typeof audioManager !== 'undefined') {
    // 保存されている値を復元
    const savedVolume = localStorage.getItem('bgmVolume');
    if (savedVolume !== null) {
        volumeSlider.value = savedVolume;
        audioManager.volume = savedVolume / 100;
        if (audioManager.bgm) {
            audioManager.bgm.volume = audioManager.volume;
        }
    }
    
    volumeSlider.addEventListener('input', (e) => {
        const value = e.target.value;
        audioManager.volume = value / 100;
        if (audioManager.bgm) {
            audioManager.bgm.volume = audioManager.volume;
        }
        localStorage.setItem('bgmVolume', value);
    });
}

// 背景透過度コントロール
const bgOpacitySlider = document.getElementById('bg-opacity');
if (bgOpacitySlider) {
    // 保存されている値を復元
    const savedOpacity = localStorage.getItem('bgOpacity');
    if (savedOpacity !== null) {
        bgOpacitySlider.value = savedOpacity;
        updateBgOpacity(savedOpacity);
    }
    
    bgOpacitySlider.addEventListener('input', (e) => {
        const value = e.target.value;
        updateBgOpacity(value);
        localStorage.setItem('bgOpacity', value);
    });
}

function updateBgOpacity(value) {
    const bgLayer = document.getElementById('bg-image');
    const contentDiv = document.getElementById('content');
    
    if (bgLayer && contentDiv) {
        if (value >= 100) {
            // 100の場合は文字を完全に消して背景のみ表示
            contentDiv.style.opacity = '0';
            bgLayer.style.opacity = '1';
            const style = document.getElementById('bg-opacity-style') || document.createElement('style');
            style.id = 'bg-opacity-style';
            style.textContent = `.bg-layer::after { background: rgba(10, 14, 20, 0) !important; }`;
            if (!document.getElementById('bg-opacity-style')) {
                document.head.appendChild(style);
            }
        } else {
            // 通常の透過度調整（0-99）
            contentDiv.style.opacity = '1';
            const opacity = value / 100;
            const style = document.getElementById('bg-opacity-style') || document.createElement('style');
            style.id = 'bg-opacity-style';
            style.textContent = `.bg-layer::after { background: rgba(10, 14, 20, ${opacity}) !important; }`;
            if (!document.getElementById('bg-opacity-style')) {
                document.head.appendChild(style);
            }
        }
    }
}

// 背景表示ボタン
const bgViewBtn = document.getElementById('bg-view-btn');
if (bgViewBtn) {
    let isViewingBg = false;
    let previousOpacity = bgOpacitySlider ? bgOpacitySlider.value : 50;
    
    const iconImage = bgViewBtn.querySelector('.icon-image');
    const iconClose = bgViewBtn.querySelector('.icon-close');
    
    bgViewBtn.addEventListener('click', () => {
        const contentDiv = document.getElementById('content');
        const readerControls = document.querySelector('.reader-controls');
        const volumeControl = document.querySelector('.volume-control');
        const bgOpacityControl = document.querySelector('.bg-opacity-control');
        const readerNav = document.querySelector('.reader-nav');
        
        if (!isViewingBg) {
            // 背景表示モード
            previousOpacity = bgOpacitySlider ? bgOpacitySlider.value : 50;
            if (bgOpacitySlider) {
                bgOpacitySlider.value = 100;
                updateBgOpacity(100);
            }
            if (contentDiv) contentDiv.style.display = 'none';
            if (readerControls) readerControls.style.display = 'none';
            if (volumeControl) volumeControl.style.display = 'none';
            if (bgOpacityControl) bgOpacityControl.style.display = 'none';
            if (readerNav) readerNav.style.opacity = '0.3';
            
            // アイコンを切り替え
            if (iconImage) iconImage.style.display = 'none';
            if (iconClose) iconClose.style.display = 'block';
            bgViewBtn.title = '戻る';
            isViewingBg = true;
        } else {
            // 通常モードに戻る
            if (bgOpacitySlider) {
                bgOpacitySlider.value = previousOpacity;
                updateBgOpacity(previousOpacity);
            }
            if (contentDiv) contentDiv.style.display = 'block';
            if (readerControls) readerControls.style.display = 'flex';
            if (volumeControl) volumeControl.style.display = 'flex';
            if (bgOpacityControl) bgOpacityControl.style.display = 'flex';
            if (readerNav) readerNav.style.opacity = '1';
            
            // アイコンを切り替え
            if (iconImage) iconImage.style.display = 'block';
            if (iconClose) iconClose.style.display = 'none';
            bgViewBtn.title = '背景画像のみを表示';
            isViewingBg = false;
        }
    });
}

// スクロール時に進捗を更新
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateScrollProgress, 100);
});

// キーボードショートカット
document.addEventListener('keydown', (e) => {
    const prevBtn = document.getElementById('prev-section');
    const nextBtn = document.getElementById('next-section');
    
    if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
        goToPrevSection();
    } else if (e.key === 'ArrowRight' && !nextBtn.disabled) {
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
