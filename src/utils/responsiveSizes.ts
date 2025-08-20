import { DeviceSize } from '../hooks/useDimensions';

export interface ResponsiveSizes {
    // Typography
    fonts: {
        tiny: number;
        small: number;
        body: number;
        medium: number;
        large: number;
        title: number;
        titleLarge: number;
        xLarge: number;
    };

    // Spacing
    spacing: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        xxl: number;
        padding: number;
        marginBottom: number;
    };

    // Components
    button: {
        height: number;
        radius: number;
    };

    input: {
        height: number;
        borderWidth: number;
        marginBottom: number;
    };

    // Cards & Layout
    cards: {
        wallet: number;
        walletWithButton: number;
        header: number;
        actionHeight: number;
        sectionHeight: number;
        stockWidth: number;
        stockNewsHeight: number;
        productWidth: number;
    };

    // Miscellaneous
    misc: {
        radius: number;
        icon: number;
        tabItemHeight: number;
        numpadHeight: number;
        slideItemHeight: number;
        slideHeight: number;
        productSectionPadding: number;
        cardImage: number;
        cardImageLarge: number;
    };
}


export const getResponsiveSizes = (device: DeviceSize): ResponsiveSizes => {
    const { category, width, height } = device;

    // Base multipliers for different device categories
    const multipliers = {
        tiny: 0.8,
        small: 0.9,
        medium: 1.0,
        large: 1.1,
    };

    const multiplier = multipliers[category];

    return {
        fonts: {
            tiny: Math.round(10 * multiplier),
            small: Math.round(12 * multiplier),
            body: Math.round(16 * multiplier),
            medium: Math.round(14 * multiplier),
            large: Math.round(18 * multiplier),
            title: Math.round(22 * multiplier),
            titleLarge: Math.round(28 * multiplier),
            xLarge: Math.round(32 * multiplier),
        },

        spacing: {
            xs: 5,
            sm: 10,
            md: 20,
            lg: 30,
            xl: 40,
            xxl: 60,
            padding: Math.round(20 * multiplier),
            marginBottom: 30,
        },

        button: {
            height: Math.round(48 * multiplier),
            radius: Math.round(8 * multiplier),
        },

        input: {
            height: Math.round(48 * multiplier),
            borderWidth: 1,
            marginBottom: 15,
        },

        cards: {
            wallet: height * 0.2,
            walletWithButton: height * 0.22,
            header: height * 0.4,
            actionHeight: Math.round(100 * multiplier),
            sectionHeight: Math.round(60 * multiplier),
            stockWidth: width * (category === 'tiny' ? 0.28 : 0.35),
            stockNewsHeight: Math.round(100 * multiplier),
            productWidth: Math.round(60 * multiplier),
        },

        misc: {
            radius: Math.round(10 * multiplier),
            icon: Math.round(24 * multiplier),
            tabItemHeight: Math.round(65 * multiplier),
            numpadHeight: Math.round(80 * multiplier),
            slideItemHeight: height * 0.35,
            slideHeight: height * 0.4,
            productSectionPadding: 12,
            cardImage: Math.round(120 * multiplier),
            cardImageLarge: Math.round(150 * multiplier),
        },
    };
};
