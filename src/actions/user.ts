"use server";

import { getCurrentUser } from './login';
import { getUserByIdFromFirestore, saveUserToFirestore } from '@/lib/db-firestore';

export const getUserById = async (id: string) => {
    return getUserByIdFromFirestore(id);
};

export async function toggleMyStudioAction(studioId: string) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return { success: false, message: "Not logged in" };
    }

    const user = await getUserByIdFromFirestore(currentUser.id);
    if (!user) {
        return { success: false, message: "User not found" };
    }

    const myStudios = user.myStudios || [];

    if (myStudios.includes(studioId)) {
        user.myStudios = myStudios.filter((id: string) => id !== studioId);
    } else {
        user.myStudios = [...myStudios, studioId];
    }

    await saveUserToFirestore(user);

    return { success: true, myStudios: user.myStudios };
}

export async function addMyStudioAction(studioId: string) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return { success: false, message: "Not logged in" };
    }

    const user = await getUserByIdFromFirestore(currentUser.id);
    if (!user) {
        return { success: false, message: "User not found" };
    }

    const myStudios = user.myStudios || [];

    if (!myStudios.includes(studioId)) {
        user.myStudios = [...myStudios, studioId];
        await saveUserToFirestore(user);
    }

    return { success: true, myStudios: user.myStudios };
}

export async function getMyStudiosAction() {
    const currentUser = await getCurrentUser();
    if (!currentUser) return [];
    return currentUser.myStudios || [];
}
