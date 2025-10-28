import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image, Switch } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE } from '../../firebaseConfig';
import { getStorage } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../context/AuthContext';

export default function SellScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const storage = getStorage();
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isBoosted, setIsBoosted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [zipcode, setZipcode] = useState('');

  // Récupérer le code postal de l'utilisateur si disponible
  useEffect(() => {
    const fetchUserZipcode = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(FIREBASE_DB, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setZipcode(userData.postalCode || '');
          }
        } catch (error) {
          console.error('Erreur lors de la récupération du code postal:', error);
        }
      }
    };

    fetchUserZipcode();
  }, [user]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission requise', 'Nous avons besoin de la permission d\'accéder à votre galerie pour ajouter des photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handlePublish = async () => {
    if (!titre || !description || !prix || !imageUri) {
      Alert.alert('Champs manquants', 'Veuillez remplir tous les champs et ajouter une photo');
      return;
    }

    if (!user) {
      Alert.alert('Non connecté', 'Vous devez être connecté pour publier une annonce');
      return;
    }

    setIsUploading(true);

    try {
      // Télécharger l'image
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const filename = uuidv4();
      const storageRef = ref(storage, `listings/${user.uid}/${filename}`);
      
      // Upload de l'image
      const snapshot = await uploadBytes(storageRef, blob);
      const imageUrl = await getDownloadURL(snapshot.ref);

      // Créer l'annonce dans Firestore
      const newListing = {
        titre,
        description,
        price: Number(prix),
        imageUrl,
        ownerId: user.uid,
        zipcode,
        isBoosted,
        createdAt: serverTimestamp(),
        status: 'active',
        views: 0,
      };

      await addDoc(collection(FIREBASE_DB, 'listings'), newListing);
      
      // Réinitialiser le formulaire
      setTitre('');
      setDescription('');
      setPrix('');
      setImageUri(null);
      setIsBoosted(false);

      // Naviguer vers l'écran de succès
      router.push('/(tabs)/success');
    } catch (error) {
      console.error('Erreur lors de la publication:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la publication de l\'annonce');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Titre de l'annonce *</Text>
        <TextInput
          style={styles.input}
          value={titre}
          onChangeText={setTitre}
          placeholder="Ex: Vélo de course en excellent état"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Décrivez votre article en détail..."
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Prix (€) *</Text>
        <TextInput
          style={styles.input}
          value={prix}
          onChangeText={setPrix}
          placeholder="0,00"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Photos *</Text>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.imageButtonText}>
            {imageUri ? 'Photo ajoutée' : 'Ajouter 1 photo'}
          </Text>
        </TouchableOpacity>
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        )}
      </View>

      <View style={styles.boostContainer}>
        <View>
          <Text style={styles.boostTitle}>Booster mon annonce</Text>
          <Text style={styles.boostDescription}>
            Mettez votre annonce en avant dans les résultats de recherche
          </Text>
        </View>
        <Switch
          value={isBoosted}
          onValueChange={setIsBoosted}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isBoosted ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      <TouchableOpacity 
        style={[styles.publishButton, isUploading && styles.disabledButton]}
        onPress={handlePublish}
        disabled={isUploading}
      >
        <Text style={styles.publishButtonText}>
          {isUploading ? 'Publication en cours...' : 'Publier l\'annonce'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
  boostContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  boostTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  boostDescription: {
    color: '#666',
    fontSize: 13,
  },
  publishButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#A0C4FF',
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
