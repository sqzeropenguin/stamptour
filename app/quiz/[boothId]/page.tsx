import Link from "next/link";

import QuizScreen from "@/components/QuizScreen";
import { mockQuizzes } from "@/lib/mockData";

// QR 접속 요청마다 새 문제를 선택하도록 정적 캐싱을 방지합니다.
export const dynamic = "force-dynamic";

interface QuizPageProps {
  params: Promise<{
    boothId: string;
  }>;
}

function InvalidBoothAccess() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-5 py-8 text-center text-white">
      <section className="w-full rounded-[32px] border border-white/20 bg-white/5 p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-3xl">
        <p className="text-[10px] font-medium tracking-[0.3em] text-white/60">
          INVALID BOOTH
        </p>
        <h1 className="mt-4 font-serif text-2xl font-medium tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
          잘못된 부스 접근입니다.
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/70">
          1번부터 8번 부스의 QR 코드를 다시 확인해주세요.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-medium text-white/90 backdrop-blur-md transition active:scale-[0.98]"
        >
          메인으로 돌아가기
        </Link>
      </section>
    </main>
  );
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { boothId } = await params;
  const parsedBoothId = Number(boothId);
  if (!Number.isInteger(parsedBoothId) || parsedBoothId < 1 || parsedBoothId > 8) {
    return <InvalidBoothAccess />;
  }

  const quizzes = mockQuizzes.filter((item) => item.boothId === parsedBoothId);
  if (quizzes.length === 0) return <InvalidBoothAccess />;

  const quiz = quizzes[Math.floor(Math.random() * quizzes.length)];
  return <QuizScreen quiz={quiz} quizzes={quizzes} />;
}
