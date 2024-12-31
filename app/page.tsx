"use client"

import Image from "next/image"
import { useChat } from "ai/react"
import { Message } from "ai"
import { useEffect, useRef } from "react"
import Bubble from "./components/Bubble"
import LoadingBubble from "./components/LoadingBubble"
import PromptSuggestionsRow from "./components/PromptSuggestionsRow"

import AppLogo from "./assets/AppLogo.png"

const Home = () => {
    const { append, isLoading, messages, input, handleInputChange, handleSubmit } = useChat();
    const noMessage = messages.length === 0;

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
            <Image 
                src={AppLogo} 
                width={400} 
                alt="BC TenantBot" 
                priority
            />
            <section className={noMessage ? "" : "populated"}>
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
                        {messages.map((message) => (
                            <Bubble key={message.id} message={message} />
                        ))}
                        {isLoading && <LoadingBubble />}
                    </div>
                )}
            </section>
            <form onSubmit={handleSubmit}>
                <input 
                    className="question-box" 
                    onChange={handleInputChange} 
                    value={input} 
                    placeholder="Your question here..."
                    aria-label="Question input"
                />
                <input 
                    type="submit" 
                    value="Ask" 
                    aria-label="Submit question"
                />
            </form>
        </main>
    )
}

export default Home;
