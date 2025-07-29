import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { InvitationData } from "@/lib/types";

const DATA_FILE = path.join(process.cwd(), "data", "invitation.json");

// 데이터 디렉토리와 파일 확인/생성
async function ensureDataFile() {
  const dataDir = path.dirname(DATA_FILE);

  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }

  try {
    await fs.access(DATA_FILE);
  } catch {
    // 기본 데이터로 파일 생성
    const defaultData: InvitationData = {
      title: "🎲 보드게임 모임",
      location: "서울시 영등포구 양평로 157",
      hosts: ["최종혁", "정세원"],
      requirements: "편안한 옷과 맑은 정신",
      schedule: [
        { time: "오후 4시", activity: "모임 시작" },
        { time: "5시까지", activity: "소담화" },
        { time: "6시", activity: "저녁 식사" },
        { time: "7시", activity: "강아지 산책" },
        { time: "7시 30분", activity: "보드게임 시작" },
        { time: "중간 중간", activity: "간식 제공" },
        { time: "이후", activity: "와인 시식" },
        { time: "휴식 후", activity: "보드게임 재개" },
      ],
      additionalInfo: "즐거운 시간 보내요! 🎮",
    };

    await fs.writeFile(DATA_FILE, JSON.stringify(defaultData, null, 2), "utf8");
  }
}

// GET: 초대장 데이터 조회
export async function GET() {
  try {
    await ensureDataFile();
    const data = await fs.readFile(DATA_FILE, "utf8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading invitation data:", error);
    return NextResponse.json(
      { error: "Failed to read invitation data" },
      { status: 500 }
    );
  }
}

// POST: 초대장 데이터 저장 (개발자 전용)
export async function POST(request: NextRequest) {
  try {
    // 개발자 키 확인
    const devKey = request.headers.get("X-Dev-Key");
    const allowedKeys = ["dev2024", process.env.DEV_KEY].filter(Boolean);

    // 올바른 키가 있어야만 통과
    if (!devKey || !allowedKeys.includes(devKey)) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid dev key" },
        { status: 401 }
      );
    }

    const invitationData: InvitationData = await request.json();

    // 데이터 유효성 검사
    if (!invitationData.title || !invitationData.location) {
      return NextResponse.json(
        { error: "Invalid data: title and location are required" },
        { status: 400 }
      );
    }

    await ensureDataFile();
    await fs.writeFile(
      DATA_FILE,
      JSON.stringify(invitationData, null, 2),
      "utf8"
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving invitation data:", error);
    return NextResponse.json(
      { error: "Failed to save invitation data" },
      { status: 500 }
    );
  }
}
