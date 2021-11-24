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
const getProfilePicture = () => {
  try {
    const userId = getCurrentUser();
    const imageRef = storage.child(userId + ".jpg").getDownloadURL();
    return imageRef;
  } catch (error) {
    console.log(error);
  }
};
export { uploadPicture, getProfilePicture };
