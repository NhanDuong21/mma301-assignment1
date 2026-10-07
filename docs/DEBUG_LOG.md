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

