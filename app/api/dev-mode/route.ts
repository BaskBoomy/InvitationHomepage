import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DEV_MODE_FILE = path.join(process.cwd(), "data", "dev-mode.json");

// 개발자 모드 파일 확인/생성
async function ensureDevModeFile() {
  const dataDir = path.dirname(DEV_MODE_FILE);

  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }

  try {
    await fs.access(DEV_MODE_FILE);
  } catch {
    // 기본값: 개발자 모드 OFF
    const defaultState = {
      enabled: false,
      lastUpdated: new Date().toISOString(),
    };

    await fs.writeFile(
      DEV_MODE_FILE,
      JSON.stringify(defaultState, null, 2),
      "utf8"
    );
  }
}

// GET: 개발자 모드 상태 조회
export async function GET() {
  try {
    await ensureDevModeFile();
    const data = await fs.readFile(DEV_MODE_FILE, "utf8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading dev mode state:", error);
    return NextResponse.json({
      enabled: false,
      lastUpdated: new Date().toISOString(),
    });
  }
}

// POST: 개발자 모드 상태 변경
export async function POST(request: NextRequest) {
  try {
    const { enabled } = await request.json();

    if (typeof enabled !== "boolean") {
      return NextResponse.json(
        { error: "Invalid data: enabled must be boolean" },
        { status: 400 }
      );
    }

    const newState = {
      enabled,
      lastUpdated: new Date().toISOString(),
    };

    await ensureDevModeFile();
    await fs.writeFile(
      DEV_MODE_FILE,
      JSON.stringify(newState, null, 2),
      "utf8"
    );

    console.log(
      `🔧 Developer mode ${enabled ? "enabled" : "disabled"} and saved to file`
    );

    return NextResponse.json({ success: true, state: newState });
  } catch (error) {
    console.error("Error saving dev mode state:", error);
    return NextResponse.json(
      { error: "Failed to save dev mode state" },
      { status: 500 }
    );
  }
}
