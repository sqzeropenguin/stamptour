import Link from "next/link";

import QuizScreen from "@/components/QuizScreen";
import { mockQuizzes } from "@/lib/mockData";

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
          1번부터 6번 부스의 QR 코드를 다시 확인해주세요.
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
  const quiz = mockQuizzes.find((item) => item.boothId === parsedBoothId);

  if (!quiz || !Number.isInteger(parsedBoothId)) {
    return <InvalidBoothAccess />;
  }

  return <QuizScreen quiz={quiz} />;
}
