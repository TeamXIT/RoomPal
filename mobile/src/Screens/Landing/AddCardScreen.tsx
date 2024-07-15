import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddCardScreen = () => {
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [saveCard, setSaveCard] = useState(false);

  const handleAddCard = () => {
    if (!cardNumber || !expiryDate || !cvv || !nameOnCard) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    // Handle card addition logic here

    Alert.alert('Success', 'Card added successfully!');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image 
          source={require('../Images/ic_backArrow.png')} 
          style={styles.backImage}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Add New Card</Text>

      <View style={styles.cardPreview}>
        <View style={styles.cardRow}>
          <Image
            style={styles.cardChip}
            source={require('../Images/ic_editText.png')} 
          />
          <Text style={styles.cardNumber}>2323 5456 8732 6145</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.cardExpiry}>05/28</Text>
          <Text style={styles.cardCvv}>8250</Text>
        </View>
        <Text style={styles.cardHolderName}>TEAMX</Text>
        <Text style={styles.cardType}>Debit Card</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Card Number"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Expiry Date"
          keyboardType="numeric"
          value={expiryDate}
          onChangeText={setExpiryDate}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="CVV"
          keyboardType="numeric"
          value={cvv}
          onChangeText={setCvv}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name on Card"
        value={nameOnCard}
        onChangeText={setNameOnCard}
      />

      <View style={styles.saveCardContainer}>
        <Switch
          value={saveCard}
          onValueChange={setSaveCard}
        />
        <Text style={styles.saveCardText}>Securely save card and details</Text>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
        <Text style={styles.addButtonText}>Add Card</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F3E8FF',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginVertical: 16,
  },
  backImage:{
    height:30,
    width:30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#6A0DAD',
  },
  cardPreview: {
    backgroundColor: '#6A0DAD',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardChip: {
    width: 40,
    height: 40,
  },
  cardNumber: {
    fontSize: 18,
    color: '#fff',
  },
  cardExpiry: {
    fontSize: 16,
    color: '#fff',
  },
  cardCvv: {
    fontSize: 16,
    color: '#fff',
  },
  cardHolderName: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },
  cardType: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  saveCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  saveCardText: {
    marginLeft: 10,
    color: '#000',
  },
  addButton: {
    backgroundColor: '#8B1CFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddCardScreen;
