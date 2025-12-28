# 背景画像配置計画

## 📊 必要な画像数: **6枚**

最小限で最大の効果を得るため、厳選した6枚の画像を使用します。

---

## 🎨 画像一覧と配置シーン

### 1. rain_window.jpg（雨の窓）★最重要
**内容:** 夜のオフィスから見た雨の窓、ぼやけた街の灯り  
**Prompt:**
```
A view from inside a dark modern office at night, looking out through a large glass window. Heavy rain is streaking down the glass. Outside, blurred city lights (bokeh) in cold blue and teal tones. Reflection of an empty office interior on the glass. Melancholic, cinematic, high quality, 8k.
```

**使用箇所:**
- index.html（タイトル画面）
- story_ch1.md（第1章 冒頭）
- story_ch2.md（第2章 冒頭）
- story_ch3.md（第3章 冒頭）
- route_b1.md（ルートB 前半）
- route_b2.md（ルートB 中盤）

**使用頻度:** ★★★★★（最多）

---

### 2. glass_meeting_room.jpg（ガラス張りの会議室）
**内容:** 暗い会議室、ガラス壁の反射、緊張感のある空間  
**Prompt:**
```
A dimly lit meeting room with glass walls in a corporate office. A sleek table, empty chairs. Reflections on the glass walls. The atmosphere is tense, sterile, and cold. Shadows are long. Suspenseful mood.
```

**使用箇所:**
- story_ch2.md（第2章: ガラス張りの告白）
- route_a1.md（ルートA 前編）
- route_a2.md（ルートA 中編）
- route_a_end.md（ルートA 終章 前半）

**使用頻度:** ★★★★☆

---

### 3. archive_room.jpg（古い資料室）
**内容:** 薄暗い資料室、金属棚、段ボール箱、埃が舞う  
**Prompt:**
```
An aisle in an old, dusty archive room. Rows of metal shelves filled with cardboard boxes and binders. Dim fluorescent lighting flickering overhead. Dust motes dancing in the light. Claustrophobic and quiet.
```

**使用箇所:**
- story_ch1.md（第1章: 偶然のふり - 梨奈が資料を見つけるシーン）
- route_a1.md（資料を調べる場面）

**使用頻度:** ★★☆☆☆

---

### 4. keyboard_closeup.jpg（キーボードのクローズアップ）
**内容:** 暗闇でキーボードに手をかざす女性の手  
**Prompt:**
```
Extreme close-up of a female hand hovering over a computer keyboard in a dark room. The index finger is about to press the "Enter" key. The computer screen glow illuminates the finger. Tension, dramatic lighting, detailed skin texture.
```

**使用箇所:**
- route_b_end.md（ルートB エンディング - 一文字加える決断の瞬間）

**使用頻度:** ★☆☆☆☆

---

### 5. underwater_room.jpg（水没した部屋）
**内容:** 水中に沈んだ部屋、浮遊する家具、悲劇的な美しさ  
**Prompt:**
```
A surreal image of an apartment room submerged underwater. Furniture floating slightly. Blue, murky water fills the room. Light filtering down from the surface far above. Suffocating, quiet, tragic, beautiful art.
```

**使用箇所:**
- route_c.md（ルートC エンディング）
- ending_dead.md（デッドエンディング「水位」）

**使用頻度:** ★★☆☆☆

---

### 6. empty_desk.jpg（雨上がりの空席）
**内容:** 朝日の差す誰もいないデスク、段ボール箱  
**Prompt:**
```
A clean office desk in the morning light. The chair is empty. A single cardboard box with personal items sits on the desk. Sunlight streaming through the window, dust particles in the air. Bittersweet, hopeful, ending scene.
```

**使用箇所:**
- route_a_end.md（ルートA エンディング - 真実を守った後）
- ending_true.md（トゥルーエンディング「箱が生まれない場所」）

**使用頻度:** ★★☆☆☆

---

## 📋 ファイル別背景画像配置表

| ファイル名 | 使用画像 | 配置タイミング |
|-----------|---------|-------------|
| **index.html** | rain_window.jpg | 常時表示（タイトル背景） |
| **story_ch1.md** | rain_window.jpg → archive_room.jpg | 冒頭→資料室シーン |
| **story_ch2.md** | rain_window.jpg → glass_meeting_room.jpg | 冒頭→会議室シーン |
| **story_ch3.md** | rain_window.jpg | 全体 |
| **route_a1.md** | glass_meeting_room.jpg | 全体 |
| **route_a2.md** | glass_meeting_room.jpg | 全体 |
| **route_a_end.md** | glass_meeting_room.jpg → empty_desk.jpg | 前半→エンディング |
| **route_b1.md** | rain_window.jpg | 全体 |
| **route_b2.md** | rain_window.jpg | 全体 |
| **route_b_end.md** | rain_window.jpg → keyboard_closeup.jpg | 前半→決断の瞬間 |
| **route_c.md** | rain_window.jpg → underwater_room.jpg | 前半→エンディング |
| **ending_true.md** | empty_desk.jpg | 全体 |
| **ending_bad.md** | rain_window.jpg | 全体（暗い雨の印象） |
| **ending_dead.md** | underwater_room.jpg | 全体 |
| **ending_normal.md** | rain_window.jpg | 全体 |

---

## 🎯 優先順位

### 第1優先（必須）
1. **rain_window.jpg** - 全体の80%で使用
2. **glass_meeting_room.jpg** - ルートAの印象を決定

### 第2優先（推奨）
3. **empty_desk.jpg** - トゥルーエンドの印象
4. **underwater_room.jpg** - デッドエンドの印象

### 第3優先（あると良い）
5. **archive_room.jpg** - 第1章の演出強化
6. **keyboard_closeup.jpg** - ルートBのクライマックス

---

## 💡 実装順序

### ステップ1: 最低限の実装（画像1枚）
- `rain_window.jpg` のみ生成
- 全ファイルで `rain_window.jpg` を使用
- これだけでも「ノイズ」より遥かに良い

### ステップ2: ルート別の差別化（画像3枚）
- `rain_window.jpg`（共通）
- `glass_meeting_room.jpg`（ルートA用）
- `underwater_room.jpg`（ルートC、デッドエンド用）

### ステップ3: 完全版（画像6枚）
- 上記3枚 + 残り3枚

---

## 📦 画像仕様

- **解像度:** 1920x1080以上（フルHD推奨）
- **フォーマット:** JPG（軽量化のため）
- **配置場所:** `web/images/`
- **ファイルサイズ:** 各500KB以下推奨（読み込み速度のため）

---

## 実装例

```markdown
<!-- story_ch1.md の冒頭 -->
# 第1章: 偶然のふり

<script>
changeBg('images/rain_window.jpg');
</script>

梨奈は夜のオフィスで一人、書類の整理をしていた。

---

<!-- 資料室シーンで背景を切り替え -->
<script>
changeBg('images/archive_room.jpg');
</script>

資料室の奥で、彼女は古いバインダーを手に取った。
```
