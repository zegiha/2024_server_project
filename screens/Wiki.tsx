import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useRoute} from "@react-navigation/native";
import {useRef, useState} from "react";
import {CategoryLink, Header, WikiContents} from "../components/molecule";
import {Divider, Pressable, Typo} from "../components/atom";
import {getWikiDataById} from "../shared/api";
import {IWikiData} from "../shared/type";
import {useScrollToCategory} from "../shared/hooks";

type TFollowStatus = 'followed' | 'notFollowed' | 'requested';

export default function Wiki_Screen() {
  const route = useRoute();
  const [wikiData, setWikiData] = useState<IWikiData>(getWikiDataById(route.params.userId));

  const [followStatus, setFollowStatus] = useState<TFollowStatus>(getIsFollow(route.params.userId));

  const {contentListRef, scrollViewRef, scrollToElement} = useScrollToCategory();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        backButton={{isBackButton: true, contents: wikiData.userName}}
        edit={followStatus === 'followed' && {
          isEdit: true,
          editSubjectId: route.params.userId,
        }}
        RightContents={
        <FollowButton
          followStatus={followStatus}
          setFollowStatus={setFollowStatus}
        />
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

function getIsFollow(userId: string): TFollowStatus {
  return 'notFollowed';
}

function FollowButton({
  followStatus,
  setFollowStatus,
}: {
  followStatus: TFollowStatus,
  setFollowStatus: React.Dispatch<React.SetStateAction<TFollowStatus>>,
}) {
  return <Pressable
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
