# MMA301 — Bài tập 1: Ứng dụng hồ sơ và hoạt động

Giai đoạn hiện tại: **M4 — Danh sách hoạt động tương tác**.

## Cài đặt và chạy

JavaScript, Expo `~57.0.27`, React `19.2.3`, React Native `0.86.3`, React Navigation Native Stack. Giữ phiên bản trong `package-lock.json`.

Cần Node.js LTS, npm, Git và Expo Go tương thích SDK 57. Máy kiểm tra dùng Node 24.15.0, npm 11.12.1. Điện thoại và máy tính cùng mạng khi dùng mạng nội bộ.

```sh
npm ci
npm start
```

Quét QR trong Expo Go. `npm run android` cần thiết bị/máy ảo Android; `npm run ios` cần macOS và máy ảo iOS. Windows có thể dùng iPhone thật qua Expo Go. Giữ terminal mở; Ctrl+C để dừng.

## Cấu trúc và cách đặt tên

- `App.jsx`: ThemeProvider → ProfileProvider → AppNavigator.
- `src/navigation/AppNavigator.jsx`: Home → Profile → EditProfile; Home → Activity hoặc Settings.
- `src/context/`: hồ sơ và theme dùng chung.
- `src/components/`: ScreenContainer và ThemeToggle dùng lại.
- `src/screens/`: năm màn hình.
- `src/utils/profileValidation.js`: quy tắc kiểm tra hồ sơ.
- `docs/AI_USAGE_LOG.md`: lịch sử hỗ trợ AI; `docs/DEBUG_LOG.md`: lỗi thật và cách sửa.

Component có JSX dùng `PascalCase.jsx`; JavaScript thuần dùng `camelCase.js`. Tệp khởi đầu/cấu hình giữ tên theo công cụ, ví dụ `index.js`.

## Hồ sơ và biểu mẫu

ProfileContext giữ `{ name, bio }`, mặc định Student / MMA301 learner. Profile hiển thị tên, giới thiệu và chữ cái đại diện. Home đọc cùng hồ sơ để chào người dùng.

EditProfile tạo bản nháp khi mở. Mỗi TextInput có `value` và `onChangeText`. Lưu → kiểm tra → sai thì hiện lỗi và ở lại; đúng thì tạo hồ sơ mới rồi quay lại. Hủy/quay lại bỏ bản nháp. Tên sau trim dài 2–50 ký tự; giới thiệu tối đa 160; khi lưu bỏ khoảng trắng hai đầu. Độ dài dùng JavaScript `length` (đơn vị UTF-16).

ThemeContext chia sẻ chế độ sáng/tối và màu cho màn hình, ô nhập, lỗi và thanh điều hướng. State vẫn ở bộ nhớ: khởi động lại trở về hồ sơ mặc định và Light. Lưu dữ liệu thuộc M5. Danh sách hoạt động đã triển khai ở M4.

## Kiểm tra

```sh
npx expo install --check
npx expo-doctor
```

M3: sáu nhóm kiểm tra logic bằng mock chạy đạt; Android/iOS bundle HTTP 200; doctor 21/21; kiểm tra dependency đạt. Xem chi tiết và giới hạn trong [nhật ký AI](docs/AI_USAGE_LOG.md), [nhật ký lỗi](docs/DEBUG_LOG.md).

Kiểm tra điện thoại đang chờ người học: năm màn hình, nhập sai/đúng, Hủy, quay lại hệ thống, cuộn khi mở bàn phím và màu sáng/tối. Kết quả script không chứng minh UI native đã chạy trên thiết bị.


## Danh sách hoạt động (M4)

Sáu mục trong `src/data/activities.js` có ID duy nhất, không đổi theo vị trí. `ActivityScreen` giữ `selectedIds` và bộ lọc trong state cục bộ. `FlatList` nhận `data` sau lọc, `renderItem` tạo ActivityItem, `keyExtractor` lấy ID và `extraData` báo thay đổi lựa chọn. Chọn dùng mảng mới với `...`; bỏ chọn dùng `filter`. Không sửa trực tiếp mảng cũ.

Bật “Chỉ hiển thị đã chọn” lúc chưa chọn gì sẽ đưa `data` về rỗng, hiển thị `ListEmptyComponent`. Số đã chọn tính từ toàn bộ lựa chọn. Quay lại Home làm Activity bị gỡ khỏi stack; mở Activity lại sẽ khởi tạo lựa chọn/bộ lọc mới. M4 không lưu lựa chọn.

M4: 9 nhóm logic đạt (gồm hồi quy M3), doctor 21/21, dependency phù hợp và hai bundle đạt. Thao tác danh sách/khả năng cuộn trên điện thoại vẫn chờ người học xác nhận.
