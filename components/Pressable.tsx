import {Animated, Pressable as RnPressable, ViewStyle} from "react-native";
import {Colors} from "../shared/constants/color.ts";

export default function Pressable({
  children,
  onPress,
  style,
  disabled,
}: {children: React.ReactNode, onPress: () => void, style?: ViewStyle, disabled?: boolean}) {
  const animated = new Animated.Value(1);
  const interpolatedColor = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.gray100, Colors.gray010],
  });
  const pressed = () => {
    Animated.timing(animated, {
      toValue: 0,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };
  const unPressed = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };
  return (
    <RnPressable
      onPressIn={pressed}
      onPress={onPress}
      onPressOut={unPressed}
      disabled={disabled}
    >
      <Animated.View style={[
        {backgroundColor: interpolatedColor},
        style,
      ]}>
        {children}
      </Animated.View>
    </RnPressable>
  );
}
