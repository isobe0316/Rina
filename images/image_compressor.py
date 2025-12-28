#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
画像圧縮ツール（GUI版）
PNG/JPG画像をリサイズ＆圧縮してJPGに変換します
"""

import os
import tkinter as tk
from tkinter import filedialog, messagebox, ttk
from PIL import Image
from pathlib import Path

class ImageCompressorGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("画像圧縮ツール - 硝子の箱")
        self.root.geometry("650x450")
        self.root.resizable(False, False)
        
        # デフォルト設定
        self.input_folder = tk.StringVar()
        self.output_folder = tk.StringVar()
        self.max_width = tk.IntVar(value=1920)
        self.quality = tk.IntVar(value=85)
        
        self.create_widgets()
    
    def create_widgets(self):
        # スタイル設定
        style = ttk.Style()
        style.configure('Title.TLabel', font=('Arial', 14, 'bold'))
        style.configure('Header.TLabel', font=('Arial', 10, 'bold'))
        
        # タイトル
        title_label = ttk.Label(
            self.root, 
            text="背景画像圧縮ツール", 
            style='Title.TLabel'
        )
        title_label.pack(pady=15)
        
        # === 入力フォルダ選択 ===
        input_frame = ttk.LabelFrame(self.root, text="1. 元画像フォルダを選択", padding=10)
        input_frame.pack(padx=20, pady=10, fill='x')
        
        ttk.Entry(input_frame, textvariable=self.input_folder, width=60).pack(side='left', padx=5)
        ttk.Button(input_frame, text="参照...", command=self.select_input_folder).pack(side='left')
        
        # === 出力フォルダ選択 ===
        output_frame = ttk.LabelFrame(self.root, text="2. 保存先フォルダを選択", padding=10)
        output_frame.pack(padx=20, pady=10, fill='x')
        
        ttk.Entry(output_frame, textvariable=self.output_folder, width=60).pack(side='left', padx=5)
        ttk.Button(output_frame, text="参照...", command=self.select_output_folder).pack(side='left')
        
        # === 設定 ===
        settings_frame = ttk.LabelFrame(self.root, text="3. 設定", padding=10)
        settings_frame.pack(padx=20, pady=10, fill='x')
        
        # 横幅設定
        width_frame = ttk.Frame(settings_frame)
        width_frame.pack(fill='x', pady=5)
        ttk.Label(width_frame, text="最大横幅:").pack(side='left', padx=5)
        width_spinbox = ttk.Spinbox(
            width_frame, 
            from_=800, 
            to=3840, 
            increment=100,
            textvariable=self.max_width, 
            width=10
        )
        width_spinbox.pack(side='left', padx=5)
        ttk.Label(width_frame, text="px（推奨: 1920）").pack(side='left', padx=5)
        
        # 画質設定
        quality_frame = ttk.Frame(settings_frame)
        quality_frame.pack(fill='x', pady=5)
        ttk.Label(quality_frame, text="画質:").pack(side='left', padx=5)
        quality_spinbox = ttk.Spinbox(
            quality_frame, 
            from_=50, 
            to=100, 
            increment=5,
            textvariable=self.quality, 
            width=10
        )
        quality_spinbox.pack(side='left', padx=5)
        ttk.Label(quality_frame, text="（推奨: 80-90）").pack(side='left', padx=5)
        
        # === 実行ボタン ===
        button_frame = ttk.Frame(self.root)
        button_frame.pack(pady=20)
        
        self.compress_button = ttk.Button(
            button_frame, 
            text="圧縮開始", 
            command=self.start_compression,
            width=20
        )
        self.compress_button.pack(side='left', padx=5)
        
        ttk.Button(
            button_frame, 
            text="終了", 
            command=self.root.quit,
            width=20
        ).pack(side='left', padx=5)
        
        # === ログ表示 ===
        log_frame = ttk.LabelFrame(self.root, text="処理ログ", padding=10)
        log_frame.pack(padx=20, pady=10, fill='both', expand=True)
        
        self.log_text = tk.Text(log_frame, height=8, width=70, state='disabled')
        self.log_text.pack(side='left', fill='both', expand=True)
        
        scrollbar = ttk.Scrollbar(log_frame, command=self.log_text.yview)
        scrollbar.pack(side='right', fill='y')
        self.log_text.config(yscrollcommand=scrollbar.set)
    
    def select_input_folder(self):
        folder = filedialog.askdirectory(title="元画像フォルダを選択")
        if folder:
            self.input_folder.set(folder)
            self.log(f"入力フォルダ: {folder}")
            
            # 出力フォルダが未設定なら自動設定
            if not self.output_folder.get():
                default_output = os.path.join(folder, "compressed")
                self.output_folder.set(default_output)
                self.log(f"出力フォルダ: {default_output}")
    
    def select_output_folder(self):
        folder = filedialog.askdirectory(title="保存先フォルダを選択")
        if folder:
            self.output_folder.set(folder)
            self.log(f"出力フォルダ: {folder}")
    
    def log(self, message):
        self.log_text.config(state='normal')
        self.log_text.insert('end', message + '\n')
        self.log_text.see('end')
        self.log_text.config(state='disabled')
        self.root.update()
    
    def start_compression(self):
        input_path = self.input_folder.get()
        output_path = self.output_folder.get()
        
        # 入力チェック
        if not input_path or not os.path.exists(input_path):
            messagebox.showerror("エラー", "元画像フォルダを選択してください")
            return
        
        if not output_path:
            messagebox.showerror("エラー", "保存先フォルダを選択してください")
            return
        
        # 出力フォルダ作成
        if not os.path.exists(output_path):
            os.makedirs(output_path)
            self.log(f"フォルダを作成しました: {output_path}")
        
        # ボタン無効化
        self.compress_button.config(state='disabled')
        
        try:
            self.compress_images(input_path, output_path)
        except Exception as e:
            messagebox.showerror("エラー", f"処理中にエラーが発生しました:\n{str(e)}")
            self.log(f"エラー: {str(e)}")
        finally:
            # ボタン有効化
            self.compress_button.config(state='normal')
    
    def compress_images(self, input_folder, output_folder):
        max_width = self.max_width.get()
        quality = self.quality.get()
        
        # 画像ファイル取得
        files = [
            f for f in os.listdir(input_folder) 
            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.bmp'))
        ]
        
        if not files:
            messagebox.showwarning("警告", "画像ファイルが見つかりませんでした")
            return
        
        total_original_size = 0
        total_new_size = 0
        
        self.log("-" * 50)
        self.log(f"処理開始 - 対象ファイル: {len(files)}枚")
        self.log(f"設定 - 横幅: {max_width}px, 画質: {quality}")
        self.log("-" * 50)
        
        for i, file_name in enumerate(files, 1):
            file_path = os.path.join(input_folder, file_name)
            original_size = os.path.getsize(file_path)
            total_original_size += original_size
            
            try:
                with Image.open(file_path) as img:
                    # RGBA画像をRGBに変換（JPG変換用）
                    if img.mode in ('RGBA', 'LA', 'P'):
                        background = Image.new('RGB', img.size, (255, 255, 255))
                        if img.mode == 'P':
                            img = img.convert('RGBA')
                        background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
                        img = background
                    elif img.mode != 'RGB':
                        img = img.convert('RGB')
                    
                    # リサイズ（アスペクト比維持）
                    if img.width > max_width:
                        ratio = max_width / float(img.width)
                        new_height = int(float(img.height) * ratio)
                        img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                    
                    # 保存（拡張子を .jpg に統一）
                    file_name_no_ext = os.path.splitext(file_name)[0]
                    new_file_name = file_name_no_ext + '.jpg'
                    output_path = os.path.join(output_folder, new_file_name)
                    
                    img.save(output_path, 'JPEG', quality=quality, optimize=True)
                    
                    new_size = os.path.getsize(output_path)
                    total_new_size += new_size
                    
                    reduction = 100 - (new_size / original_size * 100)
                    self.log(
                        f"[{i}/{len(files)}] {file_name} -> {new_file_name} "
                        f"({original_size/1024:.1f}KB -> {new_size/1024:.1f}KB, {reduction:.1f}%削減)"
                    )
                    
            except Exception as e:
                self.log(f"エラー（スキップ）: {file_name} - {str(e)}")
        
        # 結果表示
        self.log("-" * 50)
        self.log("処理完了！")
        self.log(f"元サイズ合計: {total_original_size / (1024*1024):.2f} MB")
        self.log(f"新サイズ合計: {total_new_size / (1024*1024):.2f} MB")
        total_reduction = 100 - (total_new_size / total_original_size * 100)
        self.log(f"削減率: {total_reduction:.1f}% 削減")
        self.log(f"保存先: {output_folder}")
        self.log("-" * 50)
        
        messagebox.showinfo(
            "完了", 
            f"処理が完了しました！\n\n"
            f"処理枚数: {len(files)}枚\n"
            f"削減率: {total_reduction:.1f}%\n"
            f"保存先: {output_folder}"
        )

def main():
    root = tk.Tk()
    app = ImageCompressorGUI(root)
    root.mainloop()

if __name__ == "__main__":
    try:
        main()
    except ImportError as e:
        print("エラー: 必要なライブラリがインストールされていません。")
        print("以下のコマンドを実行してください:")
        print("  pip install Pillow")
        input("\nEnterキーを押して終了...")
