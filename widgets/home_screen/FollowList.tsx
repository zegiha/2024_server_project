import {ScrollView, View, StyleSheet} from "react-native";
import {Typo} from "../../components/atom/Typo.tsx";
import Pressable from "../../components/atom/Pressable.tsx";
import {useNavigation} from "@react-navigation/native";

interface IWikiSummary {
  userId: string,
  userName: string,
  editedAt: number, // 분 단위
}
function getFriendsWikiSummary(): Array<IWikiSummary> {
  const res: Array<IWikiSummary> = [];
  const dummy: IWikiSummary = {
    userId: 'userId',
    userName: '류현규',
    editedAt: 12,
  };
  for(let i = 0; i < 10; i++) res.push(dummy);
  return res;
}

export default function FollowList() {
  // TODO FollowList의 논란 불러오기
  const friendsWikiSummary = getFriendsWikiSummary();
  const navigation = useNavigation();

  return (
    <View style={{width: '100%', gap: 16, paddingVertical: 16, flex: 1}}>
      <View style={{paddingHorizontal: 16}}>
        <Typo.Title emphasize color={'variable'}>팔로우 리스트</Typo.Title>
      </View>
      <ScrollView>
        <View style={{paddingHorizontal: 16, flex: 1, gap: 16}}>
          {friendsWikiSummary.map((v, i) => (
            <Pressable
              key={i}
              onPress={() => navigation.navigate('Wiki', {userId: v.userId})}
              style={style.wiki}
            >
              <View style={style.wikiText}>
                <Typo.Contents>{v.userName}</Typo.Contents>
                <Typo.Caption color={'dim'}> {`${v.editedAt}분 전`}</Typo.Caption>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  wikiText: {
    flex: 1,
    gap: 4,
  },
  wiki: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 12,
    borderRadius: 12,
  },
});
