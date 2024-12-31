"use client"

import Image from "next/image"
import { useChat } from "ai/react"
import { Message } from "ai"
import Bubble from "./components/Bubble"
import LoadingBubble from "./components/LoadingBubble"
import PromptSuggestionsRow from "./components/PromptSuggestionsRow"

import AppLogo from "./assets/AppLogo.png"

const Home = () => {
    const { append, isLoading, messages, input, handleInputChange, handleSubmit } = useChat();

    const noMessage = messages.length === 0 || !messages;

    const handlePrompt = (promptText: string) => {
        const message: Message = {
            id: crypto.randomUUID(),
            role: "user",
            content: promptText 
        }
        append(message);
    }

    return (
        <main>
            <Image src={AppLogo} width={400} alt="BC TenantBot" />
            <section className={`${noMessage ? "" : "populated"}`}>
                {noMessage ? (
                    <div>
                        <p className="starter-text">
                            Ask me anything about BC Tenant Law
                        </p>
                        <br />
                        <PromptSuggestionsRow onPromptClick={handlePrompt} />
                    </div>
                ) : (
                    <div>
                        {messages.map((message, index) => (
                            <Bubble key={`message-${index}`} message={message} />
                        ))}
                        {isLoading && <LoadingBubble /> }
                    </div>
                )}
            </section>
            <form onSubmit={handleSubmit}>
                <input className="question-box" onChange={handleInputChange} value={input} placeholder="Your question here..." />
                <input type="submit" value="Ask" />
            </form>
        </main>
    )
}

export default Home;
