"use client";

import { useEffect, useState } from "react";

export function Rotator({ words, className = "" }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let wait = deleting ? 34 : 68;

    if (!deleting && text === word) {
      wait = 1700;
    } else if (deleting && text === "") {
      wait = 260;
    }

    const t = window.setTimeout(() => {
      if (!deleting) {
        if (text === word) {
          setDeleting(true);
        } else {
          setText(word.slice(0, text.length + 1));
        }
      } else {
        if (text === "") {
          setDeleting(false);
          setIndex((i) => (i + 1) % words.length);
        } else {
          setText(word.slice(0, text.length - 1));
        }
      }
    }, wait);
    return () => window.clearTimeout(t);
  }, [text, deleting, index, words]);

  return (
    <span className={`rot ${className}`}>
      <span className="rot-word">{text}</span>
    </span>
  );
}
