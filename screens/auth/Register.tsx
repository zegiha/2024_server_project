import {SafeAreaView, StyleSheet, View} from "react-native";
import BigLogo from '../../assets/bigLogo.svg';
import {Pressable, Typo} from "../../components/atom";
import {TextInput} from "../../components/molecule";
import React, {useState} from "react";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Colors} from "../../shared/constants/color.ts";
import {useNavigation} from "@react-navigation/native";

export default function Register_screen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  return (
    <SafeAreaView style={style.container}>
      <KeyboardAwareScrollView>
        <View style={{flex: 1, gap: 32}}>
          <View style={style.title}>
            <BigLogo/>
            <Typo.Title emphasize color={'variable'}>에 온걸 환영해요!</Typo.Title>
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
            <View style={style.inputContainer}>
              <Typo.Contents>닉네임</Typo.Contents>
              <TextInput
                value={userName}
                setValue={setUserName}
                placeholder={'닉네임을 입력해주세요'}
              />
            </View>
          </View>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Pressable onPress={() => {
              navigation.navigate('Auth/Login');
            }} style={{padding: 8, borderRadius: 8}}>
              <Typo.Caption color={'dim'}>이미 계정이 있으신가요?</Typo.Caption>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={style.buttonContainer}>
        <Pressable
          onPress={() => {
            // TODO 회원가입 처리
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
