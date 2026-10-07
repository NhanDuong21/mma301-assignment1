# Bảng đối chiếu yêu cầu với mã nguồn

Cập nhật M7, 07/10/2026. PASS ở đây là mức bằng chứng tự động/mã nguồn được ghi rõ; không có nghĩa đã test giao diện native. PARTIAL nghĩa còn thiếu bằng chứng trực quan cần thiết. Không có xác nhận điện thoại trong sprint này.

| Mã | Yêu cầu | Cách triển khai | Tệp / hàm làm bằng chứng | Kiểm tra và kết quả | Trạng thái |
|---|---|---|---|---|---|
| R01 | Dự án Expo/React Native | JavaScript, Expo 57, React 19.2.3, RN 0.86.3 | package.json, index.js → registerRootComponent | M5: dependency phù hợp, doctor 21/21, hai bundle HTTP 200 | PASS tự động |
| R02 | Ít nhất 5 màn hình | Native Stack: Home, Profile, EditProfile, Activity, Settings | src/navigation/AppNavigator.jsx → AppNavigator | M6: StackRouter thật đi đủ route, gọi navigate/goBack qua handler; thao tác native chờ thiết bị | PASS logic |
| R03 | Hiển thị hồ sơ | Tên, giới thiệu và avatar chữ cái; Home đọc cùng Context | src/screens/ProfileScreen.jsx; HomeScreen.jsx; src/context/ProfileContext.jsx | M3/M6: sau Save, Home/Profile nhận tên mới; avatar không gọi mạng | PASS logic/source |
| R04 | Chỉnh sửa và validation | Bản nháp controlled; tên 2–50 sau trim, bio ≤160; Save/Cancel | src/screens/EditProfileScreen.jsx → handleSave; src/utils/profileValidation.js | M3/M6: các biên độ dài, invalid không lưu/không pop, valid bất biến, Cancel bỏ nháp | PASS logic |
| R05 | Theme dùng chung | ThemeProvider chia sẻ mode/màu/toggle; navigator nhận theme | src/context/ThemeContext.jsx; src/components/ThemeToggle.jsx; AppNavigator.jsx | M3/M6: đổi mode, input và header theo màu, state giữ qua điều hướng | PASS logic/source |
| R06 | FlatList và rỗng | 6 mục, ID cố định, chọn/bỏ chọn, bộ lọc, extraData | src/screens/ActivityScreen.jsx; src/components/ActivityItem.jsx; src/data/activities.js | M4/M6: key unique, select/unselect, count, filter, rỗng có thể đạt, mảng cũ giữ nguyên | PASS logic |
| R07 | AsyncStorage | Hai khóa tập trung; đọc rồi hydrate; effect ghi sau thay đổi | src/storage/appStorage.js; hai Provider | M5/M6: JSON save/remount restore, đọc chậm không ghi đè, ghi tuần tự; native restart còn chờ | PASS logic/bundle |
| R08 | Thành phần dùng lại | ScreenContainer, ThemeToggle, ActivityItem, LoadingScreen, StorageNotice | src/components/ | Source: container cho 5 screen; item cho 6 mục; loading cho 2 Provider; bundle giải quyết import | PASS source/bundle |
| R09 | Flexbox và bố trí linh hoạt | flex:1 cho khung; ScrollView form/profile; FlatList; hàng lọc co giãn | ScreenContainer.jsx; EditProfileScreen.jsx; ProfileScreen.jsx; ActivityScreen.jsx | Source có bố trí tương ứng; chưa nhìn native trên màn hình nhỏ, bàn phím và cỡ chữ lớn | PARTIAL — chờ thiết bị |
| R10 | Lỗi và fallback | Form hiện lỗi; storage parse/shape/read/write bắt lỗi và báo trên UI | profileValidation.js; appStorage.js; StorageNotice.jsx | M5/M6: invalid/corrupt/missing/read/write lỗi mô phỏng; state vẫn dùng được, ghi lại thành công xóa cảnh báo | PASS logic |

## Mức kiểm chứng

- M6: 22 nhóm kiểm tra đạt bằng script ngoài repo `node "$env:TEMP\mma301-sprint-check.cjs" "$PWD"`. Script nạp source thật bằng Babel, mô phỏng hooks/native UI/AsyncStorage; bài tích hợp dùng StackRouter thật. Đây không phải React renderer hay kiểm thử end-to-end native.
- M5: Android bundle 5.028.967 byte, iOS 5.026.794 byte, HTTP 200; Expo doctor 21/21.
- M6 không sửa source hoặc dependency sau gate M5; chạy lại toàn bộ logic tích hợp và kiểm tra tài liệu.
- M7: clone sạch tại M6 `71c0836`, npm ci/check/doctor 21/21/config/Metro/hai bundle và 22 nhóm logic đạt. Source/dependency không đổi trong M7. Cài mới không cần file bí mật hoặc node_modules cũ.
- Các ca T01–T18, D01 và checklist điện thoại ở [TEST_MATRIX.md](TEST_MATRIX.md); không gán PASS native cho bất kỳ dòng nào. npm audit còn 22 mục, ghi riêng giới hạn dependency.

## Ai sở hữu dữ liệu?

| Dữ liệu | Chủ sở hữu | Ai đọc | Có lưu qua lần mở app? |
|---|---|---|---|
| name, bio đã lưu | ProfileProvider | Home/Profile/EditProfile | Có, khóa mma301.profile |
| name, bio đang gõ; errors | EditProfileScreen | Chỉ form | Không; mất khi màn hình bị pop |
| themeMode | ThemeProvider | Navigator và UI | Có, khóa mma301.theme |
| selectedIds, showSelectedOnly | ActivityScreen | FlatList/ActivityItem | Không; mất khi màn hình bị pop |
| hydrated, storageError | Từng Provider | Cổng loading/cảnh báo | Không; tính lại mỗi lần khởi động |

Hướng dẫn quyết định thiết kế: [DESIGN_DECISIONS.md](DESIGN_DECISIONS.md). Lịch sử kiểm tra: [AI_USAGE_LOG.md](AI_USAGE_LOG.md).
