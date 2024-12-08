import {SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import Header from "../components/Header.tsx";
import {useRoute} from "@react-navigation/native";
import {Typo} from "../components/Typo.tsx";
import {useRef, useState} from "react";
import {CategoryLink, WikiContents} from "../widgets/wiki_screen";
import Divider from "../components/atom/Divider.tsx";
import Pressable from "../components/Pressable.tsx";

interface IWikiData {
  userName: string,
  wikiData: Array<{
    category: string,
    contents: string,
  }>
}

function getWikiDataById(userId: string): IWikiData {
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

type TFollowStatus = 'followed' | 'notFollowed' | 'requested';
function getIsFollow(userId: string): TFollowStatus {
  return 'notFollowed';
}

export default function Wiki_Screen() {
  const route = useRoute();
  const [wikiData, setWikiData] = useState<IWikiData>(getWikiDataById(route.params.userId));
  const [followStatus, setFollowStatus] = useState<TFollowStatus>(getIsFollow(route.params.userId));

  const scrollViewRef = useRef<ScrollView | null>(null);
  const contentListRef = useRef<Array<View | null>>([]);
  const scrollToElement = (index: number) => {
    contentListRef.current[index]?.measureLayout(
      scrollViewRef.current as any,
      (_,  y) => {
        scrollViewRef.current?.scrollTo({y, animated: true});
      },
      () => console.error('layout measurement failed')
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        backButton={{isBackButton: true, contents: wikiData.userName}}
        edit={followStatus === 'followed' && {
          isEdit: true,
          editSubjectId: route.params.userId,
        }}
        RightContents={
          <Pressable
            onPress={() => {
              console.log('팔로우 처리');
              setFollowStatus('requested');
              setTimeout(() => {
                setFollowStatus('followed');
              }, 4000)
            }}
            style={{padding: 8, borderRadius: 12}}
            disabled={followStatus === 'requested'}
          >
            <Typo.Contents emphasize color={
              followStatus === 'notFollowed' ?
                'primary' : followStatus === 'requested' ?
                  'normal' : 'warn'
            }>
              {
                followStatus === 'notFollowed' ?
                  '팔로우' : followStatus === 'requested' ?
                  '요청됨' : '팔로우 취소'
              }
            </Typo.Contents>
          </Pressable>
        }
      />
      <View style={style.container}>
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={style.categoryList}>
              {wikiData.wikiData.map((v, i) => (
                <CategoryLink
                  key={i}
                  category={v.category}
                  onPress={() => scrollToElement(i)}
                />
              ))}
            </View>
          </ScrollView>
        </View>
        <Divider paddingVertical={16} paddingHorizontal={16}/>
        <View style={{flex: 3}}>
          <ScrollView ref={scrollViewRef} style={{flex: 1}}>
            <View style={style.contentsList}>
              {wikiData.wikiData.map((v, i) => (
                <WikiContents
                  key={i}
                  ref={(el) => {contentListRef.current[i] = el}}
                  {...v}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
  },
  categoryList: {
    flex: 1,
    gap: 4,
    paddingHorizontal: 16,
  },
  contentsList: {
    flex: 1,
    gap: 32,
    paddingHorizontal: 16,
  },
});
