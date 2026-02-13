import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file received." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        // Generate unique filename to avoid collision
        const ext = path.extname(file.name);
        const filename = `${uuidv4()}${ext}`;

        // Save to public/uploads
        // Note: In production (Vercel etc), persistent local storage isn't available. 
        // You'd need S3, Cloudinary, etc. For this local demo, this works.
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        const filePath = path.join(uploadDir, filename);

        await writeFile(filePath, buffer);

        // Return the public URL
        const fileUrl = `/uploads/${filename}`;

        return NextResponse.json({
            success: true,
            url: fileUrl
        });

    } catch (error) {
        console.error("Upload failed", error);
        return NextResponse.json({ error: "Upload failed." }, { status: 500 });
    }
}
