import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { auth, db } from '../lib/firebase';
import { collection, onSnapshot, orderBy, query, limit, addDoc, Timestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';


const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const msgsRef = collection(db, 'messages');
    const q = query(msgsRef, orderBy('createdAt', 'asc'), limit(25));

    useEffect( () => {
        // Call check messages from Firebase
        const checkMessages = onSnapshot(q, (querySnapshot) => {
            const msgs = [];
            querySnapshot.forEach((doc) => {
                msgs.push(doc.data());
            })
            setMessages(msgs);
            setIsLoaded(true);
        })

        return checkMessages;
    }, [])

    const svRef = useRef();

    if (!isLoaded) {
        return <Text> Loading...</Text>
    } else {
        return  (
            <ScrollView ref={svRef}
                        onContentSizeChange={() => svRef.current.scrollToEnd({ animated: true})}>
                <View style={styles.chat}>
                    <Text style={styles.heading}>User👉 {auth.currentUser?.email} 👈</Text>
                    <TouchableOpacity style={styles.button}>
                    <Button title="Sign Out" color="#fff" onPress={() => signOut(auth)} />
                    </TouchableOpacity>
    
                    { messages.map( (msg, i) =>
                        <ChatMessage key={i} message={msg} />
                    )}
                    <NewMessage />
                </View>
            </ScrollView>
        )
        
    }

}

const ChatMessage = (props) => {
    const { text, uid } = props.message;

    const mineOther = ( uid === auth.currentUser?.uid ) ? styles.chatMine : styles.chatOther;

    return (
        <View style={mineOther}>
            <Text size={14} style={styles.chatText}> {text} </Text>
        </View>
    )
}

const NewMessage = () => {
    const [msg, setMsg ] = useState('');

    const sendMsg = async (msg) => {
        const { uid } = auth.currentUser;

        setMsg('');

        console.log("sending message");
        //Firebase send msg
        await addDoc(collection(db, "messages"), {
            text: msg,
            createdAt: Timestamp.now(),
            uid
          }).then( (docRef) => {
            console.log("Adding doc" + JSON.stringify(docRef))
          }).catch( (err) => {
            console.log("Error adding doc");
          }).finally( () => {
            console.log("Finally sent..");
          })
          
    }

    return (
        <View style={styles.new} >
            <TextInput
                style={styles.input}
                onChangeText={text => setMsg(text)}
                value={msg}
                placeholder="Enter Message"
                autoCapitalize='none'
                />
            <Button title="Send" color="#fff" onPress={ () => sendMsg(msg)} />
        </View>
    )
}

export default ChatRoom;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        flexDirection: 'column',
        marginBottom: 50
      },  
    chat: {
        backgroundColor: '#59e59f',
        borderRadius: '25px'
    },
    chatMine: {
        width: 150,
        backgroundColor: '#9fe8f5',
        color: '#ffffff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
    },
    chatOther: {
        width: 150,
        backgroundColor: '#ba89f2',
        color: '#ffffff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
    },
    chatText: {
        color: '#ffffff',
        fontSize: 14,
    },
    heading: {
        marginBottom: 20,
        paddingLeft: 25
    },
    input: {
        borderWidth: 1,
        borderColor: '#35a773',
        color: '#fff',
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
        backgroundColor: '#35a773',
        color: '#ffffff',
        marginBottom: 20,
    },
  });