import {SafeAreaView, StyleSheet, View} from "react-native";
import {useState} from "react";
import {Colors} from "../shared/constants/color.ts";
import {Typo, Icon, Pressable} from "../components/atom";
import {FollowList} from "../widgets/home_screen";
import {Header} from "../components/molecule";

export default function Home_Screen() {
  const [hasNotifications, setHasNotifications] = useState<boolean>(false);

  return (
    <SafeAreaView style={style.container}>
      <Header
        logo
        notifications={{isNotifications: true, hasNotifications: false}}
      />
      <View style={style.section}>
        <Pressable
          onPress={() => console.log('my details')}
          style={{...style.wiki, ...style.myWiki}}
        >
          <View style={style.wikiText}>
            <Typo.Body emphasize color={'variable'}>내 새로운 논란 보러가기</Typo.Body>
            <Typo.Caption color={'dim'}>12분 전 수정</Typo.Caption>
          </View>
          <Icon icon={'arrow_right_alt'}/>
        </Pressable>
      </View>
      <FollowList/>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    width: '100%',
    padding: 16,
    gap: 16,
  },
  myWiki: {
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.gray300,
  },
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
