# エテルニア３人のカード絵 v2：上部の名前欄余白

2026年10月10日。ユーザーの「ゲームに実装するには名前が入る上部を開ける必要がある」という指摘を反映。組み込み画像生成でv1を編集し、表情・衣装・ポーズを保って上部22%を背景だけの名前欄用余白にする。

実装上の根拠：モバイルのカード名はCSS指定上は上端4.4%から12.6%、役割は13.2%から17.7%を占める。実表示では390px幅で長い名前の下端が約15.1%、役割の下端が約18.7%まで広がることを計測した。上部22%（1024×1536のy=0〜338px）に人物の顔・髪・王冠・手・要人を入れない。背景は宮廷の環境だけとし、文字や枠は画像に焼き込まない。

v1は保持。保存先は `assets/characters/{C68,C69,C70}-card-v2.png`。新画像を目視して、表示参照と横長枠の切り取りを更新した。

## 共通プロンプト

Use case: identity-preserve. Edit the supplied finished portrait card illustration. Output remains portrait 2:3, 1024x1536, full-bleed opaque PNG. The ONLY change requested is composition/framing to create a clean empty TOP name safe zone for the existing game's HTML title overlay. Preserve the exact character identity, face design, expression, hairstyle, costume, hands, pose, props, action, setting, palette, clean anime linework, and refined soft cel-shaded rendering of the supplied image.

MANDATORY LAYOUT: the TOP 22 percent of the entire canvas (y=0 through y=338 at 1536px height) must contain ONLY calm unobtrusive dark navy palace background. There must be NO character head, hair, crown, hand, body, dignitary, or large bright gold ornament in that upper band, across the full width. Use naturally extended distant navy curtains/quiet night atmosphere with very subdued detail; do not put a bright focal object directly under a future name. Do NOT add any actual lettering, label, rectangular name plate, frame, border, graphic blank panel, or letterbox bar. This must remain one seamless palace illustration.

Reframe the camera wider and compose the same scene LOWER in the portrait. Reduce the foreground character/group to roughly 76–78 percent of the original size so that its highest visible point begins at y=340 or below, leaving clear breathing room beneath the future text band, while preserving visible lower body and the original action. Subject remains prominent and centered in the remaining lower 78 percent of the canvas. Do not merely crop the head, stretch anatomy, cover the original image with a rectangle, or remove the character. Keep all important hands and objects inside the frame. No costume redesign, new gestures, new people, new props, magic, new text, numbers, logo, watermark, blur, painterly smudging, extra fingers, missing limbs, or changes to the character's emotion.

## C68 ステラリア

参照・編集対象：`assets/characters/C68-card-v1.png`

Stellaria is still the same petite pink-haired girl with twin round buns, violet-pink eyes, gold orbit/star crown, white-and-gold dress, rose-pink sash, and navy star-lined cape. Preserve her confident closed-mouth smile, one hand on her waist and the other arm extended with open hand, and her proud leg stance. The HIGHEST TIP of her crown must be BELOW the top22% safe zone, around y=345; eyes around y=510–570. Keep both decorated boots inside the bottom edge. Keep the cape's flowing silhouette. No cookie or podium.

## C70 ガルディオ

参照・編集対象：`assets/characters/C70-card-v1.png`

Galdio is still the same tall adult dark-haired imperial bodyguard with stern alert amber eyes, black/navy gold-trimmed military coat, gold epaulettes/chains, dark-red sash/lining, black gloves, and sheathed narrow ceremonial sword. Preserve the exact grounded three-quarter guarding stance, strict unsmiling sideways gaze, one gloved hand on the sheathed sword's hilt and the other at his side. The HIGHEST HAIR must be BELOW the top22% safe zone, around y=345; eyes around y=405–450. Keep his full boots inside the bottom edge. No sword drawn, no attack, no glowing eyes.

### C70 背景の継ぎ目修正

初回編集結果で左右の白い扉・柱の上端に切り貼りのような斜めの境界を確認したため、外周の宮廷建築が上端まで自然に続くよう修正する。人物の構図と上部の余白は保持。

Use case: precise-object-edit. Edit ONLY the background continuity defect in this finished1024x1536 portrait card. The foreground Galdio character, face, expression, hair, pose, uniform, sword, coat, boots, proportions and exact position MUST stay unchanged. His hair currently begins around y347 and his stern eyes around y420: keep that layout and the top22% background-only name safe zone. On BOTH outer sides of the image, the bright white-marble doorway/pilaster surfaces abruptly START with artificial slanted cut edges near y270–303, beneath the soft extended upper palace background. These edges look like cropped panels pasted over an outpaint. Remove those artificial cropped top boundaries and make the white-marble outer doorframe/pilasters and adjacent gold decoration continue naturally all the way UP to the top border of the canvas, using consistent connected architectural perspective and light. Integrate the extended blue palace background, curtains, windows and doorway as ONE seamless environment, with no hard pasted patch edge, rectangle, horizontal seam, cut border or sudden resolution change. Preserve the lower palace background and Galdio entirely. Keep the central TOP22% quiet subdued navy atmosphere for a future HTML character name; no people/hair/hands there, no large central focal gold decoration or new prop. It is fine for the very outer marble framing to extend continuously to the top edge as real palace architecture. No text, labels, frame graphic, letters, logo or watermark. Do not reframe again, move the character, enlarge him, change his stance, draw the sword, glow his eyes or redesign the outfit. Same refined clean Japanese anime rendering.

