# 新7キャラのカード表示素材

GitHub公開版は現在参照するC66–C72のカード絵v2を収録する。下記の初期素材・v1の保存先と絶対パスはローカルの制作履歴であり、旧画像は元の作業フォルダで保持している。公開用mainの統合確認は [実装・検証記録](new-card-implementation-validation.md) を参照。

## C66–C67の新規カード絵

2026年10月10日、ユーザー添付のアリア／ノクス設定画を外見・衣装の参照、3枚目の二人の画像をポーズ・手持ちの共鳴器・光の演出の参照として、各1枚の専用カード絵を制作した。今回の添付を、下記の初期暫定素材に関する通常形態の方針より優先した。

- C66 アリア・ルーチェ：[assets/characters/C66-card-v2.png](/Users/guarhiro/Projects/apps/crossover-duel/assets/characters/C66-card-v2.png) — 右手に共鳴器を掲げ、左手を開く。独立した光翼6枚。衣装は設定画のショートパンツとブーツ。
- C67 ノクス：[assets/characters/C67-card-v2.png](/Users/guarhiro/Projects/apps/crossover-duel/assets/characters/C67-card-v2.png) — 左手に共鳴器を持ち、右手を差し出す。紫の圧縮面4枚。

各1024×1536の縦長PNG。上部の名前用領域を背景のみとし、文字・枠・能力値は焼き込んでいない。初稿v1から人物・武器・エフェクトを少し小さく下げたv2を現行表示に採用。C66.png／C67.pngと初稿v1も保持した。

組み込み画像生成を使用。[参照と生成・調整プロンプト](resonance-duo-card-art-prompts.json)、[制作・検品記録](resonance-duo-card-art-v2.md)。画像参照とC66/C67のトリミングを変更し、カード名・能力・数値は維持した。

## C68–C70の新規カード絵

2026年10月9日、ユーザー指定のNo41A画像を画風の参照とし、３人の専用カード絵を制作した。現在の表示先は以下。元の設定シートPNGと下記のコピー記録は保持している。

2026年10月10日、名前欄用の上部余白を求めるユーザー指摘を反映し、上部約22%を背景だけにしたv2へ更新した。表情・衣装・ポーズは維持。v1も別ファイルで保持している。

- C68 ステラリア：[assets/characters/C68-card-v2.png](/Users/guarhiro/Projects/apps/crossover-duel/assets/characters/C68-card-v2.png) — 自信ありげな宣言ポーズ。
- C69 セラフィナ：[assets/characters/C69-card-v2.png](/Users/guarhiro/Projects/apps/crossover-duel/assets/characters/C69-card-v2.png) — 要人と外交卓で折衝。
- C70 ガルディオ：[assets/characters/C70-card-v2.png](/Users/guarhiro/Projects/apps/crossover-duel/assets/characters/C70-card-v2.png) — 近衛として鋭い視線で警護。

組み込み画像生成を使用。文字と枠は画像に焼き込まず、ゲーム側で重ねる。[v1の参照と生成プロンプト](eternia-card-art-v1-prompts.md)、[v2の上部余白編集プロンプト](eternia-card-art-v2-prompts.md)。表示参照とCSSのトリミングをこの３人だけ変更した。

## C71–C72の新規カード絵

2026年10月10日、ユーザー提供のカノンのタイトル絵とネイラスの制服ポーズ集から、専用カード絵を制作した。上部の名前欄用に余白を追加したv2をゲームへ組み込んだ。両方とも1024×1536のPNGで、文字・カード枠は画像に焼き込んでいない。

- C71 ネイラス：[assets/characters/C71-card-v2.png](/Users/guarhiro/Projects/apps/crossover-duel/assets/characters/C71-card-v2.png) — 金茶の学院制服で光の蝶を舞わせる。
- C72 カノン：[assets/characters/C72-card-v2.png](/Users/guarhiro/Projects/apps/crossover-duel/assets/characters/C72-card-v2.png) — 制服姿と神楽鈴を掲げる巫女姿を重ねる。

