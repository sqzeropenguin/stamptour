"use client";

import { useState, useSyncExternalStore } from "react";

const IN_APP_BROWSER_PATTERN =
  /KAKAOTALK|Instagram|FBAN|FBAV|Line\/|NAVER|DaumApps|Snapchat|Twitter/i;

const subscribeToUserAgent = () => () => {};
const getServerUserAgentMatch = () => false;
const getUserAgentMatch = () =>
  IN_APP_BROWSER_PATTERN.test(navigator.userAgent);

export default function InAppBlocker() {
  const isInAppBrowser = useSyncExternalStore(
    subscribeToUserAgent,
    getUserAgentMatch,
    getServerUserAgentMatch,
  );
  const [copyStatus, setCopyStatus] = useState<
    "idle" | "copied" | "failed"
  >("idle");

  const copyCurrentUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  };

  if (!isInAppBrowser) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#7D6B7D]/35 px-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="in-app-browser-title"
    >
      <div className="glass-modal w-full max-w-sm p-7 text-center">
        <div
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/30 text-2xl backdrop-blur-lg"
          aria-hidden="true"
        >
          🌐
        </div>
        <h2
          id="in-app-browser-title"
          className="mt-5 text-xl font-extrabold leading-8 tracking-[-0.025em] text-ink"
        >
          안전한 스탬프 보관을 위해 기본 브라우저(사파리/크롬)로
          접속해주세요!
        </h2>
        <p className="mt-3 text-sm leading-6 text-ink-light">
          아래 버튼으로 링크를 복사한 뒤 기본 브라우저의 주소창에 붙여
          넣어주세요.
        </p>
        <button
          type="button"
          className="mt-6 w-full rounded-2xl bg-[#8F7A91] px-5 py-3.5 font-semibold text-white shadow-lg shadow-[#7D6B7D]/15 transition active:scale-[0.98]"
          onClick={copyCurrentUrl}
        >
          {copyStatus === "copied" ? "링크가 복사됐어요!" : "링크 복사하기"}
        </button>
        {copyStatus === "failed" && (
          <p className="mt-3 text-sm font-medium text-rose-500" role="alert">
            복사하지 못했어요. 주소창의 링크를 직접 복사해주세요.
          </p>
        )}
      </div>
    </div>
  );
}
