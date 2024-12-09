import React from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import {Colors} from "../../shared/constants/color.ts";
import {Pressable, Typo} from "../../components/atom";
import {useNavigation} from "@react-navigation/native";

export default function Modal({
  setModal,
}: {setModal: React.Dispatch<React.SetStateAction<boolean>>}) {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <View style={style.box}>
        <View style={{gap: 6}}>
          <Typo.Contents emphasize color={'variable'}>완료를 누르지 않으면</Typo.Contents>
          <View style={{flexDirection: 'row', gap: 4}}>
            <Typo.Contents emphasize color={'variable'}>수정 내용이</Typo.Contents>
            <Typo.Contents emphasize color={'warn'}>반영되지않아요</Typo.Contents>
          </View>
        </View>
        <View style={style.buttonContainer}>
          <Pressable
            width={buttonWidth}
            onPress={() => {
              navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home')
            }}
            style={style.button}
            backgroundColor={{normal: Colors.gray100, active: Colors.gray200}}
          >
            <Typo.Contents color={'dim'}>나가기</Typo.Contents>
          </Pressable>
          <Pressable
            width={buttonWidth}
            onPress={() => setModal(false)}
            style={style.button}
            backgroundColor={{normal: Colors.primary600, active: Colors.primary700}}
          >
            <Typo.Contents color={'white'}>계속하기</Typo.Contents>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const buttonWidth = (Dimensions.get('screen').width - 64) / 2 - 8;
const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    transform: [{translateY: -72}],
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    padding: 16,
    backgroundColor: 'rgba(14, 14, 14, 0.64)',
    zIndex: 1000,
  },
  box: {
    gap: 24,
    width: '100%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.gray010,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 12,
    borderRadius: 12,
  },
});
