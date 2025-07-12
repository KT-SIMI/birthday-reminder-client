export default function Greeting({ friend }) {
   return (
    <div className="bg-gradient-to-br from-[#d946ef] to-[#8b5cf6] slide">
        <div className="text-[4rem] font-bold mb-8 animate-[bounceIn_1s_ease-out_0.5s_both]">
            Hey
        </div>
        <div className="text-[5rem] font-black bg-gradient-to-r from-[#fde047] via-[#fdba74] to-[#fca5a5] bg-clip-text text-transparent animate-[glow_2s_ease-in-out_infinite_alternate] [text-shadow:_0_0_30px_rgba(255,215,0,0.5)]">
            {friend.name}
        </div>
    </div>
   ) 
}