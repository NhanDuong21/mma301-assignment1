# Nhật ký gỡ lỗi

## D01 — Bộ kiểm tra đọc sai vị trí màu trong mảng style (M3, 07/10/2026)

- Phân loại: tooling — lỗi bộ kiểm tra, không phải lỗi giao diện đã được xác nhận.
- Triệu chứng: kiểm tra màu chữ của ô giới thiệu nhận `undefined`, mong đợi `#f8fafc`.
- Bối cảnh: chạy `node "$env:TEMP\mma301-sprint-check.cjs" "$PWD"` trước commit M3.
- Giả thuyết: ô giới thiệu thiếu màu tối hoặc bộ kiểm tra đọc nhầm style.
- Kiểm tra: ô tên dùng `[styles.input, inputColors]`; ô giới thiệu dùng `[styles.input, styles.bio, inputColors]`.
- Nguyên nhân gốc: script giả định màu luôn nằm ở phần tử thứ hai. React Native kết hợp style theo thứ tự, phần tử cuối ghi đè phần tử trước.
- Cách sửa: bộ kiểm tra kết hợp các object bằng `Object.assign({}, ...input.props.style)` trước khi đọc màu. Không sửa source để chiều theo phép kiểm tra sai.
- Kiểm tra lại: chạy lại đạt cả 6 nhóm kiểm tra M3; Android/iOS bundle HTTP 200.
- Phòng hồi quy: kiểm tra cả hai ô ở chế độ tối; bundle Android/iOS riêng để kiểm tra khả năng biên dịch.


## D02 — Dòng trống dư cuối README (M6, 07/10/2026)

- Phân loại: tooling/tài liệu.
- Triệu chứng: git diff --check trả mã 1, README.md:74: new blank line at EOF.
- Bối cảnh: script PowerShell thay nhãn milestone sau khi đã nối thêm nội dung README.
- Giả thuyết và kiểm tra: Get-Content -Raw đã có newline cuối, Set-Content lại bổ sung newline; diff xác nhận lỗi chỉ ở cuối tệp.
- Nguyên nhân gốc: ghi lại chuỗi đã có newline bằng thao tác tự thêm newline.
- Cách sửa: TrimEnd rồi thêm đúng một newline, ghi với -NoNewline.
- Kiểm tra lại/phòng hồi quy: chạy git diff --check sau sửa và trước mọi commit; không liên quan logic ứng dụng.

## D03 — Bản vá Expo không khớp yêu cầu kiểm tra (lịch sử M1)

- Phân loại: dependency.
- Triệu chứng: expo install --check báo Expo cũ; doctor không đạt kiểm tra phiên bản.
- Bối cảnh: sau M0 đang cài Expo 57.0.26, công cụ ở M1 yêu cầu ~57.0.27.
- Giả thuyết: bản vá khuyến nghị trong SDK 57 đã thay đổi.
- Kiểm tra/bằng chứng: đối chiếu output check với package đang cài; thông tin đã ghi trong AI_USAGE_LOG, mục M1 → Vấn đề thật đã gặp.
- Nguyên nhân gốc: bản vá đang cài thấp hơn mức công cụ khuyến nghị tại thời điểm đó; không phải source navigation sai.
- Cách sửa trong M1: npx expo install expo@~57.0.27, giữ React/RN.
- Kiểm tra lại: doctor 21/21, dependency đúng, hai bundle và logic navigation đạt theo nhật ký M1.
- Hồi quy trong M7: clone sạch cài Expo 57.0.27, check và doctor 21/21 đạt. Không nâng SDK trong sprint này.

## D04 — README ban đầu dùng UTF-16 LE (lịch sử M0)

- Phân loại: tooling/mã hóa tài liệu.
- Triệu chứng: apply_patch không đọc được README vì không phải UTF-8 hợp lệ.
- Bối cảnh: sửa README có sẵn khi bootstrap M0.
- Giả thuyết: cách mã hóa khác với công cụ mong đợi.
- Kiểm tra/bằng chứng: hai byte đầu FF-FE, phần sau là UTF-16 LE; đã ghi trong AI_USAGE_LOG mục M0.
- Nguyên nhân gốc: README dùng UTF-16 LE, công cụ sửa tệp mong đợi UTF-8.
- Cách sửa trong M0: đọc đúng encoding cũ, ghi lại UTF-8 không BOM rồi sửa.
- Kiểm tra lại: apply_patch sửa được; giải mã UTF-8 nghiêm ngặt thành công.
- Hồi quy M7: script kiểm tra UTF-8, ký tự thay thế, code fence và liên kết cho toàn bộ tài liệu đạt.

## Phân biệt lỗi thật và thử đường lỗi

D01–D02 xảy ra trong sprint; D03–D04 lấy từ lịch sử đã được ghi, không tái tạo lỗi giả. Chưa phát hiện application defect qua phạm vi tự động đã chạy. Các lần cố ý truyền JSON hỏng, trì hoãn đọc, reject read/write là ca kiểm thử khả năng chịu lỗi, không gọi là bug đã xảy ra với người dùng.

Cảnh báo NO_COLOR/FORCE_COLOR của terminal không làm bundle thất bại. Cảnh báo uuid deprecated và 22 mục npm audit vẫn còn; xem TEST_MATRIX. Không khẳng định đã xử lý chỉ vì cài đặt hoặc doctor đạt.
