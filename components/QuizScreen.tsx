"use client";

import type { CSSProperties } from "react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useRouter } from "next/navigation";

import {
  getServerStoredUserSnapshot,
  getStoredUserSnapshot,
  parseStoredUser,
  saveStoredUser,
  subscribeToStoredUser,
} from "@/lib/userStorage";
import type { Quiz } from "@/types";

const TOTAL_BOOTHS = 6;

const CONFETTI_COLORS = [
  "#F6A39C",
  "#F8D27A",
  "#9FD9EE",
  "#A9DFC5",
  "#C9B8EE",
  "#F7B58F",
] as const;

const CONFETTI_PIECES = Array.from({ length: 30 }, (_, index) => ({
  id: index,
  color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
  left: 8 + ((index * 17) % 84),
  delay: (index % 6) * 0.06,
  drift: ((index % 7) - 3) * 18,
  rotation: (index * 47) % 360,
}));

interface QuizScreenProps {
  quiz: Quiz;
}

type AnswerResult = "correct" | "incorrect" | null;

export default function QuizScreen({ quiz }: QuizScreenProps) {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [result, setResult] = useState<AnswerResult>(null);
  const [wrongAttempt, setWrongAttempt] = useState(0);
  const redirectTimerRef = useRef<number | null>(null);
  const storedUserSnapshot = useSyncExternalStore(
    subscribeToStoredUser,
    getStoredUserSnapshot,
    getServerStoredUserSnapshot,
  );
  const user = useMemo(
    () => parseStoredUser(storedUserSnapshot),
    [storedUserSnapshot],
  );

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsHydrated(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (isHydrated && !user) {
      router.replace("/");
    }
  }, [isHydrated, router, user]);

  useEffect(
    () => () => {
      if (redirectTimerRef.current !== null) {
        window.clearTimeout(redirectTimerRef.current);
      }
    },
    [],
  );

  const handleAnswer = (optionIndex: number) => {
    if (!user || result === "correct") {
      return;
    }

    setSelectedIndex(optionIndex);

    if (optionIndex !== quiz.answerIndex) {
      setResult("incorrect");
      setWrongAttempt((attempt) => attempt + 1);
      return;
    }

    const validStamps = user.stamps.filter(
      (boothId) => boothId >= 1 && boothId <= TOTAL_BOOTHS,
    );
    const nextStamps = Array.from(new Set([...validStamps, quiz.boothId]));

    saveStoredUser({
      ...user,
      stamps: nextStamps,
      isCompleted: nextStamps.length === TOTAL_BOOTHS,
    });
    setResult("correct");
    redirectTimerRef.current = window.setTimeout(() => {
      router.replace("/");
    }, 1700);
  };

  if (!isHydrated || !user) {
    return (
      <main
        className="flex min-h-dvh items-center justify-center"
        aria-label="퀴즈 준비 중"
      >
        <span className="h-8 w-8 animate-pulse rounded-full bg-white/50" />
      </main>
    );
  }

  return (
    <main className="relative flex min-h-dvh flex-col px-5 py-6 text-white">
      {result === "correct" && (
        <div
          className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
          aria-hidden="true"
        >
          {CONFETTI_PIECES.map((piece) => (
            <span
              key={piece.id}
              className="confetti-piece absolute top-[20%] h-3 w-2 rounded-sm"
              style={
                {
                  left: `${piece.left}%`,
                  backgroundColor: piece.color,
                  animationDelay: `${piece.delay}s`,
                  "--confetti-x": `${piece.drift}px`,
                  "--confetti-rotate": `${piece.rotation}deg`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}

      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          className="rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md"
          onClick={() => router.replace("/")}
        >
          ← 돌아가기
        </button>
        <span className="text-[10px] font-normal tracking-[0.24em] text-white/70 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
          BOOTH {quiz.boothId}
        </span>
      </div>

      <section className="quiz-fade-in flex flex-1 flex-col rounded-[32px] border border-white/20 bg-white/5 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-3xl">
        <div className="text-center">
          <span className="text-[10px] font-normal tracking-[0.3em] text-white/70 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            HYANGYEON QUIZ
          </span>
          <h1 className="mt-3 font-serif text-3xl font-medium tracking-[0.12em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            鄕聯
          </h1>
          <p className="mt-2 text-xs font-normal tracking-widest text-white/70 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            흩어진 색을 모아, 하나의 향연으로
          </p>
        </div>

        <div className="my-7 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

        <div className="flex flex-1 flex-col">
          <p className="text-[10px] font-medium tracking-[0.2em] text-white/60 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            QUESTION
          </p>
          <h2 className="mt-3 break-keep font-serif text-base font-medium leading-relaxed tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            {quiz.question}
          </h2>

          <div className="mt-7 space-y-3">
            {quiz.options.map((option, optionIndex) => {
              const isSelected = selectedIndex === optionIndex;
              const isCorrect = isSelected && result === "correct";
              const isIncorrect = isSelected && result === "incorrect";

              return (
                <button
                  key={
                    isIncorrect
                      ? `${optionIndex}-${wrongAttempt}`
                      : optionIndex
                  }
                  type="button"
                  className={`relative flex w-full items-center justify-center rounded-2xl border px-4 py-3.5 text-center text-sm font-semibold backdrop-blur-md transition ${
                    isCorrect
                      ? "border-emerald-200/70 bg-emerald-400/35 text-white"
                      : isIncorrect
                        ? "quiz-shake border-rose-200/70 bg-rose-400/35 text-white"
                        : "border-white/30 bg-white/10 text-white hover:bg-white/20"
                  }`}
                  onClick={() => handleAnswer(optionIndex)}
                  disabled={result === "correct"}
                >
                  <span className="absolute left-4 flex h-7 w-7 items-center justify-center rounded-full border border-white/30 bg-white/10 text-[10px] font-bold">
                    {optionIndex + 1}
                  </span>
                  <span className="px-8">{option}</span>
                </button>
              );
            })}
          </div>

          <div
            className="mt-auto min-h-12 pt-6 text-center text-sm font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
            aria-live="polite"
          >
            {result === "incorrect" && (
              <p className="text-rose-100">오답입니다. 다시 선택해주세요.</p>
            )}
            {result === "correct" && (
              <p className="text-emerald-100">
                정답입니다! 풍선을 획득했어요.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
