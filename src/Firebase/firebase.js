import { initializeApp } from "firebase/app";
import { logEvent } from "firebase/analytics";
import { getAnalytics } from "firebase/analytics";
import { v4 as uuidv4 } from "uuid";
import { getDatabase, ref, get, set } from "firebase/database";
import {
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5k6x5FXJlYzb9awZDXgpTTta3tbeXe1k",
  authDomain: "fir-518c2.firebaseapp.com",
  projectId: "fir-518c2",
  storageBucket: "fir-518c2.appspot.com",
  messagingSenderId: "412761344448",
  appId: "1:412761344448:web:b728d877703a7d6f116025",
  measurementId: "G-8SSMS26N56",
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth();

export async function login() {
  return signInWithPopup(auth, provider) //
    .then((result) => {
      const user = result.user;
      logEvent(analytics, "login", { method: "Google" });
      return user;
    });
}

export async function logout() {
  signOut(auth).then(() => console.log("signout"));
}

export async function userChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

export async function CommentApi(text, videoId) {
  const id = uuidv4();
  const commentRef = ref(db, `comment/${id}`);
  return set(commentRef, {
    text,
    videoId,
  });
}

export async function fetchComments() {
  return get(ref(db, "comment")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
    });
}
