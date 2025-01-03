const PromptSuggestionButton = ({ text, onClick }: { text: string, onClick: () => void }) => {
    return (
        <button className="border border-dashed border-border rounded-lg p-1" onClick={onClick}>
            {text}
        </button>
    )
}

export default PromptSuggestionButton;