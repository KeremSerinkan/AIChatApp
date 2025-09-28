import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppHeader from '../components/AppHeader'
import SentMessageCard from '../components/SentMessageCard'
import ResponseMessageCard from '../components/ResponseMessageCard'

const ChatScreen = () => {
  return (
    <View>
      <AppHeader/>
      <SentMessageCard message={"Selamun aleykum yapay zeka kardes"}/>
      <ResponseMessageCard message={"Aleykum selam insan kardes"}/>
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})