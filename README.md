# 記帳本
紀錄每日支出的網站。
## 網站畫面
![螢幕擷取畫面 2022-06-22 153536](https://user-images.githubusercontent.com/103798145/174973636-e22d6c90-9cac-4a2d-bc62-902a4c00fc76.jpg)
## 功能說明
+ 使用者可註冊帳號並登入
+ 可使用種子資料登入：
```
名稱：廣志，密碼：123
名稱：小新，密碼：123
```
+ 可新增、編輯與刪除記錄
+ 可察看特定支出類別的紀錄
## 安裝流程
1. 請確認有安裝 Node.js 與 npm
2. 將專案 clone 到本地
```
git clone https://github.com/JuneChen1/expense-tracker.git
```
3. 安裝套件
```
npm install
```
4. 安裝nodemon套件
```
npm install nodemon
```
5. 將 .env.example 檔名更改為 .env，並修改 MONGODB_URI
```
MONGODB_URI = mongodb+srv://<account>:<password>@cluster0.9lnbo.mongodb.net/<database name>?retryWrites=true&w=majority
```
6. 建立種子資料
```
npm run seed
```
7. 啟動伺服器
```
npm run dev
```
8. 當終端機出現以下訊息，代表伺服器已成功啟動
```
Express is running on http://localhost:3000
```
9. 開啟瀏覽器輸入 http://localhost:3000
## 環境建置
+ Node.js 16.15.0
+ Express 4.18.1
+ Express-handlebars 3.0.0
+ Bootstrap 5.1.3
+ Font-awesome 5.8.1
+ Mongoose 6.4.0
+ Dotenv 16.0.1
+ Bcryptjs 2.4.3
+ Connect-flash 0.1.1
+ Express-session 1.17.1
+ Method-override 3.0.0
+ Passport 0.4.1
+ Passport-local 1.0.0
