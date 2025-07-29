"use client";

import { useState, useEffect } from "react";
import { InvitationData } from "@/lib/types";

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

export function useInvitationData() {
  const [data, setData] = useState<InvitationData>(defaultData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInvitationData();
  }, []);

  const loadInvitationData = async () => {
    try {
      const response = await fetch("/api/invitation");
      if (response.ok) {
        const invitationData = await response.json();
        setData(invitationData);
      } else {
        console.error("Failed to load invitation data");
        // 실패 시 기본 데이터 사용
        setData(defaultData);
      }
    } catch (error) {
      console.error("Error loading invitation data:", error);
      // 에러 시 기본 데이터 사용
      setData(defaultData);
    } finally {
      setIsLoading(false);
    }
  };

  const updateData = async (newData: InvitationData, devKey?: string) => {
    if (!devKey) {
      console.error("Dev key required for updating data");
      return false;
    }

    try {
      const response = await fetch("/api/invitation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Dev-Key": devKey,
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        setData(newData);
        return true;
      } else {
        console.error("Failed to update invitation data");
        return false;
      }
    } catch (error) {
      console.error("Error updating invitation data:", error);
      return false;
    }
  };

  return {
    data,
    updateData,
    isLoading,
  };
}
