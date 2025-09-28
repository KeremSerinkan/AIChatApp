import { useEffect, useState } from "react";
import { Keyboard, KeyboardEvent } from "react-native";
import { IS_IOS } from "../constants/platform";


const keyboardShowEvent = IS_IOS ? "keyboardWillShow" : "keyboardDidShow"
const keyboardHideEvent = IS_IOS ? "keyboardWillHide" : "keyboardDidHide"

export const useKeyboardState = () => {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
    const [keyboardHeight, setKeyboardHeight] = useState(0)

    useEffect(() => {
        // show keyboard event 
        const showSubscription = Keyboard.addListener(
            keyboardShowEvent,
            (event: KeyboardEvent) => {
                setIsKeyboardVisible(true)
                setKeyboardHeight(event.endCoordinates.height)
            }
        )

        // hide keyboard event 
        const hideSubscription = Keyboard.addListener(
            keyboardShowEvent,
            (event: KeyboardEvent) => {
                setIsKeyboardVisible(false)
                setKeyboardHeight(0)
            }
        )

        return () => {
            showSubscription.remove()
            hideSubscription.remove()
        }
    }, [])

    return {
        isKeyboardVisible,
        keyboardHeight
    }
}