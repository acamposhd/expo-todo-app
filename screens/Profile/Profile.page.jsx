import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebase";
import { listProfile, updateProfile } from "../../services/database";
import userLogo from "../../media/images/user.jpeg";
import { StyledButton } from "../../shared/StyledComponents/Buttons/Buttons";
import * as ImagePicker from "expo-image-picker";
import { getProfilePicture, uploadPicture } from "../../services/storage";

const ProfilePage = () => {
  // We will make a simple call to auth.signOut() which is also a promise based function and if it fullfills
  // we redirect the user to Login
  const navigation = useNavigation();
  const [profile, setProfile] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [loading, setLoading] = useState(false);
  const handleSignOut = () => {
    setLoading(true);
    auth
      .signOut()
      .then(() => {
        setLoading(false);
        navigation.replace("Login");
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  useEffect(() => {
    listProfile(setProfile);
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    getProfilePicture(setProfilePicture);
  }, []);

  useEffect(() => {
    setProfilePicture(getProfilePicture(setProfilePicture));
  }, [profile]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const uploaded = await uploadPicture(result.uri.toString());
    // setProfile((current) => ({ ...current, image: result.uri }));
    updateProfile();

    if (!result.cancelled) {
      // setImage(result.uri);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={profile?.image ? { uri: profilePicture } : userLogo}
          style={styles.logo}
        />
      </TouchableOpacity>
      {/* Simple text with the current user */}
      <Text style={styles.title}>{profile?.name}</Text>
      <Text style={styles.subtitle}>{profile?.email}</Text>
      {/* Simple button that calls our function */}
      <StyledButton
        size="50%"
        title="SIGN OUT"
        onPress={handleSignOut}
        loading={loading}
        top="20px"
      />
    </View>
  );
};
export default ProfilePage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#B175B9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#B175B9",
    fontWeight: "700",
    fontSize: 16,
  },
  logo: {
    resizeMode: "cover",
    borderRadius: 300,
    width: 125,
    height: 125,
    // marginLeft: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
  },
});
