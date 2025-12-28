# 背景画像配置計画（拡張版）

## 📊 推奨画像数: **15枚**

最小限6枚でも動作しますが、15枚あれば各シーンで最適な背景を表示できます。

---

## 🎨 画像カテゴリ別リスト

### A. 基本背景（6枚）- 最優先 ★★★★★

#### A1. rain_window.jpg（雨の窓 - 夜）
**内容:** 夜のオフィスから見た雨の窓、ぼやけた街の灯り  
**使用頻度:** 最多（全体の40%）

#### A2. rain_window_day.jpg（雨の窓 - 昼）
**内容:** 昼間のオフィスから見た雨の窓、灰色の空  
**使用頻度:** 中（日中シーンで使用）

#### A3. glass_meeting_room.jpg（ガラス張りの会議室）
**内容:** 暗い会議室、ガラス壁の反射、緊張感  
**使用頻度:** 高（ルートA全体）

#### A4. archive_room.jpg（古い資料室）
**内容:** 薄暗い資料室、金属棚、段ボール箱  
**使用頻度:** 中（第1章）

#### A5. underwater_room.jpg（水没した部屋）
**内容:** 水中に沈んだ部屋、浮遊する家具  
**使用頻度:** 中（ルートC・デッドエンド）

#### A6. empty_desk.jpg（雨上がりの空席）
**内容:** 朝日の差す誰もいないデスク  
**使用頻度:** 中（トゥルーエンド）

---

### B. オフィスシーン（4枚）- 第2優先 ★★★★☆

#### B1. office_night.jpg（夜のオフィス全景）
**内容:** 夜の暗いオフィスフロア、蛍光灯の光、誰もいないデスクの列  
**Prompt:**
```
A dark corporate office floor at night. Rows of empty desks with computer monitors showing screen savers. Fluorescent lights casting cold blue light. Windows showing city lights outside. Lonely, quiet atmosphere. Cinematic, photorealistic, 8k.
```
**使用箇所:** story_ch1.md（残業シーン）

#### B2. office_corridor.jpg（オフィスの廊下）
**内容:** 長い廊下、蛍光灯、ガラス窓、冷たい雰囲気  
**Prompt:**
```
A long, sterile office corridor with fluorescent lighting. Glass walls on both sides. Polished floor reflecting lights. Empty and cold. Corporate atmosphere. Cinematic, high quality, 8k.
```
**使用箇所:** 移動シーン、緊張感のあるシーン

#### B3. keyboard_closeup.jpg（キーボードのクローズアップ）
**内容:** 暗闇でキーボードに手をかざす女性の手  
**使用箇所:** route_b_end.md（決断の瞬間）

#### B4. office_locker_room.jpg（ロッカールーム）
**内容:** 薄暗いロッカールーム、金属ロッカー、一人きりの空間  
**Prompt:**
```
A dimly lit office locker room. Rows of metal lockers. One locker is slightly open. Overhead fluorescent light flickering. Quiet, isolated feeling. Photorealistic, cinematic, 8k.
```
**使用箇所:** 内省的なシーン、孤独を感じるシーン

---

### C. 街のシーン（3枚）- 第3優先 ★★★☆☆

#### C1. rainy_crossing.jpg（雨の交差点）
**内容:** 雨の夜の交差点、傘、信号の反射  
**Prompt:**
```
A street level view of a rainy city crossing at night. Wet asphalt reflecting traffic lights. A vinyl umbrella in the foreground (first-person perspective). The atmosphere is lonely and cold. Cyberpunk noir vibes but realistic.
```
**使用箇所:** 通勤シーン、帰宅シーン

#### C2. train_platform.jpg（駅のホーム）
**内容:** 雨の夜の駅ホーム、蛍光灯、濡れた床  
**Prompt:**
```
A train station platform at night in the rain. Fluorescent lights reflecting on wet concrete floor. Empty benches. A train approaching in the distance, headlights glowing. Melancholic, lonely atmosphere. Cinematic, 8k.
```
**使用箇所:** 帰宅シーン、決断の後

#### C3. cafe_window.jpg（喫茶店の窓）
**内容:** 外から見た喫茶店、窓ガラスの反射、密会の雰囲気  
**Prompt:**
```
A view through a cafe window from the outside. Inside, a woman (Rina) and a man in a suit are sitting at a table, having a serious conversation. It is daytime but cloudy. Reflection of the street on the window glass. Paparazzi style shot, slightly distant.
```
**使用箇所:** route_a_bad.md（裏切りが発覚するシーン）

---

### D. 抽象・心理描写（2枚）- 第4優先 ★★☆☆☆

