import { SearchResult } from "./types";

const CORE_API_URL = "https://api.core.ac.uk/v3/search/works";

class CoreAPIClient {
  private url: string;

  constructor() {
    this.url = CORE_API_URL;
  }

  public async getPapers(
    query: string, limit: number | null = null,
    sort: string = 'relevance'
  ): Promise<SearchResult> {
    const response = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(
        {
          q: `(${query})`,
          limit: limit,
          exclude: ['fullText'],
          sort
        }
      )
    });

    const results = await response.json();

    return results;
  }
}

export { CoreAPIClient };
