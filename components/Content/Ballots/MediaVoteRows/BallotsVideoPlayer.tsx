import React, { useEffect, useState } from "react";
import { Platform, View, Text, StyleSheet, Dimensions } from "react-native";
import { Video as ExpoVideo, ResizeMode } from "expo-av";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export const VideoPlayer = ({ uri }: { uri: string }) => {
  const [ReactPlayer, setReactPlayer] = useState<any>(null);

  useEffect(() => {
    // Dynamically load react-player **only on web**
    if (Platform.OS === "web") {
      (async () => {
        const module = await import("react-player");
        setReactPlayer(() => module.default);
      })();
    }
  }, []);

  console.log("🎥 Video URI:", uri);

  return (
    <View
      style={[styles.container, { maxHeight: 200, height: 200, width: 200 }]}
    >
      {Platform.OS === "web" ? (
        <View
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            // overflow: "hidden",
            borderRadius: 6,
            backgroundColor: "black",
          }}
        >
          {ReactPlayer ? (
            <ReactPlayer
              src={uri}
              controls
              muted
              playing={false} // autoplay optional
              width="100%"
              height="100%"
              style={{
                objectFit: "contain", // can switch to 'cover' for fill
              }}
              onError={(e: any) =>
                console.log("💥 ReactPlayer error:", JSON.stringify(e, null, 2))
              }
              onReady={() => console.log("✅ ReactPlayer loaded")}
            />
          ) : (
            <Text>loading video...</Text>
          )}
        </View>
      ) : (
        <ExpoVideo
          source={{ uri }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={false}
          style={{
            width: "100%",
            height: 220,
            backgroundColor: "black",
          }}
          onError={(e) =>
            console.log("🎥 ExpoVideo error:", JSON.stringify(e, null, 2))
          }
          onLoadStart={() => console.log("⏳ Loading video...")}
          onLoad={() => console.log("✅ Loaded")}
          onPlaybackStatusUpdate={(status) =>
            console.log("🎬 Playback status:", status)
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VideoPlayer;
