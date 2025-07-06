export default function AuthLink({ text, linkText, link }) {
  return (
    <div className="text-center mt-6 text-[#718096] text-sm">
      {text}{" "}
      <a
        href={link}
        className="text-[#667eea] no-underline font-semibold transition-all duration-300 ease-[ease] hover:text-[#764ba2]"
      >
        {linkText}
      </a>
    </div>
  );
}
