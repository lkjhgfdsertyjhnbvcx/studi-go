import { storage } from "./firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

export const uploadImageToStorage = async (base64: string, folder: string, filename?: string): Promise<string> => {
    const name = filename || `${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const storageRef = ref(storage, `${folder}/${name}`);
    await uploadString(storageRef, base64, "data_url");
    const url = await getDownloadURL(storageRef);
    return url;
};