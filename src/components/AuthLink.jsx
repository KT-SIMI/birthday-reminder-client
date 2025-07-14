export default function AuthLink({ text, linkText, onClick }) {
  return (
    <div className="text-center mt-6 text-[#718096] text-sm">
      {text}{" "}
      <button
        onClick={onClick}
        className="text-[#667eea] no-underline font-semibold transition-all duration-300 ease-[ease] hover:text-[#764ba2]"
      >
        {linkText}
      </button>
    </div>
  );
}
