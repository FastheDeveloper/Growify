import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export interface DeviceSize {
    width: number;
    height: number;
    category: 'tiny' | 'small' | 'medium' | 'large';
    isSmallDevice: boolean;
    isTinyDevice: boolean;
}

export const useDimensions = (): DeviceSize => {
    const [dimensions, setDimensions] = useState(() => {
        const { width, height } = Dimensions.get('window');
        return calculateDeviceSize(width, height);
    });

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setDimensions(calculateDeviceSize(window.width, window.height));
        });

        return () => subscription?.remove();
    }, []);

    return dimensions;
};

const calculateDeviceSize = (width: number, height: number): DeviceSize => {
    let category: DeviceSize['category'];

    if (width < 325) category = 'tiny';
    else if (width < 350) category = 'small';
    else if (width < 450) category = 'medium';
    else category = 'large';

    return {
        width,
        height,
        category,
        isSmallDevice: category === 'small',
        isTinyDevice: category === 'tiny',
    };
};