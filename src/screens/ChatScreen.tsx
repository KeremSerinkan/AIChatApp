import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import AppHeader from '../components/AppHeader'
import SentMessageCard from '../components/SentMessageCard'
import ResponseMessageCard from '../components/ResponseMessageCard'
import { s } from 'react-native-size-matters'
import { RECEIVED, SENT } from '../constants/chat'

interface Message{
    id: number;
    message: string;
    type: string
}

const ChatScreen = () => {
    const messagesList : Message[] = [
        {
            message: "Selamun aleykum yapay zeka kardes",
            id: 1,
            type: SENT
        },
        {
            message: "Aleykum selam insan kardes",
            id: 2,
            type: RECEIVED
        },
        {
            message: "Keyfin yerinde mi",
            id: 3,
            type: SENT
        }
    ]
    const [messages, setMessages] = useState<Message[]>(messagesList)

    return (
        <View>
            <AppHeader />
            <FlatList
                data={messages}
                keyExtractor={item => item.id?.toString()}
                renderItem={({ item }) => {
                    return item.type === SENT ?
                        (<SentMessageCard message={item.message} />) :
                        (<ResponseMessageCard message={item.message} />);
                }}

                contentContainerStyle={{ paddingHorizontal: s(8) }}
            />

        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({})