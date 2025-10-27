import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

export default function EditProfileScreen() {
  const { user } = useAuth();
  const [username, setUsername] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(FIREBASE_DB, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUsername(user.displayName || data?.username || '');
            setPostalCode(data?.postalCode || '');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          Alert.alert('Erreur', 'Impossible de charger les données du profil');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    
    if (!username.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un nom d\'utilisateur');
      return;
    }

    if (!/^\d{5}$/.test(postalCode)) {
      Alert.alert('Erreur', 'Veuillez entrer un code postal valide (5 chiffres)');
      return;
    }

    setSaving(true);

    try {
      // Mettre à jour le profil utilisateur dans Firebase Auth
      await updateProfile(user, {
        displayName: username.trim(),
      });

      // Mettre à jour les données dans Firestore
      await updateDoc(doc(FIREBASE_DB, 'users', user.uid), {
        username: username.trim(),
        postalCode: postalCode.trim(),
        updatedAt: new Date().toISOString(),
      });

      Alert.alert('Succès', 'Profil mis à jour avec succès');
      router.back();
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour du profil');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nom d'utilisateur</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Votre nom d'utilisateur"
          autoCapitalize="words"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Code postal</Text>
        <TextInput
          style={styles.input}
          value={postalCode}
          onChangeText={setPostalCode}
          placeholder="Code postal"
          keyboardType="numeric"
          maxLength={5}
        />
      </View>

      <TouchableOpacity 
        style={[styles.saveButton, saving && styles.saveButtonDisabled]} 
        onPress={handleSave}
        disabled={saving}
      >
        <Text style={styles.saveButtonText}>
          {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonDisabled: {
    backgroundColor: '#A0C4FF',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
