# Ti Toàn | Kim Long Motor Miền Nam

Landing page bán hàng được tối ưu cho khách xem bằng điện thoại, tập trung vào 4 dòng xe:

- GK48EV
- KIM LONG X9 VAN
- KIM LONG 99 N29
- KIM LONG 99 G34

## Mở trong Google AI Studio

Project gốc: https://ai.studio/apps/396b6856-10d4-4643-9157-067b5dd866d8

Sau khi nhập project, AI Studio sẽ tự cài dependencies từ `package.json`. Giao diện chính nằm tại `src/App.tsx`, dữ liệu xe nằm tại `src/data.ts`.

## Chạy trên máy tính

Yêu cầu: Node.js.

1. Cài dependencies: `npm install`
2. Tạo `.env.local` nếu cần dùng Gemini hoặc gửi thông báo Telegram.
3. Chạy: `npm run dev`
4. Kiểm tra TypeScript: `npm run lint`
5. Build: `npm run build`

## Cấu hình nhận khách hàng

Form báo giá gửi dữ liệu về `/api/leads`. Có thể thêm `TELEGRAM_BOT_TOKEN` và `TELEGRAM_CHAT_ID` trong phần Secrets để nhận thông báo khách hàng mới qua Telegram.
