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
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="mobile-image-container relative w-full h-full rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-amber-50 to-orange-100">
            {!imageError ? (
              <Image
                src="/game-wine-night.png"
                alt="Game & Wine Night Invitation"
                fill
                className="object-contain sm:object-cover transition-opacity duration-300"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                onError={() => setImageError(true)}
              />
            ) : (
              /* Fallback when image fails to load */
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 to-orange-200 text-amber-800">
                <div className="text-center p-6">
                  <div className="text-4xl sm:text-6xl mb-4">🎲🍷</div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                    GAME & WINE NIGHT
                  </h2>
                  <p className="text-sm sm:text-base opacity-80">
                    보드게임과 와인의 밤
                  </p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-black/20 sm:bg-black/30 flex items-center justify-center transition-opacity duration-200 hover:bg-black/40">
              <div className="text-white text-center px-4 sm:px-6">
                <p className="text-base sm:text-lg lg:text-xl font-semibold mb-2 drop-shadow-lg">
                  {imageError ? "터치하여 상세보기" : "클릭하여 상세보기"}
                </p>
                <p className="text-xs sm:text-sm opacity-90 drop-shadow-md">
                  {imageError ? "Touch to see details" : "Click to see details"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 뒷면 - 기존 초대장 상세 정보 */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div
            className="w-full h-full overflow-y-auto overflow-x-hidden relative"
            style={{ WebkitOverflowScrolling: "touch" }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <div className="min-h-full p-4">
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
