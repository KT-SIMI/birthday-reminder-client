export default function Header() {
    return (
        <div className="text-center mb-10">
            <div 
            className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-[50%] flex items-center justify-center animate-[pulse_2s_infinite] before:content-['🎁'] before:text-[40px]"
            // className = "logo"
            ></div>
            <h1 className="text-[32px] font-bold text-[#2d3748] mb-2">Birthday Buddy</h1>
            <p className="text-[#718096] text-base mb-5">
                Never forget a special day again!
            </p>
        </div>
    )
}