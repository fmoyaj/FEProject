'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { Paper } from './components/paper';
import SearchBar from './components/searchBar';
import { CoreAPIClient, QueryFormatter, type SearchResult } from './lib';

export default function Home() {
  const [query, setQuery] = useState<{ input: string, keywords: string[] }>({ input: "", keywords: [] });
  const [numOfResults, setNumOfResults] = useState(10);
  const [queryResults, setQueryResults] = useState<SearchResult>();
  const coreApi = useMemo(() => new CoreAPIClient(), []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const keywords = QueryFormatter.getQueryKeywords(input);
    setQuery({ input, keywords });
  }

  const handleNumberOfResultsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumOfResults(Number(event.target.value));
  }

  const queryPapers = useCallback(async (userQuery: string) => {
    const results: SearchResult = await coreApi.getPapers(userQuery, numOfResults);
    console.log("results", results, results.results.length);
    setQueryResults(results);

    return results;
  }, [numOfResults, coreApi]);

  return (
    <div className="centered-max-width-content">
      <h1>Cypris</h1>
      <div className='main-section-padding'>
        <div>
          <form>
            <SearchBar query={query.input} onChange={handleSearchChange} placeholder='Search papers' />
            <div>
              <label>Number of results</label>
              <input type='number' value={numOfResults} onChange={handleNumberOfResultsChange} />
            </div>
            <button type='button' onClick={() => queryPapers(query.input)}>Submit</button>
          </form>
        </div>
        <div>
          <div>
            <h2>Results</h2>
            <p>Results for {query.input}</p>
            <p>Parsed query {JSON.stringify(query.keywords)}</p>
            {queryResults &&
              <p>{queryResults.totalHits} results found</p>}
          </div>
          <div>
            {
              queryResults?.results &&
              queryResults.results.map((paper) => Paper(query.input, query.keywords, paper))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
