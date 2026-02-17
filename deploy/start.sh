#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "=========================================="
echo "  Ketcher Demo 启动脚本"
echo "  后端端口: 50001"
echo "  前端端口: 50002"
echo "=========================================="

# 激活 conda 环境
# if command -v conda &> /dev/null; then
#     echo "[1/3] 激活 conda 环境 (DEMO)..."
#     eval "$(conda shell.bash hook)"
#     conda activate DEMO
# fi

# 启动后端服务
echo "[2/3] 启动后端服务 (端口 50001)..."
cd "$PROJECT_DIR"
nohup uvicorn backend.app.main:app --host 0.0.0.0 --port 50001 > /tmp/ketcher_backend.log 2>&1 &
BACKEND_PID=$!
echo "    后端 PID: $BACKEND_PID"

# 等待后端启动
sleep 3

# 检查后端是否启动成功
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo "    错误: 后端启动失败，请查看日志 /tmp/ketcher_backend.log"
    exit 1
fi
echo "    后端启动成功"

# 部署前端到 Nginx
echo "[3/3] 部署前端到 Nginx (端口 50002)..."

# 构建前端（如果需要）
if [ -d "$PROJECT_DIR/frontend/dist" ]; then
    echo "    前端已构建，使用现有 dist 目录"
else
    echo "    正在构建前端..."
    cd "$PROJECT_DIR/frontend"
    npm run build
    cd "$PROJECT_DIR"
fi

# 复制前端构建文件到 Nginx 目录
mkdir -p /var/www/ketcher_demo
cp -r "$PROJECT_DIR/frontend/dist" /var/www/ketcher_demo/

# 启动 Nginx
if pgrep nginx > /dev/null; then
    echo "    重新加载 Nginx 配置..."
    nginx -s reload
else
    echo "    启动 Nginx..."
    nginx
fi

echo ""
echo "=========================================="
echo "  启动完成!"
echo "  后端: http://localhost:50001"
echo "  前端: http://localhost:50002"
echo "  API 文档: http://localhost:50001/docs"
echo "=========================================="
echo ""
echo "查看日志:"
echo "  后端日志: tail -f /tmp/ketcher_backend.log"
echo "  Nginx 日志: tail -f /var/log/nginx/access.log"