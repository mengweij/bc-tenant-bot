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
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    const noMessage = messages.length === 0;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

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
                width={300} 
                alt="BC TenantBot" 
                priority
            />
            <section className={noMessage ? "" : "populated"}>
                {noMessage ? (
                    <div>
                        <h3 className="starter-text">
                            Ask me anything about BC tenancy laws and rules!
                        </h3>
                        <br />
                        <PromptSuggestionsRow onPromptClick={handlePrompt} />
                    </div>
                ) : (
                    <div className="messages-container">
                        {messages.map((message) => (
                            <Bubble key={message.id} message={message} />
                        ))}
                        {isLoading && <LoadingBubble />}
                        <div ref={messagesEndRef} />
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
