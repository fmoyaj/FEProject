export interface SearchResult {
  limit: number,
  offset: number,
  results: any[],
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
  fullText: string;
}

export interface WordFrequency {
  [key: string]: number
}

export interface ChartInfo {
  frequency: WordFrequency,
  similarWords: Set<string>
}

export interface Option<T> {
  id: string;
  label: string;
  value: T;
}


