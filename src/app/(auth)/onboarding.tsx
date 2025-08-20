import React, { useState } from 'react';
import { Image, ImageSourcePropType, ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import OnboardOneImage from '~/src/assets/images/OnboardOne.png';
import OnboardTwoImage from '~/src/assets/images/OnboardTwo.png';
import OnboardThreeImage from '~/src/assets/images/OnboardThree.png';

import { useResponsive } from '~/src/components/ResponsiveProvider';
import AppText from '~/src/components/AppText';
import AppButton from '~/src/components/AppButton';
import { Divider } from '~/src/components/Divider';

type TitlePart = {
  text: string;
  highlight: boolean;
};

type OnboardingItem = {
  image: ImageSourcePropType;
  title: TitlePart[];
  subtitle: string[];
};

const onboardingData: OnboardingItem[] = [
  {
    image: OnboardOneImage,
    title: [
      { text: 'Build Better ', highlight: false },
      { text: 'Habits', highlight: true },
      { text: ' One Day at a Time.', highlight: false },
    ],
    subtitle: [
      'Create personal habits to track your growth or team up with friends for extra motivation.',
    ],
  },
  {
    image: OnboardTwoImage,
    title: [
      { text: 'Stay Consistent, ', highlight: false },
      { text: 'Earn', highlight: true },
      { text: ' Rewards.', highlight: false },
    ],
    subtitle: [
      'Check in daily to maintain your streaks. Every 10 days completed unlocks coins and achievements.',
    ],
  },
  {
    image: OnboardThreeImage,
    title: [
      { text: 'Welcome to ', highlight: false },
      { text: 'Growify', highlight: true },
    ],
    subtitle: [
      'Track progress, stay motivated, and gamify your journey of personal growth with rewards and streaks.',
    ],
  },
];

const Onboarding: React.FC = () => {
  const { sizes } = useResponsive();
  const { top } = useSafeAreaInsets();
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < onboardingData.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      router.replace('/(auth)/login');
    }
  };

  const { image, title, subtitle } = onboardingData[step];

  return (
    <View className="flex-1 bg-white">
      <StatusBar hidden />

      {/* Top Section with Image */}
      <View className="relative flex-[0.55] bg-[#CBF3C9]">
        {/* Step Indicator */}
        <View className="absolute left-0 right-0 top-10 z-10 flex-row justify-center space-x-2 px-6">
          {onboardingData.map((_, i) => (
            <View
              key={i}
              className={`h-1 flex-1 rounded-full ${i === step ? 'bg-green-600' : 'bg-gray-300'}`}
            />
          ))}
        </View>

        <Image source={image} className="h-full w-full" resizeMode="cover" />
      </View>

      {/* Bottom Section */}
      <View className="-mt-6 flex-[0.45] rounded-t-3xl bg-white shadow-lg">
        <ScrollView
          className="flex-1 px-6 pt-6"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}>
          <View className="flex-1 justify-between">
            <View>
              {/* Title */}
              <View className="mb-2 flex-row flex-wrap items-center justify-center">
                {title.map((part, i) => (
                  <AppText
                    key={`title-${i}`}
                    className={`text-center font-INTER_BOLD ${
                      part.highlight ? 'text-[#4CAF50]' : 'text-black'
                    }`}
                    fontSize={sizes.fonts.title}>
                    {part.text}
                  </AppText>
                ))}
              </View>

              {/* Subtitle */}
              <View className="mx-8 items-center">
                {subtitle.map((line, i) => (
                  <AppText
                    key={`subtitle-${i}`}
                    className="text-center font-INTER_REGULAR text-gray-500"
                    fontSize={sizes.fonts.body}>
                    {line}
                  </AppText>
                ))}
              </View>

              {/* Action */}
              <View className="items-center">
                <Divider height={sizes.spacing.xxl} />
                <AppButton
                  label={step === onboardingData.length - 1 ? 'Get started →' : '→'}
                  onPress={handleNext}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Onboarding;
