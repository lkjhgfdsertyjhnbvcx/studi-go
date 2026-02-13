"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { ThemeProvider, useTheme } from "@/lib/theme-context";
import { fetchStudio } from "@/actions/studio";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <StudioThemeInitializer>
                {children}
            </StudioThemeInitializer>
        </ThemeProvider>
    );
}

function StudioThemeInitializer({ children }: { children: React.ReactNode }) {
    const params = useParams();
    const id = params.id as string;
    const { setLogoUrl, setBackgroundImage, setBackgroundColor, setLogoSize } = useTheme();

    useEffect(() => {
        const load = async () => {
            if (!id) return;
            try {
                const data = await fetchStudio(id);
                if (data) {
                    // Apply Design Settings
                    if (data.logoUrl) setLogoUrl(data.logoUrl);

                    if (data.designSettings) {
                        setLogoSize(data.designSettings.logoSize || 100);

                        if (data.designSettings.backgroundType === 'image' && data.designSettings.backgroundImageUrl) {
                            setBackgroundImage(data.designSettings.backgroundImageUrl);
                            setBackgroundColor("transparent");
                        } else if (data.designSettings.backgroundColor) {
                            setBackgroundColor(data.designSettings.backgroundColor);
                            setBackgroundImage(null);
                        }
                    }
                }
            } catch (err) {
                console.error("Failed to load studio theme:", err);
            }
        };
        load();
    }, [id, setLogoUrl, setBackgroundImage, setBackgroundColor, setLogoSize]);

    return <>{children}</>;
}
