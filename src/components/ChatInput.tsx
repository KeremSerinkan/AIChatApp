import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { colors } from '../styles/colors'
import { s, vs } from 'react-native-size-matters'
import SendIcon from '../assets/icons/SendIcon'
import { IS_IOS } from '../constants/platform'

interface IChatInputProps {
    messageValue: string;
    setMessageValue: (message: string) => void;
    onMessageSent: (message: string) => void;
}

const ChatInput: FC<IChatInputProps> = ({ messageValue, setMessageValue, onMessageSent }) => {

    const sendMessageHandler = () => {
        if(messageValue.trim().length > 0){
            onMessageSent(messageValue)
            setMessageValue("")
        }
    }

    return (
        <View style={[styles.container, IS_IOS && { paddingBottom: vs(20) }]}>
            <TextInput style={styles.input}
                value={messageValue}
                onChangeText={setMessageValue}
                placeholder='Type a message...'
                multiline
                placeholderTextColor={colors.black} />


            <TouchableOpacity style={styles.sendButton} onPress={sendMessageHandler}>
                <SendIcon stroke={colors.white} fill={colors.white} width={s(35)} height={s(35)} />
            </TouchableOpacity>
        </View>
    )
}

export default ChatInput

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: s(10),
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.mediumGray
    },
    input: {
        flex: 1,
        backgroundColor: colors.gray,
        paddingHorizontal: s(15),
        paddingVertical: vs(10),
        marginRight: s(10),
        borderRadius: s(20)
    },
    sendButton: {
        width: s(35),
        height: s(35),
        borderRadius: s(20),
        backgroundColor: colors.black,
        justifyContent: "center",
        alignItems: "center"
    }
})