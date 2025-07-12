export default function Message({ friend }) {
  const text = friend.message;
  const words = text.split(" ");
  const groupSize = 7;
  const chunks = [];

  for (let i = 0; i < words.length; i += groupSize) {
    chunks.push(words.slice(i, i + groupSize).join(" "));
  }

  return (
    <div className="slide message">
      <div className="relative z-20 max-w-[600px] p-8 bg-[rgba(255, 255, 255, 0.1)] font-[Mr Dafoe] backdrop-blur-[10px] rounded-[20px] border border-[rgba(255, 255, 255, 0.2)]">
        {chunks.map((chunk, index) => (
          <div
            key={index}
            className="opacity-0 translate-y-2 animate-fade-up text-2xl"
            style={{
              opacity: 0,
              animation: `fadeUp 0.6s ease-out forwards`,
              animationDelay: `${index * 0.9}s`,
            }}
          >
            {chunk}
          </div>
        ))}
      </div>
    </div>
  );
}
