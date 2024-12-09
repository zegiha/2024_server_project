import {SafeAreaView, StyleSheet, View} from "react-native";
import {Pressable, Typo} from "../../components/atom";
import {TextInput} from "../../components/molecule";
import React, {useState} from "react";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Colors} from "../../shared/constants/color.ts";
import {useNavigation} from "@react-navigation/native";

export default function Login_screen() {
  const navigation = useNavigation()
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return (
    <SafeAreaView style={style.container}>
      <KeyboardAwareScrollView>
        <View style={{flex: 1, gap: 32}}>
          <View style={style.title}>
            <Typo.Title emphasize color={'variable'}>이미 계정이 있으시군요!</Typo.Title>
          </View>
          <View style={style.inputArea}>
            <View style={style.inputContainer}>
              <Typo.Contents>이메일</Typo.Contents>
              <TextInput
                value={email}
                setValue={setEmail}
                placeholder={'이메일을 입력해주세요'}
              />
            </View>
            <View style={style.inputContainer}>
              <Typo.Contents>비밀번호</Typo.Contents>
              <TextInput
                value={password}
                setValue={setPassword}
                placeholder={'비밀번호를 입력해주세요'}
              />
            </View>
          </View>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Pressable onPress={() => {
              navigation.navigate('Auth/Register');
            }} style={{padding: 8, borderRadius: 8}}>
              <Typo.Caption color={'dim'}>논란 제조기가 처음이신가요?</Typo.Caption>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={style.buttonContainer}>
        <Pressable
          onPress={() => {
            // TODO 로그인 처리
            navigation.navigate('Home')
          }}
          style={style.button}
          backgroundColor={{active: Colors.primary700, normal: Colors.primary600}}
        >
          <Typo.Body emphasize color={'white'}>
            완료
          </Typo.Body>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    paddingTop: 92,
    paddingHorizontal: 16,
  },
  title: {
    flexDirection: 'row',
    gap: 6,
  },
  inputArea: {
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  buttonContainer: {
    width: '100%',
    padding: 16,
    zIndex: 2,
    backgroundColor: Colors.gray010,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 12,
    borderRadius: 12,
  },
});
