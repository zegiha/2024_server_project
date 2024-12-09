import {SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import Header from "../../components/molecule/Header.tsx";
import React, {useState} from "react";
import {useNavigation, useRoute} from "@react-navigation/native";
import {IWikiData} from "../../shared/type";
import {getWikiDataById} from "../../shared/api";
import {Divider} from "../../components/atom";
import {CategoryLink, WikiContents} from "../../components/molecule";
import {useScrollToCategory} from "../../shared/hooks";
import {AddCategoryButton, CompleteButton, Modal} from "../../widgets/edit_screen";

export default function Edit_selection_screen() {
  const {userId} = useRoute().params;
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const [wikiData, setWikiData] = useState<IWikiData>(getWikiDataById(userId));

  const {contentListRef, scrollViewRef, scrollToElement} = useScrollToCategory();

  const navigation = useNavigation();

  const handleComplete = () => {
    // 수정 정보 올리기
    // console.log(TODO)
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/*{isModalOpen && <Modal setModal={setIsModalOpen}/>}*/}
      <Header
        backButton={{
          isBackButton: true,
          contents: wikiData.userName,
        }}
        RightContents={
          <CompleteButton handleComplete={handleComplete}/>
        }
      />
      <View style={style.container}>
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={style.categoryListContainer}>
              <View style={style.categoryList}>
                {wikiData.wikiData.map((v, i) => (
                  <CategoryLink
                    key={i}
                    category={v.category}
                    onPress={() => scrollToElement(i)}
                  />
                ))}
              </View>
              <AddCategoryButton
                handleAddCategory={() => {
                  navigation.navigate('Edit', {
                    userId: userId,
                    changeCategory: 'new',
                    rootContents: 'new',
                  });
                }}
              />
            </View>
          </ScrollView>
        </View>
        <Divider paddingVertical={16} paddingHorizontal={16}/>
        <View style={{flex: 3}}>
          <ScrollView ref={scrollViewRef} style={{flex: 1}}>
            <View style={style.contentsList}>
              {wikiData.wikiData.map((v, i) => (
                <WikiContents
                  key={i}
                  ref={(el) => {
                    contentListRef.current[i] = el;
                  }}
                  {...v}
                  edit={{handleEdit: () => {
                    navigation.navigate('Edit', {
                      userId: userId,
                      changeCategory: v.category,
                      rootContents: v.contents,
                    });
                  }}}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
  },
  categoryListContainer: {
    flex: 1,
    gap: 12,
    paddingHorizontal: 16,
  },
  categoryList: {
    flex: 1,
    gap: 4,
  },
  contentsList: {
    flex: 1,
    gap: 32,
    paddingHorizontal: 16,
  },
});
