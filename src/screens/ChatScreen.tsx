import { StyleSheet, View, FlatList, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AppHeader from '../components/AppHeader'
import SentMessageCard from '../components/SentMessageCard'
import ResponseMessageCard from '../components/ResponseMessageCard'
import { s, vs } from 'react-native-size-matters'
import { RECEIVED, SENT } from '../constants/chat'
import ChatInput from '../components/ChatInput'
import EmptyChat from '../components/EmptyChat'
import { useKeyboardState } from '../hooks/useKeyboardState'

interface Message {
    id: number;
    message: string;
    type: string
}

const ChatScreen = () => {
    
    const [messagesData, setMessagesData] = useState<Message[]>([])
    const [msgInput, setMsgInput] = useState("")
    const flatListRef = useRef<FlatList>(null)
    const {isKeyboardVisible,keyboardHeight} = useKeyboardState()

    const scrollToBottom = () => {
        if(flatListRef.current && messagesData.length > 0){
            flatListRef.current?.scrollToEnd({animated:true})
        }
    }

    useEffect(() => {
        scrollToBottom()
    },[messagesData,isKeyboardVisible])

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
            onGetResponse("Hello how can i help you today my owner Hello how can i help you today my owner Hello how can i help you today my owner Hello how can i help you today my owner Hello how can i help you today my owner Hello how can i help you today my owner Hello how can i help you today my owner Hello how can i help you today my owner Hello how can i help you today my owner Hello how can i help you today my owner Hello how can i help you today my owner Hello how can i help you today my owner Hello how can i help you today my owner Hello how can i help you today my owner Hello how can i help you today my owner Hello how can i help you today my owner Hello how can i help you today my owner Hello how can i help you today my owner Hello how can i help you today my owner Hello how can i help you today my owner Hello how can i help you today my owner ")
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
                    ref={flatListRef}
                    data={messagesData}
                    keyExtractor={item => item.id?.toString()}
                    renderItem={({ item }) => {
                        return item.type === SENT ?
                            (<SentMessageCard message={item.message} />) :
                            (<ResponseMessageCard message={item.message} />);
                    }}

                    contentContainerStyle={{ paddingHorizontal: s(8),paddingVertical:vs(10) }}
                    ListEmptyComponent={<EmptyChat/>}
                    onLayout={scrollToBottom}
                    onContentSizeChange={scrollToBottom}
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