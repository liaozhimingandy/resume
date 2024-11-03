# 构建阶段
FROM node:20.11.1 AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 并安装依赖
COPY package*.json ./
RUN npm install

# 复制项目文件并构建
COPY . .
RUN npm run build

# 生产阶段：使用 Nginx 作为静态文件服务器
FROM nginx:alpine

# 复制构建后的文件到 Nginx 目录
COPY --from=build /app/dist /usr/share/nginx/html

# 暴露 Nginx 默认的 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
