import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Settings() {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 50,
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 30,
      }}
    >
      <View>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image
            source={require("../assets/images/left.png")}
            style={{ width: 28, height: 28 }}
          ></Image>

          <View>
            <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 24 }}>
              Settings
            </Text>
          </View>
        </Pressable>
        <View style={{ marginTop: 20 }}>
          <View style={{ gap: 10 }}>
            <View
              style={{
                backgroundColor: "#f0f0f0",
                height: 72,
                borderRadius: 25,
                justifyContent: "center",
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ fontFamily: "Poppins_400Regular" }}>Language</Text>
            </View>
            <View
              style={{
                backgroundColor: "#f0f0f0",
                height: 72,
                borderRadius: 25,
                justifyContent: "center",
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ fontFamily: "Poppins_400Regular" }}>
                Connected Devices
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#f0f0f0",
                height: 72,
                borderRadius: 25,
                justifyContent: "center",
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ fontFamily: "Poppins_400Regular" }}>
                Connected Accounts
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
