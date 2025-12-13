import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Pulserate() {
  const navigation = useNavigation();
  const data = [
    {
      id: "1",
      value: "75 BPM",
      date: "27/08/2024",
      time: "11:24 am",
      comment: "Great shape!",
    },
    {
      id: "2",
      value: "75 BPM",
      date: "27/08/2024",
      time: "11:24 am",
      comment: "Great shape!",
    },
    {
      id: "3",
      value: "75 BPM",
      date: "27/08/2024",
      time: "11:24 am",
      comment: "Great shape!",
    },
  ];
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
              Pulse Rate
            </Text>
          </View>
        </Pressable>
      </View>
      <View>
        <View
          style={{
            backgroundColor: "#E5F2FF",
            height: 257,
            borderRadius: 20,
          }}
        >
          <View style={{ padding: 8 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View
                style={{
                  borderRadius: 100,
                  backgroundColor: "#F2F9FF",
                  width: 64,
                  height: 64,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/images/heartbeat.png")}
                  style={{ width: 32, height: 32 }}
                ></Image>
              </View>
              <View>
                <Text
                  style={{ fontFamily: "Poppins_400Regular", fontSize: 14 }}
                >
                  Pulse Rate
                </Text>
              </View>
            </View>
            <View style={{ paddingHorizontal: 8, marginTop: 10 }}>
              <View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 5,
                      alignItems: "flex-end",
                    }}
                  >
                    <Text style={{ fontSize: 64 }}>72</Text>
                    <Text style={{ paddingBottom: 15, color: "grey" }}>
                      BPM
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ zIndex: 1, bottom: 65 }}>
                <Image
                  source={require("../assets/images/pulsekini.png")}
                  style={{ width: "100%", height: 153 }}
                ></Image>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#DBDDDD",
            marginTop: 20,
            borderRadius: 10,
            padding: 18,
          }}
        >
          <View>
            <View>
              <Text style={{ fontSize: 20, fontFamily: "Poppins_600SemiBold" }}>
                Result Summary
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  marginTop: 10,
                  fontSize: 15,
                  lineHeight: 24,
                  color: "grey",
                }}
              >
                Your vitals are looking great right now, but they have the
                probability to move into the danger zone soon.
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  marginTop: 10,
                  fontSize: 15,
                  lineHeight: 24,
                  color: "grey",
                }}
              >
                We recommend that you rest very well and consume a lot of
                fluids.
              </Text>
            </View>
          </View>
        </View>
        {/* End */}
        {/* <View style={{ marginTop: 16 }}>
          <View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 20 }}>
                Log
              </Text>
            </View>

          </View>
        </View> */}
      </View>
    </SafeAreaView>
  );
}
