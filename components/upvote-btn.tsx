"use client";

import { useState } from "react";

export default function Upvote() {
  const [count, setCount] = useState(0);
  return (
    <button
      onClick={() => setCount(count + 1)}
      className="bg-blue-500 text-white px-3 py-1 rounded-lg"
    >
      Upvote {count}
    </button>
  );
}
