# 🦆 Đua vịt trắc nghiệm

Game trắc nghiệm có đường đua vịt: ai trả lời đúng và nhanh thì vịt bơi trước. Vị trí các vịt cập nhật trực tiếp cho mọi người chơi.

## Cấu trúc
- `index.html`: giao diện và logic game
- `questions.js`: câu hỏi và thời gian mỗi câu
- `config.js`: cấu hình Firebase và tên phòng

## Cách đổi câu hỏi
Mở file `questions.js`, mỗi câu hỏi là một dòng như sau:

    { q: "Nội dung câu hỏi?", a: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"], c: 2 },

- `q`: câu hỏi. `a`: các đáp án. `c`: vị trí đáp án đúng, đếm từ 0 (0 = A, 1 = B, 2 = C, 3 = D).
- Thêm câu: chép nguyên một dòng, dán xuống dưới, nhớ giữ dấu phẩy cuối dòng. Xóa câu: xóa cả dòng.
- Đổi nội dung có dấu nháy kép bên trong thì viết `\"` hoặc dùng nháy đơn `'`.
- Sửa ngay trên GitHub: mở file → biểu tượng cây bút ✏️ → sửa → **Commit changes**. Khoảng 1 phút sau link GitHub Pages tự cập nhật (bấm Ctrl+F5 để tải lại).

## Vật phẩm may mắn (khi trả lời ĐÚNG)
Người chơi có xác suất `POWERUP_CHANCE` (mặc định 50%) nhận ngẫu nhiên một vật phẩm:
- ⚡ Nhân đôi điểm: câu kế tiếp trả lời đúng được x2.
- 💡 Gợi ý 50/50: câu kế tiếp bị loại bớt 2 đáp án sai.
- 💰 Thưởng nóng: cộng ngay `BONUS_POINTS` điểm.
- 🏴‍☠️ Cướp điểm: chọn một người và lấy `STEAL_PERCENT` (10%) điểm của họ.
- 🎯 Bắn hạ ngôi sao: tự động cướp điểm của người đang dẫn đầu.
- 🛡️ Khiên: chặn 1 lần bị cướp điểm hoặc bị phạt.

## Hình phạt may rủi (khi trả lời SAI hoặc hết giờ)
Có xác suất `PENALTY_CHANCE` (mặc định 40%) bị một hình phạt ngẫu nhiên:
- 💧 Rớt xuống nước: mất `PENALTY_PERCENT` (10%) điểm của mình.
- 🧧 Phát lì xì: tặng `GIFT_PERCENT` (8%) điểm cho một người ngẫu nhiên.
- 🐌 Vịt chậm: điểm câu kế tiếp bị chia đôi.
- ⏳ Thời gian cấp bách: câu kế tiếp chỉ còn 7 giây.
- 🧊 Đóng băng: câu kế tiếp phải chờ 5 giây mới chọn được đáp án.
Có khiên thì khiên sẽ đỡ hình phạt đó. Mọi tỉ lệ chỉnh ở cuối file `questions.js`.

## Đường đua
Chỉ hiển thị `TOP_DUCKS` (mặc định 5) vịt dẫn đầu. Khi có người vượt lên, làn đua của họ trượt lên vị trí mới. Mỗi người chơi vẫn thấy hạng của mình (ví dụ "Hạng 12/40") ngay trên màn hình trả lời.

## Sảnh chờ, bắt đầu và công bố top 3
1. Người nghe mở link, nhập tên và bấm **Xuống nước!**: họ vào **sảnh chờ** và thấy danh sách những người đã vào. Chưa ai được trả lời câu hỏi.
2. Bạn mở `.../index.html?host=1` trên máy trình chiếu, thấy số người đã vào, rồi bấm nút **▶ BẮT ĐẦU**. Tất cả người chơi cùng bắt đầu ngay, đồng hồ đếm ngược `GAME_MINUTES` phút (mặc định 10, chỉnh ở cuối `questions.js`).
3. Hết giờ, mọi màn hình tự hiện bục top 3 🥇🥈🥉 cùng bảng điểm còn lại. Người vào sau khi hết giờ không chơi được nữa. Người vào khi ván đang chạy thì chơi luôn phần thời gian còn lại.
4. Giữa các lần thuyết trình bấm **🔄 Ván mới** để xóa người chơi và điểm, mọi người quay về sảnh chờ (họ cần nhập tên lại).
- Nếu người chơi trả lời hết câu hỏi sớm, họ chờ đến hết giờ. Muốn họ chơi lặp lại cho đến hết giờ, đặt `REPEAT_QUESTIONS = true`.
- Hai nút trên màn hình host ai có link `?host=1` cũng bấm được, nên chỉ gửi link thường cho người nghe.
- Muốn thử nhanh, thêm `?min=1` vào link để ván chỉ dài 1 phút.
- Cần luật Firebase có phần `meta` như ở trên.

## Chạy thử (chế độ DEMO)
Game dùng ES module nên không mở trực tiếp bằng file được. Chạy server tĩnh:

    npx serve .        # hoặc: python3 -m http.server

Khi chưa cấu hình Firebase, game chạy DEMO với vịt máy.

## Bật bảng xếp hạng nhiều người (Firebase, miễn phí)
1. Vào https://console.firebase.google.com, tạo project mới.
2. Vào **Build → Realtime Database → Create Database**, chọn khu vực gần bạn (ví dụ Singapore).
3. Tab **Rules**, dán nội dung sau rồi Publish:

        {
          "rules": {
            "rooms": {
              "$room": {
                "meta": {
                  ".read": true,
                  "startedAt": { ".write": true, ".validate": "newData.isNumber()" }
                },
                "players": {
                  ".read": true,
                  "$pid": {
                    ".write": true,
                    ".validate": "newData.hasChildren(['name','score','at']) && newData.child('name').isString() && newData.child('name').val().length <= 16 && newData.child('score').isNumber() && newData.child('score').val() <= 20000"
                  }
                }
              }
            }
          }
        }

4. **Project settings → Your apps → Web (</>)**, đăng ký app và copy `firebaseConfig` vào `config.js` (nhớ có `databaseURL`).
5. Đổi `ROOM` trong `config.js` cho mỗi buổi thuyết trình. Số `20000` là điểm tối đa cho phép, đủ rộng vì có vật phẩm nhân đôi và cướp điểm.

Lưu ý: luật trên cho phép ai có link đều ghi được, phù hợp game vui trong buổi thuyết trình. Không dùng cho thi cử nghiêm túc.

## Đưa lên GitHub Pages
1. Tạo repo, đẩy toàn bộ file lên nhánh `main`.
2. **Settings → Pages → Deploy from a branch → main / (root)**.
3. Link game: `https://<tên-github>.github.io/<tên-repo>/`

## Màn hình trình chiếu
Mở `.../index.html?host=1` để chiếu đường đua cỡ lớn, không hiện phần trả lời. Gửi link thường cho người nghe.
