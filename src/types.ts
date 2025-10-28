/**
 * Modèles de données pour l'application Bric-à-Pattes
 */

/**
 * Représente un utilisateur de l'application
 */
export interface UserProfile {
  /** Identifiant unique de l'utilisateur (même ID que dans Firebase Auth) */
  uid: string;
  /** Adresse email de l'utilisateur */
  email: string;
  /** Nom d'affichage de l'utilisateur */
  displayName: string;
  /** Code postal de l'utilisateur */
  zipcode: string;
  /** URL de la photo de profil de l'utilisateur */
  photoURL?: string;
  /** Date de création du compte */
  createdAt: Date | any; // any pour compatibilité avec Firestore Timestamp
  /** Note moyenne du vendeur basée sur les avis */
  rating?: number;
  /** Nombre d'avis reçus */
  reviewCount?: number;
}

/**
 * Catégories d'articles disponibles
 */
export type ListingCategory = 
  | 'accessoires'
  | 'nourriture'
  | 'jouets'
  | 'soins'
  | 'transport'
  | 'autre';

/**
 * Types d'animaux concernés
 */
export type AnimalType = 
  | 'chien'
  | 'chat'
  | 'rongeur'
  | 'oiseau'
  | 'reptile'
  | 'poisson'
  | 'autre';

/**
 * État de l'article
 */
export type ItemCondition = 
  | 'neuf'
  | 'comme neuf'
  | 'bon état'
  | 'état correct'
  | 'à rénover';

/**
 * Niveau de boost d'une annonce
 */
export type BoostLevel = 0 | 1 | 2 | 3; // 0 = non boosté, 1-3 = niveaux de boost

/**
 * Représente une annonce de vente
 */
export interface Listing {
  /** Identifiant unique de l'annonce */
  id: string;
  /** ID du propriétaire de l'annonce */
  ownerId: string;
  /** Titre de l'annonce */
  title: string;
  /** Description détaillée */
  description: string;
  /** Prix en euros */
  price: number;
  /** Catégorie de l'article */
  category: ListingCategory;
  /** Type d'animal concerné */
  animalType: AnimalType;
  /** État de l'article */
  condition: ItemCondition;
  /** Code postal où se trouve l'article */
  zipcode: string;
  /** Liste des URLs des images de l'annonce */
  imageURLs: string[];
  /** Indique si l'annonce est boostée */
  isBoosted: boolean;
  /** Niveau de boost (0 = non boosté, 1-3 = niveaux de visibilité) */
  boostLevel: BoostLevel;
  /** Date de création de l'annonce */
  createdAt: Date | any; // any pour compatibilité avec Firestore Timestamp
  /** Date de la dernière mise à jour */
  updatedAt?: Date | any;
  /** Indique si l'annonce est vendue */
  isSold?: boolean;
  /** Date de vente */
  soldAt?: Date | any;
  /** ID de l'acheteur si vendu */
  soldTo?: string;
  /** Nombre de vues de l'annonce */
  viewCount?: number;
  /** Nombre de favoris */
  favoriteCount?: number;
}

/**
 * Représente une conversation entre utilisateurs
 */
export interface Conversation {
  /** Identifiant unique de la conversation */
  id: string;
  /** ID des participants à la conversation */
  participantIds: string[];
  /** Dernier message échangé (prévisualisation) */
  lastMessage: string;
  /** Date du dernier message */
  lastMessageAt: Date | any;
  /** Date de création de la conversation */
  createdAt: Date | any;
  /** ID de l'annonce concernée (optionnel) */
  listingId?: string;
  /** Titre de l'annonce (pour référence rapide) */
  listingTitle?: string;
  /** URL de l'image de l'annonce (pour référence rapide) */
  listingImageURL?: string;
  /** Indique si la conversation est épinglée */
  isPinned?: boolean;
  /** Indique s'il y a des messages non lus */
  hasUnreadMessages?: boolean;
  /** ID de l'utilisateur qui a le plus récemment envoyé un message */
  lastMessageSenderId?: string;
}

/**
 * Représente un message dans une conversation
 */
export interface Message {
  /** Identifiant unique du message */
  id: string;
  /** ID de la conversation */
  conversationId: string;
  /** ID de l'expéditeur */
  senderId: string;
  /** Contenu textuel du message */
  text: string;
  /** Date d'envoi du message */
  createdAt: Date | any;
  /** URL de l'image jointe (optionnel) */
  imageUrl?: string;
  /** Indique si le message a été lu */
  isRead: boolean;
  /** ID du message auquel on répond (optionnel) */
  replyToMessageId?: string;
  /** Contenu du message auquel on répond (pour affichage) */
  replyPreview?: string;
}

/**
 * Représente un avis laissé par un utilisateur
 */
export interface Review {
  /** Identifiant unique de l'avis */
  id: string;
  /** ID du vendeur évalué */
  sellerId: string;
  /** ID de l'utilisateur qui a laissé l'avis */
  reviewerId: string;
  /** Note sur 5 */
  rating: 1 | 2 | 3 | 4 | 5;
  /** Commentaire */
  comment: string;
  /** Date de création de l'avis */
  createdAt: Date | any;
  /** ID de la transaction liée (optionnel) */
  transactionId?: string;
  /** ID de l'annonce concernée (optionnel) */
  listingId?: string;
  /** Réponse du vendeur à l'avis (optionnel) */
  sellerResponse?: string;
  /** Date de la réponse du vendeur (optionnel) */
  responseAt?: Date | any;
}

/**
 * Type pour les énumérations de l'application
 */
export interface AppEnums {
  listingCategories: { value: ListingCategory; label: string }[];
  animalTypes: { value: AnimalType; label: string }[];
  conditions: { value: ItemCondition; label: string }[];
}

// Valeurs par défaut pour les énumérations
export const appEnums: AppEnums = {
  listingCategories: [
    { value: 'accessoires', label: 'Accessoires' },
    { value: 'nourriture', label: 'Nourriture' },
    { value: 'jouets', label: 'Jouets' },
    { value: 'soins', label: 'Soins' },
    { value: 'transport', label: 'Transport' },
    { value: 'autre', label: 'Autre' },
  ],
  
  animalTypes: [
    { value: 'chien', label: 'Chien' },
    { value: 'chat', label: 'Chat' },
    { value: 'rongeur', label: 'Rongeur' },
    { value: 'oiseau', label: 'Oiseau' },
    { value: 'reptile', label: 'Reptile' },
    { value: 'poisson', label: 'Poisson' },
    { value: 'autre', label: 'Autre' },
  ],
  
  conditions: [
    { value: 'neuf', label: 'Neuf' },
    { value: 'comme neuf', label: 'Comme neuf' },
    { value: 'bon état', label: 'Bon état' },
    { value: 'état correct', label: 'État correct' },
    { value: 'à rénover', label: 'À rénover' },
  ],
};
