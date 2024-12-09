import {Pressable, Typo} from "../../components/atom";
import React from "react";

export default function CompleteButton({handleComplete}: {handleComplete: () => void}) {
  return (
    <Pressable
      onPress={handleComplete}
      style={{padding: 8, borderRadius: 12}}
    >
      <Typo.Body emphasize color={'primary'}>완료</Typo.Body>
    </Pressable>
  );
}
