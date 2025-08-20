import { StyleSheet, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useRef, useState } from 'react';
import AppText from '~/src/components/AppText';
import { useResponsive } from '~/src/components/ResponsiveProvider';
import AppButton from '~/src/components/AppButton';
import { Divider } from '~/src/components/Divider';
import ToggleSwitch from '~/src/components/ToggleButton';
import { router } from 'expo-router';

const EMOJIS = [
  { id: '1', emoji: '🙂', title: 'Calm' },
  { id: '2', emoji: '😁', title: 'Happy' },
  { id: '3', emoji: '😔', title: 'Sad' },
  { id: '4', emoji: '😡', title: 'Angry' },
  { id: '5', emoji: '😴', title: 'Tired' },
];

const WORRY = [
  { id: '1', emoji: '😰', title: 'Stress' },
  { id: '2', emoji: '😞', title: 'Loneliness' },
  { id: '3', emoji: '😟', title: 'Anxiety' },
  { id: '4', emoji: '😡', title: 'Anger' },
  { id: '5', emoji: '😴', title: 'Insomnia' },
  { id: '6', emoji: '😐', title: 'Apathy' },
  { id: '7', emoji: '😒', title: 'Envy' },
  { id: '8', emoji: '🥱', title: 'Sleepiness' },
  { id: '9', emoji: '😢', title: 'Sadness' },
  { id: '10', emoji: '🤔', title: 'Other' },
];

const ACTIVITIES = [
  { id: '1', image: require('~/src/assets/images/OnboardOne.png'), title: 'Cycling' },
  { id: '2', image: require('~/src/assets/images/OnboardTwo.png'), title: 'Yoga' },
  { id: '3', image: require('~/src/assets/images/ResetPassImage.png'), title: 'Running' },
  { id: '4', image: require('~/src/assets/images/CreatePassImaage.png'), title: 'Reading' },
  { id: '5', image: require('~/src/assets/images/ResetOtp.png'), title: 'Weight lifting' },
  { id: '6', image: require('~/src/assets/images/LoginImage.png'), title: 'Meditation' },
];

const GOALS = [
  { id: '1', title: 'Stay fit and active' },
  { id: '2', title: 'Build better habits' },
  { id: '3', title: 'Find motivation & accountability' },
  { id: '4', title: 'Grow through reading' },
  { id: '5', title: 'Get stronger with weight lifting' },
  { id: '6', title: 'Practice mindfulness & meditation' },
];

const TOTAL_STEPS = 5;