`new-cards.js` と `new-card-ui.js` の画像参照を更新し、C71/C72の旧素材用ズームを解除。縦カードとスマホの名前欄付きカードは上端中央に揃え、横長の戦場・デッキ・交換枠はそれぞれの顔の高さに合わせた。カノンの短い横長枠は前景の制服姿の顔を優先し、縦カードでは両方の姿を見せる。初期素材とv1も別ファイルで保存している。

[v1の生成プロンプト](kanon-neiras-card-art-v1.json)、[v2の余白調整プロンプト](kanon-neiras-card-art-v2.json)、[ブラウザ確認記録](validation/kanon-neiras-card-art-v2/browser-art-review.json)。

1440pxと390pxの一時Chromeで、新画像の読み込み、手札・場・所持カード・デッキ行・交換所・ギャラリー・対象選択を確認した。スマホの名前・役割欄は背景の余白に収まり、場と横長行では顔が見える。確認中に見つかったスマホのギャラリー画像領域の縮小は、モバイルの行を内容の高さに合わせ、画像の自然な高さと画面スクロールを保つCSSで修正した。ゲームの40件の既存チェックとJavaScript構文確認も成功。ユーザーのブラウザや保存データは使用していない。

## 初期の暫定素材コピー記録

2026年10月9日。既存のユーザー制作画像を原寸・無加工でコピーした。ピクセルの切り取り、再描画、文字焼き込み、背景除去は行っていない。画面上のトリミングとカード情報はCSS/HTMLで重ねる。

初期の表示はゲーム操作と性能を確認するための暫定版だった。このコピー記録自体は完成カード絵の制作・視覚承認を意味しない。コピー前後のSHA256一致と画像寸法を確認済み。C68–C70の専用カード絵については冒頭の新規制作記録を参照。

## 元画像とコピー先

### C66

- 元画像：[11_TR-01_アリア通常変身完了.png](</Users/guarhiro/Documents/ChatGPT/魔法少女変身シーン作成/outputs/kyarapu-imagegen/resonance_duo_anime_oneshot_redraw_01-70_2026-08-29/final_1536x864/11_TR-01_アリア通常変身完了.png>)
- コピー先：[assets/characters/C66.png](/Users/guarhiro/Projects/apps/crossover-duel/assets/characters/C66.png)
- サイズ：1536×864
- SHA256：`a6afad128ecdb424e2ed6d6022078b437353c9edc8fa80e0397ef1fc87c0e243`
- 確認・表示方針：通常変身完了。実画像で光翼2枚を確認。

### C67

- 元画像：[12_TR-02_ノクス通常変身完了.png](</Users/guarhiro/Documents/ChatGPT/魔法少女変身シーン作成/outputs/kyarapu-imagegen/resonance_duo_anime_oneshot_redraw_01-70_2026-08-29/final_1536x864/12_TR-02_ノクス通常変身完了.png>)
- コピー先：[assets/characters/C67.png](/Users/guarhiro/Projects/apps/crossover-duel/assets/characters/C67.png)
- サイズ：1536×864
- SHA256：`a8adfd71555754d805a74469b7b7e31a230fd69d02e66ec3ece95fbb8fee6ee3`
- 確認・表示方針：通常変身完了。実画像で圧縮面1枚と導線2本を確認。

### C68

- 元画像：[ステラリア設定シート１.png](</Volumes/share/創作/エテルニア・ステラリア.md/ステラリア設定シート１.png>)
- コピー先：[assets/characters/C68.png](/Users/guarhiro/Projects/apps/crossover-duel/assets/characters/C68.png)
- サイズ：1149×1369
- SHA256：`ea1e01a5d7901905ee4968168ced5f334e50b4d66fc0b8931f3609eda221428d`
- 確認・表示方針：設定シート1の左側の主姿をCSSで寄せる。

