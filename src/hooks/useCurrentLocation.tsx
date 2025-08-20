import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

type LocationCoords = { lat: number; lng: number } | null;

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<LocationCoords>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission denied');
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});

      setLocation({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      });
    } catch (err) {
      setErrorMsg('Failed to get location');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { location, loading, errorMsg };
};
