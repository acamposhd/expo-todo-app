import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { auth } from "../../firebase";
import { listProfile, updateProfile } from "../../services/database";
import userLogo from "../../media/images/user_icon.png";
import { StyledButton } from "../../shared/StyledComponents/Buttons/Buttons";
import * as ImagePicker from "expo-image-picker";
import { getProfilePicture, uploadPicture } from "../../services/storage";
import { Modalize } from "react-native-modalize";
import ImageViewer from "react-native-image-zoom-viewer";
import { FontAwesome } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { SvgComponentBottom } from "../../components/SVG/MainComponent";

const ListItem = ({ text, onPress, icon, idx }) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    button: {
      flex: 1,
      marginLeft: 10,
    },
    text: {
      fontSize: 20,
    },
  });
  return (
    <View style={styles.container} key={idx}>
      <FontAwesome name={icon} size={24} color="black" />
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProfilePage = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [loading, setLoading] = useState(false);
  const [pictureLoading, setPictureLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };
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

  const handlePictureDownload = () => {
    setPictureLoading(true);
    setProfilePicture(null);
    getProfilePicture()
      .then((url) => {
        setProfilePicture(url);
        setPictureLoading(false);
      })
      .catch((error) => {
        setPictureLoading(false);
        console.log({ error });
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
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    handlePictureDownload();
  }, []);

  useEffect(() => {
    handlePictureDownload();
  }, [profile]);

  const CAPTURE_OPTIONS = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: false,
    allowsEditing: true,
    aspect: [3, 4],
    quality: 0.5,
  };

  const TYPES = {
    load: "LOAD",
    capture: "CAPTURE",
  };

  const handleLoadOrTakePicture = (type) => {
    onClose();
    setPictureLoading(true);
    setTimeout(async () => {
      let result;
      if (type === TYPES.capture) {
        result = await ImagePicker.launchCameraAsync(CAPTURE_OPTIONS);
      } else if (type === TYPES.load) {
        result = await ImagePicker.launchImageLibraryAsync(CAPTURE_OPTIONS);
      } else {
        return;
      }
      const uploaded = await uploadPicture(result.uri.toString());
      updateProfile();
      if (uploaded) {
        handlePictureDownload();
      }
      if (!result.cancelled) {
        setPictureLoading(false);
      }
    }, 200);
  };
  // const pickImage = async () => {
  //   onClose();
  //   setPictureLoading(true);
  //   let result = await ImagePicker.launchImageLibraryAsync(CAPTURE_OPTIONS);

  //   const uploaded = await uploadPicture(result.uri.toString());

  //   updateProfile();
  //   if (uploaded) {
  //     handlePictureDownload();
  //   }

  //   if (!result.cancelled) {
  //     setPictureLoading(false);
  //     // setImage(result.uri);
  //   }
  // };
  // const takePicture = async () => {
  //   onClose();
  //   setPictureLoading(true);
  //   let result = await ImagePicker.launchCameraAsync(CAPTURE_OPTIONS);
  //   const uploaded = await uploadPicture(result.uri.toString());
  //   updateProfile();
  //   if (uploaded) {
  //     handlePictureDownload();
  //   }
  //   if (!result.cancelled) {
  //     setPictureLoading(false);
  //     // setImage(result.uri);
  //   }
  // };

  const openPicture = () => {
    onClose();
    setPreviewVisible((current) => !current);
  };

  const OPTIONS = [
    {
      text: "View Picture",
      icon: "photo",
      onPress: () => openPicture(),
    },
    {
      text: "Take Picture",
      icon: "camera",
      onPress: () => handleLoadOrTakePicture(TYPES.capture),
    },
    {
      text: "Chose From Gallery",
      icon: "upload",
      onPress: () => handleLoadOrTakePicture(TYPES.load),
    },
  ];
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onOpen}>
        {pictureLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <Image
            source={profile?.image ? { uri: profilePicture } : userLogo}
            style={styles.logo}
          />
        )}
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
      <Modalize
        ref={modalizeRef}
        snapPoint={200}
        HeaderComponent={
          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>
              SELECT AN ACTION
            </Text>
          </View>
        }
      >
        {OPTIONS.map((item, idx) => (
          <ListItem
            text={item.text}
            onPress={item.onPress}
            icon={item.icon}
            idx={idx}
            key={idx}
          />
        ))}
      </Modalize>
      <Modal visible={previewVisible} transparent={true}>
        <ImageViewer
          imageUrls={[{ url: profilePicture }]}
          enableSwipeDown
          onSwipeDown={openPicture}
          footerContainerStyle={{
            flex: 1,
            flexDirection: "row",
            alignContent: "center",
            bottom: 30,
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
          renderFooter={() => (
            <Text
              style={{
                color: COLORS.light,
                fontSize: 20,
                textAlign: "center",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              Swipe down to close
            </Text>
          )}
          // renderHeader={() => (
          //   <Text
          //     style={{
          //       color: COLORS.light,
          //       fontSize: 20,
          //       textAlign: "center",
          //       alignContent: "center",
          //       justifyContent: "center",
          //     }}
          //   >
          //     Swipe down to close
          //   </Text>
          // )}
        />
      </Modal>
      <SvgComponentBottom />
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
