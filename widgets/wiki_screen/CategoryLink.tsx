import {View, StyleSheet, TouchableOpacity} from "react-native";
import {Colors} from "../../shared/constants/color.ts";
import {Typo} from "../../components/Typo.tsx";

export default function CategoryLink({
  category,
  onPress,
}: {category: string, onPress: () => void}) {
  return <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.9}
    style={styles.container}
  >
    <View style={styles.dot}/>
    <Typo.Contents color={'primary'} underLine>{category}</Typo.Contents>
  </TouchableOpacity>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    marginHorizontal: 12,
    borderRadius: 4,
    backgroundColor: Colors.primary600,
  },
});
