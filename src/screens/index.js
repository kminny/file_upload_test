import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, Button } from "react-native";
import { graphql } from "react-apollo";
import { compose } from "recompose";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import PhotoInput from "../components/PhotoInput/PhotoInput";

import { ME, UPLOAD_PICTURE } from "./queries";

const WIDTH = Dimensions.get("window").width;

const Select = props => {
  const [IDCard, setIDCard] = useState("");
  const { UploadPictureMutation } = props;

  useEffect(() => {
    this.getPermissionAsync();
  });

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  onImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      setIDCard(result.uri);
    }
  };

  onButtonPress = () => {
    UploadPictureMutation({ variables: { file: IDCard } });
  };

  return (
    <View style={styles.container}>
      <Text>Select Screen</Text>
      <Text>id: </Text>
      <View style={styles.photoInputContainer}>
        <PhotoInput
          onChange={this.onImagePicker}
          fileUri={IDCard}
          style={styles.photoInput}
        />
      </View>
      <Button onPress={this.onButtonPress} title="Send" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50
  },
  photoInputContainer: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  photoInput: {
    width: WIDTH * 0.85,
    height: 180
  }
});

export default compose(
  graphql(ME, {
    name: "MeQuery"
  }),
  graphql(UPLOAD_PICTURE, {
    name: "UploadPictureMutation"
  })
)(Select);
