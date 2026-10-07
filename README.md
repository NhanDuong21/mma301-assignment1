# MMA301 — Bài tập 1: Ứng dụng hồ sơ và hoạt động

Giai đoạn hiện tại: **M2 — Giao diện dùng chung và Context chia sẻ theme**.

Dự án sử dụng **JavaScript + React Native + Expo + React Navigation Native Stack**. Cả 5 màn hình và thanh tiêu đề có chế độ sáng/tối. Hồ sơ, chỉnh sửa và hoạt động vẫn chỉ là chữ minh họa.

## Chuẩn bị, cài đặt và chạy

- Node.js bản LTS, npm và Git. Máy kiểm tra dùng Node `v24.15.0`, npm `11.12.1` trên Windows.
- Điện thoại có Expo Go tương thích với SDK 58, hoặc máy ảo đã cấu hình. Nếu dùng kết nối mạng nội bộ, điện thoại và máy tính nên ở cùng mạng.
- Mở cửa sổ dòng lệnh tại thư mục gốc chứa `package.json`:

```sh
npm install
npm start
```

Quét mã QR bằng Expo Go trên Android hoặc Camera trên iPhone. Giữ cửa sổ dòng lệnh mở; nhấn `Ctrl+C` để dừng. Lưu thay đổi mã nguồn để ứng dụng đang kết nối cập nhật.

