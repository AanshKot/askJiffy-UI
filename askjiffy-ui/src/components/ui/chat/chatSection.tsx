
interface ChatSectionProps{
    chatMessage: ChatMessage
}

export default function ChatSection({chatMessage} : ChatSectionProps){
    console.log(chatMessage.response);
    return(
        <section id={`chatMessage${chatMessage.id}`} className="w-full flex flex-col gap-4">
            <div className="w-full flex justify-end" id="questionContainer">
                <div id="question" className="w-[35%] rounded-md bg-gray-300">
                    <p>{chatMessage.question}</p>
                </div>
            </div>
            <div id="answer">
                <p>{chatMessage.response? chatMessage.response : "...."}</p>
            </div>
        </section>
    )
}