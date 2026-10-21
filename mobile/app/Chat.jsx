import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import TTSwapper from "./TTSwapper";
export default function Chat() {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState("All");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // chat history
  const [loading, setLoading] = useState(false);
  const openURLAndroid = async (url) => {
    if (Platform.OS === "android") {
      // Extract the video ID from the URL
      const videoIdMatch = url.match(/v=([a-zA-Z0-9_-]+)/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;

      if (videoId) {
        const youtubeAppUrl = `vnd.youtube:${videoId}`;
        try {
          const supported = await Linking.canOpenURL(youtubeAppUrl);
          if (supported) {
            // Open in YouTube app
            await Linking.openURL(youtubeAppUrl);
          } else {
            // Fallback to browser
            await Linking.openURL(url);
          }
        } catch (err) {
          console.error("Failed to open YouTube URL:", err);
        }
      } else {
        // Fallback if video ID not found
        Linking.openURL(url).catch((err) =>
          console.error("Failed to open URL:", err)
        );
      }
    } else {
      // iOS: open normally, it will prefer YouTube app if installed
      Linking.openURL(url).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    }
  };
  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setMessage("");
    setLoading(true);

    try {
      // Step 1: Call main RAG endpoint
      console.log(
        JSON.stringify({
          event: "STARTING_SEARCH",
          question: userMessage,
        })
      );

      let response = await fetch(
        "https://mobilix.com.ng/loidai/api/search.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: userMessage }),
        }
      );

      console.log("Search Response Status:", response.status);
      console.log("Search Response OK:", response.ok);

      let data = await response.json();
      console.log("Search Data:", JSON.stringify(data, null, 2));

      // Step 2: Check if we need fallback
      if (!data.success || !data.results || data.results.length === 0) {
        console.log("=== USING FALLBACK ===");

        // Use fallback
        response = await fetch(
          "https://mobilix.com.ng/loidai/api/fallback.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: userMessage }),
          }
        );

        console.log("Fallback Response Status:", response.status);
        console.log("Fallback Response OK:", response.ok);

        data = await response.json();
        console.log("Fallback Data:", JSON.stringify(data, null, 2));

        // Extract answer from fallback
        const answer = data.answer || "Sorry, I couldn't find an answer.";
        console.log("Final Answer:", answer);

        console.log("Type of answer:", typeof answer, "Value:", answer);
        // Show answer to user immediately
        setMessages((prev) => [...prev, { sender: "bot", text: answer }]);

        // Silently update vector DB in background (ONLY for fallback)
        console.log("=== UPDATING VECTOR DB ===");
        fetch("https://mobilix.com.ng/loidai/api/updatevectordb.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pattern: userMessage,
            response: answer,
          }),
        })
          .then(() => console.log("Vector DB updated successfully"))
          .catch((error) => {
            console.log("Vector DB update failed:", error);
          });
      } else {
        console.log("=== USING MAIN SEARCH RESULTS ===");

        // Main search succeeded - just show the answer
        const answer = data.results[0]?.answer || "No answer found.";
        console.log("Final Answer:", answer);

        setMessages((prev) => [...prev, { sender: "bot", text: answer }]);
      }

      console.log("=== REQUEST COMPLETED ===");
    } catch (error) {
      console.error("=== ERROR OCCURRED ===");
      console.error("Error Type:", error.name);
      console.error("Error Message:", error.message);
      console.error("Error Stack:", error.stack);

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Something went wrong." },
      ]);
    } finally {
      setLoading(false);

      try {
        // Get videos

        let formatquestion = await fetch(
          "https://mobilix.com.ng/loidai/api/rephrase.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: userMessage }),
          }
        );
        let info = await formatquestion.json();
        console.log("Rephrase Data:", JSON.stringify(info, null, 2));

        const nicequestion =
          info.rephrased_query || "Sorry, I couldn't find an answer.";
        console.log("Rephrased Question:", nicequestion);
        setTimeout(async () => {
          // Finally get videos
          let videofetch = await fetch(
            "https://mobilix.com.ng/loidai/api/youtube.php",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ prompt: nicequestion }),
            }
          );
          let videodata = await videofetch.json();
          console.log("Videos Data:", JSON.stringify(videodata, null, 2));
          console.log("Videos Array:", videodata.videos); // Changed from results to videos

          // Attach videos to the last bot message
          setMessages((prev) => {
            const newMessages = [...prev];
            // Find the last bot message and add videos to it
            for (let i = newMessages.length - 1; i >= 0; i--) {
              if (newMessages[i].sender === "bot") {
                newMessages[i].videos = videodata.videos || []; // Changed from results to videos
                console.log(
                  "Videos attached to message:",
                  newMessages[i].videos
                );
                break;
              }
            }
            return newMessages;
          });
        }, 1000);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }
  };
  // Array of buttons to make mapping easier
  const filters = ["All", "First Aid", "Videos", "Maps"];
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: 70,
          backgroundColor: "white",
          paddingHorizontal: 20,
          paddingBottom: 20,
          gap: 30,
        }}
      >
        <View style={{ flex: 1 }}>
          <ScrollView style={{ paddingBottom: 100 }}>
            <View style={{ gap: 20 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
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
                    <Text
                      style={{ fontFamily: "Poppins_400Regular", fontSize: 24 }}
                    >
                      LoidBot
                    </Text>
                  </View>
                </Pressable>
              </View>
              <View>
                <View>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    {filters.map((filter) => (
                      <TouchableOpacity
                        key={filter}
                        style={{
                          padding: 8,
                          paddingHorizontal: 25,
                          borderRadius: 100,

                          backgroundColor:
                            activeFilter === filter ? "#007BFF" : "#F2F2F3",
                        }}
                        onPress={() => setActiveFilter(filter)} // Update state on press
                      >
                        <Text
                          style={{
                            fontFamily: "Poppins_400Regular",
                            fontSize: 14,
                            color: activeFilter === filter ? "#fff" : "#000",
                          }}
                        >
                          {filter}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
              <ScrollView style={{ gap: 15, paddingBottom: 300 }}>
                {messages.map((msg, index) => (
                  // <View key={index} style={{ marginBottom: 15 }}>
                  //   {" "}
                  //   {/* Add marginBottom for spacing */}
                  //   {msg.sender === "user" && (
                  //     <View style={{ alignSelf: "flex-start" }}>
                  //       <Text
                  //         style={{
                  //           fontFamily: "Poppins_400Regular",
                  //           fontSize: 14,
                  //           color: "#333333",
                  //         }}
                  //       >
                  //         You: {String(msg.text || "")}
                  //       </Text>
                  //     </View>
                  //   )}
                  //   {msg.sender === "bot" && (
                  //     <View
                  //       style={{
                  //         alignSelf: "flex-start",
                  //         backgroundColor: "#F2F2F7",
                  //         borderRadius: 20,
                  //         padding: 15,
                  //         minHeight: 150,
                  //         maxHeight: 550,
                  //       }}
                  //     >
                  //       {/* Bot Text */}
                  //       <Text
                  //         style={{
                  //           fontFamily: "Poppins_400Regular",
                  //           fontSize: 14,
                  //           color: "#333333",
                  //           lineHeight: 24,
                  //         }}
                  //       >
                  //         {msg.text ? String(msg.text) : ""}
                  //       </Text>

                  //       {/* Render videos if available */}
                  //       {msg.videos && msg.videos.length > 0 && (
                  //         <ScrollView
                  //           horizontal
                  //           showsHorizontalScrollIndicator={false}
                  //           contentContainerStyle={{
                  //             marginTop: 10,
                  //             flexDirection: "row",
                  //             gap: 15,
                  //           }}
                  //         >
                  //           {msg.videos.map((video, idx) => (
                  //             <TouchableOpacity
                  //               key={idx}
                  //               style={{
                  //                 backgroundColor: "white",
                  //                 width: 220,
                  //                 borderRadius: 12,
                  //                 overflow: "hidden",
                  //               }}
                  //               onPress={() => openURLAndroid(video.url)}
                  //             >
                  //               {/* Thumbnail */}
                  //               {video.thumbnail && (
                  //                 <Image
                  //                   source={{ uri: video.thumbnail }}
                  //                   style={{
                  //                     width: "100%",
                  //                     height: 80,
                  //                     backgroundColor: "#E0E0E0",
                  //                   }}
                  //                   resizeMode="cover"
                  //                 />
                  //               )}

                  //               {/* Video Info */}
                  //               <View style={{ padding: 10 }}>
                  //                 <Text
                  //                   style={{
                  //                     fontFamily: "Poppins_500Medium",
                  //                     fontSize: 12.5,
                  //                   }}
                  //                   numberOfLines={2}
                  //                 >
                  //                   {video.title
                  //                     ? String(video.title)
                  //                     : "Untitled"}
                  //                 </Text>

                  //                 <View
                  //                   style={{
                  //                     marginTop: 4,
                  //                     flexDirection: "row",
                  //                     gap: 10,
                  //                   }}
                  //                 >
                  //                   <Text
                  //                     style={{
                  //                       fontFamily: "Poppins_400Regular",
                  //                       color: "grey",
                  //                       fontSize: 11,
                  //                     }}
                  //                     numberOfLines={1}
                  //                   >
                  //                     {video.channelTitle
                  //                       ? String(video.channelTitle)
                  //                       : "Unknown"}
                  //                   </Text>
                  //                   <Text
                  //                     style={{
                  //                       fontFamily: "Poppins_400Regular",
                  //                       color: "grey",
                  //                       fontSize: 11,
                  //                     }}
                  //                   >
                  //                     {video.viewCount != null
                  //                       ? String(
                  //                           video.viewCount.toLocaleString()
                  //                         ) + " views"
                  //                       : "0 views"}
                  //                   </Text>
                  //                 </View>
                  //               </View>
                  //             </TouchableOpacity>
                  //           ))}
                  //         </ScrollView>
                  //       )}
                  //     </View>
                  //   )}
                  // </View>
                  <View key={index} style={{ marginBottom: 15 }}>
                    {msg.sender === "user" && (
                      <Text style={{ fontFamily: "Poppins_400Regular" }}>
                        You: {msg.text ? String(msg.text) : ""}
                      </Text>
                    )}
                    <View>
                      {msg.sender === "bot" && (
                        <View
                          style={{
                            backgroundColor: "#F2F2F7",
                            borderRadius: 20,
                            padding: 15,
                            minHeight: 50,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "Poppins_400Regular",
                              lineHeight: 24,
                            }}
                          >
                            {msg.text ? String(msg.text) : ""}
                          </Text>
                          <TTSwapper
                            text={msg.text}
                            imgOff={require("../assets/images/VolumeDown.png")}
                            imgOn={require("../assets/images/VolumeUp.png")}
                            size={25}
                          />

                          {/* {msg.videos?.length > 0 && (
                            <ScrollView horizontal style={{ marginTop: 10 }}>
                              {msg.videos.map((video, idx) => (
                                <TouchableOpacity
                                  onPress={() => openURLAndroid(video.url)}
                                  key={idx}
                                  style={{
                                    marginRight: 10,
                                    width: 200,
                                    backgroundColor: "white",
                                    padding: 10,
                                    borderRadius: 12,
                                  }}
                                >
                                  <Image
                                    source={{ uri: video.thumbnail }}
                                    style={{
                                      width: "100%",
                                      height: 80,
                                      borderTopLeftRadius: 12,
                                      borderTopRightRadius: 12,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      fontFamily: "Poppins_500Medium",
                                      marginTop: 5,
                                    }}
                                  >
                                    {video.title ? String(video.title) : ""}
                                  </Text>
                                </TouchableOpacity>
                              ))}
                            </ScrollView>
                          )} */}
                        </View>
                      )}
                    </View>
                  </View>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <View
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor: "#E0E0E0",
                      borderRadius: 20,
                      padding: 10,
                      marginVertical: 3,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                        fontSize: 14,
                        color: "#AAAAAA",
                      }}
                    >
                      LoidBot is typing...
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            backgroundColor: "white",
            paddingTop: 10,
          }}
        >
          {/* Input Area */}
          <View style={{ position: "relative" }}>
            <TextInput
              style={{
                width: "100%",
                minHeight: 50,
                borderWidth: 0.01, // 1px border
                borderRadius: 10,
                borderColor: "#ccc",
                paddingLeft: 15,
                fontFamily: "Poppins_400Regular",
                paddingTop: 15,
                fontSize: 12,
                textAlignVertical: "top", // starts typing from top
                color: "#555",
                paddingRight: 60, // space for the button
              }}
              placeholder="type a message here..."
              placeholderTextColor="grey"
              multiline={true} // allow multiple lines
              value={message}
              onChangeText={setMessage}
            ></TextInput>
            <TouchableOpacity
              onPress={handleSend}
              style={{
                position: "absolute",
                right: 5,
                top: 5,
                bottom: 5,
                height: 40,
                width: 40,
                backgroundColor: "#DDDDDD",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image source={require("../assets/images/send.png")}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
