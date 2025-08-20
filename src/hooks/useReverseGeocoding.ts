// src/hooks/useReverseGeocoding.ts
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

interface LocationInfo {
    city?: string;
    region?: string;
    country?: string;
    postalCode?: string;
    street?: string;
}

export const useReverseGeocoding = (lat: number | null, lng: number | null) => {
    const [place, setPlace] = useState<LocationInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlace = async () => {
            if (lat == null || lng == null) {
                setErrorMsg('Coordinates missing');
                setLoading(false);
                return;
            }

            try {
                const results = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });

                if (results.length > 0) {
                    const locationData = results[0];
                    setPlace({
                        city: locationData.city || "",
                        region: locationData.region || "",
                        country: locationData.country || "",
                        postalCode: locationData.postalCode || "",
                        street: locationData.street || "",
                    });
                } else {
                    setErrorMsg('No location info found');
                }
            } catch (err) {
                setErrorMsg('Failed to reverse geocode');
            } finally {
                setLoading(false);
            }
        };

        fetchPlace();
    }, [lat, lng]);

    return { place, loading, errorMsg };
};