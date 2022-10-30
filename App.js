import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth, db } from './lib/firebase';
import ChatRoom from './components/ChatRoom';
import SignIn from './components/SignIn';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if authenticated
  onAuthStateChanged( auth, (user) => {
    if (user) {
      // View Chat Room if authenticated
      setIsAuthenticated(true);
    } else {
      // View SignIn if not
      setIsAuthenticated(false);
    }
  })

  return (
    <View style={styles.container}>
      <Text>Welcome To My Fire Chat! Created By Me, Edgar Diaz!</Text>
      <Text>Hint: Try 1959@chevy.com / 123456 </Text>
      { isAuthenticated ? <ChatRoom /> : <SignIn /> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 100,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
});
