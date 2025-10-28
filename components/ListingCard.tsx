import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';

interface ListingCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  zipcode: string;
  isBoosted?: boolean;
}

export default function ListingCard({ id, title, price, imageUrl, zipcode, isBoosted = false }: ListingCardProps) {
  return (
    <Link href={{ pathname: '/listing/[id]', params: { id } }} asChild>
      <Pressable style={[styles.card, isBoosted && styles.boostedCard]}>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.cardImage} 
          resizeMode="cover"
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
          <Text style={styles.cardPrice}>{price} €</Text>
          <Text style={styles.cardZipcode}>{zipcode}</Text>
          {isBoosted && (
            <View style={styles.boostedBadge}>
              <Text style={styles.boostedText}>Boosté</Text>
            </View>
          )}
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
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
    height: 150,
    backgroundColor: '#f5f5f5',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  cardZipcode: {
    fontSize: 14,
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
});
