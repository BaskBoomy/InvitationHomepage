"use client";

import { useState } from "react";
import { InvitationData } from "@/lib/types";
import { InvitationCard } from "@/components/invitation-card";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FlipInvitationCardProps {
  data: InvitationData;
}

export function FlipInvitationCard({ data }: FlipInvitationCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full h-full perspective-1000">
      <div
        className={cn(
          "flip-card-container relative w-full h-full transition-transform duration-700 transform-style-preserve-3d select-none",
          isFlipped && "rotate-y-180",
          !isFlipped && "cursor-pointer"
        )}
        onClick={!isFlipped ? handleFlip : undefined}
        role={!isFlipped ? "button" : undefined}
        tabIndex={!isFlipped ? 0 : undefined}
        onKeyDown={
          !isFlipped
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleFlip();
                }
              }
            : undefined
        }
        aria-label={!isFlipped ? "클릭하여 상세보기" : undefined}
      >
        {/* 앞면 - Game & Wine Night 이미지 */}
        <div className="absolute inset-0 w-full h-full backface-hidden overflow-hidden">
          <div className="mobile-image-container relative w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
            {!imageError ? (
              <div className="relative w-full h-full">
                <Image
                  src="/game-wine-night.png"
                  alt="Game & Wine Night Invitation"
                  fill
                  className={`object-contain transition-opacity duration-500 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
                  onError={() => setImageError(true)}
                  onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && !imageError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 m-4 sm:m-6 lg:m-8 rounded-lg">
                    <div className="text-amber-600 text-center">
                      <div className="text-4xl mb-2 animate-pulse">🎲🍷</div>
                      <p className="text-sm">로딩 중...</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Fallback when image fails to load */
              <div className="w-full h-full relative bg-gradient-to-br from-amber-100 to-orange-200 text-amber-800">
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="text-center p-6 sm:p-8 lg:p-12">
                    <div className="text-6xl sm:text-8xl lg:text-9xl mb-6 lg:mb-8">
                      🎲🍷
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4">
                      GAME & WINE NIGHT
                    </h2>
                    <p className="text-lg sm:text-xl lg:text-2xl opacity-80 font-medium">
                      보드게임과 와인의 밤
                    </p>
                  </div>
                </div>

                {/* Fallback용 클릭 안내 */}
                <div className="absolute bottom-30 left-1/2 transform -translate-x-1/2 text-center">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 sm:px-6 sm:py-3 shadow-lg border border-amber-200">
                    <p
                      className="text-sm sm:text-base font-medium mb-1"
                      style={{ color: "#813828" }}
                    >
                      터치하여 상세보기
                    </p>
                    <p
                      className="text-xs opacity-70"
                      style={{ color: "#5B332B" }}
                    >
                      Touch to see details
                    </p>
                  </div>
                </div>
              </div>
            )}
            {/* 이미지 하단 클릭 안내 */}
            <div className="absolute bottom-30 left-1/2 transform -translate-x-1/2 text-center">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 sm:px-6 sm:py-3 shadow-lg border border-white/30">
                <p
                  className="text-sm sm:text-base font-medium mb-1"
                  style={{ color: "#813828" }}
                >
                  클릭하여 상세보기
                </p>
                <p className="text-xs opacity-70" style={{ color: "#5B332B" }}>
                  Click to see details
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 뒷면 - 기존 초대장 상세 정보 */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div
            className="w-full h-full overflow-y-scroll overflow-x-hidden relative"
            style={{
              WebkitOverflowScrolling: "touch",
              height: "100dvh",
              maxHeight: "100dvh",
              /* Fallbacks for older browsers */
              minHeight: "100vh",
            }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              e.stopPropagation();
            }}
            onTouchMove={(e) => {
              e.stopPropagation();
            }}
            onTouchEnd={(e) => e.stopPropagation()}
            onScroll={(e) => e.stopPropagation()}
          >
            <div className="min-h-full p-4 pb-20">
              <InvitationCard data={data} />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              className="fixed top-6 left-6 sm:top-8 sm:left-8 backdrop-blur-sm p-3 sm:p-4 rounded-full shadow-lg transition-all duration-200 z-20 touch-manipulation border-0"
              style={{
                backgroundColor: "rgba(245, 245, 220, 0.95)",
                color: "#4C2B24",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(245, 245, 220, 1)";
                e.currentTarget.style.color = "#813828";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(245, 245, 220, 0.95)";
                e.currentTarget.style.color = "#4C2B24";
              }}
              aria-label="앞면으로 돌아가기"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                className="sm:w-5 sm:h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
