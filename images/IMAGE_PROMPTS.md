# 背景・シチュエーション画像作成用プロンプト集

画像生成AI（Midjourney, Stable Diffusion, DALL-E等）に入力してください。  
スタイルは **「Cinematic, Photorealistic, 8k, Emotional」** で統一すると、映画のような質感になります。

---

## 1. 雨と窓（『硝子の箱』の象徴）

最も汎用性が高く、タイトル画面やテキストパートの背景としてずっと使える画像です。

### 夜のオフィスの窓（雨）
**ファイル名:** `rain_window.jpg`

**Prompt:**
```
A view from inside a dark modern office at night, looking out through a large glass window. Heavy rain is streaking down the glass. Outside, blurred city lights (bokeh) in cold blue and teal tones. Reflection of an empty office interior on the glass. Melancholic, cinematic, high quality, 8k.
```

**用途:** メインストーリー全般、日常パート。

---

### 雨の日の信号待ち（梨奈の視点）
**ファイル名:** `rainy_crossing.jpg`

**Prompt:**
```
A street level view of a rainy city crossing at night. Wet asphalt reflecting traffic lights. A vinyl umbrella in the foreground (first-person perspective). The atmosphere is lonely and cold. Cyberpunk noir vibes but realistic.
```

**用途:** 通勤時、帰宅時、孤独を感じるシーン。

---

### ガラス張りの会議室（密談）
**ファイル名:** `glass_meeting_room.jpg`

**Prompt:**
```
A dimly lit meeting room with glass walls in a corporate office. A sleek table, empty chairs. Reflections on the glass walls. The atmosphere is tense, sterile, and cold. Shadows are long. Suspenseful mood.
```

**用途:** 「第2章: ガラス張りの告白」や、権田部長・佐伯との会話シーン。

---

## 2. 重要なアクション（イベントCG）

物語の分岐点となる「手元のアップ」など、ドキッとする瞬間です。

### 修正される「一文字」（ルートB）
**ファイル名:** `keyboard_closeup.jpg`

**Prompt:**
```
Extreme close-up of a female hand hovering over a computer keyboard in a dark room. The index finger is about to press the "Enter" key. The computer screen glow illuminates the finger. Tension, dramatic lighting, detailed skin texture.
```

**用途:** 梨奈が不正に「一文字」加える瞬間。

---

### 古い資料の山（資料室）
**ファイル名:** `archive_room.jpg`

**Prompt:**
```
An aisle in an old, dusty archive room. Rows of metal shelves filled with cardboard boxes and binders. Dim fluorescent lighting flickering overhead. Dust motes dancing in the light. Claustrophobic and quiet.
```

**用途:** 「第1章: 偶然のふり」で梨奈が過去の帳簿を見つけるシーン。

---

### 喫茶店の窓際（密会）
**ファイル名:** `cafe_window.jpg`

**Prompt:**
```
A view through a cafe window from the outside. Inside, a woman (Rina) and a man in a suit are sitting at a table, having a serious conversation. It is daytime but cloudy. Reflection of the street on the window glass. Paparazzi style shot, slightly distant.
```

**用途:** 亜久斗が梨奈の「裏切り（相談）」を目撃してしまうシーン。

---

## 3. 心理描写・抽象イメージ（エンディング用）

キャラクターの顔ではなく、風景で心情を語るための画像です。

### 沈んでいく部屋（Bad/Dead End）
**ファイル名:** `underwater_room.jpg`

**Prompt:**
```
A surreal image of an apartment room submerged underwater. Furniture floating slightly. Blue, murky water fills the room. Light filtering down from the surface far above. Suffocating, quiet, tragic, beautiful art.
```

**用途:** 「水位」の話、共に沈むエンディング。

---

### 雨上がりの空席（True End）
**ファイル名:** `empty_desk.jpg`

**Prompt:**
```
A clean office desk in the morning light. The chair is empty. A single cardboard box with personal items sits on the desk. Sunlight streaming through the window, dust particles in the air. Bittersweet, hopeful, ending scene.
```

**用途:** 亜久斗や梨奈が去った後のデスク。

---

### 壊れたガラス（Bad End）
**ファイル名:** `shattered_glass.jpg`

**Prompt:**
```
A shattered glass object on a dark floor. Shards of glass reflecting sharp light. Abstract, sharp, dangerous, broken beauty. Macro photography.
```

**用途:** 「きれいに壊れる」エンディング。

---

## 実装方法

### JavaScript で画像を切り替える

```javascript
// シーンに合わせて背景画像を切り替える
function changeBg(imagePath) {
    document.getElementById('bg-image').style.backgroundImage = `url('${imagePath}')`;
}

// 使用例
changeBg('images/rain_window.jpg');        // 雨の窓
changeBg('images/glass_meeting_room.jpg'); // 会議室
changeBg('images/underwater_room.jpg');    // 水没した部屋
```

### ストーリーファイル（Markdown）で背景を切り替える

```markdown
<script>
// 雨の窓の背景に切り替え
document.getElementById('bg-image').style.backgroundImage = "url('images/rain_window.jpg')";
</script>

梨奈は窓の外を見つめていた。雨が強くなってきた。
```

---

## 推奨する画像の優先順位

まず最初に作るべき画像：

1. **rain_window.jpg** - タイトル画面とメインストーリーで最も使用頻度が高い
2. **glass_meeting_room.jpg** - 重要なシーンで使用
3. **underwater_room.jpg** - エンディングの印象を決定づける

これらを作成するだけで、ゲーム全体の雰囲気が劇的に向上します。
