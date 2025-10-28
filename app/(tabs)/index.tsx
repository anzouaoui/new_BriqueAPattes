import { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';

interface Listing {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  zipcode: string;
  isBoosted: boolean;
  createdAt: any;
  // Ajoutez d'autres champs selon votre structure de données
}

export default function HomeScreen() {
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [searchZipcode, setSearchZipcode] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // S'abonner aux annonces en temps réel
  useEffect(() => {
    const listingsQuery = query(
      collection(FIREBASE_DB, 'listings'),
      orderBy('isBoosted', 'desc'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(listingsQuery, (snapshot) => {
      const listings = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Listing[];
      
      setAllListings(listings);
      setLoading(false);
    }, (error) => {
      console.error("Erreur lors de la récupération des annonces:", error);
      setLoading(false);
    });

    // Nettoyer l'abonnement lors du démontage du composant
    return () => unsubscribe();
  }, []);

  // Filtrer les annonces par code postal
  const filteredListings = useMemo(() => {
    if (!searchZipcode.trim()) return allListings;
    
    return allListings.filter(listing => 
      listing.zipcode && listing.zipcode.includes(searchZipcode)
    );
  }, [allListings, searchZipcode]);

  // Afficher l'état vide si pas d'annonces
  if (!loading && allListings.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Oh, c'est bien calme ici...</Text>
        <Text style={styles.emptySubtext}>Soyez le premier à publier une annonce !</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/(tabs)/sell')}
        >
          <Text style={styles.addButtonText}>Publier une annonce</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Rendu d'une carte d'annonce
  const renderItem = ({ item }: { item: Listing }) => (
    <TouchableOpacity 
      style={[styles.card, item.isBoosted && styles.boostedCard]}
      onPress={() => router.push(`/listing/${item.id}`)}
    >
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.cardImage} 
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.cardPrice}>{item.price} €</Text>
        <Text style={styles.cardZipcode}>{item.zipcode}</Text>
        {item.isBoosted && (
          <View style={styles.boostedBadge}>
            <Text style={styles.boostedText}>Boosté</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher par code postal..."
          value={searchZipcode}
          onChangeText={setSearchZipcode}
          keyboardType="numeric"
          maxLength={5}
        />
      </View>

      {/* Liste des annonces */}
      <FlatList
        data={filteredListings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  listContainer: {
    padding: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '48%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  boostedCard: {
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  cardImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f5f5f5',
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  cardZipcode: {
    fontSize: 12,
    color: '#666',
  },
  boostedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  boostedText: {
    color: '#FFD700',
    fontSize: 10,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
