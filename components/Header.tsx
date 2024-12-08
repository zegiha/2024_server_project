import {View, StyleSheet} from "react-native";
import {Colors} from "../shared/constants/color.ts";
import Pressable from "./Pressable.tsx";
import Icon from "./Icon.tsx";
import {Typo} from "./Typo.tsx";
import LogoImage from '../assets/logo.svg'
import {useNavigation} from "@react-navigation/native";
import React from "react";

interface IHeader{
  logo?: boolean;
  backButton?: {
    isBackButton: boolean,
    contents?: string,
  }
  edit?: {
    isEdit: boolean,
    editSubjectId: string,
  };
  notifications?: {
    isNotifications: boolean,
    hasNotifications: boolean,
  },
  RightContents?: React.ReactNode,
}

export default function Header({
  logo,
  backButton,
  edit,
  notifications,
  RightContents,
}: IHeader) {
  const navigation = useNavigation();

  return (
    <View style={style.container}>
      <View>
        {logo && (
          <LogoImage/>
        )}
        {backButton?.isBackButton && (
          <Pressable
            onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home')}
            style={style.backButton}
          >
            <Icon icon={'arrow_back'}/>
            <Typo.Body emphasize>{backButton.contents ? backButton.contents : '돌아가기'}</Typo.Body>
          </Pressable>
        )}
      </View>
      <View style={style.rightContainer}>
        {notifications?.isNotifications && (
          <Pressable
            onPress={() => navigation.navigate('Notifications')}
            style={style.iconButton}
          >
            {notifications.hasNotifications ? (
              <Icon icon={'notifications_unread'}/>
            ) : (
              <Icon icon={'notifications'}/>
            )}
          </Pressable>
        )}
        {edit?.isEdit && (
          <Pressable
            onPress={() => navigation.navigate('Edit', {editSubjectId: edit?.editSubjectId})}
            style={style.iconButton}
          >
            <Icon icon={'edit'}/>
          </Pressable>
        )}
        {RightContents && RightContents}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 48,
    paddingHorizontal: 16,
    backgroundColor: Colors.gray010,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 'auto',
    padding: 8,
    borderRadius: 12,
  },
  iconButton: {
    padding: 8,
    borderRadius: 12,
  },
});
