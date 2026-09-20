export interface User {
  studentId: string;
  name: string;
  stamps: number[];
  isCompleted: boolean;
  rewardReceived: boolean;
}

export interface Quiz {
  boothId: number;
  question: string;
  options: string[];
  answerIndex: number;
}
