#!/bin/bash

echo "=========================================="
echo "  Ketcher Demo 停止脚本"
echo "=========================================="

# 停止后端进程
echo "[1/2] 停止后端服务..."
if pkill -f "uvicorn backend.app.main:app"; then
    echo "    后端已停止"
else
    echo "    后端未运行"
fi

# 停止 Nginx
echo "[2/2] 停止 Nginx..."
if pgrep nginx > /dev/null; then
    sudo nginx -s stop
    echo "    Nginx 已停止"
else
    echo "    Nginx 未运行"
fi

echo ""
echo "=========================================="
echo "  所有服务已停止"
echo "=========================================="