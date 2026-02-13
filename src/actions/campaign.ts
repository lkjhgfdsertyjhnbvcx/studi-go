"use server";

import { v4 as uuidv4 } from "uuid";
import { getAllStudios } from "@/lib/db-studio";
import {
    getAllCampaignsFromFirestore,
    saveCampaignToFirestore,
    deleteCampaignFromFirestore,
    Campaign
} from "@/lib/db-firestore";

// Get all campaigns
export async function fetchCampaigns(): Promise<Campaign[]> {
    return getAllCampaignsFromFirestore();
}

// Get studios (for target selection)
export async function fetchStudios() {
    return await getAllStudios();
}

// Create new campaign
export async function createCampaign(data: {
    title: string;
    description: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
    target: "all" | "specific";
    targetStudioIds: string[];
    startDate: string;
    endDate: string;
    isActive: boolean;
}): Promise<{ success: boolean; campaignId: string }> {
    const newCampaign: Campaign = {
        id: uuidv4(),
        ...data,
        createdAt: new Date().toISOString(),
    };

    await saveCampaignToFirestore(newCampaign);

    return { success: true, campaignId: newCampaign.id };
}

// Update campaign
export async function updateCampaign(
    data: Campaign
): Promise<{ success: boolean }> {
    try {
        await saveCampaignToFirestore(data);
        return { success: true };
    } catch (e) {
        return { success: false };
    }
}

// Delete campaign
export async function deleteCampaign(id: string): Promise<{ success: boolean }> {
    try {
        await deleteCampaignFromFirestore(id);
        return { success: true };
    } catch (e) {
        return { success: false };
    }
}

// Get active campaigns for a specific studio
export async function getActiveCampaignsForStudio(
    studioId: string
): Promise<Campaign[]> {
    const campaigns = await fetchCampaigns();
    const today = new Date().toISOString().split("T")[0];

    return campaigns.filter(
        (campaign) =>
            campaign.isActive &&
            campaign.startDate <= today &&
            campaign.endDate >= today &&
            (campaign.target === "all" ||
                campaign.targetStudioIds.includes(studioId))
    );
}
