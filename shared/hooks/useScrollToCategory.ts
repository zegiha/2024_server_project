import {useRef} from "react";
import {ScrollView, View} from "react-native";

export default function useScrollToCategory() {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const contentListRef = useRef<Array<View | null>>([]);

  const scrollToElement = (index: number) => {
    contentListRef.current[index]?.measureLayout(
      scrollViewRef.current as any,
      (_,  y) => {
        scrollViewRef.current?.scrollTo({y, animated: true});
      },
      () => console.error('layout measurement failed')
    );
  };

  return { scrollViewRef, contentListRef, scrollToElement };
}
