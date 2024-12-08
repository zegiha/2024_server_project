import {SafeAreaView, StyleSheet, ScrollView, View} from "react-native";
import Header from "../components/Header.tsx";
import {useState} from "react";
import {NotificationBox} from "../widgets/notifications_screen";

export interface INotification {
  userId: string,
  userName: string,
  notifications: Array<{category: string, contents: string}>,
}
function getNotifications(): Array<INotification> {
  const res: Array<INotification> = [];
  const dummy: INotification = {
    userId: 'userId',
    userName: '류현규',
    notifications: [{category: '축구', contents: '선출이었다'}, {category: '논란', contents: '현호의 위협을 받고 있다는 소문이 있다'}],
  };
  for (let i = 0; i < 20; i++) res.push(dummy);
  return res;
}

export default function Notifications_screen() {
  const [notifications, setNotifications] = useState(getNotifications());
  return (
    <SafeAreaView style={style.container}>
      <Header backButton={{isBackButton: true, contents: '알림'}}/>
      <ScrollView style={style.scrollViewContainer}>
        <View style={style.scrollViewWrapper}>
          {notifications.map((v, i) => (
            <NotificationBox
              key={`${v.userId}_${i}`}
              {...v}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
    padding: 16,
  },
  scrollViewWrapper: {
    gap: 24,
  },
});
