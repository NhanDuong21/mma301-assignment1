# Ma trận kiểm thử cuối sprint

Ngày: 07/10/2026. Phiên bản mã chạy: M6 `71c0836`, cùng source ứng dụng/dependency với M5 `ff18eff`. M7 bổ sung tài liệu; không thay source ứng dụng.

## Hiểu đúng kết quả

- `AI_AUTOMATED_PASS`: đạt trong phạm vi script, source, dependency hoặc bundle đã ghi. Không đồng nghĩa chạy đạt trên điện thoại.
- `STUDENT_DEVICE_PENDING`: chưa có bằng chứng người học kiểm tra UI/hệ điều hành native.
- `FAIL`: phép kiểm tra không đạt. Audit dependency được ghi FAIL riêng, không bị che bởi doctor đạt.
- Script logic đặt ngoài repo theo yêu cầu không commit script tạm. Nó dùng Babel nạp source, mô phỏng hooks/component/AsyncStorage và dùng StackRouter thật cho luồng tích hợp. Không phải React test renderer; không kiểm chứng lịch render thực tế, bridge native, gesture hoặc đĩa thật.

## Các ca chức năng

| ID | Nhóm | Điều kiện trước | Bước chạy | Mong đợi | Thực tế | Trạng thái | Bằng chứng |
|---|---|---|---|---|---|---|---|
| T01 | Khởi động lần đầu | Mock storage không có hai khóa | Tạo ThemeProvider rồi ProfileProvider; đợi effect | Loading trước, sau đó Light và Student; không tự ghi mặc định | Đúng giá trị, 0 lần ghi | AI_AUTOMATED_PASS | Nhóm first run/loading; hai Context |
| T02 | Đọc hồ sơ | Context chứa hồ sơ hợp lệ | Render Profile và Home; Save tên mới rồi render lại | Cả hai đọc cùng tên; Profile có avatar/bio | Cùng nhận tên mới; avatar/bio có trong source | AI_AUTOMATED_PASS | Nhóm valid save/shared; ProfileScreen, HomeScreen |
| T03 | Tên/giới thiệu sai | Form mở từ hồ sơ cũ | Tên rỗng, trắng, 1, 51 ký tự; bio 161; gọi Lưu | Có lỗi; Context giữ nguyên; invalid không goBack | Đúng; kiểm tra biên validator và handler invalid | AI_AUTOMATED_PASS | validateProfile; controlled draft invalid save |
| T04 | Lưu hợp lệ | Form mở; name 2/50, bio 160 là hợp lệ | Gõ tên có khoảng trắng hai đầu và bio; Lưu | Object mới đã trim; hồ sơ cũ không bị mutate; pop một màn hình | Đúng qua handler và StackRouter | AI_AUTOMATED_PASS | EditProfileScreen → handleSave; valid save |
| T05 | Hủy | Có hồ sơ đã lưu | Sửa nháp → Hủy → mở lại Edit | Không cập nhật Context; mở lại lấy hồ sơ hiện tại | Đúng; bản nháp bỏ đi | AI_AUTOMATED_PASS | Nhóm cancel/reopen; luồng tích hợp |
| T06 | Đổi theme | Light đã hydrate | Gọi Switch của ThemeToggle, render lại | Dark; màu input/header/background đổi | Context và cấu hình màu đổi đúng | AI_AUTOMATED_PASS | ThemeToggle, ThemeContext, AppNavigator |
| T07 | Theme/hồ sơ qua phiên mới | Storage mock đọc/ghi thành công | Đổi theme, Save; đợi ghi; tạo Provider mới | Khôi phục Dark và hồ sơ mới từ JSON | Đúng trong mock remount | AI_AUTOMATED_PASS | Nhóm save JSON/restore; native xem D01 |
| T08 | Danh sách thường | Màn hình Activity mới | Lấy data/keyExtractor | 6 mục, key unique ổn định | 6 ID khác nhau, dùng item.id | AI_AUTOMATED_PASS | activities.js; list keys/collection |
| T09 | Danh sách rỗng | selectedIds rỗng | Bật bộ lọc đã chọn | data rỗng, hiện lời hướng dẫn tắt lọc | Đúng; cũng đạt khi bỏ chọn mục cuối đang lọc | AI_AUTOMATED_PASS | ListEmptyComponent; filter/empty |
| T10 | Chọn/bỏ chọn | 6 mục, chưa chọn | Nhấn item, bật lọc, nhấn lại, tắt lọc | Số chọn 0→1→0, data 6→1→0→6; mảng cũ giữ nguyên | Đúng, extraData nhận mảng mới | AI_AUTOMATED_PASS | ActivityScreen → toggleActivity |
| T11 | Storage thiếu/hỏng | Các giá trị JSON hỏng/null/array/sai shape/mode | readStoredValue và validator | Thiếu khóa dùng mặc định không báo lỗi; hỏng dùng mặc định và cảnh báo | Đạt toàn bộ mẫu dữ liệu đã thử | AI_AUTOMATED_PASS | appStorage.js; corrupt/missing/invalid tests |
| T12 | Đủ năm route | Native Stack config thật; Home đầu | Home→Profile→Edit→Save/Cancel→Home→Activity→Home→Settings→Home | Route đúng; Context còn nguyên | StackRouter thật và handler source đi đúng | AI_AUTOMATED_PASS | Nhóm integrated 5-route workflow |
| T13 | Đọc chậm | Promise đọc chưa hoàn tất | Render Provider; kiểm tra trước/sau giải phóng đọc | Chỉ Loading; không ghi sớm/không ghi lại giá trị restore | 0 ghi trước/sau hydrate chưa có thao tác | AI_AUTOMATED_PASS | hydrated + lastRequestedValue; deferred read |
| T14 | Lỗi đọc | getItem bị mô phỏng reject | Mount hai Provider | Fallback, UI cảnh báo, không tự ghi đè dữ liệu | Đúng, StorageNotice có cảnh báo | AI_AUTOMATED_PASS | Nhóm read failures; try/catch |
| T15 | Lỗi ghi và phục hồi | setItem reject, sau đó hoạt động lại | Sửa profile/theme; chờ; sửa lần nữa | State vẫn đổi, báo chưa lưu; lần ghi sau thành công xóa lỗi | Đúng; dữ liệu mới nhất được lưu | AI_AUTOMATED_PASS | Nhóm write failure/retry |
| T16 | Ghi liên tiếp | Làm chậm lần ghi thứ nhất | Gửi hai giá trị cùng khóa | Lần hai đợi lần một; giá trị sau cùng thắng | Đúng thứ tự và JSON cuối | AI_AUTOMATED_PASS | pendingWrites; serialized/latest tests |
| T17 | State cục bộ | Đã chọn Activity | Pop Activity, tạo màn hình mới | Selection/filter khởi tạo lại; profile/theme vẫn giữ | Đúng trong mô phỏng vòng đời | AI_AUTOMATED_PASS | Luồng tích hợp; native cần D01 |
| T18 | Provider từ chối dữ liệu sai | Provider đã hydrate | updateProfile(null) và tên rỗng | Trả false, không thay hồ sơ/không ghi | Đúng | AI_AUTOMATED_PASS | ProfileContext → updateProfile |
| D01 | Toàn ứng dụng trên điện thoại | Expo Go SDK 57, chạy Metro | Thực hiện checklist cuối tài liệu này | UI, bàn phím, back, state và persistence native đúng | Chưa có xác nhận từ người học | STUDENT_DEVICE_PENDING | Chưa có ảnh/video/ghi nhận thiết bị |