`npm run android` cần thiết bị hoặc máy ảo Android đã cấu hình. `npm run ios` cần macOS và máy ảo iOS; trên Windows có thể dùng Expo Go trên iPhone thật. Nếu không kết nối được, kiểm tra mạng, tường lửa và [phiên bản Expo Go](https://expo.dev/go).

## Cấu trúc chính

```text
mma301-assignment1/
├── App.jsx                    # ThemeProvider bao ngoài AppNavigator
├── index.js                   # Đăng ký App với Expo
├── src/
│   ├── context/
│   │   └── ThemeContext.jsx   # Sở hữu state và hai bộ màu
│   ├── components/
│   │   ├── ScreenContainer.jsx # Bố trí và nền chung cho 5 màn hình
│   │   └── ThemeToggle.jsx    # Công tắc đổi theme trong Settings
│   ├── navigation/
│   │   └── AppNavigator.jsx   # Khai báo 5 route và màn hình mở đầu
│   └── screens/
│       ├── HomeScreen.jsx
│       ├── ProfileScreen.jsx
│       ├── EditProfileScreen.jsx
│       ├── ActivityScreen.jsx
│       └── SettingsScreen.jsx
├── package.json               # Thư viện và lệnh chạy
├── package-lock.json          # Phiên bản thư viện đã cài
├── app.json                   # Cấu hình Expo và đường dẫn ảnh
├── assets/                    # Các ảnh từ mẫu Expo
└── docs/AI_USAGE_LOG.md        # Lịch sử dùng AI và bằng chứng kiểm tra
```

Tệp giao diện dùng `PascalCase.jsx`; tên component trùng tên tệp. Tệp JavaScript thuần tự đặt dùng `camelCase.js`. Giữ tên khởi đầu/cấu hình theo công cụ như `index.js`. Thư viện trong `node_modules/` được npm tạo lại và không đưa vào Git.

## Luồng điều hướng giữ từ M1

```text
Home
├── Profile
│   └── EditProfile
├── Activity
└── Settings
```

`App.jsx` đặt `ThemeProvider` trên `AppNavigator`. Navigator vẫn có một container, một stack và năm route. `initialRouteName="Home"` chọn màn hình đầu tiên.

Nút trong Home gọi `navigation.navigate()` để mở Profile, Activity hoặc Settings. Profile mở EditProfile. EditProfile có nút gọi `navigation.goBack()`; các màn hình con có nút quay lại trên thanh tiêu đề. Hiệu ứng chuyển màn hình vẫn tắt.

Ví dụ ngăn xếp thay đổi: `[Home]` → `[Home, Profile]` → `[Home, Profile, EditProfile]` → bấm quay lại → `[Home, Profile]`. Màn hình ở cuối ngăn xếp là màn hình đang hiển thị.

## State và luồng đổi theme

`ThemeProvider` sở hữu một state: `themeMode`, mặc định `'light'`. `isDark` và bộ `colors` được tính từ state đó. Context chia sẻ `{ themeMode, isDark, colors, toggleTheme }` cho các thành phần bên dưới, không chia sẻ dữ liệu hồ sơ hay điều hướng.

```text
Settings → ThemeToggle → toggleTheme() → setThemeMode(...)
→ Provider render lại → Context thay đổi → thành phần đọc Context render lại
→ nền, chữ và thanh tiêu đề đổi màu
```

`ScreenContainer` nhận `children`, dùng chung bố trí và màu nền cho cả 5 màn hình. `ThemeToggle` tách phần công tắc khỏi Settings. Mỗi màn hình đọc màu chữ từ Context; AppNavigator cũng đọc Context để đổi màu điều hướng.

**Theme chỉ nằm trong bộ nhớ của phiên chạy.** Chuyển màn hình không tạo lại Provider nên giữ theme. Tải lại toàn bộ hoặc khởi động lại app sẽ khởi tạo Light. Fast Refresh có thể giữ state, nên không dùng nó thay cho bước khởi động lại. Lưu theme qua các lần mở app thuộc M5, chưa có ở M2.

## Kiểm tra tự động và kiểm tra trên điện thoại

```sh
npm ls --depth=0
npx expo install --check
npx expo-doctor
```

Kết quả cấu hình, thư viện, Metro, gói JavaScript và kiểm tra logic nằm trong [nhật ký sử dụng AI](docs/AI_USAGE_LOG.md). Kiểm tra logic trên máy không xác nhận việc chạm nút hay quay lại trên giao diện native.

**Danh sách tự kiểm tra M2:** tất cả mục dưới đây chưa được người học xác nhận. Chỉ đánh dấu sau khi tự mở và thử trên thiết bị.

- [ ] T01: Mở app mới hoàn toàn → mặc định Light.
- [ ] T02: Home → Settings.
- [ ] T03: Bật chế độ tối → Settings đổi ngay.
- [ ] T04: Quay lại Home → Home vẫn Dark.
- [ ] T05: Home → Profile → EditProfile → các màn hình vẫn Dark.
- [ ] T06: Quay lại vẫn hoạt động trong Dark.
- [ ] T07: Home → Activity → Activity dùng Dark.
- [ ] T08: Settings → tắt chế độ tối → app trở về Light ngay.
- [ ] T09: Đi qua nhiều màn hình → theme không tự đổi.
- [ ] T10: Tải lại toàn bộ/khởi động lại app → Light. Đây là kết quả đúng ở M2.
- [ ] T11: Chữ dễ đọc, không trùng màu với nền.
- [ ] T12: Thanh tiêu đề, chữ và biểu tượng quay lại phù hợp cả Light/Dark.

Khi kiểm tra, chú ý cả nút quay lại trên thanh tiêu đề và nút/hành động quay lại của hệ thống nếu thiết bị có hỗ trợ. Nếu có lỗi, ghi màn hình đang ở, nút đã bấm và thông báo lỗi.

## Chưa triển khai

Chỉ dùng Context cho theme. Chưa có trạng thái hồ sơ dùng chung, biểu mẫu, kiểm tra dữ liệu, danh sách hoạt động, tương tác hoạt động, AsyncStorage, máy chủ, API hoặc đăng nhập. Chưa bắt đầu M3–M5; lưu dữ liệu qua lần khởi động lại thuộc M5.

Tài liệu tham khảo: [State trong React](https://react.dev/reference/react/useState), [Đọc Context](https://react.dev/reference/react/useContext) và [Theme cho React Navigation](https://reactnavigation.org/docs/themes/).
