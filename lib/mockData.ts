import type { Quiz, User } from "@/types";

export const mockUser: User = {
  studentId: "20261234",
  name: "김향연",
  stamps: [1, 2],
  isCompleted: false,
  rewardReceived: false,
};

export const mockQuizzes: Quiz[] = [
  {
    boothId: 1,
    question: "건축학과의 건축전 이름은 ‘시제 사이’이다.",
    options: ["O", "X"],
    answerIndex: 0,
  },
  {
    boothId: 2,
    question: "학술대동제의 이름은 무엇일까요?",
    options: ["향연", "청춘", "비상", "울림"],
    answerIndex: 0,
  },
  {
    boothId: 3,
    question: "이번 축제에 함께하는 단과대학은 모두 몇 개일까요?",
    options: ["5개", "6개", "7개", "8개"],
    answerIndex: 3,
  },
  {
    boothId: 4,
    question: "스탬프 투어에서 부스를 방문해 모으는 것은 무엇일까요?",
    options: ["별", "풍선", "꽃", "리본"],
    answerIndex: 1,
  },
  {
    boothId: 5,
    question: "객관식 퀴즈의 보기 개수는 몇 개일까요?",
    options: ["2개", "3개", "4개", "5개"],
    answerIndex: 2,
  },
  {
    boothId: 6,
    question: "모든 부스의 스탬프를 모으면 표시되는 상태는 무엇일까요?",
    options: ["시작", "진행 중", "완료", "대기"],
    answerIndex: 2,
  },
  {
  boothId: 7,
  question: "7번 부스의 퀴즈 문제",
  options: ["보기 1", "보기 2", "보기 3", "보기 4"],
  answerIndex: 0,
},
{
  boothId: 8,
  question: "8번 부스의 퀴즈 문제",
  options: ["보기 1", "보기 2", "보기 3", "보기 4"],
  answerIndex: 0,
},
];
