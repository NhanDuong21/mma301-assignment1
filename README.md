# MMA301 — Bài tập 1: Ứng dụng hồ sơ và hoạt động

Giai đoạn hiện tại: **M1 — Khung điều hướng dạng ngăn xếp**.

Dự án sử dụng **JavaScript + React Native + Expo + React Navigation Native Stack**. M1 có 5 màn hình đơn giản để học cách chuyển màn hình và quay lại. Nội dung hồ sơ, chỉnh sửa, hoạt động và cài đặt hiện chỉ là chữ minh họa.

## Chuẩn bị, cài đặt và chạy

- Node.js bản LTS, npm và Git. Máy kiểm tra dùng Node `v24.15.0`, npm `11.12.1` trên Windows.
- Điện thoại có Expo Go tương thích với SDK 57, hoặc máy ảo đã cấu hình. Nếu dùng kết nối mạng nội bộ, điện thoại và máy tính nên ở cùng mạng.
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
├── App.jsx                    # Chỉ render AppNavigator
├── index.js                   # Đăng ký App với Expo
├── src/
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

## Luồng điều hướng M1

```text
Home
├── Profile
│   └── EditProfile
├── Activity
└── Settings
```

`App.jsx` render `AppNavigator`. Trong đó, `NavigationContainer` bao ngoài một `Stack.Navigator`; các `Stack.Screen` liên kết tên route với component. `initialRouteName="Home"` chọn màn hình đầu tiên.

Nút trong Home gọi `navigation.navigate()` để mở Profile, Activity hoặc Settings. Profile mở EditProfile. EditProfile có nút gọi `navigation.goBack()`; các màn hình con cũng có nút quay lại mặc định trên thanh tiêu đề. M1 tắt hiệu ứng chuyển màn hình bằng `animation: 'none'`.

Ví dụ ngăn xếp thay đổi: `[Home]` → `[Home, Profile]` → `[Home, Profile, EditProfile]` → bấm quay lại → `[Home, Profile]`. Màn hình ở cuối ngăn xếp là màn hình đang hiển thị.

## Kiểm tra tự động và kiểm tra trên điện thoại

```sh
npm ls --depth=0
npx expo install --check
npx expo-doctor
```

Kết quả cấu hình, thư viện, Metro, gói JavaScript và kiểm tra logic nằm trong [nhật ký sử dụng AI](docs/AI_USAGE_LOG.md). Kiểm tra logic trên máy không xác nhận việc chạm nút hay quay lại trên giao diện native.

**Danh sách tự kiểm tra M1:** tất cả mục dưới đây chưa được người học xác nhận. Chỉ đánh dấu sau khi tự mở và thử trên thiết bị.

- [ ] T01: Home mở đầu tiên.
- [ ] T02: Home → Profile thành công.
- [ ] T03: Profile → Edit Profile thành công.
- [ ] T04: Bấm nút quay lại trong Edit Profile → Profile.
- [ ] T05: Bấm quay lại trên thanh tiêu đề Profile → Home.
- [ ] T06: Home → Activity thành công.
- [ ] T07: Quay lại từ Activity → Home.
- [ ] T08: Home → Settings thành công.
- [ ] T09: Quay lại từ Settings → Home.
- [ ] T10: Đi qua nhiều màn hình liên tiếp không bị thoát ứng dụng do lỗi.

Khi kiểm tra, chú ý cả nút quay lại trên thanh tiêu đề và nút/hành động quay lại của hệ thống nếu thiết bị có hỗ trợ. Nếu có lỗi, ghi màn hình đang ở, nút đã bấm và thông báo lỗi.

## Chưa triển khai

Chưa có Context, đổi giao diện sáng/tối, trạng thái hồ sơ dùng chung, biểu mẫu nhập liệu, kiểm tra dữ liệu, danh sách hoạt động, tương tác hoạt động, lưu dữ liệu, máy chủ, API hoặc đăng nhập. Chưa bắt đầu M2–M5.

Tài liệu tham khảo: [Cài React Navigation với Expo](https://reactnavigation.org/docs/getting-started/), [Native Stack](https://reactnavigation.org/docs/native-stack-navigator/) và [Chuyển màn hình](https://reactnavigation.org/docs/navigating/).
