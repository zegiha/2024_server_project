import {KeyboardAvoidingView, SafeAreaView, StyleSheet, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {Header, TextInput} from "../../components/molecule";
import {Pressable, Typo} from "../../components/atom";
import React, {useState} from "react";
import {Colors} from "../../shared/constants/color.ts";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export default function Edit_screen() {
  const {userId, changeCategory, rootContents}:
    {userId: string, category: 'new' | string, contents: 'new' | string} = useRoute().params;

  const [category, setCategory] = useState<string>(changeCategory === 'new' ? '' : changeCategory);
  const [contents, setContents] = useState<string>(rootContents === 'new' ? '' : rootContents)

  const navigation = useNavigation()

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header backButton={{isBackButton: true}}/>
      <KeyboardAwareScrollView>
        <View style={style.container}>
          {changeCategory === 'new' ? <New_category
            category={category}
            setCategory={setCategory}
            contents={contents}
            setContents={setContents}
          /> : <Edit_category
            category={category}
            setContents={setContents}
            contents={contents}
          />}
        </View>
      </KeyboardAwareScrollView>
      <View style={style.buttonContainer}>
        <Pressable
          onPress={() => {
            // TODO 수정정보 올리기
            navigation.goBack();
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

interface IEdit_category {
  category: string,
  contents: string,
  setContents: React.Dispatch<React.SetStateAction<string>>,
}
interface INew_category extends IEdit_category {
  setCategory: React.Dispatch<React.SetStateAction<string>>,
}

function Edit_category({
  category,
  contents,
  setContents,
}: IEdit_category) {
  return <View style={style.inputWrapper}>
    <Typo.Body emphasize color={'variable'}>
      {category}
    </Typo.Body>
    <TextInput
      value={contents}
      setValue={setContents}
      placeholder={'내용을 입력해주세요'}
    />
  </View>;
}

function New_category({
  setCategory,
  category,
  setContents,
  contents,
}: INew_category) {
  return (
    <>
      <View style={style.inputWrapper}>
        <Typo.Contents color={'variable'}>
          새 카테고리
        </Typo.Contents>
        <TextInput
          value={category}
          setValue={setCategory}
          placeholder={'카테고리를 입력해주세요'}
        />
      </View>
      <View style={style.inputWrapper}>
        <Typo.Contents color={'variable'}>
          내용
        </Typo.Contents>
        <TextInput
          value={contents}
          setValue={setContents}
          placeholder={'내용을 입력해주세요'}
        />
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    gap: 32,
  },
  inputWrapper: {
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
