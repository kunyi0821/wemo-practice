# 使用 Node.js 官方的 lts-alpine 作為基底鏡像
FROM node:lts-alpine

# 設定工作目錄
WORKDIR /app

# 複製應用程式程式碼到容器內
COPY ./src /app

# 安裝應用程式的相依套件
RUN npm install

# 编译 TypeScript 代码
RUN npm run build

# 開放應用程式的端口
EXPOSE 3000

# 定義容器啟動命令
CMD ["node", "dist/main.js"]