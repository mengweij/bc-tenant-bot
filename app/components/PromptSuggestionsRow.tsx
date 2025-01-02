import PromptSuggestionButton from "./PromptSuggestionButton";

const PromptSuggestionsRow = ({ onPromptClick }: { onPromptClick: (prompt: string) => void }) => {
    const prompts = [
        "What is the difference between a lease and a tenancy agreement?",
        "How much deposit can a landlord require?",
        "Can I sublet the property I am renting?",
        "What should I do if my landlord wants to evict me?"
    ]
    return (
        <div className="flex flex-col gap-2.5 w-full">
            {prompts.map((prompt, index) => 
                <PromptSuggestionButton 
                    key={`suggestion-${index}`} 
                    text={prompt} 
                    onClick={() => onPromptClick(prompt)}
            />)}
        </div>
    )
}

export default PromptSuggestionsRow;