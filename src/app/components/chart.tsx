import { useEffect, useState } from "react";

interface Props {
  title: string;
  abstract: string;
  keywords: string[];
}

export function PaperChart({ title, abstract, keywords }: Props) {
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    async function loadTokenizedFrequencyInfo(text: string): Promise<string[]> {
      const response = await fetch('/api', {
        method: 'POST',
        body: JSON.stringify({ title, text, keywords })
      });
      const results = await response.json();
      return results;
    }

    loadTokenizedFrequencyInfo(abstract).then((tokenized) => setWords(tokenized));
  }, [abstract, keywords, title]);

  return <div>
    <button type='button' className='highlight-button' onClick={() => { }}>View insights</button>
  </div>
}
