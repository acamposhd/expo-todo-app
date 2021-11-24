import { auth } from "../firebase";

const getCurrentUser = () => {
  const myUserId = auth.currentUser?.uid;
  return myUserId;
};

export { getCurrentUser, auth };