## Lệnh và bằng chứng bản clone sạch

Thư mục tạm ngoài repo: `C:\Users\LENOVO\AppData\Local\Temp\mma301-release-20261007-71c0836`. Clone trực tiếp remote main tại SHA `71c083603c6b9a5fcb269f01d9a55b1e5358f55a`. Không sao chép node_modules cũ, không dùng file bí mật.

| Lệnh/kiểm tra | Kết quả thực tế | Trạng thái |
|---|---|---|
| git clone --branch main --single-branch https://github.com/NhanDuong21/mma301-assignment1.git <thư-mục-tạm> | Thành công, đúng SHA M6 | AI_AUTOMATED_PASS |
| npm ci | Mã 0; thêm 485 gói, audit 486 gói; có cảnh báo uuid deprecated và 22 mục audit | AI_AUTOMATED_PASS cho cài đặt |
| npx expo install --check | Dependencies are up to date | AI_AUTOMATED_PASS |
| npx expo-doctor | 21/21, không bỏ qua check | AI_AUTOMATED_PASS |
| npx expo config --type public | SDK 57.0.0; Android/iOS; assets có trong Git | AI_AUTOMATED_PASS |
| npm start -- --localhost --port 8086 | Metro chạy; /status trả packager-status:running | AI_AUTOMATED_PASS |
| /index.bundle?platform=android&dev=true&minify=false | HTTP 200, 5.028.952 byte | AI_AUTOMATED_PASS |
| /index.bundle?platform=ios&dev=true&minify=false | HTTP 200, 5.026.779 byte | AI_AUTOMATED_PASS |
| node "$env:TEMP\mma301-sprint-check.cjs" "$PWD" tại clone | PASS, 22 nhóm, 15 cảnh báo fault injection có chủ đích | AI_AUTOMATED_PASS |
| node "$env:TEMP\mma301-doc-check.cjs" "$PWD" | UTF-8, code fence, link nội bộ, lịch sử AI M0–M2 giữ nguyên | AI_AUTOMATED_PASS |
| git diff --check | Đạt sau sửa D02; chạy trước commit | AI_AUTOMATED_PASS |
| npm audit --json tại repo chính (cùng lockfile) | Mã 1; 22 mục: 7 moderate, 15 high, 0 critical | FAIL — giới hạn dependency chưa sửa |

