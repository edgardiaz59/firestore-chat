import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = (email, password) => {
      signInWithEmailAndPassword(auth, email, password)
            .then( (cred) => {
                const user = cred.user;
                console.log("LOGGED IN: " + JSON.stringify(user));
            })
            .catch( (err) => {
                console.log("ERR LOGGING IN: " + err.message);
            })
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>This app requires authentication. Please log in.</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Enter Email"
        autoCapitalize='none' 
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder="Enter Password"
        secureTextEntry={true}
        autoCapitalize='none' 
      />
      <TouchableOpacity style={styles.button}>
      <Button title="Sign In" color="#fff" onPress={() => login(email, password)} /> 
      </TouchableOpacity>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: 50,
    },
    heading: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaaaaa',
        padding: 10,
        marginBottom: 10,
        width: 250,

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#0000ff',
        color: '#ffffff'
    }
  });