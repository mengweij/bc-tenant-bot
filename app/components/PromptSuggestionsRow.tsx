import PromptSuggestionButton from "./PromptSuggestionButton";

const PromptSuggestionsRow = ({ onPromptClick }) => {
    const prompts = [
        "What is the difference between a lease and a tenancy agreement?",
        "How much deposit can a landlord require?",
        "Can I sublet the property I am renting?",
        "What should I do if my landlord wants to evict me?"
    ]
    return (
        <div className="prompt-suggestions-row">
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