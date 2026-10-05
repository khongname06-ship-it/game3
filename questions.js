// ============ CHỈNH CÂU HỎI TẠI ĐÂY ============
// Mỗi câu là 1 khối { ... }, ngăn cách nhau bằng dấu phẩy.
//   q: nội dung câu hỏi
//   a: danh sách đáp án (2 đến 6 đáp án đều được)
//   c: vị trí đáp án ĐÚNG, đếm từ 0  (0 = A, 1 = B, 2 = C, 3 = D)
export const QUESTIONS = [
  { q: "Thủ đô của Việt Nam là thành phố nào?", a: ["Huế", "Hà Nội", "Đà Nẵng", "TP. Hồ Chí Minh"], c: 1 },
  { q: "Một năm có bao nhiêu tháng?", a: ["10", "11", "12", "13"], c: 2 },
  { q: "Hành tinh nào gần Mặt Trời nhất?", a: ["Sao Kim", "Trái Đất", "Sao Thủy", "Sao Hỏa"], c: 2 },
  { q: "HTML là viết tắt của cụm từ nào?", a: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Machine Learning"], c: 0 },
  { q: "Con sông nào dài nhất Việt Nam?", a: ["Sông Hồng", "Sông Mê Kông", "Sông Đà", "Sông Hương"], c: 1 },
];

// ============ CÀI ĐẶT KHÁC ============
export const SECONDS_PER_QUESTION = 15;  // số giây mỗi câu
export const POWERUP_CHANCE = 0.5;       // xác suất nhận vật phẩm khi trả lời đúng (0.5 = 50%)
export const STEAL_PERCENT = 0.10;       // tỉ lệ điểm bị lấy khi dùng "Cướp điểm"
export const GAME_MINUTES = 10;         // thời gian của cả ván (phút), hết giờ tự công bố top 3
export const REPEAT_QUESTIONS = false;  // true: hết câu hỏi mà còn thời gian thì quay lại câu đầu
export const TOP_DUCKS = 5;             // chỉ hiện bấy nhiêu vịt dẫn đầu trên đường đua
export const BONUS_POINTS = 80;         // điểm của vật phẩm "Thưởng nóng"
export const PENALTY_CHANCE = 0.4;      // xác suất bị phạt khi trả lời sai hoặc hết giờ (0.4 = 40%)
export const PENALTY_PERCENT = 0.10;    // "Rớt xuống nước": mất bấy nhiêu % điểm của mình
export const GIFT_PERCENT = 0.08;       // "Phát lì xì": tặng bấy nhiêu % điểm cho một người ngẫu nhiên
