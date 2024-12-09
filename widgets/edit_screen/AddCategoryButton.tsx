import {Icon, Pressable, Typo} from "../../components/atom";
import React from "react";

export default function AddCategoryButton({handleAddCategory}: {handleAddCategory: () => void}) {
  return (
    <Pressable
      onPress={handleAddCategory}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        width: '100%',
        padding: 4,
        borderRadius: 12,
      }}
    >
      <Icon icon={'add'}/>
      <Typo.Body color={'dim'}>카테고리 추가</Typo.Body>
    </Pressable>
  );
}
