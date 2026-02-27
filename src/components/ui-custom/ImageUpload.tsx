"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    value: string[];
    onChange: (value: string[]) => void;
    disabled?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    value = [],
    onChange,
    disabled
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setIsUploading(true);
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("file", file);

            try {
                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });
                const data = await res.json();

                if (data.url) {
                    onChange([...value, data.url]);
                } else {
                    alert("Upload failed");
                }
            } catch (error) {
                console.error(error);
                alert("Something went wrong");
            } finally {
                setIsUploading(false);
                // Reset input
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }
        }
    };

    const onRemove = (urlToRemove: string) => {
        onChange(value.filter((url) => url !== urlToRemove));
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-40 h-40 rounded-md overflow-hidden border border-white/20 group">
                        <div className="absolute top-2 right-2 z-10">
                            <Button
                                type="button"
                                onClick={() => onRemove(url)}
                                variant="destructive"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>

            <div className="relative w-full min-h-[160px] rounded-xl border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50 transition-colors flex items-center justify-center group overflow-hidden">
                <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    ref={fileInputRef}
                    onChange={onUpload}
                    disabled={disabled || isUploading}
                />
                <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground group-hover:text-purple-400 transition-colors pointer-events-none">
                    <Upload className="h-10 w-10 mb-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="font-bold text-sm">
                        {isUploading ? "アップロード中..." : "クリックして画像を選択"}
                    </span>
                    <span className="text-xs opacity-60 mt-1">またはドラッグ＆ドロップ</span>
                </div>
            </div>
        </div>
    );
};
