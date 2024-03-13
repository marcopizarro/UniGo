import React, { useCallback, useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from './firebaseConfig';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot, where, doc } from 'firebase/firestore';


const ChatScreen = ({ navigation, route }) => {
    const [messages, setMessages] = useState([]);
    const { rideID } = route.params;
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("waiting");

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "rideRequests", rideID), (doc) => {
            console.log("Current data: ", doc.data());
            if (doc.exists()) {
                if (doc.data().status !== "DriverIsWaiting") {
                    unsub();
                    navigation.goBack();
                }
                setData(doc.data());
            } else {
                console.log("No such document!");
            }
        });

        return () => unsub();
    }, []);

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
        const { _id, createdAt, text, user } = messages[0]

        addDoc(collection(db, 'chats'), { _id, createdAt, text, user, rideID });
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