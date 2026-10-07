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
