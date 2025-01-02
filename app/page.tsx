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
        <main className="w-5/6 h-5/6 rounded-2xl shadow-custom flex flex-col p-5 text-primary gap-2.5 items-center">
            <Image 
                src={AppLogo} 
                width={300} 
                alt="BC TenantBot" 
                priority
                className="cursor-pointer"
                onClick={() => window.location.reload()}
            />
            <section className={`w-full flex-1 min-h-0 border-t-2 border-primary ${noMessage ? "flex flex-col justify-center" : "flex flex-col overflow-y-auto"}`}>
                {noMessage ? (
                    <div className="flex flex-col gap-2.5 items-center">
                        <div className="prose">
                            <h3 className="p-0 text-center text-primary">
                                Ask me anything about BC tenancy laws and rules!
                            </h3>
                        </div>
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
            <form onSubmit={handleSubmit} className="h-15 w-full flex border-t-2 border-primary pt-5 rounded-b-lg overflow-hidden flex-shrink-0">
                <input 
                    className="w-[85%] border-none p-2.5 text-base bg-white"
                    onChange={handleInputChange} 
                    value={input} 
                    placeholder="Your question here..."
                    aria-label="Question input"
                />
                <input 
                    type="submit" 
                    value="Ask" 
                    className="w-[15%] border-none p-2.5 text-base bg-primary text-white cursor-pointer"
                    aria-label="Submit question"
                />
            </form>
        </main>
    )
}

export default Home;
