import Link from "next/link";

export default function TopSpenderButton() {
  return (
    <div className="flex justify-center my-6">
      <Link href="/topspender">
        <button className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow transition duration-300">
          View Top Spenders
        </button>
      </Link>
    </div>
  );
}
