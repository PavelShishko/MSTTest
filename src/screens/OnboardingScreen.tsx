import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';

type OnboardingProps = {
  onContinue: () => void;
};

export function OnboardingScreen({ onContinue }: OnboardingProps) {
  return (
    <View style={styles.centerContent}>
      <Text style={styles.title}>Добро пожаловать</Text>
      <Text style={styles.subtitle}>
        Короткое описание сервиса или преимущества, которые получает пользователь.
      </Text>
      <Button onPress={onContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 22,
  },
});

