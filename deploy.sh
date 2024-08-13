#!/bin/bash

# 기존 컨테이너 중지 및 제거
echo "Stopping and removing existing containers..."
docker-compose down

# 새로운 이미지로 컨테이너 실행
echo "Starting the application with the latest image..."
docker-compose up --build -d