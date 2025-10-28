import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  zipcode: string;
  ownerId: string;
  createdAt: any;
  isBoosted?: boolean;
}

interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  zipcode?: string;
}

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams();
  const [listing, setListing] = useState<Listing | null>(null);
  const [seller, setSeller] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Récupérer les détails de l'annonce
  useEffect(() => {
    const fetchListing = async () => {
      try {
        if (!id) return;
        
        const listingDoc = await getDoc(doc(FIREBASE_DB, 'listings', id as string));
        
        if (listingDoc.exists()) {
          setListing({ id: listingDoc.id, ...listingDoc.data() } as Listing);
        } else {
          setError('Annonce non trouvée');
        }
      } catch (err) {
        console.error('Erreur lors de la récupération de l\'annonce:', err);
        setError('Erreur lors du chargement de l\'annonce');
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  // Récupérer les informations du vendeur
  useEffect(() => {
    const fetchSeller = async () => {
      if (!listing?.ownerId) return;
      
      try {
        const userDoc = await getDoc(doc(FIREBASE_DB, 'users', listing.ownerId));
        if (userDoc.exists()) {
          setSeller({ id: userDoc.id, ...userDoc.data() } as UserProfile);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération du vendeur:', err);
      }
    };

    if (listing?.ownerId) {
      fetchSeller();
    }
  }, [listing?.ownerId]);

  // Afficher un indicateur de chargement
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // Afficher un message d'erreur si nécessaire
  if (error || !listing) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Annonce non trouvée'}</Text>
      </View>
    );
  }

  // Formater la date de création
  const formatDate = (timestamp: any) => {
    if (!timestamp?.toDate) return '';
    return new Date(timestamp.toDate()).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Image principale */}
      <Image 
        source={{ uri: listing.imageUrl }} 
        style={styles.image}
        resizeMode="cover"
      />

      {/* Contenu */}
      <View style={styles.content}>
        {/* En-tête avec titre et prix */}
        <View style={styles.header}>
          <Text style={styles.title}>{listing.title}</Text>
          <Text style={styles.price}>{listing.price} €</Text>
        </View>

        {/* Badge boosté si nécessaire */}
        {listing.isBoosted && (
          <View style={styles.boostedBadge}>
            <Text style={styles.boostedText}>Annonce boostée</Text>
          </View>
        )}

        {/* Date de publication */}
        <Text style={styles.date}>Publié le {formatDate(listing.createdAt)}</Text>

        {/* Localisation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Localisation</Text>
          <Text style={styles.sectionText}>{listing.zipcode}</Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{listing.description}</Text>
        </View>

        {/* Vendeur */}
        <View style={styles.sellerSection}>
          <Text style={styles.sectionTitle}>Vendeur</Text>
          {seller ? (
            <View style={styles.sellerInfo}>
              <View style={styles.sellerAvatar}>
                <Text style={styles.sellerInitial}>
                  {seller.displayName?.charAt(0).toUpperCase() || '?'}
                </Text>
              </View>
              <View style={styles.sellerDetails}>
                <Text style={styles.sellerName}>{seller.displayName || 'Anonyme'}</Text>
                {seller.zipcode && (
                  <Text style={styles.sellerLocation}>{seller.zipcode}</Text>
                )}
              </View>
            </View>
          ) : (
            <Text>Chargement des informations du vendeur...</Text>
          )}
        </View>

        {/* Bouton de contact */}
        <TouchableOpacity 
          style={[styles.contactButton, !seller && styles.contactButtonDisabled]}
          onPress={() => {
            if (seller?.email) {
              Linking.openURL(`mailto:${seller.email}?subject=À propos de votre annonce "${listing.title}"`);
            }
          }}
          disabled={!seller}
        >
          <Text style={styles.contactButtonText}>
            {seller ? 'Contacter le vendeur' : 'Chargement...'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  boostedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 10,
  },
  boostedText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  date: {
    color: '#666',
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  sellerSection: {
    marginBottom: 30,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sellerInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  sellerDetails: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  sellerLocation: {
    fontSize: 14,
    color: '#666',
  },
  contactButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  contactButtonDisabled: {
    backgroundColor: '#999',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
