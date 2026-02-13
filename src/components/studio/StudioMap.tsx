"use client";

import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { MapPin } from 'lucide-react';

interface StudioMapProps {
    address: string;
}

const Marker = ({ text }: { text: string; lat: number; lng: number }) => (
    <div className="relative flex flex-col items-center group">
        <MapPin className="text-red-500 w-8 h-8 drop-shadow-md animate-bounce" fill="currentColor" />
        <div className="absolute top-8 bg-white text-black px-2 py-1 rounded shadow text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {text}
        </div>
    </div>
);

export function StudioMap({ address }: StudioMapProps) {
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Default center (Tokyo) if geocoding fails or while loading
    const defaultProps = {
        center: {
            lat: 35.6762,
            lng: 139.6503
        },
        zoom: 15
    };

    useEffect(() => {
        if (!address) {
            setIsLoading(false);
            return;
        }

        const getGeocode = async () => {
            try {
                const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
                if (!apiKey) {
                    throw new Error("Google Maps API Key not configured");
                }

                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
                );
                const data = await response.json();

                if (data.status === 'OK' && data.results && data.results.length > 0) {
                    const location = data.results[0].geometry.location;
                    setCoordinates(location);
                } else {
                    setError("住所から場所を特定できませんでした。");
                }
            } catch (err: any) {
                console.error("Geocoding error:", err);
                setError("地図の読み込みに失敗しました。");
            } finally {
                setIsLoading(false);
            }
        };

        getGeocode();
    }, [address]);

    if (!address) return null;

    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        return (
            <div className="w-full h-64 bg-slate-900/50 flex items-center justify-center border border-white/10 rounded-xl text-gray-500">
                Google Maps API Keyが設定されていません
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="w-full h-64 bg-slate-900/50 flex items-center justify-center border border-white/10 rounded-xl text-gray-400">
                <span className="animate-pulse">地図を読み込み中...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-64 bg-slate-900/50 flex items-center justify-center border border-white/10 rounded-xl text-red-400 text-sm">
                {error}
            </div>
        );
    }

    return (
        <div className="w-full h-80 rounded-xl overflow-hidden border border-white/10 shadow-lg relative z-0">
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "" }}
                defaultCenter={defaultProps.center}
                center={coordinates || defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={{
                    styles: [
                        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                        {
                            featureType: "administrative.locality",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#d59563" }],
                        },
                        {
                            featureType: "poi",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#d59563" }],
                        },
                        {
                            featureType: "poi.park",
                            elementType: "geometry",
                            stylers: [{ color: "#263c3f" }],
                        },
                        {
                            featureType: "poi.park",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#6b9a76" }],
                        },
                        {
                            featureType: "road",
                            elementType: "geometry",
                            stylers: [{ color: "#38414e" }],
                        },
                        {
                            featureType: "road",
                            elementType: "geometry.stroke",
                            stylers: [{ color: "#212a37" }],
                        },
                        {
                            featureType: "road",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#9ca5b3" }],
                        },
                        {
                            featureType: "road.highway",
                            elementType: "geometry",
                            stylers: [{ color: "#746855" }],
                        },
                        {
                            featureType: "road.highway",
                            elementType: "geometry.stroke",
                            stylers: [{ color: "#1f2835" }],
                        },
                        {
                            featureType: "road.highway",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#f3d19c" }],
                        },
                        {
                            featureType: "transit",
                            elementType: "geometry",
                            stylers: [{ color: "#2f3948" }],
                        },
                        {
                            featureType: "transit.station",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#d59563" }],
                        },
                        {
                            featureType: "water",
                            elementType: "geometry",
                            stylers: [{ color: "#17263c" }],
                        },
                        {
                            featureType: "water",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#515c6d" }],
                        },
                        {
                            featureType: "water",
                            elementType: "labels.text.stroke",
                            stylers: [{ color: "#17263c" }],
                        },
                    ]
                }}
            >
                {coordinates && (
                    <Marker
                        lat={coordinates.lat}
                        lng={coordinates.lng}
                        text="Studio Location"
                    />
                )}
            </GoogleMapReact>
        </div>
    );
}
