import {Animated, View, StyleSheet} from "react-native";
import Pressable from "../../components/Pressable.tsx";
import {useState} from "react";
import {Colors} from "../../shared/constants/color.ts";
import {Typo} from "../../components/Typo.tsx";
import Icon from "../../components/Icon.tsx";
import {INotification} from "../../screens/Notifications.tsx";
import {useNavigation} from "@react-navigation/native";

export default function NotificationBox({
  userId,
  userName,
  notifications,
}: INotification) {
  const navigation = useNavigation();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openAnimationValue = useState(() => new Animated.Value(0))[0]; // 초기화 방식 수정

  const open = () => {
    Animated.timing(openAnimationValue, {
      toValue: 1,
      duration: 320,
      useNativeDriver: true,
    }).start();
  };

  const close = () => {
    Animated.timing(openAnimationValue, {
      toValue: 0,
      duration: 320,
      useNativeDriver: true,
    }).start();
  };

  const top_arrow_rotate_interpolate = openAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '-90deg'], // 단위 추가
  });
  const summary_categories_opacity_interpolate = openAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <Pressable
      onPress={() =>
        setIsOpen((prev) => {
          if (prev) close();
          else open();
          return !prev;
        })
      }
      style={{
        padding: 8,
        borderRadius: 12,
      }}
    >
      <View style={styles.wrapper}>
        <View style={styles.topSection}>
          <View style={styles.title}>
            <Typo.Contents>{userName}</Typo.Contents>
            <Animated.View
              style={{
                transform: [{ rotate: top_arrow_rotate_interpolate }],
              }}
            >
              <Icon icon={"arrow_ios"} />
            </Animated.View>
          </View>
          {!isOpen && (
            <Animated.View
              style={[
                {opacity: summary_categories_opacity_interpolate,},
                styles.categoriesSummary,
              ]}
            >
              {notifications.map((notification, index) => (
                <View key={index} style={styles.categoriesSummary}>
                  <Typo.Contents color={'dim'}>{notification.category}</Typo.Contents>
                  {index < notifications.length - 1 && (
                    <View style={styles.categoriesSummaryCircleDivider} />
                  )}
                </View>
              ))}
            </Animated.View>
          )}
        </View>
        {isOpen && (
          <Animated.View style={[
            {opacity: openAnimationValue},
            styles.categoriesBox,
          ]}>
            {notifications.map((v, i) => (
              <View key={i} style={styles.categoryItem}>
                <Typo.Contents color={'dim'}>{v.category}</Typo.Contents>
                <Typo.Contents color={'dim'}>{v.contents}</Typo.Contents>
              </View>
            ))}
          </Animated.View>
        )}
        {isOpen && (
          <View style={{width: '100%', alignItems: 'flex-end'}}>
            <Pressable
              onPress={() => navigation.navigate('Wiki', {userId: userId})}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                padding: 8,
                borderRadius: 8,
              }}
            >
              <Typo.Contents emphasize color={'dim'}>보러가기</Typo.Contents>
              <Icon icon={'arrow_right_alt'}/>
            </Pressable>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 12,
  },
  topSection: {
    width: '100%',
    gap: 8,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  categoriesSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoriesSummaryCircleDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.gray500,
  },
  notificationDetail: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.gray100,
  },
  categoriesBox: {
    width: '100%',
    gap: 12,
  },
  categoryItem: {
    width: '100%',
    gap: 4,
  },
});
