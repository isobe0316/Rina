// index.html用のJavaScript

function startStory() {
    // OPテーマをフェードアウトしてからストーリーへ
    if (typeof audioManager !== 'undefined') {
        audioManager.stop(true);
        // 停止完了を待ってから遷移
        setTimeout(() => {
            window.location.href = 'reader.html?file=story_ch1.md';
        }, 300);
    } else {
        window.location.href = 'reader.html?file=story_ch1.md';
    }
}

function showIndex() {
    document.getElementById('index-view').classList.remove('hidden');
}

function hideIndex() {
    document.getElementById('index-view').classList.add('hidden');
}

function showAbout() {
    document.getElementById('about-view').classList.remove('hidden');
}

function hideAbout() {
    document.getElementById('about-view').classList.add('hidden');
}

// ESCキーで閉じる
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideIndex();
        hideAbout();
    }
});

// スタート画面からタイトル画面へ遷移
function showTitleScreen() {
    const startScreen = document.getElementById('start-screen');
    const titleScreen = document.getElementById('title-screen');
    
    startScreen.classList.add('fade-out');
    
    setTimeout(() => {
        startScreen.style.display = 'none';
        titleScreen.classList.remove('hidden');
        
        // OPテーマを再生
        if (typeof audioManager !== 'undefined') {
            audioManager.play('op', { loop: true, fadeIn: true });
        }
    }, 500);
}

// reader.htmlからindex.htmlへ戻る際のBGM停止処理
window.addEventListener('beforeunload', () => {
    if (typeof audioManager !== 'undefined') {
        audioManager.stop(false); // 即座に停止
    }
});

// ページ読み込み時の処理
window.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const titleScreen = document.getElementById('title-screen');
    
    // URLに#titleがある場合は直接タイトル画面へ
    if (window.location.hash === '#title') {
        startScreen.style.display = 'none';
        titleScreen.classList.remove('hidden');
        
        // OPテーマを再生
        if (typeof audioManager !== 'undefined') {
            setTimeout(() => {
                audioManager.play('op', { loop: true, fadeIn: true });
            }, 300);
        }
        return;
    }
    
    // スタート画面をクリックでタイトル画面へ
    if (startScreen) {
        startScreen.addEventListener('click', showTitleScreen);
    }
});
