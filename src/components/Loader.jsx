export default function Loader() {
  return (
    <div className="flex justify-center items-center">
      <div className="loading-spinner relative">
        <div className="w-16 h-16 border-4 border-indigo-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-indigo-500 rounded-full absolute top-0 left-0 animate-spin border-t-transparent"></div>
      </div>
    </div>
  );
} 