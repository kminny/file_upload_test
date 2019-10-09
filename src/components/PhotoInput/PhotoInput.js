import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

const PhotoInput = ({ fileUri, onChange, style, isFile = false }) => (
  <TouchableOpacity onPress={onChange}>
    <View style={[styles.container, style]}>
      {fileUri ? (
        <Image
          source={isFile ? fileUri : { uri: fileUri }}
          style={styles.image}
        />
      ) : null}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 80,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 80 / 2,
    marginBottom: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 28,
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%"
  }
});

export default PhotoInput;
