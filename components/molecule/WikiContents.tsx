import React, {ForwardedRef, forwardRef} from "react";
import { StyleSheet, View } from "react-native";
import {Icon, Pressable, Typo} from "../atom";

const WikiContents = forwardRef(
  ({
     category,
     contents,
     edit,
  }: {
    category: string;
    contents: string;
    edit?: {handleEdit: () => void}
  }, ref: ForwardedRef<View | null>) => {
  return (
    <View style={style.container} ref={ref}>
      <View style={style.topRow}>
        <Typo.Body emphasize color={'variable'}>
          {category}
        </Typo.Body>
        {edit && <EditButton handleEdit={edit.handleEdit}/>}
      </View>
      <Typo.Contents>{contents}</Typo.Contents>
    </View>
  );
});

function EditButton({handleEdit}: {handleEdit: () => void}) {
  return <Pressable
    onPress={handleEdit}
    style={style.editButton}
  >
    <Icon icon={'edit_24_gray'}/>
  </Pressable>;
}

export default WikiContents;

const style = StyleSheet.create({
  container: {
    width: '100%',
    gap: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  editButton: {
    padding: 8,
    borderRadius: 100,
  },
});
