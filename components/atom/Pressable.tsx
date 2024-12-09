import {Animated, DimensionValue, Pressable as RnPressable, ViewStyle} from "react-native";
import {Colors} from "../../shared/constants/color.ts";

export default function Pressable({
  children,
  onPress,
  width,
  style,
  backgroundColor={normal: Colors.gray010, active: Colors.gray100},
  disabled,
}: {
  children: React.ReactNode,
  onPress: () => void,
  width?: DimensionValue,
  style?: ViewStyle,
  backgroundColor?: {normal: string, active: string}
  disabled?: boolean
}) {
  const animated = new Animated.Value(1);
  const interpolatedColor = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [backgroundColor.active, backgroundColor.normal],
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
      style={{width: width}}
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
