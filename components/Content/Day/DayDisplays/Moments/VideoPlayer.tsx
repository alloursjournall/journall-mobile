import React, { useEffect, useState } from "react";
import { Platform, View, Text, StyleSheet, Dimensions } from "react-native";
import { Video as ExpoVideo, ResizeMode } from "expo-av";

const screenHeight = Dimensions.get("window").height;

export const VideoPlayer = ({ uri }: { uri: string }) => {
  const [ReactPlayer, setReactPlayer] = useState<any>(null);

  console.log("uri", uri);

  useEffect(() => {
    // Dynamically load react-player **only on web**
    if (Platform.OS === "web") {
      (async () => {
        const module = await import("react-player");
        setReactPlayer(() => module.default);
      })();
    }
  }, []);

  return (
    <View style={[styles.container, { maxHeight: 300 }]}>
      {/* // <View style={[styles.container, { maxHeight: 300, overflow: "hidden" }]}> */}
      {Platform.OS === "web" ? (
        <View
          style={{
            position: "relative",
            width: "100%",
            height: 250,
            // overflow: "hidden",
            borderRadius: 6,
          }}
        >
          {ReactPlayer ? (
            <ReactPlayer
              src={uri}
              controls={true}
              shouldPlay={true} // or true for autoplay
              muted
              width="100%"
              height={screenHeight / 3}
              style={{
                // position: "relative",
                // top: -100,
                // left: 0,
                objectFit: "contain",
                // objectFit: "cover",
              }}
            />
          ) : (
            <Text>loading video...</Text>
          )}
        </View>
      ) : (
        <ExpoVideo
          source={{ uri }}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          //   resizeMode={ResizeMode.COVER}
          style={{ width: "100%", height: screenHeight / 2.75 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