#### D1. shattered_glass.jpg（割れたガラス）
**内容:** 暗い床に落ちた割れたガラス、鋭い反射  
**Prompt:**
```
A shattered glass object on a dark floor. Shards of glass reflecting sharp light. Abstract, sharp, dangerous, broken beauty. Macro photography.
```
**使用箇所:** ending_bad.md（バッドエンディング「触れた指のあと」）

#### D2. water_ripples.jpg（水面の波紋）
**内容:** 暗い水面、一滴の波紋が広がる  
**Prompt:**
```
A single water droplet creating ripples on a dark water surface. Concentric circles expanding. Dark, moody lighting. Abstract, contemplative. Macro photography, cinematic, 8k.
```
**使用箇所:** route_c.md（何もしない選択のシーン）

---

## 📋 ファイル別詳細配置表

| ファイル名 | 背景画像の流れ |
|-----------|--------------|
| **index.html** | rain_window.jpg（常時） |
| **story_ch1.md** | rain_window.jpg → office_night.jpg → archive_room.jpg |
| **story_ch2.md** | office_night.jpg → glass_meeting_room.jpg |
| **story_ch3.md** | rain_window.jpg → rainy_crossing.jpg（帰宅） |
| **route_a1.md** | glass_meeting_room.jpg（全体） |
| **route_a2.md** | glass_meeting_room.jpg → office_corridor.jpg |
| **route_a_end.md** | glass_meeting_room.jpg → empty_desk.jpg（エンド） |
| **route_a_bad.md** | office_night.jpg → cafe_window.jpg（密会発覚） |
| **route_b1.md** | rain_window.jpg → office_corridor.jpg |
| **route_b2.md** | office_night.jpg → archive_room.jpg |
| **route_b_end.md** | office_night.jpg → keyboard_closeup.jpg（決断） |
| **route_c.md** | rain_window.jpg → water_ripples.jpg → underwater_room.jpg |
| **ending_true.md** | empty_desk.jpg → rain_window_day.jpg（明るい雨） |
| **ending_bad.md** | shattered_glass.jpg |
| **ending_dead.md** | underwater_room.jpg |
| **ending_normal.md** | rainy_crossing.jpg → train_platform.jpg |

---

## 🎯 段階的実装プラン

### フェーズ1: ミニマル版（6枚）- 1〜2時間
必須の基本背景のみ
- A1, A2, A3, A4, A5, A6

**効果:** ノイズから脱却、基本的な雰囲気作り

---

### フェーズ2: スタンダード版（10枚）- 3〜4時間
基本 + オフィスシーン
- A1〜A6 + B1, B2, B3, B4

**効果:** オフィスの雰囲気が大幅に向上、シーンの切り替えが自然に

---

### フェーズ3: リッチ版（15枚）- 5〜6時間
全画像
- A1〜A6 + B1〜B4 + C1〜C3 + D1〜D2

**効果:** 映画のような完成度、各シーンで最適な背景

---

## 💡 追加提案: さらなる拡張（オプション）

必要に応じて追加できる画像：

### E. 時間帯バリエーション（+3枚）
- E1. rain_window_evening.jpg（夕方の雨窓）
- E2. office_morning.jpg（朝のオフィス）
- E3. office_sunset.jpg（夕暮れのオフィス）

### F. 天候バリエーション（+2枚）
- F1. clear_night_window.jpg（晴れた夜の窓）
- F2. cloudy_day_window.jpg（曇りの昼の窓）

### G. イベントCG（+5枚）
- G1. papers_scattered.jpg（散乱した書類）
- G2. computer_screen_glow.jpg（暗闇のPC画面）
- G3. locked_door.jpg（ロックされたドア）
- G4. security_camera.jpg（監視カメラの視点）
- G5. rain_on_glass_close.jpg（ガラスに落ちる雨粒のマクロ）

**最大25枚まで拡張可能**

---

## 📦 推奨スペック

| 項目 | スペック |
|-----|---------|
| 解像度 | 1920x1080（フルHD）以上 |
| フォーマット | JPG（軽量）または PNG（高品質） |
| ファイルサイズ | 300〜800KB/枚 推奨 |
| 総容量（15枚） | 約5〜10MB |
| 色調 | 統一感のある寒色系（ブルー・ティール・グレー） |
| スタイル | Cinematic, Photorealistic, 8k, Emotional |

---

## 🚀 実装の優先順位

1. **今すぐ必須（6枚）:** A1〜A6
2. **できれば欲しい（+4枚）:** B1〜B4
3. **あると完璧（+5枚）:** C1〜C3 + D1〜D2
4. **究極版（+10枚）:** E, F, G全て

**推奨:** まずは**フェーズ2（10枚）**を目指すのが現実的で、効果も高いです。
