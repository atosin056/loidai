import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Notifications() {
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
              Notifications
            </Text>
          </View>
        </Pressable>
        <View>
          <View style={{ marginTop: 20 }}>
            <View>
              <View>
                <Text
                  style={{ color: "grey", fontFamily: "Poppins_400Regular" }}
                >
                  Today
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 15,
                  marginTop: 15,
                  borderBottomColor: "silver",
                  borderBottomWidth: 1,
                  paddingBottom: 15,
                }}
              >
                <View
                  style={{
                    width: 64,
                    height: 64,
                    backgroundColor: "#E5F2FF",
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 21 }}>✅</Text>
                </View>
                <View>
                  <View>
                    <Text
                      style={{ fontSize: 14, fontFamily: "Poppins_400Regular" }}
                    >
                      Device Sucessfully Connected
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                        fontSize: 12,
                        color: "#999",
                        paddingRight: 45,
                      }}
                    >
                      Your device has been successfully connected. You can now
                      start using all the features.
                    </Text>
                  </View>
                </View>
              </View>
              {/* End */}
              <View
                style={{
                  flexDirection: "row",
                  gap: 15,
                  marginTop: 15,
                  borderBottomColor: "silver",
                  borderBottomWidth: 1,
                  paddingBottom: 15,
                }}
              >
                <View
                  style={{
                    width: 64,
                    height: 64,
                    backgroundColor: "#E5F2FF",
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 21 }}>👋</Text>
                </View>
                <View>
                  <View>
                    <Text
                      style={{ fontSize: 14, fontFamily: "Poppins_400Regular" }}
                    >
                      Welcome back
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                        fontSize: 12,
                        color: "#999",
                        paddingRight: 45,
                      }}
                    >
                      Welcome back to LoidAI go to settings to connect your
                      Devices to access our main features.
                    </Text>
                  </View>
                </View>
              </View>
              {/* End */}
            </View>
            {/* End */}
            <View style={{ marginTop: 30 }}>
              <View>
                <Text
                  style={{ color: "grey", fontFamily: "Poppins_400Regular" }}
                >
                  Yesterday
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 15,
                  marginTop: 15,
                  borderBottomColor: "silver",
                  borderBottomWidth: 1,
                  paddingBottom: 15,
                }}
              >
                <View
                  style={{
                    width: 64,
                    height: 64,
                    backgroundColor: "#E5F2FF",
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 21 }}>👋</Text>
                </View>
                <View>
                  <View>
                    <Text
                      style={{ fontSize: 14, fontFamily: "Poppins_400Regular" }}
                    >
                      Welcome to Loid AI
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                        fontSize: 12,
                        color: "#999",
                        paddingRight: 45,
                      }}
                    >
                      Hello there and Welcome to Loid AI, your personal health
                      assistant.
                    </Text>
                  </View>
                </View>
              </View>
              {/* End */}
              <View
                style={{
                  flexDirection: "row",
                  gap: 15,
                  marginTop: 15,
                  borderBottomColor: "silver",
                  borderBottomWidth: 1,
                  paddingBottom: 15,
                }}
              >
                <View
                  style={{
                    width: 64,
                    height: 64,
                    backgroundColor: "#E5F2FF",
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 21 }}>👍</Text>
                </View>
                <View>
                  <View>
                    <Text
                      style={{ fontSize: 14, fontFamily: "Poppins_400Regular" }}
                    >
                      Successful Login
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                        fontSize: 12,
                        color: "#999",
                        paddingRight: 55,
                      }}
                    >
                      Your account has successfully been created, Get ready to
                      explore the amazing features of our app.
                    </Text>
                  </View>
                </View>
              </View>
              {/* End */}
            </View>
            {/* End */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
