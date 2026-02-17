#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "=========================================="
echo "  Ketcher Demo 前端部署脚本"
echo "=========================================="

# 进入前端目录
cd "$PROJECT_DIR/frontend"

# 安装依赖（如需要）
if [ ! -d "node_modules" ]; then
    echo "[1/3] 安装前端依赖..."
    npm install
else
    echo "[1/3] 依赖已安装，跳过"
fi

# 构建前端
echo "[2/3] 构建前端..."
npm run build

# 部署到 Nginx
echo "[3/3] 部署到 Nginx..."
sudo mkdir -p /var/www/ketcher_demo
sudo cp -r "$PROJECT_DIR/frontend/dist" /var/www/ketcher_demo/

# 重新加载 Nginx
sudo nginx -s reload

echo ""
echo "=========================================="
echo "  部署完成!"
echo "  访问地址: http://localhost:50002"
echo "=========================================="