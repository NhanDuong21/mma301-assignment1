# MMA301 — Bài tập 1: Ứng dụng hồ sơ và hoạt động

**M3–M7 đã hoàn tất phần triển khai và kiểm chứng tự động.** Bản sẵn sàng để người học kiểm tra trên điện thoại và luyện phỏng vấn. Chưa có xác nhận UI native cuối sprint.

Ứng dụng có 5 màn hình: xem/sửa hồ sơ, kiểm tra dữ liệu nhập, chọn/lọc hoạt động và đổi giao diện sáng/tối. Hồ sơ và theme lưu trên máy. Không có máy chủ, đăng nhập, Firebase hoặc tính năng Assignment 2.

## Công nghệ và cài đặt

JavaScript + React Native + Expo + React Navigation Native Stack + Context + AsyncStorage. Baseline: Expo `~57.0.27`, React `19.2.3`, RN `0.86.3`, AsyncStorage `2.2.0`. Giữ `package-lock.json`; không tự nâng SDK.

Cần Node.js LTS, npm, Git và Expo Go tương thích SDK 57. Máy kiểm tra dùng Windows, Node `24.15.0`, npm `11.12.1`.

```sh
git clone https://github.com/NhanDuong21/mma301-assignment1.git
cd mma301-assignment1
npm ci
npm start
```

