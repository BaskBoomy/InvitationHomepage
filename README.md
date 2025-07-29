# 🎲 Game & Wine Night Invitation

모바일 최적화된 3D 플립 카드 초대장 웹앱입니다.

## 🚀 개발 환경 실행

개발 서버 실행:

```bash
npm run dev
```

포트 4000에서 실행됩니다: [http://localhost:4000](http://localhost:4000)

## 📦 프로덕션 배포

### 빌드

```bash
npm run build
```

### PM2로 프로덕션 서버 관리

#### 🔥 PM2 서버 시작

```bash
# 프로덕션 환경으로 시작
npm run pm2:start

# 개발 환경으로 시작
npm run pm2:start:dev

# 빌드 + 시작 (한 번에)
npm run deploy
```

#### 🔧 PM2 서버 관리

```bash
# 서버 중지
npm run pm2:stop

# 서버 재시작 (downtime 있음)
npm run pm2:restart

# 서버 리로드 (zero-downtime)
npm run pm2:reload

# 서버 완전 삭제
npm run pm2:delete
```

#### 📊 PM2 모니터링

```bash
# 프로세스 상태 확인
npm run pm2:status

# 실시간 모니터링
npm run pm2:monit

# 로그 보기
npm run pm2:logs

# 에러 로그만 보기
npm run pm2:logs:error

# 로그 히스토리 삭제
npm run pm2:flush

# 프로세스 메트릭 리셋
npm run pm2:reset
```

#### ⚙️ PM2 자동 시작 설정

```bash
# 서버 재부팅 시 자동 시작 설정
npm run pm2:startup

# 현재 프로세스 목록 저장
npm run pm2:save

# 저장된 프로세스 복원
npm run pm2:resurrect
```

## 🎮 프로젝트 특징

- **📱 모바일 최적화**: 완벽한 모바일 반응형 디자인
- **🔄 3D 플립 카드**: 터치/클릭으로 앞뒤면 전환
- **✨ 환영 애니메이션**: 첫 방문 시 특별한 환영 효과
- **🔒 개발자 모드**: 제목 5회 탭으로 편집 모드 활성화
- **💾 파일 기반 저장**: 서버 재시작에도 데이터 유지
- **🎨 디자인 시스템**: 따뜻한 색감의 일관된 UI

## 🛠️ 기술 스택

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui Components
- **State**: Custom React Hooks
- **Storage**: File-based JSON API
- **Process Manager**: PM2
- **Deployment**: Node.js Server

## 📁 프로젝트 구조

```
invitation/
├── app/                 # Next.js App Router
├── components/          # React 컴포넌트
│   ├── flip-invitation-card.tsx  # 3D 플립 카드
│   ├── invitation-card.tsx       # 초대장 내용
│   └── edit-invitation.tsx       # 편집 모드
├── hooks/               # Custom React Hooks
├── lib/                 # 유틸리티 및 타입
├── data/                # JSON 데이터 저장소
├── public/              # 정적 파일
└── ecosystem.config.js  # PM2 설정
```

## 🔐 개발자 모드

1. 초대장 제목을 **5번 연속 탭/클릭**
2. 편집 버튼이 우측 상단에 나타남
3. 편집 완료 후 우측 하단 "DEV OFF" 버튼으로 비활성화

## 🌐 환경 변수

`.env.local` 파일 생성:

```bash
# 개발자 키 (선택사항)
DEV_KEY=your_custom_dev_key
```

## 📋 요구사항

- Node.js 18 이상
- npm 또는 yarn
- PM2 (프로덕션 배포 시)

```bash
# PM2 글로벌 설치
npm install -g pm2
```
