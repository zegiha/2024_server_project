import {View} from "react-native";
import {Colors} from "../../shared/constants/color.ts";

interface IDivider {
  paddingHorizontal: number;
  paddingVertical: number;
}

export default function Divider({
  paddingVertical,
  paddingHorizontal,
}: IDivider) {
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal,
        paddingVertical,
      }}
    >
      <View style={{
        width: '100%',
        height: 1,
        backgroundColor: Colors.gray300,
      }}/>
    </View>
  );
}