Quét QR bằng Expo Go trên Android hoặc Camera trên iPhone. Khi dùng mạng nội bộ, điện thoại và máy tính cùng mạng. Giữ terminal mở; Ctrl+C để dừng. Nếu kết nối lỗi, kiểm tra mạng/tường lửa và [phiên bản Expo Go](https://expo.dev/go).

`npm run android` cần thiết bị/máy ảo Android đã cấu hình. `npm run ios` cần macOS và máy ảo iOS; trên Windows có thể dùng iPhone thật qua Expo Go. Không cần file secret hoặc cấu hình backend.

## Cấu trúc mã nguồn

```text
index.js                      Đăng ký App với Expo
App.jsx                       ThemeProvider → ProfileProvider → AppNavigator
src/
├── navigation/               Năm route và theme của thanh tiêu đề
├── context/                  ThemeContext, ProfileContext
├── screens/                  Home, Profile, EditProfile, Activity, Settings
├── components/               Khung màn hình, công tắc, item, loading, cảnh báo
├── data/activities.js        Sáu hoạt động với ID cố định
├── utils/profileValidation.js  Kiểm tra tên/giới thiệu và shape của hồ sơ
└── storage/appStorage.js     Hai khóa, JSON, xử lý lỗi, thứ tự ghi
docs/                         Yêu cầu, quyết định thiết kế, test, debug, học và AI
```

Component chứa JSX dùng `PascalCase.jsx`; JavaScript thuần tự đặt dùng `camelCase.js`. Tệp khởi đầu/cấu hình giữ tên công cụ quy định như `index.js`. Không commit node_modules, .expo hoặc secret.

## Màn hình và luồng chạy

```text
Khởi động → đọc theme → đọc hồ sơ → Home
Home ──→ Profile ──→ EditProfile ──→ Lưu hợp lệ/Hủy ──→ Profile
     ├─→ Activity
     └─→ Settings
```

Các màn hình con có nút quay lại trên header. Native Stack giữ màn hình trước ở dưới; pop EditProfile bỏ bản nháp, pop Activity bỏ lựa chọn cục bộ. Provider ngoài stack nên hồ sơ/theme vẫn còn khi chuyển màn hình.

## State và Context

| Dữ liệu | Nơi sở hữu | Lưu qua lần mở app? |
|---|---|---|
| Hồ sơ chính name/bio | ProfileProvider; Home/Profile/Edit đọc chung | Có |
| themeMode | ThemeProvider; UI và navigator đọc chung | Có |
| Bản nháp name/bio và errors | EditProfileScreen | Không |
| selectedIds và showSelectedOnly | ActivityScreen | Không |

Context chia sẻ dữ liệu; useState giữ dữ liệu trong phiên hiện tại; AsyncStorage giữ bản sao để khôi phục phiên sau. Không cần Redux cho hai nhóm dữ liệu nhỏ này.

## Sửa hồ sơ và danh sách hoạt động

Profile mặc định là `Student` / `MMA301 learner`, avatar dùng chữ cái từ tên, không cần ảnh mạng. Form có TextInput controlled: `value` lấy từ state nháp, `onChangeText` cập nhật nháp.

Lưu → kiểm tra → sai thì hiện lỗi và ở lại; đúng thì tạo object hồ sơ mới, trim hai đầu rồi quay lại. Tên sau trim phải dài 2–50; giới thiệu tối đa 160 ký tự. Quy tắc độ dài dùng JavaScript `length` (UTF-16). Hủy/back không cập nhật Context.

Activity dùng FlatList với data, renderItem, keyExtractor lấy ID, extraData theo mảng lựa chọn và ListEmptyComponent. Chọn dùng spread, bỏ chọn dùng filter; không mutate mảng. Bật “Chỉ hiển thị đã chọn” khi chưa chọn gì sẽ hiện thông báo rỗng. Mở Activity mới khởi tạo lại lựa chọn và bộ lọc.

## Lưu trữ và xử lý lỗi

Chỉ `appStorage.js` gọi AsyncStorage, dùng `mma301.profile` và `mma301.theme`. Lúc đầu mỗi Provider đọc, parse JSON, kiểm tra dữ liệu rồi đánh dấu `hydrated`. Trong lúc chờ chỉ hiện loading; Home chỉ xuất hiện khi cả hai đọc xong.

Effect lưu chạy sau hydration và sau khi state đổi. Ref ghi nhớ giá trị vừa đọc/đã yêu cầu ghi, tránh ghi đè mặc định hoặc ghi lại lúc startup. Những lần ghi cùng key chạy tuần tự để dữ liệu mới nhất thắng.

Thiếu key là lần đầu bình thường. JSON hỏng, sai kiểu hoặc lỗi đọc → mặc định và cảnh báo, không tự ghi đè dữ liệu cũ. Lỗi ghi → UI vẫn cập nhật nhưng báo chưa lưu; lần thay đổi tiếp theo thử lại và xóa cảnh báo nếu thành công. Từ M5, mở lại app khôi phục theme đã lưu; hành vi Light sau restart trong nhật ký M2 là lịch sử lúc chưa có storage.

## Kiểm tra và bằng chứng

```sh
npx expo install --check
npx expo-doctor
npx expo config --type public
npm audit
```

Bản clone sạch đã chạy `npm ci`, check/doctor 21/21, config, Metro, bundle Android/iOS HTTP 200 và 22 nhóm kiểm tra logic/tích hợp. Script dùng mock hooks/UI/storage và StackRouter thật; không chứng minh thao tác native hoặc lưu đĩa thật.

- [Ma trận kiểm thử và một checklist cuối trên điện thoại](docs/TEST_MATRIX.md)
- [Bảng đối chiếu R01–R10](docs/REQUIREMENT_TRACEABILITY_MATRIX.md)
- [Quyết định thiết kế và đánh đổi](docs/DESIGN_DECISIONS.md)
- [Nhật ký lỗi thật và cách sửa](docs/DEBUG_LOG.md)
- [Bản đồ học theo luồng, câu hỏi và sáu bài đổi yêu cầu](docs/LEARNING_MAP.md)
- [Nhật ký sử dụng AI, giữ nguyên lịch sử M0–M2](docs/AI_USAGE_LOG.md)

## Giới hạn đã biết

- Chưa xác minh native UI, bàn phím, gesture/back, bố trí màn hình nhỏ/cỡ chữ lớn và đóng/mở app thật; R09 còn PARTIAL ở mức bằng chứng. Người học cần hoàn thành checklist trước demo.
- AsyncStorage không mã hóa; không dùng để lưu bí mật. Đóng app ngay khi vừa sửa có thể ngắt lần ghi đang chạy; không có nút thử lại riêng hoặc đồng bộ máy chủ.
- `npm audit` còn 22 mục (7 vừa, 15 cao, 0 nghiêm trọng nhất) trong cây dependency; chưa sửa. Không chạy `npm audit fix --force` hoặc đổi Expo/RN để ép hết cảnh báo. Chi tiết phạm vi ở ma trận kiểm thử.
- Chưa tạo APK; bài kiểm tra bundle không thay thế kiểm thử bản native. Chỉ triển khai Assignment 1.

AI đã hỗ trợ phần lớn mã và tài liệu trong sprint. Người học cần tự chạy, đọc luồng và giải thích/debug/sửa source; không dùng kết quả AI như bằng chứng đã tự kiểm tra điện thoại.
