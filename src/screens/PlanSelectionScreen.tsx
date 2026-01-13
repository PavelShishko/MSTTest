import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { TariffPlanItem } from '../components/TariffPlanItem';
import { Button } from '../components/Button';

export interface Plan {
  id: number;
  name: string;
  price: number;
  description: string;
}

type PlanSelectionScreenProps = {
  onContinue: (plan: Plan) => void;
};

export function PlanSelectionScreen({ onContinue }: PlanSelectionScreenProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

  const plans: Plan[] = [
    {
      id: 1,
      name: '1 месяц',
      price: 100,
      description: 'Доступ на 1 месяц. Отлично, чтобы попробовать сервис.',
    },
    {
      id: 2,
      name: '12 месяцев',
      price: 200,
      description: 'Годовая подписка с максимальной выгодой.',
    },
  ];

  const selectedPlan = useMemo(
    () => plans.find(p => p.id === selectedPlanId) ?? null,
    [plans, selectedPlanId],
  );

  const handleToggle = (id: number) => {
    setSelectedPlanId(current => (current === id ? null : id));
  };

  const handleContinue = () => {
    if (selectedPlan) {
      onContinue(selectedPlan);
    }
  };

  return (
    <View style={styles.centerContent}>
      <Text style={styles.title}>Выбор тарифного плана</Text>
      <Text style={styles.subtitle}>
        Выберите один из доступных тарифов, чтобы продолжить.
      </Text>

      <FlatList
        data={plans}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TariffPlanItem
            checked={item.id === selectedPlanId}
            name={item.name}
            description={item.description}
            onToggle={() => handleToggle(item.id)}
          />
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Button onPress={handleContinue} disabled={!selectedPlan} />
    </View>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    width: '100%',
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'left',
    lineHeight: 22,
    marginBottom: 8,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 8,
  },
});

