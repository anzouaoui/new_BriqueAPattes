import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';
import { UserProfile } from '../types';
import { useAuth } from './AuthContext';

interface UserContextType {
  userProfile: UserProfile | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  userProfile: null,
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (user) {
      const userDocRef = doc(FIREBASE_DB, 'users', user.uid);
      
      // Écoute en temps réel des mises à jour du profil utilisateur
      unsubscribe = onSnapshot(
        userDocRef,
        (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            setUserProfile({
              id: doc.id,
              uid: doc.id,
              email: data.email || '',
              displayName: data.displayName || '',
              zipcode: data.zipcode || '',
              photoURL: data.photoURL || '',
              createdAt: data.createdAt || new Date(),
              ...data
            } as UserProfile);
          } else {
            setUserProfile(null);
          }
          setLoading(false);
        },
        (error) => {
          console.error('Erreur lors de l\'écoute du profil utilisateur:', error);
          setLoading(false);
        }
      );
    } else {
      setUserProfile(null);
      setLoading(false);
    }

    // Nettoyage de l'écouteur lors du démontage du composant
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]); // Se réexécute quand l'utilisateur change

  const value = {
    userProfile,
    loading,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

// Hook personnalisé pour combiner les deux contextes
export const useAuthContext = () => {
  const auth = useAuth();
  const user = useUser();
  
  return {
    ...auth,
    ...user,
    // Un état de chargement combiné
    loading: auth.loading || user.loading,
  };
};