const SignUpOnboarding = () => {
  const { sizes } = useResponsive();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [step, setStep] = useState(0); // 👈 control current step
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isHappy, setIsHappy] = useState(false);
  const handleSelect = (index: number) => {
    if (selectedIndices.includes(index)) {
      // unselect if already selected
      setSelectedIndices((prev) => prev.filter((i) => i !== index));
    } else {
      // add to selected
      setSelectedIndices((prev) => [...prev, index]);
    }
  };
  const emojiListRef = useRef<FlatList>(null);
  const titleListRef = useRef<FlatList>(null);

  const handleSelectFeeling = (index: number) => {
    setSelectedIndex(index);

    // scroll emoji list
    emojiListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5, // center it
    });

    // scroll title list
    titleListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5, // center it
    });
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
      setSelectedIndex(null); // reset selection for next step
    } else {
      // Last step → navigate
      router.replace('/(tabs)');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setSelectedIndex(null);
    }
  };

  return (
    <View className="flex-1 bg-white px-6">
      {/* Progress Indicator */}
      <View className="absolute left-0 right-0 top-10 z-10 flex-row justify-center space-x-2 px-6">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <View
            key={i}
            className={`mx-1 h-1 flex-1 rounded-full ${i <= step ? 'bg-green-600' : 'bg-gray-300'}`}
          />
        ))}
      </View>

      <Divider height={sizes.spacing.xxl * 1.5} />

      {/* STEP 0: Emoji Selection */}
      {step === 0 && (
        <View className="flex-1 justify-start">
          <AppText
            fontSize={sizes.fonts.body}
            className="text-center font-INTER_MEDIUM text-TEXT_SECONDARY">
            Before we dive in, let’s get to know you better!
          </AppText>
          <Divider height={sizes.spacing.lg} />

          <AppText
            className="mt-3 text-center font-INTER_BOLD text-TEXT_PRIMARY"
            fontSize={sizes.fonts.title}>
            How do you feel <AppText className="text-PRIMARY">today?</AppText>
          </AppText>

          <View>
            <FlatList
              ref={emojiListRef}
              horizontal
              data={EMOJIS}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: sizes.spacing.lg }}
              getItemLayout={(_, index) => ({
                length: 100, // approximate item width/height
                offset: 100 * index,
                index,
              })}
              renderItem={({ item, index }) => {
                const isSelected = selectedIndex === index;
                return (
                  <TouchableOpacity
                    onPress={() => handleSelectFeeling(index)}
                    className={`mx-2 rounded-3xl p-6 ${isSelected ? 'bg-PRIMARY' : 'bg-gray-200'}`}>
                    <AppText fontSize={sizes.fonts.xLarge * 3} className="text-center">
                      {item.emoji}
                    </AppText>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          <View>
            <FlatList
              ref={titleListRef}
              horizontal
              data={EMOJIS}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                marginTop: sizes.spacing.xl,
                justifyContent: 'center',
              }}
              getItemLayout={(_, index) => ({
                length: 100, // approximate item width/height
                offset: 100 * index,
                index,
              })}
              renderItem={({ item, index }) => {
                const isSelected = selectedIndex === index;
                return (
                  <TouchableOpacity
                    onPress={() => handleSelectFeeling(index)}
                    className={`mx-2 rounded-xl px-6 py-3 ${
                      isSelected ? 'bg-PRIMARY' : 'bg-gray-200'
                    }`}>
                    <AppText
                      fontSize={sizes.fonts.medium}
                      className={`text-center font-INTER_MEDIUM ${
                        isSelected ? 'text-white' : 'text-TEXT_SECONDARY'
                      }`}>
                      {item.title}
                    </AppText>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      )}

      {/* STEP 1: Worry Selection */}
      {step === 1 && (
        <View className="flex-1 justify-start">
          <AppText
            fontSize={sizes.fonts.body}
            className="text-center font-INTER_MEDIUM text-TEXT_SECONDARY">
            This helps us personalize your experience and make it more effective.
          </AppText>
          <Divider height={sizes.spacing.lg} />

          <AppText
            className="mt-3 text-center font-INTER_BOLD text-TEXT_PRIMARY"
            fontSize={sizes.fonts.title}>
            What's <AppText className="text-WARNING">worrying</AppText> you?
          </AppText>

          <FlatList
            ref={titleListRef}
            data={WORRY}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: sizes.spacing.md,
            }}
            contentContainerStyle={{
              marginTop: sizes.spacing.xl,
            }}
            renderItem={({ item, index }) => {
              const isSelected = selectedIndices.includes(index);
              return (
                <TouchableOpacity
                  onPress={() => handleSelect(index)}
                  className={`mx-1 flex-1 rounded-xl px-6 py-3 ${
                    isSelected ? 'bg-PRIMARY' : 'bg-gray-200'
                  }`}>
                  <AppText
                    fontSize={sizes.fonts.medium}
                    className={`text-center font-INTER_MEDIUM ${
                      isSelected ? 'text-white' : 'text-TEXT_SECONDARY'
                    }`}>
                    {item.emoji} {item.title}
                  </AppText>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}

      {step === 2 && (
        <View className="flex-1 justify-start">
          <AppText
            fontSize={sizes.fonts.body}
            className="text-center font-INTER_MEDIUM text-TEXT_SECONDARY">
            Almost there! lets finalize a few goals and get you on your way.
          </AppText>
          <Divider height={sizes.spacing.lg} />

          <AppText
            className="mt-3 text-center font-INTER_BOLD text-TEXT_PRIMARY"
            fontSize={sizes.fonts.title}>
            What's <AppText className="text-PRIMARY">Activities</AppText> Interests You the Most?
          </AppText>

          <FlatList
            ref={titleListRef}
            data={ACTIVITIES}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              marginTop: sizes.spacing.xl,
              paddingBottom: sizes.spacing.xl,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const isSelected = selectedIndices.includes(index);
              return (
                <TouchableOpacity
                  onPress={() => handleSelect(index)}
                  className={`mx-1 my-2 flex-row items-center justify-between rounded-xl px-4 py-3 ${
                    isSelected ? 'bg-PRIMARY' : 'bg-gray-200'
                  }`}>
                  {/* Title on the left */}
                  <AppText
                    fontSize={sizes.fonts.medium}
                    className={`font-INTER_MEDIUM ${
                      isSelected ? 'text-white' : 'text-TEXT_SECONDARY'
                    }`}>
                    {item.title}
                  </AppText>

                  {/* Image on the right */}
                  <Image
                    source={item.image}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 12,
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      {step === 3 && (
        <View className="flex-1 justify-start">
          <AppText
            fontSize={sizes.fonts.body}
            className="text-center font-INTER_MEDIUM text-TEXT_SECONDARY">
            We're excited to have you on board.
          </AppText>
          <Divider height={sizes.spacing.lg} />

          <AppText
            className="mt-3 text-center font-INTER_BOLD text-TEXT_PRIMARY"
            fontSize={sizes.fonts.title}>
            What's Your <AppText className="text-PRIMARY">Primary</AppText> Goal {'\n'}with
            <AppText className="text-PRIMARY"> Growify?</AppText>
          </AppText>

          <FlatList
            ref={titleListRef}
            data={GOALS}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              marginTop: sizes.spacing.xl,
              paddingBottom: sizes.spacing.xl,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const isSelected = selectedIndices.includes(index);
              return (
                <TouchableOpacity
                  onPress={() => handleSelect(index)}
                  className={`mx-1 my-2 flex-row items-center gap-4 rounded-xl px-4 py-5 ${
                    isSelected ? 'bg-PRIMARY' : 'bg-gray-200'
                  }`}>
                  {/* Title on the left */}
                  <AppText
                    className={`rounded-full px-4 py-2 font-INTER_BOLD text-sm ${
                      isSelected ? 'bg-white text-PRIMARY' : 'bg-gray-400 text-white'
                    }`}>
                    {item.id}
                  </AppText>
                  <AppText
                    fontSize={sizes.fonts.medium}
                    className={`font-INTER_MEDIUM ${
                      isSelected ? 'text-white' : 'text-TEXT_SECONDARY'
                    }`}>
                    {item.title}
                  </AppText>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      {step === 4 && (
        <View className="flex-1 justify-start">
          <AppText
            fontSize={sizes.fonts.body}
            className="text-center font-INTER_MEDIUM text-TEXT_SECONDARY">
            Great you're ready to start your journey with Growify
          </AppText>
          <Divider height={sizes.spacing.lg} />

          <AppText
            className="mt-3 text-center font-INTER_BOLD text-TEXT_PRIMARY"
            fontSize={sizes.fonts.title}>
            Would you like <AppText className="text-PRIMARY">Notifications</AppText>
            {'\n'}or
            <AppText className="text-PRIMARY"> Goal</AppText> Reminders?
          </AppText>
          <Divider height={sizes.spacing.lg} />
          <Divider height={sizes.spacing.lg} />
          <View className="items-center">
            <ToggleSwitch
              value={isHappy}
              onToggle={() => setIsHappy(!isHappy)}
              // tailwind green-400
              inactiveColor="#e5e7eb" // tailwind gray-200
            />
          </View>
          <Divider height={sizes.spacing.lg} />
          <Divider height={sizes.spacing.lg} />
          <AppText
            fontSize={sizes.fonts.body}
            className="text-center font-INTER_REGULAR text-TEXT_SECONDARY">
            We’ll send you gentle, non-intrusive reminders to help you stay consistent and
            motivated.
          </AppText>

          <Divider height={sizes.spacing.lg} />

          <AppText
            fontSize={sizes.fonts.body}
            className="text-center font-INTER_REGULAR text-TEXT_SECONDARY">
            You can adjust or turn these off anytime in your profile settings.
          </AppText>
        </View>
      )}

      {/* Bottom Buttons */}
      <View className="mb-10 flex-row items-center justify-between">
        {step > 0 ? (
          <AppButton label="<- Back" variant="secondary" onPress={handleBack} />
        ) : (
          <AppButton label="Skip" variant="secondary" />
        )}

        <AppButton
          label={step === TOTAL_STEPS - 1 ? 'Finish' : 'Next →'}
          className="w-40 rounded-2xl"
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

export default SignUpOnboarding;

const styles = StyleSheet.create({});
