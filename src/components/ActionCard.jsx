export default function ActionCard({ onClick, icon, className, head, text }) {
    <button onClick={onClick} className={`bg-gradient-to-r ${className} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105`}>
        {icon}
        <h3 className="text-lg font-semibold">
            {head}
        </h3>
        <p className="text-sm opacity-90">
            {text}
        </p>
    </button>
}