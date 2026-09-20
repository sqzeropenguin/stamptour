"use client";

import type { FormEvent, ReactNode } from "react";
import { useMemo, useState, useSyncExternalStore } from "react";

import {
  getServerStoredUserSnapshot,
  getStoredUserSnapshot,
  parseStoredUser,
  saveStoredUser,
  subscribeToStoredUser,
} from "@/lib/userStorage";
import type { User } from "@/types";

interface OnboardingFormProps {
  children: ReactNode;
}

const subscribeToHydration = () => () => {};
const getClientHydrationSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

export default function OnboardingForm({ children }: OnboardingFormProps) {
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const storedUserSnapshot = useSyncExternalStore(
    subscribeToStoredUser,
    getStoredUserSnapshot,
    getServerStoredUserSnapshot,
  );
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot,
  );
  const user = useMemo(
    () => parseStoredUser(storedUserSnapshot),
    [storedUserSnapshot],
  );

  const handleStudentIdChange = (value: string) => {
    setStudentId(value.replace(/\D/g, "").slice(0, 8));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!/^\d{8}$/.test(studentId) || !trimmedName) {
      return;
    }

    const nextUser: User = {
      studentId,
      name: trimmedName,
      stamps: [],
      isCompleted: false,
      rewardReceived: false,
    };

    saveStoredUser(nextUser);
  };

  if (!isHydrated) {
    return (
      <div
        className="flex min-h-dvh items-center justify-center"
        aria-label="사용자 정보 확인 중"
      >
        <span className="h-8 w-8 animate-pulse rounded-full bg-white/70" />
      </div>
    );
  }

  if (user) {
    return <>{children}</>;
  }

  const canSubmit = /^\d{8}$/.test(studentId) && name.trim().length > 0;

  return (
    <section className="flex min-h-dvh items-center justify-center px-5 py-10">
      <div className="glass-container w-full p-7">
        <div className="text-center">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-ink-light">
            2026 향연 : 학술대동제
          </p>
          <h1 className="mt-2 text-[32px] font-extrabold tracking-[-0.04em] text-ink">
            스탬프 투어
          </h1>
          <p className="mt-3 text-sm leading-6 text-ink-light">
            참여 정보를 입력하고 투어를 시작해보세요.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-2 block text-sm font-semibold text-ink"
              htmlFor="studentId"
            >
              학번
            </label>
            <input
              id="studentId"
              name="studentId"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              maxLength={8}
              pattern="\d{8}"
              placeholder="8자리 학번"
              value={studentId}
              onChange={(event) => handleStudentIdChange(event.target.value)}
              className="w-full rounded-2xl border border-white/45 bg-white/30 px-4 py-3.5 outline-none backdrop-blur-lg placeholder:text-ink-light/60 focus:border-white/80 focus:ring-2 focus:ring-white/50"
              required
            />
            <p className="mt-1.5 text-right text-xs text-ink-light">
              {studentId.length}/8
            </p>
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-semibold text-ink"
              htmlFor="name"
            >
              이름
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={20}
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-2xl border border-white/45 bg-white/30 px-4 py-3.5 outline-none backdrop-blur-lg placeholder:text-ink-light/60 focus:border-white/80 focus:ring-2 focus:ring-white/50"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-2xl bg-[#8F7A91] px-5 py-4 font-bold text-white shadow-lg shadow-[#7D6B7D]/15 transition enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
          >
            투어 시작하기
          </button>
        </form>
      </div>
    </section>
  );
}
