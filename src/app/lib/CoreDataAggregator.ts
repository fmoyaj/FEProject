import { PaperInfo } from ".";
import { TextAnalyzer } from "./TextAnalyzer";
import { type KeywordsFrequency, type PaperAggregate } from "./types";

class CoreDataAggregator {
  private analyzer: TextAnalyzer;

  constructor() {
    this.analyzer = new TextAnalyzer();
  }

  public processData(papers: PaperInfo[], keywords: string[]) {
    const paperAggregate: PaperAggregate = {};
    const keywordsFreq: KeywordsFrequency = {};
    let totalPapersWithKeywords = 0;

    for (let i = 0; i < papers.length; i++) {
      try {
        const { title, abstract, id } = papers[i]; // Assume ID is unique
        const tokenizedTitle = this.analyzer.getNuancedWordFrequency(title, keywords);
        const tokenizedAbstract = this.analyzer.getNuancedWordFrequency(abstract ?? '', keywords);

        // Add individual aggregate information
        paperAggregate[id] = {
          title: tokenizedTitle.frequency,
          abstract: tokenizedAbstract.frequency
        };

        if (tokenizedTitle.hasKeywords || tokenizedAbstract.hasKeywords)
          totalPapersWithKeywords += 1;

        for (let j = 0; j < keywords.length; j++) {
          const currentWord = keywords[j];

          if (!keywordsFreq[currentWord])
            keywordsFreq[currentWord] = { title: 0, abstract: 0 };

          // Add title frequency
          if (tokenizedTitle.frequency[currentWord]) {
            const titleFreq = tokenizedTitle.frequency[currentWord];
            const prevValue = keywordsFreq[currentWord].title;

            keywordsFreq[currentWord] = {
              ...keywordsFreq[currentWord],
              title: prevValue + titleFreq
            }
          }

          // Add abstract frequency
          if (tokenizedAbstract.frequency[currentWord]) {
            const abstractFreq = tokenizedAbstract.frequency[currentWord];
            const prevValue = keywordsFreq[currentWord].abstract;

            keywordsFreq[currentWord] = {
              ...keywordsFreq[currentWord],
              abstract: prevValue + abstractFreq
            }
          }

        }
      } catch {
        // Logging
      }
    }

    return { paperAggregate, keywordsFreq, totalPapersWithKeywords };
  }
}

export { CoreDataAggregator };
