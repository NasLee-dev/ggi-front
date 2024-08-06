# 베이스 이미지
FROM node:18-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일들을 복사
COPY package.json yarn.lock ./

# 종속성 설치
RUN yarn install

# 나머지 파일들 복사
COPY . .

WORKDIR /app/services/ggi-web
RUN yarn workspace ggi-web install
RUN yarn workspace ggi-web build

# 포트 노출
EXPOSE 3000

# 애플리케이션 시작 명령
CMD ["yarn", "start"]
