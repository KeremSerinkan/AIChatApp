import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppIcon from '../assets/icons/AppIcon'
import { s, vs } from 'react-native-size-matters'
import Spacer from '../common/Spacer'

const EmptyChat = () => {
  return (
    <View style={styles.container}>
        <AppIcon height={vs(100)} width={s(100)}/>
        <Spacer height={vs(10)}/>
        <Text style={styles.title}>Hello,</Text>
        <Spacer height={vs(8)}/>
        <Text style={styles.subTitle}>What can I help with?</Text>
    </View>
  )
}

export default EmptyChat

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        flex:1,
        paddingHorizontal:s(20),
        paddingTop: vs(140),
    },
    title:{
        fontSize: s(24),
        fontWeight:"bold"
    },
    subTitle:{
        fontSize: s(18),
    }
})