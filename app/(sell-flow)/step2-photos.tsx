import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Step2Photos() {
  const router = useRouter();
  const [photos, setPhotos] = useState<string[]>([]);
  const maxPhotos = 10;

  // Fonction pour simuler l'ajout d'une photo
  const handleAddPhoto = () => {
    if (photos.length < maxPhotos) {
      // Dans une vraie application, cela ouvrirait le sélecteur d'images
      const newPhoto = `https://picsum.photos/400/400?random=${Math.random()}`; // Image aléatoire pour la démo
      setPhotos([...photos, newPhoto]);
    }
  };

  // Fonction pour supprimer une photo
  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Ajouter des photos',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Ajoutez jusqu'à 10 photos</Text>
        <Text style={styles.subtitle}>La première photo sera la photo de couverture</Text>
        
        <View style={styles.photosGrid}>
          {photos.map((photo, index) => (
            <View key={index} style={styles.photoContainer}>
              <Image source={{ uri: photo }} style={styles.photo} />
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => handleRemovePhoto(index)}
              >
                <Ionicons name="close-circle" size={24} color="#ff3b30" />
              </TouchableOpacity>
            </View>
          ))}
          
          {photos.length < maxPhotos && (
            <TouchableOpacity 
              style={styles.addPhotoButton}
              onPress={handleAddPhoto}
            >
              <Ionicons name="camera" size={32} color="#8e8e93" />
              <Text style={styles.addPhotoText}>
                {photos.length === 0 ? 'Ajouter une photo' : `Ajouter (${maxPhotos - photos.length} restantes)`}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Conseils pour de belles photos :</Text>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={16} color="#007AFF" />
            <Text style={styles.tipText}>Prenez vos photos à la lumière du jour</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={16} color="#007AFF" />
            <Text style={styles.tipText}>Montrez l'article sous différents angles</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={16} color="#007AFF" />
            <Text style={styles.tipText}>Mettez en valeur les détails importants</Text>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, photos.length === 0 && styles.buttonDisabled]}
          disabled={photos.length === 0}
          onPress={() => router.push('/(sell-flow)/step3-preview')}
        >
          <Text style={styles.buttonText}>
            {photos.length === 0 ? 'Ajoutez au moins une photo' : 'Suivant'}
          </Text>
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
  scrollView: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#8e8e93',
    marginBottom: 20,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  photoContainer: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 2,
  },
  addPhotoButton: {
    width: '48%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  addPhotoText: {
    marginTop: 8,
    color: '#8e8e93',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  tipsContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  tipsTitle: {
    fontWeight: '600',
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: '#c7c7cc',
  },
});
