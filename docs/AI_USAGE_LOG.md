# Nhật ký sử dụng AI

## 04/10/2026 — M0: Cách làm theo từng giai đoạn và khởi tạo Expo

### Nhiệm vụ, yêu cầu và tài liệu tham khảo

- Người học yêu cầu AI cùng lập trình và hướng dẫn cho MMA301 — Bài tập 1. Chỉ làm từng giai đoạn được yêu cầu; giải thích vì sao cần thay đổi, thay đổi làm gì, luồng chạy và trường hợp có thể lỗi.
- Giai đoạn được yêu cầu: **M0 — Khởi tạo Expo và kiểm tra môi trường**, là bước học tập nội bộ trước M1.
- Phạm vi: tạo dự án Expo JavaScript từ mẫu trống ngay tại thư mục gốc; viết `App.js` tối thiểu; cập nhật README; ghi nhật ký sử dụng AI; kiểm tra thực tế; tạo một bản ghi thay đổi trong Git và đẩy lên nhánh `main`.
- Chưa làm: chuyển màn hình, nhiều màn hình, Context API, AsyncStorage, biểu mẫu nhập liệu, FlatList, hệ thống giao diện theo chủ đề, Firebase, máy chủ xử lý dữ liệu, TypeScript hoặc cấu trúc mã nguồn phức tạp.
- [Kho mã nguồn của bài tập](https://github.com/NhanDuong21/mma301-assignment1).
- Tài liệu tham khảo: [Các mẫu dự án Expo](https://docs.expo.dev/more/create-expo/) và [Kiến thức React cơ bản trong React Native](https://reactnative.dev/docs/intro-react).

### Mục đích

Tạo nền React Native + Expo nhỏ, dễ đọc và dễ giải thích. Làm theo từng giai đoạn để người học có thể hiểu mã nguồn, chạy lại các bước kiểm tra và trình bày trong buổi phỏng vấn với giảng viên.

### Nội dung do AI tạo đã được sử dụng

- Các lệnh kiểm tra môi trường và Git trước khi sửa tệp.
- Cách tạo dự án bằng mẫu trống chính thức của Expo, sao chép các tệp cần thiết vào kho mã nguồn hiện có và cài thư viện bằng npm.
- `App.js` gồm một `View`, hai `Text` và phần khai báo kiểu hiển thị bằng `StyleSheet.create`.
- Tên dự án trong `package.json` và `app.json`; README giải thích cách chạy và vai trò của từng tệp.
- Các lệnh kiểm tra, việc tìm hiểu cảnh báo thư viện và nhật ký này.
- Phần báo cáo M0 giải thích luồng chạy, kiến thức cơ bản, câu hỏi phỏng vấn, kết quả kiểm tra và vấn đề đã gặp.

### Những nội dung đã điều chỉnh

- AI điều chỉnh mẫu Expo cho kho mã nguồn hiện có. Không sao chép thư mục `.git` của dự án tạm, nên lịch sử Git gốc được giữ nguyên.
- Đổi tên gói thư viện của dự án và mã định danh trong cấu hình Expo thành `mma301-assignment1`; tên hiển thị là `MMA301 Assignment 1`.
- Thay chữ mẫu bằng hai dòng được yêu cầu, căn giữa bằng các thuộc tính bố trí đơn giản.
- Bỏ thư viện `expo-status-bar` không dùng và lệnh chạy trên trình duyệt. M0 chỉ chuẩn bị nền ứng dụng Android/iOS.
- Giữ các ảnh và giấy phép đi kèm mẫu Expo. Thêm `.env` vào `.gitignore`.
- Chuyển README gốc từ UTF-16 LE sang UTF-8 rồi viết hướng dẫn cài đặt và chạy.
- Những thay đổi và lệnh kiểm tra trong mục này do AI thực hiện. Không ghi nhận rằng người học đã tự sửa mã nguồn hay tự kiểm tra trên điện thoại khi chưa có bằng chứng.

### Cách kiểm chứng và kết quả thực tế

Các bước dưới đây đã chạy trên Windows, tại thư mục gốc của dự án, ngày 04/10/2026 theo múi giờ Việt Nam:

| Lệnh hoặc bước kiểm tra | Kết quả thực tế |
| --- | --- |
| `node -v` | Phiên bản `v24.15.0` |
| `npm -v` | Phiên bản `11.12.1` |
| `git status` trước khi sửa | Nhánh `main`, đồng bộ với `origin/main`, không có thay đổi chưa ghi vào Git |
| `git branch --show-current` | `main` |
| `git log --oneline -5` trước khi sửa | Có bản ghi gốc `e1030d2` |
| `npx --yes create-expo-app@latest --help` | Xác nhận có các lựa chọn `blank`, `--no-install`, `--no-agents-md` |
| `npx --yes create-expo-app@latest <thu-muc-tam> --template blank --no-install --no-agents-md --yes` | Tạo mẫu thành công ngoài kho mã nguồn; sao chép các tệp cần thiết vào thư mục gốc. `<thu-muc-tam>` là chỗ điền đường dẫn thực tế |
| `npm install` | Mã kết thúc 0, tức lệnh thành công; thêm 463 gói, kiểm tra bảo mật 464 gói; có cảnh báo được ghi bên dưới |
| `npm ls --depth=0` | Mã kết thúc 0; `expo 57.0.26`, `react 19.2.3`, `react-native 0.86.3` |
| `npx expo config --type public` | Mã kết thúc 0; đúng tên ứng dụng, mã định danh, SDK 57, nền tảng Android/iOS và đường dẫn ảnh |
| `npx expo install --check` | Mã kết thúc 0; thư viện đúng phiên bản yêu cầu của Expo |
| `npx --yes expo-doctor` | Mã kết thúc 0; đạt cả 21/21 mục kiểm tra |
| `npm start -- --localhost --port 8081`, đặt `CI=1` riêng trong phiên kiểm tra | Expo/Metro khởi động và chờ tại `http://localhost:8081`; chế độ này tắt tự động tải lại |
| Gửi yêu cầu tới `http://localhost:8081/status` | HTTP 200; giải mã được nội dung `packager-status:running`, nghĩa là Metro đang chạy |
| Gửi yêu cầu tới `/index.bundle?platform=android&dev=true&minify=false` | HTTP 200; 4.152.626 ký tự; có cả hai dòng chữ từ `App.js` |
| Gửi yêu cầu tới `/index.bundle?platform=ios&dev=true&minify=false` | HTTP 200; 4.144.068 ký tự; có cả hai dòng chữ từ `App.js` |
| `git check-ignore node_modules .expo` | Cả hai thư mục đều được Git bỏ qua |
| Đọc README và nhật ký bằng bộ giải mã UTF-8 nghiêm ngặt | Cả hai tệp đọc thành công và có nội dung |
| `git diff --cached --check` | Mã kết thúc 0; không có lỗi khoảng trắng trong các thay đổi chuẩn bị ghi vào Git |
| `npm audit --json` | Mã kết thúc 1; còn 23 mục cảnh báo bảo mật: 7 mức trung bình, 16 mức cao, 0 mức nghiêm trọng nhất |

Biến `CI=1` chỉ được đặt trong phiên kiểm tra của AI, không lưu vào dự án. Khi chạy `npm start` bình thường, bạn sử dụng chế độ phát triển thông thường.

**Giới hạn kiểm chứng:** đã kiểm tra cấu hình, tính tương thích thư viện, Metro khởi động và việc tạo gói JavaScript cho Android/iOS. Chưa chạy trên điện thoại thật hoặc máy ảo, chưa quan sát giao diện và chưa thử việc tự cập nhật giao diện sau khi lưu mã nguồn. Người học vẫn cần mở ứng dụng bằng Expo Go tương thích và xác nhận hai dòng chữ hiển thị.

### Vấn đề đã gặp và thông tin để tìm nguyên nhân lỗi

#### Không sửa được README: đã xử lý

- Biểu hiện: công cụ `apply_patch` từ chối đọc README vì byte đầu không hợp lệ theo UTF-8.
- Giả thuyết: README có sẵn đang dùng cách mã hóa chữ khác UTF-8.
- Nguyên nhân gốc: đọc dữ liệu thô thấy hai byte đầu `FF-FE`, tiếp theo là dữ liệu chữ UTF-16 LE.
- Cách sửa: đọc nội dung cũ rồi ghi lại bằng UTF-8 không có dấu nhận diện mã hóa ở đầu tệp trước khi sửa.
- Kiểm tra lại: `apply_patch` sửa tệp thành công; README mới đọc được bằng UTF-8.

#### Cảnh báo thư viện: vẫn còn tồn tại

- Biểu hiện: `npm install` cảnh báo `uuid@7.0.3` không còn được hỗ trợ và báo 23 mục cảnh báo bảo mật.
- Giả thuyết: các thư viện trong mẫu Expo đang dùng những gói đã có thông báo lỗ hổng.
- Nguyên nhân gốc: `npm audit` ghi nhận các chuỗi ảnh hưởng liên quan tới `braces/micromatch`, `node-forge` và `uuid`, lan tới các gói Expo/Metro/React Native phụ thuộc vào chúng. Con số 23 bao gồm các gói bị ảnh hưởng theo chuỗi, không phải 23 lỗi riêng trong mã nguồn ứng dụng.
- Cách xử lý hiện tại: giữ các phiên bản tương thích với SDK 57. Một số đề xuất sẽ hạ Expo xuống `44.0.6` hoặc React Native xuống `0.72.17`, làm xáo trộn nền dự án hiện tại. Không ép sửa phiên bản thư viện và không khẳng định đã hết vấn đề bảo mật.
- Kiểm tra lại: `npm audit` vẫn báo 23 mục; kiểm tra tương thích thư viện và cả 21 mục của Expo đều đạt; tạo gói JavaScript Android/iOS thành công. Các cảnh báo bảo mật vẫn chưa được giải quyết.

#### Những thông báo không chặn việc chạy

- Git báo ký tự xuống dòng LF sẽ được đổi thành CRLF theo cấu hình trên Windows. Đây là việc chuẩn hóa xuống dòng, không phải lỗi chạy ứng dụng.
- Tiến trình Metro báo `NO_COLOR` bị bỏ qua khi có `FORCE_COLOR`. Thông báo liên quan tới màu chữ trong cửa sổ dòng lệnh; việc tạo gói JavaScript vẫn thành công.
- Lúc đầu PowerShell trả phản hồi trạng thái Metro dưới dạng các byte. Giải mã UTF-8 cho kết quả `packager-status:running`. Dãy số ban đầu là vấn đề cách hiển thị phản hồi, không phải Metro bị lỗi.

Chưa quan sát thấy lỗi mã nguồn ứng dụng trong các bước kiểm tra cấu hình, khởi động và tạo gói JavaScript. Việc chạy và hiển thị giao diện trên thiết bị vẫn chưa được xác minh.

## 04/10/2026 — Điều chỉnh tài liệu M0 sang tiếng Việt

### Nhiệm vụ và mục đích

Người học yêu cầu chuyển README và các tệp Markdown trong `docs/` sang tiếng Việt dễ hiểu để thuận tiện tự học và giải thích mã nguồn.

### Nội dung AI đã tạo và điều chỉnh

- Viết lại README và nhật ký này bằng tiếng Việt, gồm tiêu đề, hướng dẫn, chú thích cấu trúc thư mục, kết quả kiểm tra và thông tin tìm nguyên nhân lỗi.
- Giải thích các thuật ngữ bằng lời đơn giản. Giữ nguyên tên tệp, tên công nghệ, lệnh, phiên bản và nội dung phản hồi kỹ thuật để đối chiếu với dự án.
- Giữ đúng bằng chứng M0, bao gồm 23 cảnh báo bảo mật còn tồn tại và việc chưa kiểm chứng trên thiết bị.
- Hai dòng chữ tiếng Anh trong README là nội dung hiện có của `App.js`, được trích nguyên văn để đối chiếu.

### Cách kiểm chứng

- Đọc lại hai tài liệu: phần giải thích và tiêu đề đều bằng tiếng Việt; tên kỹ thuật, lệnh và nội dung ứng dụng được trích nguyên văn khi cần đối chiếu.
- Kiểm tra UTF-8 nghiêm ngặt: cả hai tệp đọc được, không có ký tự thay thế do lỗi mã hóa.
- Kiểm tra dấu mở và đóng khối mã Markdown: hợp lệ ở cả hai tệp.
- Kiểm tra liên kết nội bộ từ README tới nhật ký: tệp đích tồn tại.
- Đối chiếu các phiên bản, số lượng gói, 21/21 mục đạt, kích thước gói JavaScript, 23 cảnh báo và giới hạn chưa kiểm tra thiết bị: các thông tin được giữ lại.
- Chạy `git diff --check`: thành công, không có lỗi khoảng trắng. Chỉ README và nhật ký được thay đổi; không sửa mã nguồn ứng dụng.
- Đây là thay đổi tài liệu; không chạy lại ứng dụng và không ghi nhận thêm bằng chứng kiểm tra trên thiết bị.

### Vấn đề trong lúc chỉnh tài liệu

- Biểu hiện: công cụ sửa tệp từ chối bản vá đầu tiên vì có nhiều thao tác cùng nhắm vào một tệp; chưa có thay đổi nào được ghi bởi bản vá đó.
- Nguyên nhân: AI gộp thao tác xóa và tạo lại cùng đường dẫn trong một bản vá, trong khi công cụ không hỗ trợ cách gọi này.
- Cách sửa: tách thành các bản vá hợp lệ rồi ghi lại hai tài liệu.
- Kiểm tra lại: nội dung tiếng Việt đã được ghi thành công; các bước kiểm tra tài liệu bên trên đều đạt.
