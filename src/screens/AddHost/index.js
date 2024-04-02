import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import styles from './styles';

const database = require('../../components/Handlers/database.js');

const AddHostScreen = props => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); 

    const onHostAdd = () => {
        if (!name) {
            alert('Please enter your full name.');
            return;
        }
        if (!email) {
            alert('Please enter your email address.');
            return;
        }

        try {
            database.addHost(name, email);
        } catch (error) {
            console.log('Error adding host ' + error);
        }

        alert(name + ' added!');
    }

  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <TextInput 
                value={name}
                onChangeText={value => setName(value)}
                style={styles.name}
                placeholder={'Enter Full Name'}
                placeholderTextColor={'grey'}
            />
            <TextInput 
                value={email}
                onChangeText={value => setEmail(value)}
                style={styles.email}
                placeholder={'Enter Email Address'}
                placeholderTextColor={'grey'}
            />
        </View>
        <View style={styles.bottomContainer}>
            <Pressable 
                style={styles.button}
                onPress={onHostAdd}
            >
                <Text style={styles.buttonText}>Add</Text>
            </Pressable>
        </View>
    </View>
  );
};

export default AddHostScreen;