export default function StatCard({ icon, className, head, text }) {
    return (
        <div className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${className}`}>
            <div className="flex items-center">
                {icon}
                <div className="ml-4">
                    <p className="text-sm text-gray-600">
                        {head}
                    </p>
                    <p className="text-lg font-semibold">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    )
}