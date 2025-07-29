# 📋 PM2 관리 가이드

## 🚀 빠른 시작

### 1. 프로덕션 배포

```bash
# 빌드 후 PM2로 시작
npm run deploy
```

### 2. 상태 확인

```bash
# 실행 중인 프로세스 확인
npm run pm2:status
```

### 3. 로그 확인

```bash
# 실시간 로그 보기
npm run pm2:logs
```

## 🔧 상세 명령어

### 서버 제어

| 명령어                  | 설명                        | 사용 시기         |
| ----------------------- | --------------------------- | ----------------- |
| `npm run pm2:start`     | 프로덕션 서버 시작          | 최초 배포 시      |
| `npm run pm2:start:dev` | 개발 환경으로 시작          | 개발 테스트 시    |
| `npm run pm2:stop`      | 서버 중지                   | 서버 정지 필요 시 |
| `npm run pm2:restart`   | 서버 재시작 (다운타임 있음) | 설정 변경 후      |
| `npm run pm2:reload`    | 무중단 재시작               | 코드 업데이트 후  |
| `npm run pm2:delete`    | 프로세스 완전 삭제          | 완전 재설정 시    |

### 모니터링

| 명령어                   | 설명             | 정보                  |
| ------------------------ | ---------------- | --------------------- |
| `npm run pm2:status`     | 프로세스 상태    | CPU, 메모리, 가동시간 |
| `npm run pm2:monit`      | 실시간 모니터링  | 리소스 사용량 실시간  |
| `npm run pm2:logs`       | 전체 로그 보기   | 애플리케이션 로그     |
| `npm run pm2:logs:error` | 에러 로그만 보기 | 오류 디버깅           |

### 로그 관리

| 명령어              | 설명               | 주기 |
| ------------------- | ------------------ | ---- |
| `npm run pm2:flush` | 로그 히스토리 삭제 | 주간 |
| `npm run pm2:reset` | 메트릭 초기화      | 월간 |

### 자동 시작 설정

```bash
# 1. 서버 재부팅 시 자동 시작 설정
npm run pm2:startup

# 2. 현재 실행 중인 프로세스 저장
npm run pm2:save

# 3. 서버 재부팅 후 저장된 프로세스 복원
npm run pm2:resurrect
```

## ⚙️ 설정 파일 (ecosystem.config.js)

### 현재 설정

```javascript
{
  name: 'invitation',
  port: 4000,
  instances: 1,
  memory_limit: '1GB',
  auto_restart: true,
  max_restarts: 10
}
```

### 고성능 서버용 설정

```javascript
// ecosystem.config.js에서 수정
instances: 'max',        // CPU 코어 수만큼 실행
exec_mode: 'cluster',    // 클러스터 모드
max_memory_restart: '2G' // 메모리 제한 증가
```

## 🔍 트러블슈팅

### 자주 발생하는 문제

#### 1. 포트 이미 사용 중

```bash
# 현재 실행 중인 프로세스 확인
npm run pm2:status

# 기존 프로세스 삭제 후 재시작
npm run pm2:delete
npm run pm2:start
```

#### 2. 메모리 부족으로 재시작 반복

```bash
# 메모리 사용량 확인
npm run pm2:monit

# ecosystem.config.js에서 max_memory_restart 값 증가
```

#### 3. 로그 파일 용량 증가

```bash
# 로그 파일 삭제
npm run pm2:flush

# 로그 로테이션 설정 (ecosystem.config.js)
log_file: './logs/combined.log',
log_date_format: 'YYYY-MM-DD HH:mm Z'
```

## 📊 모니터링 대시보드

### PM2 Plus (선택사항)

```bash
# PM2 Plus 계정 연결
pm2 link <secret_key> <public_key>

# 웹 대시보드에서 모니터링
# https://app.pm2.io
```

### 로컬 모니터링

```bash
# 터미널에서 실시간 모니터링
npm run pm2:monit
```

## 🚀 배포 워크플로우

### 개발 → 프로덕션

```bash
# 1. 코드 변경 후
git add .
git commit -m "update: 기능 개선"

# 2. 빌드 테스트
npm run build

# 3. PM2로 무중단 배포
npm run pm2:reload

# 4. 상태 확인
npm run pm2:status
npm run pm2:logs
```

### 서버 이전 시

```bash
# 기존 서버에서
npm run pm2:save

# 새 서버에서
npm install -g pm2
npm install
npm run build
npm run pm2:start
npm run pm2:startup
```
