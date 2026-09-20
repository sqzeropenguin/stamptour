"use client";

import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const STAFF_PIN = "1105";

interface RewardClaimModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function RewardClaimModal({
  onCancel,
  onConfirm,
}: RewardClaimModalProps) {
  const [pin, setPin] = useState("");
  const [hasError, setHasError] = useState(false);
  const [shakeAttempt, setShakeAttempt] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const handlePinChange = (value: string) => {
    setPin(value.replace(/\D/g, "").slice(0, 4));
    setHasError(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (pin !== STAFF_PIN) {
      setHasError(true);
      setShakeAttempt((attempt) => attempt + 1);
      return;
    }

    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(onConfirm, 280);
  };

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-5 backdrop-blur-sm ${
        isClosing ? "reward-modal-backdrop-out" : "modal-backdrop"
      }`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isClosing) {
          onCancel();
        }
      }}
    >
      <section
        key={shakeAttempt}
        className={`w-full max-w-sm rounded-[28px] border border-white/20 bg-white/10 p-6 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl ${
          isClosing
            ? "reward-modal-out"
            : hasError
              ? "quiz-shake"
              : "quiz-fade-in"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reward-modal-title"
      >
        <div className="text-center">
          <p className="text-[10px] font-medium tracking-[0.25em] text-white/60">
            STAFF ONLY
          </p>
          <h2
            id="reward-modal-title"
            className="mt-2 font-serif text-xl font-medium tracking-widest drop-shadow-md"
          >
            진행 요원 확인
          </h2>
          <p className="mt-3 text-sm font-light text-white/70">
            메인 부스 스태프에게 화면을 보여주세요.
          </p>
        </div>

        <form className="mt-6" onSubmit={handleSubmit}>
          <input
            type="tel"
            inputMode="numeric"
            maxLength={4}
            autoFocus
            autoComplete="off"
            value={pin}
            onChange={(event) => handlePinChange(event.target.value)}
            className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-center text-2xl tracking-[0.5em] text-white transition-colors placeholder:text-sm placeholder:tracking-normal placeholder:text-white/20 focus:outline-none ${
              hasError
                ? "border-red-400/50"
                : "border-white/30 focus:border-white/60"
            }`}
            placeholder="스태프 전용 PIN 입력"
            aria-invalid={hasError}
            aria-describedby={hasError ? "pin-error" : undefined}
          />

          <div className="mt-2 min-h-5 text-center">
            {hasError && (
              <p id="pin-error" className="text-xs text-red-200" role="alert">
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-medium text-white/70 transition active:scale-[0.98]"
              onClick={onCancel}
              disabled={isClosing}
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-xl border border-white/40 bg-white/20 px-4 py-3 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98] disabled:opacity-40"
              disabled={pin.length !== 4 || isClosing}
            >
              교환 완료
            </button>
          </div>
        </form>
      </section>
    </div>,
    document.body,
  );
}
