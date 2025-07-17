export default function Loading() {
  return (
    <div className="w-full h-[100vh] bg-gradient-to-br from-[#C3DBC5] to-[#6A7152] text-[#fff] flex justify-center text-center items-center">
      <svg
        width="64"
        height="64"
        viewBox="0 0 200 200"
        className="animate-spin"
      >
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="#f0f0f0"
          stroke="#333"
          strokeWidth="2"
        />

        <circle cx="100" cy="100" r="15" fill="#333" />

        <line
          x1="100"
          y1="20"
          x2="100"
          y2="180"
          stroke="#333"
          strokeWidth="3"
        />
        <line
          x1="20"
          y1="100"
          x2="180"
          y2="100"
          stroke="#333"
          strokeWidth="3"
        />
        <line
          x1="35"
          y1="35"
          x2="165"
          y2="165"
          stroke="#333"
          strokeWidth="3"
        />
        <line
          x1="165"
          y1="35"
          x2="35"
          y2="165"
          stroke="#333"
          strokeWidth="3"
        />

        <circle cx="100" cy="30" r="10" fill="#ff5252" />
        <circle cx="170" cy="100" r="10" fill="#4caf50" />
        <circle cx="100" cy="170" r="10" fill="#2196f3" />
        <circle cx="30" cy="100" r="10" fill="#ffc107" />
      </svg>{" "}
      <h1 className="text-3xl font-bold">Loading...</h1>
    </div>
  );
}
