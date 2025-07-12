export default function SentBy({ user }) {
      return (
      <div className="slide bg-gradient-to-br from-[#34d399] via-[#22c55e] to-[#a3e635]">
        <div className="text-4xl font-medium mb-4 animate-[slideInRight_0.8s_ease-out_0.6s_both] text-[#eee]">
            From your Birthday Buddy
        </div>
        <div className="text-6xl fomt-black bg-gradient-to-br from-[#667eea] to-[#764ba2] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] bg-clip-text text-transparent animate-[slideInRight_0.8s_ease-out_0.6s_both]">
            {user.firstname}
        </div>
        <div className="text-5xl text-[#ff6b6b] mt-4 animate-[heartbeat_0.6s_ease-in-out_indefinite]">
            ❤️
        </div>
      </div>  
      )  
}