import { StyleSheet, View, FlatList, KeyboardAvoidingView, Button } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AppHeader from '../components/AppHeader'
import SentMessageCard from '../components/SentMessageCard'
import ResponseMessageCard from '../components/ResponseMessageCard'
import { s, vs } from 'react-native-size-matters'
import { RECEIVED, SENT } from '../constants/chat'
import ChatInput from '../components/ChatInput'
import EmptyChat from '../components/EmptyChat'
import { useKeyboardState } from '../hooks/useKeyboardState'
import { getOpenAIResponse } from '../api/http'

interface Message {
    id: number;
    message: string;
    type: string
}

const ChatScreen = () => {

    const [messagesData, setMessagesData] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [msgInput, setMsgInput] = useState("")
    const flatListRef = useRef<FlatList>(null)
    const { isKeyboardVisible, keyboardHeight } = useKeyboardState()

    const scrollToBottom = () => {
        if (flatListRef.current && messagesData.length > 0) {
            flatListRef.current?.scrollToEnd({ animated: true })
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [messagesData, isKeyboardVisible])

    const onMessageSent = (sentMsg: string) => {
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

        setTimeout(() => {
            getResFromAI(sentMsg)
        }, 100)
    }

    const getResFromAI = async (msg: string) => {
        setIsLoading(true)
        const generatedText = await getOpenAIResponse(msg)
        onGetResponse(generatedText)
        setIsLoading(false)
    }

    const onGetResponse = (response: string) => {
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
                <Button title='asd'/>
                <FlatList
                    ref={flatListRef}
                    data={messagesData}
                    keyExtractor={item => item.id?.toString()}
                    renderItem={({ item }) => {
                        return item.type === SENT ?
                            (<SentMessageCard message={item.message} />) :
                            (<ResponseMessageCard message={item.message} />);
                    }}

                    contentContainerStyle={{ paddingHorizontal: s(8), paddingVertical: vs(10) }}
                    ListEmptyComponent={<EmptyChat />}
                    onLayout={scrollToBottom}
                    onContentSizeChange={scrollToBottom}
                />

                <View style={{paddingHorizontal: s(8)}}>
                    {isLoading && <ResponseMessageCard message={"Thinking..."} />}
                </View>

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