## C69 セラフィナ

参照・編集対象：`assets/characters/C69-card-v1.png`

Seraphina is still the same silver-lavender-haired woman with side braids, thin oval glasses, visible blue-gray eyes, white/navy/pale-gold official coat and long skirt, holding her navy-and-gold document tablet in one hand and calmly explaining with the other open gloved hand. Preserve her composed speaking expression and the ONE older dignitary at the right foreground facing her across the diplomatic table; this is still negotiation. The HIGHEST POINT of Seraphina's hair and any counterpart must be BELOW the top22% safe zone, around y=345; her eyes around y=460–530. Keep the explanatory hand, tablet, dignitary and table visible in the lower scene; no handshake.

### C69 背景の継ぎ目修正

初回編集結果で上部背景の水平な継ぎ目を確認したため、その候補は採用せず背景だけを修正する。人物の構図と上部の余白は保持。

Use case: precise-object-edit. Edit this portrait illustration at the SAME1024x1536 size. There is an obvious artificial straight HORIZONTAL COMPOSITING SEAM across the entire image at about y=249, where the extended navy curtain/night backdrop abruptly meets the detailed palace background. Fix ONLY this background continuity defect. Rebuild the upper palace background as one naturally continuous scene, with properly connected curtains, arched window, marble architecture, perspective and lighting. Remove the horizontal cut edge completely, with no visible patch boundaries, rectangular insert, split image, band, or repeated/torn architectural lines. The upper portion should feel like a real continuous extension of the same diplomatic chamber, with subdued details; keep the TOP22% (y0–338) free of any people, hair, heads, crowns, hands, or bright central focal decorations, reserved for a future HTML name overlay. Do not add any lettering, plate, border or graphic label. Preserve EVERYTHING about Seraphina and the dignitary: exact faces, silver-lavender hair, glasses, outfits, expressions, poses, hand anatomy, tablet, explanatory open hand, relative sizes and positions, and the diplomatic table and foreground objects. The character silhouettes currently begin around y400 and must remain in the same lower positions. Preserve the current clean Japanese anime drawing style and color palette. The requested fix is just a seamless natural upper background. Do not move or redraw the characters, change their scale, crop their heads, add people, or put any text in the image.

## 最終画像の確認記録

３枚とも1024×1536のPNG。上部約22%に人物の髪・王冠・手・顔が入らず、元の表情・衣装・ポーズを保っていることを１枚ずつ目視した。C69の水平な背景の継ぎ目、C70の扉・柱の不自然な上端を修正し、連続した宮廷背景になった最終画像を採用した。ユーザーの視覚承認は別。

| ID | 採用した生成元 | SHA256 |
| --- | --- | --- |
| C68 | `exec-54e38d51-30af-403e-83b0-f3be525daf7e.png` | `2db5a99fe2e816d3449ebf91d9ccf3a5ff1855e2faee64f5f70188dfaee986f8` |
| C69 | `exec-9efc7be7-fd83-4551-80f1-df8ab2c00229.png` | `5862feeb866356e9969eb181a4c1282c204982f5dc6705c4700864537a6e009f` |
| C70 | `exec-f6993026-7226-4543-88ee-375af14f7704.png` | `fc86fb1a56d1fda35b1b1d676b113a7050d03da664ac3ebaec1477042a25829c` |

生成元の共通フォルダ：`/Users/guarhiro/.codex/generated_images/01a1210d-bfe7-7ed2-856d-2b6ba7d1cdb3/`。不採用の継ぎ目がある候補も生成元に残り、最終画像とは区別している。最終画像は無加工でプロジェクトへコピーした。

`new-cards.js` と `new-card-ui.js` がv2を参照する。通常縦カードとモバイルのライブラリ画像を上端中央に揃え、上部余白を保つ。横長枠は人物の新しい高さに合わせて切り取りを調整した。変更対象はC68–C70だけ。

## ゲーム画面での確認

一時的なChromeコンテキストを使用し、1440px・390px・600pxの画面で９回の画像読み込みが成功。JavaScriptエラー・通信エラーは0。実際の名前入りモバイルライブラリの３枚を390px・600pxで目視し、名前と役割の背景領域へ顔・王冠が入らないことを確認した。戦場と横長デッキ行も1440px・390pxで撮影・目視。スクロールで切れていた390pxのデッキ一覧は、各３行を個別に撮影して顔の切り取りを確認した。

- 名前入り３枚の表示：[three-mobile-cards-600.png](validation/eternia-card-art-v2/three-mobile-cards-600.png)
- 確認記録：[browser-art-review.json](validation/eternia-card-art-v2/browser-art-review.json)
- 写真は15枚。実際の名前欄の寸法、v2画像の寸法、CSSの切り取り位置はJSONに記録。
- 切り取り位置：戦場はC68/C69が中央30%、C70が中央18%。横長デッキ・交換行はC68/C69が中央32%、C70が中央23%。
- `node --check new-cards.js`、`node --check new-card-ui.js`、`git diff --check` が成功。
