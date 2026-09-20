"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

import BalloonBoard from "@/components/BalloonBoard";
import ConfettiOverlay from "@/components/ConfettiOverlay";
import RewardClaimModal from "@/components/RewardClaimModal";
import {
  getServerStoredUserSnapshot,
  getStoredUserSnapshot,
  parseStoredUser,
  saveStoredUser,
  subscribeToStoredUser,
} from "@/lib/userStorage";

const TOTAL_BOOTHS = 6;

export default function Dashboard() {
  const router = useRouter();
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [showRewardConfetti, setShowRewardConfetti] = useState(false);
  const confettiTimerRef = useRef<number | null>(null);
  const storedUserSnapshot = useSyncExternalStore(
    subscribeToStoredUser,
    getStoredUserSnapshot,
    getServerStoredUserSnapshot,
  );
  const user = useMemo(
    () => parseStoredUser(storedUserSnapshot),
    [storedUserSnapshot],
  );

  useEffect(
    () => () => {
      if (confettiTimerRef.current !== null) {
        window.clearTimeout(confettiTimerRef.current);
      }
    },
    [],
  );

  if (!user) {
    return null;
  }

  const validStamps = Array.from(
    new Set(
      user.stamps.filter(
        (boothId) => boothId >= 1 && boothId <= TOTAL_BOOTHS,
      ),
    ),
  );
  const completedCount = validStamps.length;
  const isAllClear = completedCount === TOTAL_BOOTHS;
  const progress = (completedCount / TOTAL_BOOTHS) * 100;

  const handleRewardConfirm = () => {
    saveStoredUser({
      ...user,
      rewardReceived: true,
    });
    setIsRewardModalOpen(false);
    setShowRewardConfetti(true);
    confettiTimerRef.current = window.setTimeout(() => {
      setShowRewardConfetti(false);
    }, 2200);
  };

  return (
    <main className="relative flex min-h-[max(650px,100dvh)] flex-col overflow-x-hidden overflow-y-auto px-4 py-3">
        {showRewardConfetti && <ConfettiOverlay />}
        <header className="relative flex w-full shrink-0 flex-col items-center overflow-hidden rounded-[28px] border border-white/20 bg-white/5 p-5 text-center text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-3xl">
          <div className="flex w-full flex-col items-center gap-1">
            <span className="shrink-0 whitespace-nowrap text-[clamp(8px,2.6vw,10px)] font-normal tracking-[0.3em] text-white/70 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              2026 SOONCHUNHYANG UNIV
            </span>

            <h1 className="mt-1 shrink-0 whitespace-nowrap font-serif text-[clamp(2rem,11vw,2.5rem)] font-medium tracking-[0.15em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              鄕聯
            </h1>
            <p className="shrink-0 whitespace-nowrap font-serif text-[clamp(0.75rem,3.5vw,0.875rem)] tracking-widest text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              향연 : 학술대동제
            </p>

            <span className="mt-2 shrink-0 whitespace-nowrap text-[clamp(9px,2.8vw,11px)] font-normal tracking-widest text-white/60 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              흩어진 색을 모아, 하나의 향연으로
            </span>
          </div>

          <div className="my-3 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="flex w-full flex-col gap-2">
            <div className="inline-flex justify-center">
              <span className="shrink-0 whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[clamp(9px,2.8vw,11px)] font-normal tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                11. 05. (목) 15:00 - 22:00 | 소운동장
              </span>
            </div>

            <div className="mt-2 flex flex-col gap-1.5">
              <div className="flex items-end justify-between px-1">
                <span className="shrink-0 whitespace-nowrap text-[10px] font-normal tracking-wider text-white/70 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                  모인 풍선
                </span>
                <span className="shrink-0 whitespace-nowrap font-serif text-lg tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
                  {completedCount}{" "}
                  <span className="text-sm text-white/50">
                    / {TOTAL_BOOTHS}
                  </span>
                </span>
              </div>
              <div
                className="h-1 w-full overflow-hidden rounded-full bg-white/20"
                role="progressbar"
                aria-label="스탬프 투어 진행도"
                aria-valuemin={0}
                aria-valuemax={TOTAL_BOOTHS}
                aria-valuenow={completedCount}
              >
                <div
                  className="h-full rounded-full bg-white/90 shadow-sm transition-[width] duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

        </header>

        <div className="mt-3 flex min-h-0 flex-1 flex-col justify-center">
          <BalloonBoard
            stamps={validStamps}
            isCompleted={isAllClear}
          />
        </div>

        {isAllClear && (
          <div className="all-clear-cta absolute inset-x-4 bottom-3 z-20">
            <button
              type="button"
              className={`w-full rounded-2xl border px-4 py-4 font-bold transition duration-150 ${
                user.rewardReceived
                  ? "cursor-not-allowed border-white/10 bg-white/5 text-white/40 shadow-none"
                  : "border-[#FFF1A8]/80 bg-gradient-to-r from-[#EABF53] via-[#FFD978] to-[#E7B849] text-slate-800 shadow-[0_10px_28px_rgb(190_139_38/0.35),inset_0_1px_0_rgb(255_255_255/0.65)] active:scale-[0.96]"
              }`}
              onClick={() => setIsRewardModalOpen(true)}
              disabled={user.rewardReceived}
            >
              {user.rewardReceived
                ? "✅ 상품 수령이 완료되었습니다"
                : "🎁 메인 무대로 날아가서 상품 받기"}
            </button>
          </div>
        )}

      {isRewardModalOpen && (
        <RewardClaimModal
          onCancel={() => setIsRewardModalOpen(false)}
          onConfirm={handleRewardConfirm}
        />
      )}

      <div className="absolute bottom-0.5 left-1/2 z-30 -translate-x-1/2 text-center">
        <button
          type="button"
          className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[9px] tracking-wide text-white/35 transition hover:text-white/60 active:scale-95"
          onClick={() => router.push("/quiz/1")}
        >
          테스트용 QR 스캔 (1번 부스)
        </button>
      </div>
    </main>
  );
}
