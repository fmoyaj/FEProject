'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { Dropdown } from './components/dropdown';
import { Paper } from './components/paper';
import SearchBar from './components/searchBar';
import { CoreAPIClient, QueryFormatter, type SearchResult } from './lib';
import { Option } from './lib/types';

const DEFAULT_RESULTS_NUM = { id: "50", label: "50", value: 50 };
const RESULTS_NUM_OPTIONS: Option<number>[] = [
  { id: "25", label: "25", value: 25 },
  { id: "50", label: "50", value: 50 },
  { id: "100", label: "100", value: 100 },
  { id: "250", label: "250", value: 250 },
];

export default function Home() {
  const [query, setQuery] = useState<{ input: string, keywords: string[] }>({ input: "", keywords: [] });
  const [numOfResults, setNumOfResults] = useState(DEFAULT_RESULTS_NUM);
  const [queryResults, setQueryResults] = useState<SearchResult>();
  const coreApi = useMemo(() => new CoreAPIClient(), []);
  const totalResultsFound = Number(queryResults?.results ? queryResults.results.length : 0).toLocaleString('en');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const keywords = QueryFormatter.getQueryKeywords(input);
    setQuery({ input, keywords });
  }

  const queryPapers = useCallback(async (userQuery: string) => {
    const results: SearchResult = await coreApi.getPapers(userQuery, numOfResults.value);
    console.log("results", results, results.results.length);
    setQueryResults(results);

    return results;
  }, [numOfResults, coreApi]);

  return (
    <div className='content'>
      <div className='main-content'>
        <div className='search flex-col'>
          <SearchBar query={query.input}
            onChange={handleSearchChange}
            onSubmit={() => queryPapers(query.input)}
            placeholder='What are you researching?' />
          <div>
            <div className='flex-row w-full'>
              <p className='description text-sm'>Number of results</p>
              <Dropdown
                label="Number of results"
                options={RESULTS_NUM_OPTIONS}
                onSelect={(selectedOption) => setNumOfResults(selectedOption)}
                selected={numOfResults}
              />
            </div>
          </div>
        </div>
        <div>
          <div className='posts-list'>
            <div>
              <p className='description text-left'>{`Showing ${totalResultsFound} results`}</p>
            </div>
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
