import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function getFirebaseApp(): FirebaseApp {
    if (getApps().length > 0) return getApp();
    return initializeApp(firebaseConfig);
}

export const db: Firestore = new Proxy({} as Firestore, {
    get(_t, prop) { return (getFirestore(getFirebaseApp()) as any)[prop]; }
});
export const storage: FirebaseStorage = new Proxy({} as FirebaseStorage, {
    get(_t, prop) { return (getStorage(getFirebaseApp()) as any)[prop]; }
});
export const auth: Auth = new Proxy({} as Auth, {
    get(_t, prop) { return (getAuth(getFirebaseApp()) as any)[prop]; }
});
