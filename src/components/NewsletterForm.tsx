"use client";

export default function NewsletterForm() {
  return (
    <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="your@email.com"
        className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-pink-300 text-sm"
      />
      <button
        type="submit"
        className="px-6 py-3 text-white rounded-full text-sm font-medium hover:opacity-90 transition"
        style={{ backgroundColor: "#E8A0BF" }}
      >
        Subscribe
      </button>
    </form>
  );
}
