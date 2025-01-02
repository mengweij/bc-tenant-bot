const PromptSuggestionButton = ({ text, onClick }: { text: string, onClick: () => void }) => {
    return (
        <button className="border-2 border-dashed border-primary rounded-lg p-1 hover:bg-primary hover:text-white" onClick={onClick}>
            {text}
        </button>
    )
}

export default PromptSuggestionButton;