M7 chạy lại kiểm tra tài liệu sau khi thêm đủ tài liệu cuối. Metro được dừng bằng Ctrl+C sau kiểm tra; mã thoát khi dừng chủ động không phải bundle lỗi. Kích thước bundle ở clone khác repo chính vì metadata đường dẫn; cả hai đều biên dịch thành công. Các script tạm không đi cùng clone; giảng viên có thể chạy lại các lệnh Expo và checklist, hoặc tự viết bài kiểm tra theo ca phía trên.

## Rà soát source và bảo mật

- Import được giải quyết trong hai bundle. Dependency trực tiếp đúng phạm vi: navigation, native screens/safe area, AsyncStorage, Expo/React/RN.
- Một NavigationContainer, năm tên route khớp handler; hai Provider bao navigation tree.
- Chỉ appStorage gọi AsyncStorage; hai key khai báo một nơi. JSON parse/stringify và read/write đều nằm trong try/catch.
- Không push/splice state; hai TextInput controlled; FlatList dùng ID, extraData và empty có thể đạt.
- Không thấy file secret hoặc mẫu khóa phổ biến trong source được rà. Đây không phải kiểm toán bảo mật toàn lịch sử Git.
- Chỉ console.warn phục vụ lỗi storage trong __DEV__; không có console.error trong source ứng dụng.
- npm audit đánh dấu cả gói bị ảnh hưởng gián tiếp, không tương đương 22 lỗ hổng độc lập đã khai thác được. Nhánh bị báo gồm Expo CLI/Metro, React Native, braces, node-forge và uuid. Một số fixAvailable đề xuất Expo 44.0.6 hoặc RN 0.72.17; các gói khác báo có bản sửa. Chưa thử thay đổi cây dependency vì sprint khóa baseline và chỉ thêm dependency bắt buộc. Không khẳng định mọi cảnh báo đều vô hại hoặc không thể sửa; cần đánh giá tương thích riêng. Không chạy audit fix --force.

## Một checklist cuối trên điện thoại

Mỗi mục chỉ đánh dấu sau khi tự thực hiện. Ghi thêm thiết bị, hệ điều hành, phiên bản Expo Go và ngày kiểm tra.

- [ ] Mở app với dữ liệu lần đầu → loading rồi Home, Student và Light; không màn hình đỏ.
- [ ] Home → Profile: avatar chữ cái, tên và giới thiệu đúng.
- [ ] Profile → Edit: tên rỗng/toàn khoảng trắng/1 ký tự/51 ký tự hoặc bio 161 ký tự → Lưu hiện lỗi và ở lại.
- [ ] Tên 2 hoặc 50 ký tự, bio tối đa 160 → Lưu → Profile và Home cập nhật; kiểm tra trim hai đầu.
- [ ] Sửa nháp rồi Hủy; mở lại form → dữ liệu đã lưu còn nguyên. Thử cả back trên header và back/gesture hệ thống.
- [ ] Activity: thấy 6 mục; chọn nhiều, bỏ chọn; số đếm/trạng thái cập nhật đúng.
- [ ] Bật bộ lọc lúc không chọn gì, hoặc bỏ chọn mục cuối đang lọc → hiện thông báo rỗng; tắt lọc → đủ 6 mục.
- [ ] Quay về Home rồi mở lại Activity → lựa chọn/bộ lọc về mặc định (đúng thiết kế).
- [ ] Settings đổi Dark/Light; đi qua đủ năm màn hình → chữ, ô nhập, lỗi, card và header đọc được, theme giữ nguyên.
- [ ] Lưu hồ sơ và Dark, chờ vài giây rồi đóng/mở lại ứng dụng thật → khôi phục đúng; không dùng Fast Refresh thay bước này.
- [ ] Màn hình nhỏ/cỡ chữ lớn: form cuộn được khi mở bàn phím; nút Lưu/Hủy và nội dung không bị che; danh sách cuộn được.
- [ ] Đi lại đủ năm route vài lần → back hợp lý, không lỗi đỏ; ghi log/ảnh và các bước nếu thấy lỗi.

Các lỗi storage hỏng/không đọc/không ghi đã được mô phỏng tự động. Không yêu cầu người mới sửa dữ liệu native thủ công chỉ để đánh dấu checklist. Nếu cần demo fault injection, thực hiện trong phiên debug có hướng dẫn và không commit dữ liệu lỗi vào ứng dụng.
