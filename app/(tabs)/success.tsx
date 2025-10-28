import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SuccessScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.checkmarkCircle}>
          <Ionicons name="checkmark" size={60} color="#4CAF50" />
        </View>
        <Text style={styles.title}>Annonce publiée !</Text>
        <Text style={styles.subtitle}>
          Votre annonce est maintenant en ligne et visible par tous les utilisateurs.
        </Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="eye" size={24} color="#007AFF" />
            <Text style={styles.statText}>0 vues</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="heart" size={24} color="#FF3B30" />
            <Text style={styles.statText}>0 favoris</Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.primaryButtonText}>Retour à l'accueil</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push('/(tabs)/sell')}
          >
            <Text style={styles.secondaryButtonText}>Publier une autre annonce</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  checkmarkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  statText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#444',
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 400,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#F0F0F0',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
});
