// PushManager.jsx
import notifee, { AndroidImportance } from "@notifee/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { useEffect, useState } from "react";
import { Alert, Button, View } from "react-native";

const SAVE_TOKEN_URL = "https://mobilix.com.ng/loidai/api/save_token.php";
const SEND_PUSH_URL = "https://mobilix.com.ng/loidai/api/send_push.php";

const PushManager = () => {
  const [fcmToken, setFcmToken] = useState(null);

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log("Push permission granted");
      getAndSendToken();
    } else {
      console.log("Push permission denied");
      Alert.alert("Push Permission", "You need to allow notifications");
    }
  };

  const getAndSendToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log("FCM Token:", token);
      setFcmToken(token);

      const storedToken = await AsyncStorage.getItem("fcmToken");
      if (storedToken !== token) {
        const formData = new URLSearchParams();
        formData.append("token", token);

        await fetch(SAVE_TOKEN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString(),
        });

        await AsyncStorage.setItem("fcmToken", token);
        console.log("Token sent to server");
      }
    } catch (e) {
      console.log("Error getting token:", e);
    }
  };

  const showNotification = async (title, body) => {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        smallIcon: "ic_launcher", // make sure you have this icon in android/app/src/main/res/mipmap
        pressAction: { id: "default" },
      },
    });
  };

  const onMessageListener = () => {
    return messaging().onMessage(async (remoteMessage) => {
      console.log("Foreground push received:", remoteMessage);
      if (remoteMessage.notification) {
        await showNotification(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
        );
      }
    });
  };

  const sendTestPush = async () => {
    if (!fcmToken) return Alert.alert("No token", "Token not ready yet");

    try {
      const res = await fetch(SEND_PUSH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: fcmToken,
          title: "Test Notification",
          body: "This is a push notification test!",
        }),
      });
      const data = await res.json();
      console.log("Push response:", data);
      Alert.alert("Push Sent", JSON.stringify(data));
    } catch (e) {
      console.log("Error sending push:", e);
      Alert.alert("Error", e.message);
    }
  };

  useEffect(() => {
    requestPermission();
    const unsubscribe = onMessageListener();
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Button title="Send Test Push" onPress={sendTestPush} />
    </View>
  );
};

export default PushManager;
