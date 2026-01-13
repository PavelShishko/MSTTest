import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { PlanSelectionScreen, Plan } from './src/screens/PlanSelectionScreen';
import { HomeScreen } from './src/screens/HomeScreen';

type ScreenName = 'onboarding' | 'plans' | 'home';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('onboarding');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  useEffect(() => {
    const loadSubscription = async () => {
      try {
        const stored = await AsyncStorage.getItem('subscriptionPlan');
        if (stored) {
          const plan: Plan = JSON.parse(stored);
          setSelectedPlan(plan);
          setCurrentScreen('home');
        }
      } catch (e) {
        console.warn('Failed to load subscription from storage', e);
      }
    };

    loadSubscription();
  }, []);

  const handleOnboardingContinue = () => setCurrentScreen('plans');
  const handlePlanContinue = async (plan: Plan) => {
    try {
      await AsyncStorage.setItem('subscriptionPlan', JSON.stringify(plan));
      setSelectedPlan(plan);
      setCurrentScreen('home');
    } catch (e) {
      console.warn('Failed to save subscription to storage', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentScreen === 'onboarding' && (
        <OnboardingScreen onContinue={handleOnboardingContinue} />
      )}
      {currentScreen === 'plans' && (
        <PlanSelectionScreen onContinue={handlePlanContinue} />
      )}
      {currentScreen === 'home' && <HomeScreen />}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
});
