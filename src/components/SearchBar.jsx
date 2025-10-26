import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) onSearch(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-6 w-full max-w-md">
      <input
        type="text"
        placeholder="Search city..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="grow p-2 rounded-l-md border outline-none bg-white"
      />
      <button
        type="submit"
        className="bg-gray-500 hover:bg-gray-700 text-white px-4 rounded-r-md flex items-center justify-center border-none cursor-pointer"
      >
        <FaSearch />
      </button>
    </form>
  );
}
