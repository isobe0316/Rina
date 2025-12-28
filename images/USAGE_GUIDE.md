# 背景画像の使い方 - 実装サンプル

## 基本的な使い方

### 1. JavaScriptで背景を変更

ストーリーファイル（.md）の中で `<script>` タグを使って背景画像を切り替えます。

```markdown
<script>
changeBg('images/rain_window.jpg');
</script>

梨奈は窓の外を見つめていた。雨が強くなってきた。
```

### 2. シーンの切り替え例

```markdown
# 第1章: 偶然のふり

<script>
changeBg('images/archive_room.jpg');
</script>

古い資料室の奥で、梨奈は一冊のバインダーを手に取った。

---

## 第2章: ガラス張りの告白

<script>
changeBg('images/glass_meeting_room.jpg');
</script>

会議室のガラス越しに、権田部長の姿が見えた。
```

### 3. エンディングでの使用例

```markdown
# 水位

<script>
changeBg('images/underwater_room.jpg');
</script>

二人は、そのまま沈んでいった。

---

**END**
```

## 推奨する画像配置タイミング

### メインストーリー（story_ch1.md, ch2, ch3）
- 冒頭: `rain_window.jpg`（デフォルト背景）

### ルートA（route_a1.md, a2, a_end）
- 全体: `glass_meeting_room.jpg`（真実を守るシーン）
- エンディング: `empty_desk.jpg`（真実の後の空席）

### ルートB（route_b1.md, b2, b_end）
- 前半: `rain_window.jpg`
- 中盤: `keyboard_closeup.jpg`（一文字加える瞬間）
- エンディング: `shattered_glass.jpg`（壊れる美しさ）

### ルートC（route_c.md）
- 全体: `rainy_crossing.jpg`（孤独感）
- エンディング: `underwater_room.jpg`（共に沈む）

### エンディング
- ending_true.md: `empty_desk.jpg`
- ending_bad.md: `shattered_glass.jpg`
- ending_dead.md: `underwater_room.jpg`
- ending_normal.md: `rainy_crossing.jpg`

## 注意事項

1. **画像は `web/images/` フォルダに配置してください**
2. **ファイル名は IMAGE_PROMPTS.md に記載されているものを使用してください**
3. **最初に作るべき画像（優先順位）:**
   - rain_window.jpg（最重要）
   - glass_meeting_room.jpg
   - underwater_room.jpg

## 背景をデフォルトに戻す

```markdown
<script>
resetBg();
</script>
```
