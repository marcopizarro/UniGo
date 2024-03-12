import React, { useCallback, useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';

//firebase stuff
import { auth, db } from './firebaseConfig';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot, where } from 'firebase/firestore';


const ChatScreen = ({ navigation, rideID }) => {
    console.log(rideID);
    const [messages, setMessages] = useState([]);

    useEffect(() => {

        const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'), where('rideID', '==', rideID));
        const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
                rideID: doc.data().rideID,
            }))
        ));

        return () => {
          unsubscribe();
        };

    }, []);

    const onSend = useCallback((messages = []) => {
        const { _id, createdAt, text, user, rideID} = messages[0]

        addDoc(collection(db, 'chats'), { _id, createdAt,  text, user, rideID });
    }, []);

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName
            }}
        />
    );
}

export default ChatScreen;