import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function BottomNav() {
  const navigation = useNavigation();

  return (
    <View style={styles.navContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
        <Image
          source={require("../assets/images/home.png")}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ReadVitals")}>
        <Image
          source={require("../assets/images/apps.png")}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
        <Image
          source={require("../assets/images/robot.png")}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Image
          source={require("../assets/images/profile.png")}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Image
          source={require("../assets/images/settings.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
    backgroundColor: "#f3f3f3",
    borderTopWidth: 1,
    borderColor: "#DBDDDD",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 10,
  },
  icon: {
    width: 28,
    height: 28,
  },
});
