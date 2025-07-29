import { useState } from "react";
import { InvitationData } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Users, Package, Clock, Info } from "lucide-react";

interface InvitationCardProps {
  data: InvitationData;
}

export function InvitationCard({ data }: InvitationCardProps) {
  const [tapCount, setTapCount] = useState(0);

  const handleTitleTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);

    // 5번 탭하면 개발자 모드 활성화
    if (newCount === 5) {
      localStorage.setItem("dev-mode", "enabled");
      alert("🔓 개발자 모드가 활성화되었습니다!\n페이지를 새로고침하세요.");
      setTapCount(0);
    }

    // 3초 후 카운트 리셋
    setTimeout(() => setTapCount(0), 3000);
  };

  return (
    <Card
      className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 shadow-xl border-0 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #F5F5DC 0%, #FDF5E6 50%, #FAF0E6 100%)",
      }}
    >
      <CardHeader className="text-center pb-3 sm:pb-4 px-4 sm:px-6">
        <h1
          className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent cursor-pointer select-none"
          style={{
            background:
              "linear-gradient(135deg, #813828 0%, #BC7B2E 50%, #7C3527 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
          onClick={handleTitleTap}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleTitleTap();
          }}
        >
          {data.title}
        </h1>
        <p
          className="text-xs sm:text-sm mt-1 sm:mt-2"
          style={{ color: "#5B332B" }}
        >
          모바일 보드게임 초대장
        </p>
      </CardHeader>

      <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
        {/* 위치 */}
        <div className="flex items-start gap-2 sm:gap-3">
          <MapPin
            className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0"
            style={{ color: "#813828" }}
          />
          <div>
            <h3
              className="font-semibold text-xs sm:text-sm"
              style={{ color: "#4C2B24" }}
            >
              장소
            </h3>
            <p className="text-sm sm:text-base" style={{ color: "#5B332B" }}>
              {data.location}
            </p>
          </div>
        </div>

        {/* 호스트 */}
        <div className="flex items-start gap-2 sm:gap-3">
          <Users
            className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0"
            style={{ color: "#BC7B2E" }}
          />
          <div>
            <h3
              className="font-semibold text-xs sm:text-sm"
              style={{ color: "#4C2B24" }}
            >
              호스트
            </h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {data.hosts.map((host, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs sm:text-sm border-0"
                  style={{
                    backgroundColor: "#BC7B2E",
                    color: "#F5F5DC",
                  }}
                >
                  {host}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* 준비물 */}
        <div className="flex items-start gap-2 sm:gap-3">
          <Package
            className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0"
            style={{ color: "#7C3527" }}
          />
          <div>
            <h3
              className="font-semibold text-xs sm:text-sm"
              style={{ color: "#4C2B24" }}
            >
              준비물
            </h3>
            <p className="text-sm sm:text-base" style={{ color: "#5B332B" }}>
              {data.requirements}
            </p>
          </div>
        </div>

        <Separator />

        {/* 일정 */}
        <div className="flex items-start gap-2 sm:gap-3">
          <Clock
            className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0"
            style={{ color: "#5E6A88" }}
          />
          <div className="w-full">
            <h3
              className="font-semibold text-xs sm:text-sm mb-2 sm:mb-3"
              style={{ color: "#4C2B24" }}
            >
              일정
            </h3>
            <div className="space-y-1 sm:space-y-2">
              {data.schedule.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-md"
                  style={{ backgroundColor: "rgba(188, 123, 46, 0.1)" }}
                >
                  <Badge
                    variant="outline"
                    className="min-w-fit text-xs flex-shrink-0 border-0"
                    style={{
                      backgroundColor: "#5E6A88",
                      color: "#F5F5DC",
                    }}
                  >
                    {item.time}
                  </Badge>
                  <span
                    className="text-xs sm:text-sm leading-tight"
                    style={{ color: "#5B332B" }}
                  >
                    {item.activity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 추가 정보 */}
        {data.additionalInfo && (
          <>
            <Separator style={{ backgroundColor: "#BC7B2E", opacity: 0.3 }} />
            <div className="flex items-start gap-2 sm:gap-3">
              <Info
                className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0"
                style={{ color: "#813828" }}
              />
              <div>
                <h3
                  className="font-semibold text-xs sm:text-sm"
                  style={{ color: "#4C2B24" }}
                >
                  추가 정보
                </h3>
                <p
                  className="text-sm sm:text-base"
                  style={{ color: "#5B332B" }}
                >
                  {data.additionalInfo}
                </p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
