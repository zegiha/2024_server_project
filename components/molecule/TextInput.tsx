
import {TextInput as RNTextInput, StyleSheet, Animated} from "react-native";
import React, {useRef} from "react";
import { Colors } from "../../shared/constants/color.ts";
import {useRoute} from "@react-navigation/native";

export default function TextInput({
  value,
  setValue,
  placeholder,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}) {
  const ani = new Animated.Value(0);

  const inputRef = useRef<RNTextInput | null>(null);

  const borderColor = ani.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.gray300, Colors.primary500],
  });

  const handleActive = () => {
    Animated.timing(ani, {
      toValue: 1,
      duration: 120,
      useNativeDriver: false, // 스타일 변경은 네이티브 드라이버를 사용할 수 없음
    }).start();
  };

  const handleUnActive = () => {
    Animated.timing(ani, {
      toValue: 0,
      duration: 120,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {borderColor: borderColor},
      ]}
      onTouchEnd={() => {
        inputRef.current?.focus();
      }}
    >
      <RNTextInput
        ref={inputRef}
        onFocus={handleActive}
        onBlur={handleUnActive}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray500}
        style={styles.textInput}
        multiline={true}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: Colors.gray100,
  },
  textInput: {
    padding: 0,
    margin: 0,
    width: '100%',
    color: Colors.gray700,
    fontFamily: 'Wanted Sans',
    fontSize: 16,
  },
});
