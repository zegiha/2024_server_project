import React, {ForwardedRef, forwardRef} from "react";
import { StyleSheet, View } from "react-native";
import { Typo } from "../../components/Typo.tsx";

const WikiContents = forwardRef(({ category, contents }: { category: string; contents: string }, ref: ForwardedRef<View | null>) => {
  return (
    <View style={style.container} ref={ref}>
      <Typo.Body emphasize color={'variable'}>
        {category}
      </Typo.Body>
      <Typo.Contents>{contents}</Typo.Contents>
    </View>
  );
});

export default WikiContents;

const style = StyleSheet.create({
  container: {
    width: '100%',
    gap: 8,
  },
});
