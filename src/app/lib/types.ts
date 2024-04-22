export interface SearchResult {
  limit: number,
  offset: number,
  results: PaperInfo[],
  totalHits: number
}

export interface PaperInfo {
  id: number;
  title: string;
  authors: { name: string }[] | null;
  contributors: string[];
  createdDate: string;
  doi: string;
  publishedDate: string;
  yearPublished: string;
  publisher: string;
  abstract: string | null;
  documentType: string;
  downloadUrl: string;
  fieldOfStudy: string | null;
}

export interface WordFrequency {
  [key: string]: number
}

export interface TokenizedFrequencyInfo {
  frequency: WordFrequency;
  similarWords: Set<string>;
  hasKeywords: boolean;
}

export interface Option<T> {
  id: string;
  label: string;
  value: T;
}

export enum APICallStatus {
  UNSUBMITTED = 'UNSUBMITTED',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL'
}

export interface PaperAggregate {
  [key: number]: {
    title: {
      [key: string]: number;
    };
    abstract: {
      [key: string]: number;
    };
  }
}

export interface SingleKeywordFrequency {
  title: number;
  abstract: number;
}

export interface ExtendedSingleKeywordFrequency extends SingleKeywordFrequency {
  keyword: string;
}

export interface KeywordsFrequency {
  [key: string]: SingleKeywordFrequency
}

export interface PaperAggregateData {
  paperAggregate: PaperAggregate;
  keywordsFreq: KeywordsFrequency;
  totalPapersWithKeywords: number;
}


