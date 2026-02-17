#!/bin/bash

echo "=========================================="
echo "  安装 Nginx"
echo "=========================================="

# 安装 Nginx
sudo apt-get update
sudo apt-get install -y nginx

# 创建日志目录
sudo mkdir -p /var/log/nginx
sudo touch /var/log/nginx/access.log
sudo touch /var/log/nginx/error.log

# 创建 Web 目录
sudo mkdir -p /var/www/ketcher_demo

# 复制 Nginx 配置
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
sudo cp "$SCRIPT_DIR/nginx.conf" /etc/nginx/nginx.conf

# 测试 Nginx 配置
sudo nginx -t

echo ""
echo "=========================================="
echo "  Nginx 安装完成"
echo "=========================================="