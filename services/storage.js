import { storage } from "../firebase";
import { getCurrentUser } from "./auth";

const uploadPicture = async (url) => {
  try {
    const userId = getCurrentUser();
    const imageRef = storage.child(userId + ".jpg");
    const response = await fetch(url);
    const blob = await response.blob();
    return imageRef.put(blob);
  } catch (error) {
    console.log(error);
  }
};
const getProfilePicture = (setProfilePicture) => {
  try {
    const userId = getCurrentUser();
    // const imageRef = storage.child(userId + ".jpg");

    const imageRef = storage
      .child(userId + ".jpg")
      .getDownloadURL()
      .then(function (url) {
        // `url` is the download URL for 'images/stars.jpg'
        setProfilePicture(url);
        return url;
        // This can be downloaded directly:
        // var xhr = new XMLHttpRequest();
        // xhr.responseType = "blob";
        // xhr.onload = function (event) {
        //   var blob = xhr.response;
        // };
        // xhr.open("GET", url);
        // xhr.send();
      })
      .catch(function (error) {
        // Handle any errors
        console.log({ error });
      });
  } catch (error) {
    console.log(error);
  }
};
export { uploadPicture, getProfilePicture };
