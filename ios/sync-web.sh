#!/bin/bash
# 把网站文件同步进 iOS App（每次网页更新后、打包前运行一次）
set -e
cd "$(dirname "$0")"
DEST="MathPhysicsLab/Web"
rm -rf "$DEST"
mkdir -p "$DEST"
cp ../index.html "$DEST/"
cp -R ../css "$DEST/css"
cp -R ../js "$DEST/js"
echo "✓ 已同步网站文件到 $DEST（$(find "$DEST" -type f | wc -l | tr -d ' ') 个文件）"
