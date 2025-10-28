import { Stack } from 'expo-router';

export default function SellFlowLayout() {
  return (
    <Stack screenOptions={{
      headerShown: true,
      headerBackTitle: 'Retour',
      headerTitleStyle: {
        fontWeight: '600',
      },
    }}>
      <Stack.Screen 
        name="step1-details" 
        options={{ title: 'Détails de l\'annonce' }} 
      />
      <Stack.Screen 
        name="step2-photos" 
        options={{ title: 'Ajouter des photos' }} 
      />
      <Stack.Screen 
        name="step3-preview" 
        options={{ title: 'Aperçu' }} 
      />
      <Stack.Screen 
        name="step4-boost" 
        options={{ title: 'Booster mon annonce' }} 
      />
      <Stack.Screen 
        name="step5-success" 
        options={{ 
          title: 'Félicitations !',
          headerShown: false,
          gestureEnabled: false
        }} 
      />
    </Stack>
  );
}
