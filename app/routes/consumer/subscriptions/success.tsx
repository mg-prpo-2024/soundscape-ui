import { Link } from "react-router";

export default function Success() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Your payment was successful!</h1>
        <Link to="/" className="text-blue-300 underline">
          Start using Soundscape
        </Link>
      </div>
    </div>
  );
}