### C69

- 元画像：[セラフィナ_設定.png](</Volumes/share/創作/エテルニア・ステラリア.md/セラフィナ_設定.png>)
- コピー先：[assets/characters/C69.png](/Users/guarhiro/Projects/apps/crossover-duel/assets/characters/C69.png)
- サイズ：1122×1402
- SHA256：`d1116b0965e140df9b61d3ce072f0d040e00dee618dc11166ffb052da6844d60`
- 確認・表示方針：ユーザー添付設定画の中央の主姿をCSSで寄せる。

### C70

- 元画像：[ガルディオ_設定.png](</Volumes/share/創作/エテルニア・ステラリア.md/ガルディオ_設定.png>)
- コピー先：[assets/characters/C70.png](/Users/guarhiro/Projects/apps/crossover-duel/assets/characters/C70.png)
- サイズ：1024×1536
- SHA256：`c50d8cd8ac82aa5b906a4473f06c7945266fe7d337db476125a5226aef556f7e`
- 確認・表示方針：ユーザー添付設定画の中央の主姿をCSSで寄せる。

### C71

- 元画像：[35_光の蝶を乱舞させる幻影ショー.png](</Volumes/share/創作/レガリア美術設定/ネイラス&カノン/ネイラス美術設計/生成画像_26-50_統合版_2026-07-23/35_光の蝶を乱舞させる幻影ショー.png>)
- コピー先：[assets/characters/C71.png](/Users/guarhiro/Projects/apps/crossover-duel/assets/characters/C71.png)
- サイズ：1672×941
- SHA256：`cd00d1581dea6618cedbaf7e4be5e7e9016f8d4c02a78506f3d028685e7974a0`
- 確認・表示方針：白金の舞台衣装と光の蝶。実画像を目視済み。

### C72

- 元画像：[カノン_立ち絵.png](</Volumes/share/創作/レガリア美術設定/ネイラス&カノン/カノン_立ち絵.png>)
- コピー先：[assets/characters/C72.png](/Users/guarhiro/Projects/apps/crossover-duel/assets/characters/C72.png)
- サイズ：1024×1536
- SHA256：`ae5769df6c42a0dcd4e64b790a3f6f2ebfc544dab26003594effd63e8045eb2a`
- 確認・表示方針：単独の学院制服・下げ髪の立ち絵。実画像を目視済み。

## 完成カードデザインで決める点

- 初期暫定表示ではC66/C67に通常変身完了画像（アリア2翼、ノクス1面＋2導線）を採用していた。2026年10月10日の専用カード絵は、新たなユーザー添付を優先して光翼6枚・圧縮面4枚とした。冒頭のC66–C67記録を参照。
- ノクスの表示名は、依頼文の「リゾルブ」と資料の「リゾルヴ」を、文字入り完成カード制作前に統一する。暫定UIはゲーム定義の表示名を使う。
- C68–C70の初期暫定表示は設定シートを使用していた。現在は冒頭に記載した３人の専用カード絵を表示する。設定シートの周辺プロフィール・表情・持ち物の図はカード本文へ転用しない。
- ステラリアのプロフィールの相違（年齢・身長・誕生日・一人称）は、カード絵の新規プロフィールとして採用しない。
- C71の初期暫定表示は白金の舞台衣装だった。現行カード絵はユーザー提供の金茶の学院制服ポーズ集を衣装の基準とする。
- C72の初期暫定表示は学院制服の立ち絵だった。現行カード絵はユーザー提供のタイトル絵に合わせて、制服姿と白緋金の神楽装束・結い髪・神楽鈴を重ねる。6人並ぶ神楽ポーズ集は使用していない。
- 全7人の画風、カード固有構図、作品名、技能名、効果文、レアリティ・属性・役割・数値の文字配置を完成カードで統一する。今回の名前・技能・数値はゲームのHTML表示であり画像へ焼き込んでいない。
