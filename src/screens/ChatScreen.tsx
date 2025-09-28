import { StyleSheet, Text, View, FlatList, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import AppHeader from '../components/AppHeader'
import SentMessageCard from '../components/SentMessageCard'
import ResponseMessageCard from '../components/ResponseMessageCard'
import { s } from 'react-native-size-matters'
import { RECEIVED, SENT } from '../constants/chat'
import ChatInput from '../components/ChatInput'

interface Message {
    id: number;
    message: string;
    type: string
}

const ChatScreen = () => {
    const messagesList: Message[] = [
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
    const [messagesData, setMessagesData] = useState<Message[]>(messagesList)
    const [msgInput, setMsgInput] = useState("")

    const onMessageSent = () => {
        setMessagesData(prevMessages => {
            return [
                ...prevMessages,
                {
                    message: msgInput,
                    id: prevMessages.length + 1,
                    type: SENT
                }
            ]
        })

        setTimeout(()=>{
            onGetResponse("Cevap verdim iste oc")
        },1000)
    }

    const onGetResponse = (response:string) => {
        setMessagesData(prevMessages => {
            return [
                ...prevMessages,
                {
                    message: response,
                    id: prevMessages.length + 1,
                    type: RECEIVED
                }
            ]
        })
    }

    return (
        <View style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
                <AppHeader />
                <FlatList
                    data={messagesData}
                    keyExtractor={item => item.id?.toString()}
                    renderItem={({ item }) => {
                        return item.type === SENT ?
                            (<SentMessageCard message={item.message} />) :
                            (<ResponseMessageCard message={item.message} />);
                    }}

                    contentContainerStyle={{ paddingHorizontal: s(8) }}
                />
                <ChatInput
                    messageValue={msgInput}
                    setMessageValue={setMsgInput}
                    onMessageSent={onMessageSent} />
            </KeyboardAvoidingView>
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({})