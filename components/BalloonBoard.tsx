const BALLOON_COLORS = [
  "#F6A39C", // 1번 핑크
  "#F8D27A", // 2번 노랑
  "#9FD9EE", // 3번 하늘
  "#A9DFC5", // 4번 민트
  "#C9B8EE", // 5번 보라
  "#F7B58F", // 6번 주황
  "#F4A6C8", // 7번 로즈핑크
  "#A7B9F5", // 8번 연보라
] as const;

interface BalloonBoardProps {
  stamps: number[];
  isCompleted: boolean;
}

export default function BalloonBoard({
  stamps,
  isCompleted,
}: BalloonBoardProps) {
  return (
    <section
      className="relative flex h-full min-h-0 w-full flex-col justify-center rounded-[28px] border border-white/20 bg-white/5 p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-3xl"
      aria-label="스탬프 풍선 보드"
    >
      {isCompleted && (
        <div
          className="all-clear-glow pointer-events-none absolute inset-4 rounded-[40%]"
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 grid grid-cols-6 gap-x-0 gap-y-3">
        {BALLOON_COLORS.map((color, index) => {
          const boothId = index + 1;
          const isAcquired = stamps.includes(boothId);

          return (
            <div
              key={boothId}
              className={`relative flex aspect-[3/4] w-full max-w-24 shrink-0 items-start justify-center justify-self-center rounded-3xl col-span-2 ${index === 6
                  ? "col-start-2"
                  : index === 7
                    ? "col-start-4"
                    : ""
                }`}
              role="img"
              aria-label={`${boothId}번 부스 풍선 ${isAcquired ? "획득 완료" : "미획득"
                }`}
            >
              {isAcquired ? (
                <div
                  className="origin-top max-[340px]:scale-[0.72]"
                >
                  <div
                    className="balloon-rise"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <div
                      className="balloon-float relative flex h-[120px] w-20 justify-center"
                      style={{ animationDelay: `${900 + index * 120}ms` }}
                    >
                      <div
                        className="balloon-body relative h-20 w-16 border border-white/50"
                        style={{
                          background: `radial-gradient(circle at 32% 24%, rgba(255,255,255,0.72), ${color} 38%, ${color} 100%)`,
                          boxShadow: `inset -9px -11px 18px rgba(125,107,125,0.08), 0 14px 28px ${color}55`,
                        }}
                      >
                        <span className="absolute left-[15px] top-3 h-5 w-2.5 -rotate-[24deg] rounded-full bg-white/45 blur-[1px]" />
                      </div>
                      <span
                        className="absolute left-1/2 top-[74px] h-3 w-3 -translate-x-1/2"
                        style={{
                          backgroundColor: color,
                          clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
                        }}
                      />
                      <svg
                        className="absolute left-1/2 top-[83px] h-[33px] w-8 -translate-x-1/2 overflow-visible"
                        viewBox="0 0 48 52"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M24 1C9 14 39 25 17 51"
                          stroke="rgba(125, 107, 125, 0.46)"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative flex h-[120px] w-20 origin-top justify-center max-[340px]:scale-[0.72]">
                  <div className="balloon-body h-20 w-16 border-[1.5px] border-dashed border-white/80 bg-white/[0.08] shadow-[inset_0_0_18px_rgba(255,255,255,0.12)]" />
                  <span className="absolute left-1/2 top-[75px] h-2.5 w-2.5 -translate-x-1/2 rotate-45 rounded-[3px] border-b-[1.5px] border-r-[1.5px] border-dashed border-white/80" />
                  <svg
                    className="absolute left-1/2 top-[83px] h-[33px] w-8 -translate-x-1/2 overflow-visible"
                    viewBox="0 0 48 52"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M24 1C9 14 39 25 17 51"
                      stroke="rgba(125, 107, 125, 0.3)"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}

              <span className="absolute bottom-0 shrink-0 whitespace-nowrap rounded-full border border-white/60 bg-white/40 px-1.5 py-0.5 text-[9px] font-semibold tracking-wider text-white shadow-sm backdrop-blur-md drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
                BOOTH {boothId}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
