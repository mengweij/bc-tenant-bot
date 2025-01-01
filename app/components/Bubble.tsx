import { Message } from "ai"
import ReactMarkdown from 'react-markdown'

const Bubble = ({ message }: { message: Message }) => {
    const { role, content } = message;
    return (
        <div className={`bubble ${role}`}>
            {role === 'assistant' ? (
                <ReactMarkdown>
                    {content}
                </ReactMarkdown>
            ) : content}
        </div>
    )
}

export default Bubble;  