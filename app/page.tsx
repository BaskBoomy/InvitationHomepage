"use client";

import { useState, useEffect } from "react";
import { useInvitationData } from "@/hooks/use-invitation-data";
import { FlipInvitationCard } from "@/components/flip-invitation-card";
import { EditInvitation } from "@/components/edit-invitation";

export default function Home() {
  const { data, updateData, isLoading } = useInvitationData();
  const [showWelcome, setShowWelcome] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // 정확한 viewport 높이 설정
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);
    window.addEventListener("orientationchange", setViewportHeight);

    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
        setTimeout(() => setShowContent(true), 300);
      }, 2000);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", setViewportHeight);
        window.removeEventListener("orientationchange", setViewportHeight);
      };
    }

    return () => {
      window.removeEventListener("resize", setViewportHeight);
      window.removeEventListener("orientationchange", setViewportHeight);
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="animate-pulse text-lg text-gray-600">
          초대장을 불러오는 중...
        </div>
      </div>
    );
  }

  return (
    <main
      className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden"
      style={{
        height: "calc(var(--vh, 1vh) * 100)",
        minHeight: "100vh", // Fallback
      }}
    >
      {/* 환영 애니메이션 */}
      {showWelcome && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
            showWelcome ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-center animate-bounce">
            <div className="text-6xl sm:text-8xl mb-4 animate-pulse">🎉</div>
            <h1
              className="text-2xl sm:text-4xl font-bold mb-2 animate-fade-in"
              style={{ color: "#813828" }}
            >
              환영합니다!
            </h1>
            <p
              className="text-lg sm:text-xl animate-fade-in-delay"
              style={{ color: "#5B332B" }}
            >
              특별한 초대장이 도착했습니다
            </p>
          </div>
        </div>
      )}

      {/* 메인 컨텐츠 */}
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <FlipInvitationCard data={data} />
        <EditInvitation data={data} onSave={updateData} />
      </div>
    </main>
  );
}
