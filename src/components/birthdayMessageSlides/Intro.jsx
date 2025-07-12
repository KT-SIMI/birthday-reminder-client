export default function Intro() {
    return (
         <div className="slide bg-gradient-to-br from-[#ff6b6b] to-[#f093fb]">
            <div className="absolute top-1/5 left-1/5 text-[3rem] animate-[float_3s_ease-in-out_infinite]">
            🎈
            </div>
            <div className="absolute top-[30%] right-[15%] text-[2rem] animate-[spin_4s_linear_infinite]">
                🎊
            </div>
            <div className="text-5xl font-semibold animate-[slideInUp_0.8s_ease-out_0.3s_both]">
                You've got a <span class="special-text">special</span><br />
                birthday message!
            </div>
         </div>
    )
}