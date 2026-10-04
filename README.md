# MMA301 — Bài tập 1: Ứng dụng hồ sơ và hoạt động

Giai đoạn hiện tại: **M0 — Khởi tạo Expo và kiểm tra môi trường**. Đây là bước học tập nội bộ trước khi bắt đầu M1 của bài tập.

Dự án sử dụng **JavaScript + React Native + Expo**. Hiện tại, ứng dụng chỉ có hai dòng chữ để kiểm tra giao diện cơ bản. Nội dung trong `App.js` là:

```text
MMA301 Assignment 1
React Native + Expo baseline
```

Chưa có chức năng chuyển màn hình hay các chức năng khác của bài tập.

## Cần chuẩn bị những gì?

- Node.js bản LTS (bản được hỗ trợ dài hạn) và npm. M0 đã được kiểm tra trên Windows với Node `v24.15.0` và npm `11.12.1`.
- Git để quản lý lịch sử thay đổi mã nguồn.
- Để xem ứng dụng: điện thoại Android/iOS có Expo Go tương thích với Expo SDK 57, hoặc máy ảo Android/iOS đã được cấu hình.
- Nếu dùng kết nối mạng nội bộ mặc định, điện thoại và máy tính nên kết nối cùng một mạng.

## Cài đặt và chạy ứng dụng

Mở cửa sổ dòng lệnh tại thư mục gốc của dự án, tức thư mục chứa `package.json`, rồi chạy:

```sh
npm install
npm start
```

- `npm install`: tải các thư viện mà dự án cần vào thư mục `node_modules/`.
- `npm start`: chạy công cụ phát triển của Expo và khởi động Metro.

Expo sẽ hiển thị mã QR. Trên Android, quét bằng Expo Go; trên iPhone, quét bằng ứng dụng Camera. Giữ cửa sổ dòng lệnh mở trong lúc dùng ứng dụng. Nhấn `Ctrl+C` khi muốn dừng.

Bạn có thể sửa nội dung trong `App.js` rồi lưu để cập nhật ứng dụng đang kết nối.

- `npm run android`: cần máy ảo Android hoặc điện thoại đã được cấu hình kết nối với máy tính.
- `npm run ios`: cần macOS và máy ảo iOS. Nếu dùng Windows, bạn có thể mở ứng dụng bằng Expo Go trên iPhone thật.

Nếu điện thoại không kết nối được, kiểm tra mạng và tường lửa. Nếu Expo Go báo không tương thích phiên bản SDK, xem [trang tải và thông tin tương thích Expo Go](https://expo.dev/go) trước khi thay đổi thư viện.

## Các tệp và thư mục chính

```text
mma301-assignment1/
├── App.js                 # Thành phần giao diện gốc, hiển thị hai dòng chữ
├── index.js               # Đăng ký App để Expo có thể chạy ứng dụng
├── package.json           # Danh sách thư viện, các lệnh chạy và tệp khởi đầu
├── package-lock.json      # Ghi phiên bản thư viện đã cài; cần đưa vào Git
├── app.json               # Tên ứng dụng, cấu hình nền tảng và đường dẫn ảnh
├── assets/                # Chứa các ảnh biểu tượng từ mẫu Expo
├── docs/AI_USAGE_LOG.md    # Nhật ký sử dụng AI và bằng chứng kiểm tra
├── .gitignore             # Chỉ định những tệp, thư mục không đưa vào Git
├── LICENSE                # Giấy phép sử dụng đi kèm mẫu Expo
└── node_modules/          # Thư viện đã tải về máy; không đưa vào Git
```

- **React Native** giúp xây dựng giao diện ứng dụng Android/iOS bằng JavaScript và React.
- **Expo** cung cấp công cụ để tạo, cấu hình và chạy dự án React Native.
- **npm** giúp cài thư viện và chạy các lệnh được khai báo trong `package.json`.
- **Metro** xử lý mã nguồn JavaScript cùng các thư viện thành một gói mã nguồn để ứng dụng trên thiết bị có thể tải và chạy.

## Kiểm tra dự án ở M0

Các lệnh kiểm tra cấu hình và thư viện:

```sh
npx expo config --type public
npx expo install --check
npx expo-doctor
```

Kết quả thực tế đã được ghi trong [nhật ký sử dụng AI](docs/AI_USAGE_LOG.md). Việc Metro khởi động và tạo được gói JavaScript chưa chứng minh rằng giao diện đã hiển thị đúng trên điện thoại.

M0 đã kiểm tra cấu hình, tính tương thích của thư viện và việc tạo gói JavaScript cho Android/iOS. Chưa kiểm tra giao diện trên thiết bị thật hoặc máy ảo. Kiểm tra bảo mật thư viện vẫn còn 23 cảnh báo; chi tiết nằm trong nhật ký.

Tài liệu tham khảo: [Các mẫu dự án Expo](https://docs.expo.dev/more/create-expo/) và [Cách phát triển ứng dụng bằng Expo](https://docs.expo.dev/workflow/overview/).
