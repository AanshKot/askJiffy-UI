import { useState } from "react"

interface useStreamAnswerProps {
    chatSessionId: number;
    onComplete: (initialQuestion: string, answerText: string, messageId?: number) => void; //callback to set the pendingChats answer text
}

//does the input into useStreamAnswer hook need to be an object?? why can't it just be direct props
export const useStreamAnswer = ({chatSessionId, onComplete}: useStreamAnswerProps) => {
    const [answerText, setAnswerText] = useState<string>('');
   
    const fetchStream = async (pendingMessage : Message) => {
        const response = await fetch(`/api/chat/${chatSessionId}/message`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pendingMessage)
        });

        const reader = response.body?.getReader();

        if(reader){
            let fullAnswer = ''; // don't derive final answer from react state answerText
            const textDecoder = new TextDecoder();
            while(true){
                const {done, value} = await reader.read();
                if(done) {  
                    onComplete(pendingMessage.questionText, fullAnswer, pendingMessage.id);
                    setAnswerText('');
                    break;
                }
                const chunk = textDecoder.decode(value);
                // response is sent in UTF-8 encoded chars, decode the UTF-8 chars to string then add it to prev streamed text
                fullAnswer += chunk;
                setAnswerText(prev => prev + chunk);
            }
        }
    }

    return {answerText, fetchStream};
} 