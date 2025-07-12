import NextStepButton from "../NextStepsButton";

export default function NextSteps({ share, restart, signup, loading }) {
  return (
    <div className="slide bg-gradient-to-br from-[#667eea] to-[#764ba2]">
      <div className="text-4xl font-semibold mb-12 animate-[animate_0.8s_ease-out_0.3s_both]">
        What would you like to do?
      </div>
      <div className="flex flex-col gap-6 w-full max-w-[400px]">
        <NextStepButton
          onClick={share}
          text={"📤 Share this message"}
          className={`from-[#10b981] to-[#059669] animate-[slideInUp_0.8s_ease-out_0.5s_both]`}
          loading={loading}
        />
          <NextStepButton
          onClick={restart}
          text={"🔄 View again"}
          className={`from-[#3b82f6] to-[#1d4ed8] animate-[slideInUp_0.8s_ease-out_0.7s_both]`}
          loading={loading}
        />
        <NextStepButton
          onClick={signup}
          text={"✨ Create one for a friend"}
          className={`from-[#f59e0b] to-[#d97706] animate-[slideInUp_0.8s_ease-out_0.9s_both]`}
          loading={loading}
        />
      </div>
    </div>
  );
}
