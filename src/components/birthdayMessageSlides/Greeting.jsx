export default function Greeting({ friend }) {
   return (
    <div className="bg-gradient-to-br from-[#2dd4bf] to-[#06b6d4] slide">
        <div className="text-[4rem] font-bold mb-8 animate-[bounceIn_1s_ease-out_0.5s_both]">
            Hey
        </div>
        <div className="text-[5rem] font-black text-[#64748b]  animate-[glow_2s_ease-in-out_infinite_alternate]">
            {friend.name}
        </div>
    </div>
   ) 
}