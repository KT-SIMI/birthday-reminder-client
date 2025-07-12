export default function NextStepButton ({ icon, onClick, text, className, loading }) {
    return (
        <button className={`action-btn text-white bg-gradient-to-br ${className}`} onClick={onClick} disabled={loading}>
            {text}
        </button>
    )
}