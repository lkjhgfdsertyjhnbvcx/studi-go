"use client";

import React, { useEffect, useState } from "react";
// @ts-ignore // liff types might not be perfectly resolved without config
import liff from "@line/liff";

export const useLineLiff = () => {
    const [liffError, setLiffError] = useState<string | null>(null);
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        // Only run in browser
        if (typeof window === "undefined") return;

        const initLiff = async () => {
            try {
                // Replace with your actual LIFF ID
                const LIFF_ID = process.env.NEXT_PUBLIC_LINE_LIFF_ID || "YOUR_LIFF_ID";

                console.log("Initializing LIFF with ID:", LIFF_ID);

                await liff.init({ liffId: LIFF_ID });

                if (liff.isLoggedIn()) {
                    const userProfile = await liff.getProfile();
                    setProfile(userProfile);
                    console.log("LINE Profile loaded:", userProfile);
                } else {
                    // For dev/demo, we might not force login immediately to let user see UI
                    // liff.login(); 
                }
            } catch (error: any) {
                console.error("LIFF init failed", error);
                setLiffError(error.toString());
            }
        };

        initLiff();
    }, []);

    const login = () => {
        if (liff && !liff.isLoggedIn()) {
            liff.login();
        }
    };

    const sendMessage = async (text: string) => {
        if (liff && liff.isLoggedIn()) {
            try {
                // Note: sendMessages can only be used if the user opened the page from LINE
                // Otherwise we need to use the backend Messaging API. 
                // We will just log here for the demo as we might be on external browser.
                if (liff.isInClient()) {
                    await liff.sendMessages([{ type: 'text', text }]);
                    console.log("LINE message sent:", text);
                } else {
                    console.log("Not in LINE client, cannot send implicit message. Use backend.");
                }
            } catch (err) {
                console.error("Error sending LINE message", err);
            }
        }
    }

    return { liff, profile, liffError, login, sendMessage };
};
