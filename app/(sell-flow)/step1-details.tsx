import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { ListingCategory, AnimalType, ItemCondition, appEnums } from '../../src/types';

export default function Step1Details() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '' as ListingCategory,
    animalType: '' as AnimalType,
    condition: '' as ItemCondition,
    zipcode: '',
  });

  const handleNext = () => {
    // Validation des champs requis
    if (!formData.title || !formData.price || !formData.category || !formData.animalType || !formData.condition) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    // Navigation vers l'étape suivante
    router.push('/(sell-flow)/step2-photos');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>Titre de l'annonce *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Collier pour chien en cuir"
          value={formData.title}
          onChangeText={(text) => setFormData({...formData, title: text})}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Décrivez votre article en détail..."
          multiline
          numberOfLines={4}
          value={formData.description}
          onChangeText={(text) => setFormData({...formData, description: text})}
        />

        <Text style={styles.label}>Prix (€) *</Text>
        <TextInput
          style={styles.input}
          placeholder="0,00"
          keyboardType="numeric"
          value={formData.price}
          onChangeText={(text) => setFormData({...formData, price: text})}
        />

        <Text style={styles.label}>Catégorie *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.category}
            onValueChange={(itemValue) => setFormData({...formData, category: itemValue})}
          >
            <Picker.Item label="Sélectionnez une catégorie" value="" />
            {appEnums.listingCategories.map((cat) => (
              <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Type d'animal *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.animalType}
            onValueChange={(itemValue) => setFormData({...formData, animalType: itemValue})}
          >
            <Picker.Item label="Sélectionnez un type d'animal" value="" />
            {appEnums.animalTypes.map((type) => (
              <Picker.Item key={type.value} label={type.label} value={type.value} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>État *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.condition}
            onValueChange={(itemValue) => setFormData({...formData, condition: itemValue})}
          >
            <Picker.Item label="Sélectionnez un état" value="" />
            {appEnums.conditions.map((cond) => (
              <Picker.Item key={cond.value} label={cond.label} value={cond.value} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Code postal *</Text>
        <TextInput
          style={styles.input}
          placeholder="75000"
          keyboardType="numeric"
          maxLength={5}
          value={formData.zipcode}
          onChangeText={(text) => setFormData({...formData, zipcode: text})}
        />

        <View style={styles.footer}>
          <Text style={styles.requiredText}>* Champs obligatoires</Text>
          <TouchableOpacity 
            style={[styles.button, (!formData.title || !formData.price) && styles.buttonDisabled]}
            onPress={handleNext}
            disabled={!formData.title || !formData.price}
          >
            <Text style={styles.buttonText}>Suivant</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
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
    minHeight: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  requiredText: {
    color: '#666',
    marginBottom: 16,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
});
