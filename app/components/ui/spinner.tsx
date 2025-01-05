export function Spinner() {
  return (
    <>
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-800 border-t-white"></div>
      <span className="sr-only">Loading...</span>
    </>
  );
}
