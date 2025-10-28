import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Step5Success() {
  const router = useRouter();

  const handleViewListing = () => {
    // Rediriger vers l'annonce publiée
    router.replace('/(tabs)/profile');
  };

  const handleBackToHome = () => {
    // Retour à l'accueil
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />
      
      <View style={styles.content}>
        <View style={styles.checkmarkCircle}>
          <Ionicons name="checkmark" size={48} color="#fff" />
        </View>
        
        <Text style={styles.title}>Votre annonce est en ligne !</Text>
        <Text style={styles.subtitle}>Elle est désormais visible par tous les utilisateurs de Bric-à-Pattes.</Text>
        
        <Image 
          source={{ uri: 'https://picsum.photos/300/200?random=success' }} 
          style={styles.previewImage}
          resizeMode="cover"
        />
        
        <Text style={styles.infoText}>
          Vous pouvez la gérer depuis votre profil à tout moment.
        </Text>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]}
          onPress={handleViewListing}
        >
          <Ionicons name="person" size={20} color="#fff" />
          <Text style={[styles.buttonText, styles.primaryButtonText]}>Voir mon profil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]}
          onPress={handleBackToHome}
        >
          <Ionicons name="home" size={20} color="#000" />
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Retour à l'accueil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  checkmarkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CD964',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#8e8e93',
    marginBottom: 32,
    lineHeight: 24,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 15,
    color: '#636366',
    textAlign: 'center',
    marginBottom: 32,
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#000',
  },
  secondaryButton: {
    backgroundColor: '#f2f2f7',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  primaryButtonText: {
    color: '#fff',
  },
  secondaryButtonText: {
    color: '#000',
  },
});
