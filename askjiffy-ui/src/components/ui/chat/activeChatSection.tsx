import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface activeChatSectionProps {
    questionText: string;
    answerText: string;
}

export const ActiveChatSection = ({questionText, answerText }: activeChatSectionProps) => {
    return (
        <section className="w-[75%] flex flex-col gap-4 px-5 mb-4">
                        {/* Question bubble (right aligned) */}
                        <div className="w-full flex justify-end" id="questionContainer">
                            <div
                            id="question"
                            className="bg-blue-500 text-white px-4 py-2 rounded-xl rounded-br-none max-w-[75%]"
                            >
                                <p>{questionText}</p>
                            </div>
                        </div>
                
                        {/* Answer bubble (left aligned) */}
                        <div className="w-full flex flex-col items-center" id="answerContainer">
                            <div
                            id="answer"
                            className="bg-gray-200 text-black px-4 py-2 w-full rounded-xl rounded-bl-none max-w-3xl"
                            >
                                <div className='prose'>
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                    >
                                        {answerText.trim() === '' ? "..." : answerText}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
        </section>
    )
}