import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Step3Preview() {
  const router = useRouter();

  // Données factices pour la prévisualisation
  const listing = {
    title: 'Jolie laisse pour chien en cuir véritable',
    price: 24.99,
    description: 'Laisse pour chien en cuir véritable de haute qualité. Longueur 1m20. Couleur marron. Très peu utilisée, comme neuve.',
    condition: 'Comme neuf',
    category: 'Accessoires',
    animalType: 'Chien',
    zipcode: '75001',
    photos: [
      'https://picsum.photos/400/400?random=1',
      'https://picsum.photos/400/400?random=2',
      'https://picsum.photos/400/400?random=3',
    ],
  };

  const handlePublish = () => {
    // Logique de publication de l'annonce
    router.push('/(sell-flow)/step5-success');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Aperçu',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView style={styles.scrollView}>
        {/* Carrousel d'images */}
        <ScrollView 
          horizontal 
          pagingEnabled 
          showsHorizontalScrollIndicator={false}
          style={styles.imageCarousel}
        >
          {listing.photos.map((photo, index) => (
            <Image 
              key={index} 
              source={{ uri: photo }} 
              style={styles.image} 
              resizeMode="cover"
            />
          ))}
        </ScrollView>
        
        {/* Indicateurs de pagination */}
        <View style={styles.pagination}>
          {listing.photos.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.paginationDot,
                index === 0 && styles.paginationDotActive
              ]} 
            />
          ))}
        </View>
        
        {/* Détails de l'annonce */}
        <View style={styles.detailsContainer}>
          <Text style={styles.price}>{listing.price.toFixed(2)} €</Text>
          <Text style={styles.title}>{listing.title}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="pricetag" size={16} color="#8e8e93" />
              <Text style={styles.metaText}>{listing.category}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="paw" size={16} color="#8e8e93" />
              <Text style={styles.metaText}>{listing.animalType}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="location" size={16} color="#8e8e93" />
              <Text style={styles.metaText}>{listing.zipcode}</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{listing.description}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>État</Text>
            <Text style={styles.condition}>{listing.condition}</Text>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => router.back()}
        >
          <Ionicons name="create" size={18} color="#007AFF" />
          <Text style={styles.editButtonText}>Modifier</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.publishButton}
          onPress={handlePublish}
        >
          <Text style={styles.publishButtonText}>Publier l'annonce</Text>
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
  },
  imageCarousel: {
    height: 300,
  },
  image: {
    width: 400,
    height: 300,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    top: 280,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#007AFF',
    width: 24,
  },
  detailsContainer: {
    padding: 16,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  metaText: {
    marginLeft: 4,
    color: '#8e8e93',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1c1c1e',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#3a3a3c',
  },
  condition: {
    fontSize: 15,
    color: '#3a3a3c',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
  },
  editButtonText: {
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  publishButton: {
    flex: 2,
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  publishButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
