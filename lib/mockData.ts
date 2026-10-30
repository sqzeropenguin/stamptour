import type { Quiz, User } from "@/types";

export const mockUser: User = {
  studentId: "20261234",
  name: "김향연",
  stamps: [1, 2],
  isCompleted: false,
  rewardReceived: false,
};

// 각 부스 QR 경로(/quiz/1~8)는 유지하고 해당 단과대학 문제만 출제합니다.
export const boothColleges: Record<number, string> = {
  1: "체육대학",
  2: "글로벌경영대학",
  3: "SW융합대학",
  4: "의료과학대학",
  5: "공과대학",
  6: "미래융합대학",
  7: "인문사회과학대학",
  8: "자연과학대학"
};

export const mockQuizzes: Quiz[] = [
  // 1번: 체육대학 (3문제)
  { boothId: 1, department: "스포츠응용산업학과", question: "스포츠응용산업학과 학생 106명을 대상으로 설문조사를 실시한 결과, 대표 색상 선호도에서 파란색(블루)이 가장 높은 비율을 차지했다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 1, department: "스포츠의학과", question: "음악 BPM이 운동 수행능력에 미치는 영향을 알아보기 위한 실험에서 느린 음악은 50 BPM, 빠른 음악은 150 BPM으로 설정했다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 1, department: "스포츠과학과", question: "순천향대학교 스포츠과학과는 1984년에 체육학과로 시작했다.", options: ["O", "X"], answerIndex: 0 },
  // 2번: 글로벌경영대학 (7문제)
  { boothId: 2, department: "국제통상학과", question: "순천향대학교 GTEP(지역특화 청년무역전문가 양성사업)는 무역 이론과 현장 경험을 갖춘 글로벌 무역 인재를 양성하는 프로그램이다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 2, department: "회계학과", question: "현 정부회계처리 방법에 따르면 본 개정사항으로 인해 국민연금 부채를 최소한 우발부채로서 주석에 공시해야 한다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 2, department: "글로벌문화산업학과", question: "AI-Q는 정보 검증과 AI 콘텐츠 판별 능력을 훈련하는 서비스이다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 2, department: "관광경영학과", question: "학술제에서 관광경영학과 학생들은 관광경영학과의 전공 특성을 살려 학생들이 직접 관광상품을 기획한다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 2, department: "경제금융학과", question: "경제금융학과는 경제의 원리와 금융시장의 구조를 바탕으로 투자, 자산관리, 기업금융, 금융데이터 등 다양한 금융 분야를 탐구하며 경제 이론만 학습한다.", options: ["O", "X"], answerIndex: 1 },
  { boothId: 2, department: "경영학과", question: "담아유(Dam-a-U)는 충남 지역 농가에서 매일 발생하는 농산물 과잉 재고를 실시간으로 데이터화하여, 지역 대학생과 주민이 소액의 배송비로 가까운 거점에서 픽업할 수 있는 로컬 직거래 플랫폼이다.", options: ["O", "X"], answerIndex: 1 },
  { boothId: 2, department: "IT금융경영학과", question: "IT금융경영학과 작품은 유전자/마이크로바이옴 분석 연계 보험에 대한 연구이다.", options: ["O", "X"], answerIndex: 1 },
  // 3번: SW융합대학 (6문제)
  { boothId: 3, department: "빅데이터공학과", question: "RMSE는 4개 시장에서 100% 개선되었다.", options: ["O", "X"], answerIndex: 1 },
  { boothId: 3, department: "메타버스&게임학과", question: "적대적 개체 AI는 시각, 촉각 정보를 단서로 플레이어를 추적한다.", options: ["O", "X"], answerIndex: 1 },
  { boothId: 3, department: "사물인터넷학과", question: "TravelLocal은 GPS 기반 인증 리뷰를 통해 신뢰성을 확보한다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 3, department: "의료IT공학과", question: "마음콜은 보이스피싱에 대응하기 위한 플랫폼이다.", options: ["O", "X"], answerIndex: 1 },
  { boothId: 3, department: "정보보호학과", question: "AFL 퍼징을 수행한 결과, 실제 임베디드 기기 내에 존재했던 취약점 탐색에 성공했다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 3, department: "컴퓨터소프트웨어공학과", question: "컴퓨터소프트웨어공학과에는 총 5개의 연구실이 존재한다.", options: ["O", "X"], answerIndex: 1 },
  // 4번: 의료과학대학 (6문제)
  { boothId: 4, department: "의료생명공학과", question: "강한 라디칼 소거 활성과 염증·노화 경로 조절능이 보고된 물질은 Dieckol이다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 4, department: "임상병리학과", question: "4년간의 체계적인 교육과정과 현장 실습을 통해 임상병리사 면허 취득을 준비하며, 이를 통해 3기 졸업생 전원 국가고시 합격과 같은 우수한 성과를 이어가고 있다.", options: ["O", "X"], answerIndex: 1 },
  { boothId: 4, department: "작업치료학과", question: "충분한 감각 등록이 어려운 개인일수록, 스스로 작업을 잘할 수 있다고 느끼는 유능감이 높게 나타나는 것을 확인했다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 4, department: "보건행정학과", question: "하루 걸음 수가 많을수록 전체 사망률이 무의미하게 낮다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 4, department: "의약공학과", question: "조직학적 분석을 통해 피부 구조 회복 및 염증 완화 효과를 확인했다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 4, department: "의공학과", question: "저활동성 방광은 방광 수축이 약해 배뇨가 어렵지만 요로감염 위험은 적다.", options: ["O", "X"], answerIndex: 1 },
  // 5번: 공과대학 (9문제)
  { boothId: 5, department: "전기공학과", question: "우리가 집이나 카페에서 사용하는 '220V(볼트)' 전기! 그렇다면 전기 자동차, 스마트폰, 배터리가 사용하는 전기는 직류(DC)이다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 5, department: "전자공학과", question: "방 불을 켜거나 스마트폰 화면, TV, 신호등에 쓰여 전기를 아주 적게 먹고 오래가는 이 조명은 형광등이다.", options: ["O", "X"], answerIndex: 1 },
  { boothId: 5, department: "기계공학과", question: "여름철 에어컨을 틀면 실외기가 바쁘게 돌아갑니다. 에어컨이 방안을 시원하게 만드는 진짜 원리는 방안의 열을 흡수해서 없애버리는 것이다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 5, department: "정보통신공학과", question: "카페나 지하철에서 데이터를 마음껏 쓸 수 있게 해주는 'Wi-Fi(와이파이)'. 와이파이는 무선으로 연결되어 작동하는 것이다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 5, department: "나노화학공학과", question: "'나노(Nano)'는 눈에 보이지 않을 정도로 아주 작은 단위를 뜻합니다. 1나노미터(nm)는 머리카락 두께의 약 100분의 1 수준이다.", options: ["O", "X"], answerIndex: 1 },
  { boothId: 5, department: "에너지환경공학과", question: "햇빛, 바람, 물처럼 아무리 써도 고갈되지 않고 탄소를 배출하지 않는 '친환경 재생 에너지' 중 석탄에너지는 포함되지 않는다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 5, department: "컴퓨터공학과", question: "컴퓨터나 스마트폰이 갑자기 먹통이 되거나 이상하게 동작할 때, 기사님이 알려주는 최고의 '1초 해결책'은 화면을 마구 때리는 것이다.", options: ["O", "X"], answerIndex: 1 },
  { boothId: 5, department: "전자정보공학과", question: "스마트폰으로 지하철을 타거나 편의점에서 결제할 때 카드를 직접 대지 않고 가까이 갖다 대기만 해도 작동하는 무선 통신 기술은 NFC이다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 5, department: "디스플레이신소재공학과", question: "최신 폴더블 스마트폰처럼 화면이 반으로 싹 접히는 비밀! 화면을 만드는 재료가 종이로 바뀌었기 때문이다.", options: ["O", "X"], answerIndex: 1 },
  // 6번: 미래융합대학 (12문제)
  { boothId: 6, department: "건축학과", question: "건축학과의 건축전 이름은 ‘시제 사이’이다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 6, department: "스마트자동차학과", question: "스마트자동차학과의 학과 동아리 이름은 ‘무한도전’이다.", options: ["O", "X"], answerIndex: 1 },
  { boothId: 6, department: "영미학과", question: "영미학과가 미국 Wellesley College와 공동 제작한 연극의 제목은 〈The Winter’s Tale〉이다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 6, department: "중국학과", question: "공자아카데미는 중국학과 소속 동아리이다.", options: ["O", "X"], answerIndex: 1 },
  { boothId: 6, department: "바이오의약전공", question: "바이오의약품은 생명공학기술을 활용하여 만들어지는 의약품이다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 6, department: "에너지공학과", question: "에너지공학과에서는 수소에너지와 태양에너지 등 신재생에너지에 대해 배운다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 6, department: "탄소중립학과", question: "탄소중립학과 졸업생은 에너지·환경 관련 기업뿐만 아니라 공기업 및 공공기관에도 진출할 수 있다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 6, department: "헬스케어융합전공", question: "헬스케어융합전공에서는 인공지능을 활용한 의료기기 분야는 다루지 않는다.", options: ["O", "X"], answerIndex: 1 },
  { boothId: 6, department: "공연영상학과", question: "공연영상학과가 지난해 학술제에서 선보인 공연의 제목은 〈레미제라블〉이다.", options: ["O", "X"], answerIndex: 1 },
  { boothId: 6, department: "디지털애니메이션학과", question: "디지털애니메이션학과에서 제작한 애니메이션의 주인공은 우리나라 전통 요괴 ‘그슨새’이다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 6, department: "한국문화콘텐츠학과", question: "영상 속 성공한 사람들이 강조한 것은 현재보다 미래를 위해 열심히 살아가는 것이다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 6, department: "미디어커뮤니케이션학과", question: "주인공은 과거에 사진 찍는 것을 좋아했지만, 현재는 평범한 회사원으로 살아가고 있다.", options: ["O", "X"], answerIndex: 0 },
  // 7번: 인문사회과학대학 (7문제)
  { boothId: 7, department: "유아교육과", question: "북유럽에서 커피를 마시며 유모차를 끌고, 아이를 돌보는 유아에 적극적인 아빠를 의미하는 말은 '커피빠빠'이다.", options: ["O", "X"], answerIndex: 1 },
  { boothId: 7, department: "특수교육과", question: "언어청각임상센터에서는 진단 및 평가를 통한 조기 발견하기, 장애 유형에 따른 적절한 치료 및 교육을 한다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 7, department: "청소년교육상담학과", question: "AI시대 청소년들의 윤리 및 디지털 리터러시 능력 함양을 위해 개발한 프로그램은 '다마고치'이다.", options: ["O", "X"], answerIndex: 1 },
  { boothId: 7, department: "행정학과", question: "행정학과는 학술제 중 학생들이 국무위원이 되어 실제 정책 안건을 논의하는 모의국무회의를 진행한다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 7, department: "법학과", question: "현행 헌법상 과실범 처벌 규정의 한계는 없다.", options: ["O", "X"], answerIndex: 1 },
  { boothId: 7, department: "사회복지학과", question: "사회복지학과는 정기적으로 일본 구마모토학원대학과 학술교류회를 진행하고 있다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 7, department: "경찰행정학과", question: "2000년~2008년 발생한 대한민국의 미제살인사건의 주요 원인은 CCTV 등 수사 인프라와 관련되어 있다.", options: ["O", "X"], answerIndex: 0 },
  // 8번: 자연과학대학 (4문제)
  { boothId: 8, department: "생명과학과", question: "나비의 날개에는 여러 개의 날개맥이 존재한다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 8, department: "식품영양학과", question: "식물성 단백질은 종류에 따라 물성이 다르게 나타날 수 있다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 8, department: "화학과", question: "해당 연구에서는 전극(Electrode)을 이용한 실험을 진행하였다.", options: ["O", "X"], answerIndex: 0 },
  { boothId: 8, department: "환경보건학과", question: "환경보건학과에서는 환경이 인간의 건강에 미치는 영향을 공부한다.", options: ["O", "X"], answerIndex: 0 },
];
