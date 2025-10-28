import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  ViewStyle,
  TextStyle,
  ImageStyle
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Types pour les styles
type Styles = {
  container: ViewStyle;
  scrollContainer: ViewStyle;
  logoContainer: ViewStyle;
  logo: ImageStyle;
  title: TextStyle;
  subtitle: TextStyle;
  formContainer: ViewStyle;
  inputContainer: ViewStyle;
  inputIcon: ViewStyle;
  input: TextStyle;
  visibilityIcon: ViewStyle;
  checkboxContainer: ViewStyle;
  checkbox: ViewStyle;
  checkboxChecked: ViewStyle;
  checkboxText: TextStyle;
  termsLink: TextStyle;
  registerButton: ViewStyle;
  registerButtonText: TextStyle;
  loginContainer: ViewStyle;
  loginText: TextStyle;
  loginLink: TextStyle;
  errorText: TextStyle;
};

export default function RegisterScreen() {
  // États pour les champs du formulaire
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [zipcode, setZipcode] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleRegister = () => {
    // Validation des champs
    if (!username || !email || !password || !zipcode) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    
    if (!acceptTerms) {
      setError('Veuvez accepter les conditions d\'utilisation');
      return;
    }
    
    // Ici, vous ajouterez la logique d'inscription
    console.log('Inscription avec:', { username, email, zipcode });
    setIsLoading(true);
    
    // Simulation d'une requête asynchrone
    setTimeout(() => {
      console.log('Inscription réussie !');
      setIsLoading(false);
      // La navigation se fera automatiquement grâce à l'AuthContext
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/images/logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Créer un compte</Text>
            <Text style={styles.subtitle}>Rejoignez la communauté Bric-à-Pattes</Text>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.formContainer}>
            <View style={styles.inputContainer as any}>
              <Ionicons name="person-outline" size={20} color="#8E8E93" style={styles.inputIcon as any} />
              <TextInput
                style={styles.input as any}
                placeholder="Pseudo"
                placeholderTextColor="#8E8E93"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer as any}>
              <Ionicons name="mail-outline" size={20} color="#8E8E93" style={styles.inputIcon as any} />
              <TextInput
                style={styles.input as any}
                placeholder="Adresse email"
                placeholderTextColor="#8E8E93"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer as any}>
              <Ionicons name="lock-closed-outline" size={20} color="#8E8E93" style={styles.inputIcon as any} />
              <TextInput
                style={styles.input as any}
                placeholder="Mot de passe"
                placeholderTextColor="#8E8E93"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity 
                style={styles.visibilityIcon}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Ionicons 
                  name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} 
                  size={20} 
                  color="#8E8E93" 
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer as any}>
              <Ionicons name="location-outline" size={20} color="#8E8E93" style={styles.inputIcon as any} />
              <TextInput
                style={styles.input as any}
                placeholder="Code postal"
                placeholderTextColor="#8E8E93"
                value={zipcode}
                onChangeText={(text) => {
                  // N'autoriser que les chiffres
                  const formattedText = text.replace(/[^0-9]/g, '');
                  setZipcode(formattedText);
                }}
                keyboardType="number-pad"
                maxLength={5}
              />
            </View>

            <View style={styles.checkboxContainer}>
              <TouchableOpacity 
                style={[styles.checkbox, acceptTerms && styles.checkboxChecked]}
                onPress={() => setAcceptTerms(!acceptTerms)}
              >
                {acceptTerms && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
              </TouchableOpacity>
              <Text style={styles.checkboxText}>
                J'accepte les{' '}
                <Text style={styles.termsLink}>conditions d'utilisation</Text> et la{' '}
                <Text style={styles.termsLink}>politique de confidentialité</Text>
              </Text>
            </View>

            <TouchableOpacity 
              style={[
                styles.registerButton,
                (!username || !email || !password || !zipcode || !acceptTerms) && { opacity: 0.5 }
              ]} 
              onPress={handleRegister}
              disabled={!username || !email || !password || !zipcode || !acceptTerms}
            >
              <Text style={styles.registerButtonText}>
                {isLoading ? 'Inscription en cours...' : 'Créer mon compte'}
              </Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Déjà un compte ? </Text>
              <Link href="/(auth)/login" asChild>
                <Text style={styles.loginLink}>Se connecter</Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
    // @ts-ignore - Ignorer l'erreur de typage pour userSelect
    userSelect: 'none',
  } as ViewStyle,
  scrollContainer: {
    flexGrow: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 32,
    // @ts-ignore - Ignorer l'erreur de typage pour userSelect
    userSelect: 'none',
  } as ViewStyle,
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
    userSelect: 'none',
  } as TextStyle,
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 32,
    textAlign: 'center',
    userSelect: 'none',
  } as TextStyle,
  formContainer: {
    width: '100%',
    // @ts-ignore - Ignorer l'erreur de typage pour userSelect
    userSelect: 'none',
  } as ViewStyle,
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
    // @ts-ignore - Ignorer l'erreur de typage pour userSelect
    userSelect: 'none',
  } as ViewStyle,
  inputIcon: {
    marginRight: 12,
    userSelect: 'none',
  } as any,
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#1C1C1E',
    padding: 0,
    margin: 0,
    userSelect: 'text',
  } as any,
  visibilityIcon: {
    padding: 8,
    userSelect: 'none',
  } as any,
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    // @ts-ignore - Ignorer l'erreur de typage pour userSelect
    userSelect: 'none',
  } as ViewStyle,
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#8E8E93',
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkboxText: {
    fontSize: 14,
    color: '#1C1C1E',
    marginLeft: 12,
    flex: 1,
    userSelect: 'none',
  } as TextStyle,
  termsLink: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    userSelect: 'auto',
  } as TextStyle,
  registerButton: {
    backgroundColor: '#000000',
    borderRadius: 10,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    userSelect: 'none',
  } as TextStyle,
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    // @ts-ignore - Ignorer l'erreur de typage pour userSelect
    userSelect: 'none',
  } as ViewStyle,
  loginText: {
    color: '#8E8E93',
    fontSize: 14,
  },
  loginLink: {
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 4,
    userSelect: 'auto',
  } as TextStyle,
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
    userSelect: 'none',
  } as TextStyle,
});
