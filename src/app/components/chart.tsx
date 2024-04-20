"use client"

import { useEffect, useState } from "react";

interface Props {
  sanitizedQuery: string; // Should be the formatted/processed query
  title: string;
  abstract: string;
  keywords: string[];
}

export function Chart({ title, abstract, keywords }: Props) {
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    async function loadChartInfo(text: string): Promise<string[]> {
      const response = await fetch('/api', {
        method: 'POST',
        body: JSON.stringify({ title, text, keywords })
      });
      const results = await response.json();
      return results;
    }

    loadChartInfo(abstract).then((tokenized) => setWords(tokenized));
  }, [abstract, keywords, title]);

  return <div>
    {
      words &&
      <p>{JSON.stringify(words)}</p>
    }
    {/*     {
      sanitizedQuery !== "" &&
      <div>
        <ol>
          {
            Object.entries(keywordsFreq.frequency).map(([word, freq]) => (
              <li>
                <p>{word}: </p>
                <p>{freq}</p>
              </li>
            ))
          }
        </ol>
      </div>
    }
    {
      keywordsFreq.similarWords.size > 0 &&
      <div>
        <p>Similar words</p>
        {Array.from(keywordsFreq.similarWords).map((word) => (
          <p>{word}</p>
        ))}
      </div>
    } */}
  </div>
}
