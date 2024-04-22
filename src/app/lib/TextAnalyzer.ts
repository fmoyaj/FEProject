import { JaroWinklerDistance, WordTokenizer } from "natural";
import { TokenizedFrequencyInfo, WordFrequency } from "./types";

const SIMILARITY_THRESHOLD = 0.9;
const SAME_WORD_SIMILARITY_THRESHOLD = 0.9;

class TextAnalyzer {
  private tokenizer: WordTokenizer;

  constructor() {
    this.tokenizer = new WordTokenizer();
  }

  private tokenizeText(text: string) {
    return this.tokenizer.tokenize(text);
  }

  public getWordFrequency(text: string, words: string[]): WordFrequency {
    const tokenizedText = this.tokenizeText(text);
    const frequencyMap: WordFrequency = {};

    for (let i = 0; i < tokenizedText.length; i++) {
      const currentToken = tokenizedText[i].toLowerCase();

      for (let j = 0; j < words.length; j++) {
        const currentWord = words[j];

        if (!frequencyMap[currentWord]) frequencyMap[currentWord] = 0;

        if (currentWord.toLowerCase() === currentToken.toLowerCase()) {
          frequencyMap[currentWord] += 1;
        }
      }
    }

    return frequencyMap;
  }

  public getNuancedWordFrequency(text: string, words: string[]): TokenizedFrequencyInfo {
    const tokenizedText = this.tokenizeText(text);
    const frequencyMap: WordFrequency = words.reduce(
      (prev, curr) => ({ ...prev, [curr]: 0 }), {});
    let hasKeywords = false;
    const similarWords = new Set<string>();

    for (let i = 0; i < tokenizedText.length; i++) {
      const currentToken = tokenizedText[i].toLowerCase();

      for (let j = 0; j < words.length; j++) {
        const currentWord = words[j];
        const wordSimilarity = JaroWinklerDistance(currentWord.toLowerCase(),
          currentToken.toLowerCase());

        if (wordSimilarity >= SIMILARITY_THRESHOLD) {
          // Add frequency
          frequencyMap[currentWord] += 1;
          hasKeywords = true;

          // Add to similar words
          if (wordSimilarity <= SAME_WORD_SIMILARITY_THRESHOLD) {
            similarWords.add(currentToken.toLowerCase())
          }
        }
      }
    }

    return { frequency: frequencyMap, similarWords, hasKeywords };
  }


}

export { TextAnalyzer };
