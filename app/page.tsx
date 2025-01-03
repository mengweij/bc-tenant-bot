"use client"

import Image from "next/image"
import { useChat } from "ai/react"
import { Message } from "ai"
import { useEffect, useRef } from "react"

import Bubble from "./components/Bubble"
import LoadingBubble from "./components/LoadingBubble"
import PromptSuggestionsRow from "./components/PromptSuggestionsRow"

import AppLogo from "./assets/AppLogo-white.png"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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
            <section className={`w-full flex-1 min-h-0 border-t border-border ${noMessage ? "flex flex-col justify-center" : "flex flex-col overflow-y-auto"}`}>
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
            <form onSubmit={handleSubmit} className="w-full flex border-t border-border p-1 pt-3 overflow-hidden space-x-2">
                <Input type="text" placeholder="Your question here..." onChange={handleInputChange} value={input} />
                <Button type="submit" size="lg">Ask</Button>
            </form>
        </main>
    )
}

export default Home;
