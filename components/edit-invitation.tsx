"use client";

import { useState, useEffect } from "react";
import { InvitationData, ScheduleItem } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Edit3 } from "lucide-react";

interface EditInvitationProps {
  data: InvitationData;
  onSave: (data: InvitationData, devKey?: string) => Promise<boolean>;
}

export function EditInvitation({ data, onSave }: EditInvitationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<InvitationData>(data);
  const [newHost, setNewHost] = useState("");
  const [newScheduleTime, setNewScheduleTime] = useState("");
  const [newScheduleActivity, setNewScheduleActivity] = useState("");
  const [isDevMode, setIsDevMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 서버에서 개발자 모드 상태 불러오기
    loadDevModeState();
  }, []);

  const loadDevModeState = async () => {
    try {
      const response = await fetch("/api/dev-mode");
      if (response.ok) {
        const { enabled } = await response.json();
        setIsDevMode(enabled);
        if (enabled) {
          console.log("🔓 Developer mode activated (from server)");
        }
      } else {
        setIsDevMode(false);
      }
    } catch (error) {
      console.error("Error loading dev mode state:", error);
      setIsDevMode(false);
    }
  };

  const saveDevModeState = async (enabled: boolean) => {
    try {
      const response = await fetch("/api/dev-mode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enabled }),
      });

      if (response.ok) {
        console.log(
          `🔧 Developer mode ${enabled ? "enabled" : "disabled"} and saved`
        );
        return true;
      } else {
        console.error("Failed to save dev mode state");
        return false;
      }
    } catch (error) {
      console.error("Error saving dev mode state:", error);
      return false;
    }
  };

  const handleSave = async () => {
    setIsLoading(true);

    // 간단한 개발자 키 사용 (환경변수에서 가져오거나 기본값 사용)
    const defaultDevKey = "dev2024";
    const success = await onSave(formData, defaultDevKey);

    setIsLoading(false);

    if (success) {
      setIsOpen(false);
      alert("저장되었습니다! ✅");
    } else {
      alert("저장에 실패했습니다. 다시 시도해주세요. ❌");
    }
  };

  const addHost = () => {
    if (newHost.trim()) {
      setFormData((prev) => ({
        ...prev,
        hosts: [...prev.hosts, newHost.trim()],
      }));
      setNewHost("");
    }
  };

  const removeHost = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      hosts: prev.hosts.filter((_, i) => i !== index),
    }));
  };

  const addScheduleItem = () => {
    if (newScheduleTime.trim() && newScheduleActivity.trim()) {
      setFormData((prev) => ({
        ...prev,
        schedule: [
          ...prev.schedule,
          {
            time: newScheduleTime.trim(),
            activity: newScheduleActivity.trim(),
          },
        ],
      }));
      setNewScheduleTime("");
      setNewScheduleActivity("");
    }
  };

  const removeScheduleItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index),
    }));
  };

  const updateScheduleItem = (
    index: number,
    field: keyof ScheduleItem,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      schedule: prev.schedule.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  // 개발자 모드가 활성화된 경우에만 편집 버튼 표시
  if (!isDevMode) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed top-6 right-6 sm:top-8 sm:right-8 backdrop-blur-sm text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3 touch-manipulation border-0 z-20"
          style={{
            backgroundColor: "rgba(245, 245, 220, 0.95)",
            color: "#4C2B24",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(245, 245, 220, 1)";
            e.currentTarget.style.color = "#813828";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(245, 245, 220, 0.95)";
            e.currentTarget.style.color = "#4C2B24";
          }}
        >
          <Edit3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          편집 (개발자 모드)
        </Button>
      </DialogTrigger>

      {/* 개발자 모드 해제 버튼 */}
      <Button
        variant="outline"
        size="sm"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 backdrop-blur-sm text-xs px-2 py-1 touch-manipulation border-0 z-20"
        style={{
          backgroundColor: "rgba(220, 53, 69, 0.9)",
          color: "white",
        }}
        onClick={async () => {
          const success = await saveDevModeState(false);
          if (success) {
            setIsDevMode(false);
            alert("🔒 개발자 모드가 비활성화되었습니다!");
          } else {
            alert("❌ 개발자 모드 비활성화에 실패했습니다.");
          }
        }}
        title="개발자 모드 비활성화"
      >
        DEV OFF
      </Button>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto mx-2 sm:mx-auto">
        <DialogHeader>
          <DialogTitle>초대장 편집</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 제목 */}
          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          {/* 장소 */}
          <div className="space-y-2">
            <Label htmlFor="location">장소</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, location: e.target.value }))
              }
            />
          </div>

          {/* 호스트 */}
          <div className="space-y-2">
            <Label>호스트</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.hosts.map((host, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {host}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-500"
                    onClick={() => removeHost(index)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="새 호스트 추가"
                value={newHost}
                onChange={(e) => setNewHost(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addHost()}
              />
              <Button type="button" variant="outline" onClick={addHost}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* 준비물 */}
          <div className="space-y-2">
            <Label htmlFor="requirements">준비물</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  requirements: e.target.value,
                }))
              }
            />
          </div>

          {/* 일정 */}
          <div className="space-y-2">
            <Label>일정</Label>
            <div className="space-y-2 mb-4">
              {formData.schedule.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-center p-2 border rounded"
                >
                  <Input
                    className="flex-1"
                    value={item.time}
                    onChange={(e) =>
                      updateScheduleItem(index, "time", e.target.value)
                    }
                    placeholder="시간"
                  />
                  <Input
                    className="flex-2"
                    value={item.activity}
                    onChange={(e) =>
                      updateScheduleItem(index, "activity", e.target.value)
                    }
                    placeholder="활동"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeScheduleItem(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="시간"
                value={newScheduleTime}
                onChange={(e) => setNewScheduleTime(e.target.value)}
              />
              <Input
                placeholder="활동"
                value={newScheduleActivity}
                onChange={(e) => setNewScheduleActivity(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addScheduleItem()}
              />
              <Button type="button" variant="outline" onClick={addScheduleItem}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* 추가 정보 */}
          <div className="space-y-2">
            <Label htmlFor="additionalInfo">추가 정보</Label>
            <Textarea
              id="additionalInfo"
              value={formData.additionalInfo}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  additionalInfo: e.target.value,
                }))
              }
            />
          </div>

          {/* 저장 버튼 */}
          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleSave}
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? "저장 중..." : "저장"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
              disabled={isLoading}
            >
              취소
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
