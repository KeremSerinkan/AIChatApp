import axios from "axios";
import { HUGGING_FACE_KEY, OPEN_AI_KEY } from "../keys/keys";
import { Alert } from "react-native";


const openAIURL = "https://api.openai.com/v1/chat/completions"
export const getOpenAIResponse = async (msg: string) => {
    try {
        const response = await axios.post(openAIURL,
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        content: msg,
                        role: "user"
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${OPEN_AI_KEY}`,
                    "Content-Type": "application/json",
                }
            }
        )
        return response.data.choices[0].message.content
    } catch (error : unknown) {
        const errorMessage = axios.isAxiosError(error) ? error?.message : "An unknown error occured"
        console.log(errorMessage)
        return "An error occured " + errorMessage
    }
}
