export interface User {
  studentId: string;
  name: string;
  stamps: number[];
  isCompleted: boolean;
  rewardReceived: boolean;
}

export interface Quiz {
  boothId: number;
  department?: string;
  question: string;
  options: string[];
  answerIndex: number;
}
