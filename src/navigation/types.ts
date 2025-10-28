// Types pour les paramètres de navigation
export type RootStackParamList = {
  // Auth Stack
  '(auth)/login': undefined;
  '(auth)/register': undefined;
  
  // Tabs
  '(tabs)': undefined;
  '(tabs)/index': undefined;
  '(tabs)/sell': undefined;
  '(tabs)/messages': undefined;
  '(tabs)/profile': undefined;
  
  // Sell Flow (Modal)
  '(sell-flow)/step1-details': undefined;
  '(sell-flow)/step2-photos': undefined;
  '(sell-flow)/step3-pricing': undefined;
  '(sell-flow)/step4-preview': undefined;
  '(sell-flow)/step5-confirmation': undefined;
  
  // Listing
  'listing/[id]': { id: string };
  
  // User
  'user/[id]': { id: string };
  
  // Chat
  'chat/[conversationId]': { conversationId: string };
  
  // Profile
  'profile/edit': undefined;
  'profile/settings': undefined;
  'profile/help': undefined;
  'profile/legal': undefined;
};

// Type pour les routes racines valides
type RootStackScreenName = keyof RootStackParamList;

// Type pour les routes de l'onglet
type TabStackScreenName = 
  | '(tabs)/index' 
  | '(tabs)/sell' 
  | '(tabs)/messages' 
  | '(tabs)/profile';

// Type pour les routes d'authentification
type AuthStackScreenName = 
  | '(auth)/login' 
  | '(auth)/register';

// Type pour les routes du flux de vente
type SellFlowScreenName = 
  | '(sell-flow)/step1-details' 
  | '(sell-flow)/step2-photos' 
  | '(sell-flow)/step3-pricing' 
  | '(sell-flow)/step4-preview' 
  | '(sell-flow)/step5-confirmation';

// Type pour les routes de détail
type DetailScreenName = 
  | 'listing/[id]' 
  | 'user/[id]' 
  | 'chat/[conversationId]';

// Type pour les routes de profil
type ProfileScreenName = 
  | 'profile/edit' 
  | 'profile/settings' 
  | 'profile/help' 
  | 'profile/legal';

// Type utilitaire pour extraire les paramètres d'une route
type ExtractParams<T> = T extends `${infer _Path}?${string}` 
  ? { [key: string]: string | string[] | undefined } 
  : T extends `${infer _Path}#${string}` 
    ? { [key: string]: string | string[] | undefined } 
    : undefined;

// Type pour les paramètres de route
type RouteParams<T extends string> = Record<string, string | string[]> & {
  screen?: T;
  params?: ExtractParams<T>;
};

// Exporter les types
export type {
  RootStackScreenName,
  TabStackScreenName,
  AuthStackScreenName,
  SellFlowScreenName,
  DetailScreenName,
  ProfileScreenName,
  RouteParams,
};
