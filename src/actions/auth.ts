"use server";

import { v4 as uuidv4 } from 'uuid';
import {
    getAllUsersFromFirestore,
    saveUserToFirestore
} from '@/lib/db-firestore';

// Types
export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    address?: string;
    createdAt: string;
    password?: string;
    // Simulate JOCOLLA SNS fields
    isJocollaUser: boolean;
    jocollaId?: string; // Added field for future SNS sync
    myStudios?: string[];
}

export async function registerUser(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const password = formData.get('password') as string;

    // Basic validation
    if (!name || !email || !phone || !password) {
        return { success: false, message: '全ての項目を入力してください。' };
    }

    // Check duplicate email
    const users = await getAllUsersFromFirestore();
    if (users.find(u => u.email === email)) {
        return { success: false, message: 'このメールアドレスは既に登録されています。' };
    }

    const newUser: User = {
        id: uuidv4(),
        name,
        email,
        phone,
        password,
        createdAt: new Date().toISOString(),
        isJocollaUser: true,
        myStudios: []
    };

    try {
        await saveUserToFirestore(newUser);
        return { success: true, userId: newUser.id };
    } catch (e) {
        return { success: false, message: '登録に失敗しました。' };
    }
}
