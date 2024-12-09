import {IWikiData} from "../type";

export default function getWikiDataById(userId: string): IWikiData {
  if(userId) {
    return {
      userName: '류현규',
      wikiData: [
        {
          category: '축구',
          contents: '현규는 축구와 사랑에 빠져 골대를 지나 늪을 건너 어둠의 동굴 속 멀리 그대가 보여 이제 나의 발을 잡아보아요~~~ 우리의 골이 들어가는 것을 느끼죠 자유롭게~ 저 골대를르ㅡ르를 들어가도 놀라지 말아요 우리 앞에 펼쳐진 해트트릭이~~~~ 너무나 소중해~~ 손흥민 있다면',
        },
        {
          category: '성적',
          contents: '이 좋다 조모씨 선생님께서 성적으로 우수하다 하셨다',
        },
        {
          category: '사건 및 논란',
          contents: '현호와 1000개의 베이비 오일을 이용했다는 논란이 있다',
        },
      ],
    };
  } else {
    throw new Error('userId is wrong');
  }
}
