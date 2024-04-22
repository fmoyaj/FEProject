'use client';

import { useState } from 'react';
import { Dropdown } from './components/dropdown';
import { Paper } from './components/paper';
import { SampleQuery } from './components/sampleQuery';
import SearchBar from './components/searchBar';
import { SearchInsights } from './components/searchInsights';
import { APICallStatus, Option } from './lib/types';
import { useFetchForQuery } from './utils/hooks';

const DEFAULT_RESULTS_NUM = { id: "50", label: "50", value: 50 };
const RESULTS_NUM_OPTIONS: Option<number>[] = [
  { id: "25", label: "25", value: 25 },
  { id: "50", label: "50", value: 50 },
  { id: "100", label: "100", value: 100 },
  { id: "250", label: "250", value: 250 },
];

export default function Home() {
  const [numOfResults, setNumOfResults] = useState(DEFAULT_RESULTS_NUM);
  const {
    rawQuery,
    handleInputChange,
    submitQueryWithValue,
    submitQuery,
    keywords,
    searchResponse,
    aggregateData,
    coreStatus,
    aggregateStatus,
  } = useFetchForQuery(numOfResults.value);
  const totalResults = searchResponse?.results ? searchResponse.results.length : null;
  const isSearchPending = coreStatus === APICallStatus.PENDING;


  return (
    <div className='content'>
      <div className='main-content'>
        <div className='search flex-col'>
          <div className='w-full flex-row'>
            <SearchBar
              query={rawQuery}
              onChange={handleInputChange}
              onSubmit={submitQuery}
              isSearchPending={isSearchPending}
              placeholder='What are you researching?'
            />
          </div>
          <div>
            <div className='flex-row w-full'>
              <p className='description text-sm'>Number of results</p>
              <Dropdown
                options={RESULTS_NUM_OPTIONS}
                onSelect={(selectedOption) => setNumOfResults(selectedOption)}
                selected={numOfResults}
              />
            </div>
          </div>
        </div>
        <div>
          <div className='posts-list'>
            <SearchInsights
              keywords={keywords}
              totalResults={totalResults}
              aggregatedData={aggregateData}
              searchCallStatus={coreStatus}
              aggregateCallStatus={aggregateStatus}
            />
            {
              (() => {
                if (searchResponse === undefined) {
                  return <div className='welcome-view'>
                    <div>
                      <p className='welcome-header'>Not sure where to start?</p>
                      <p className='text-left description'>Try one of the sample queries to discover what Cypris can do for you</p>
                    </div>
                    <div className='help-grid'>
                      <SampleQuery
                        title='Medical research'
                        description='protein intake AND weight loss'
                        value='protein intake AND weight loss'
                        onClick={submitQueryWithValue}
                      />
                      <SampleQuery
                        title='Self-driving cars'
                        description='patents AND lidar'
                        value='patents AND lidar'
                        onClick={submitQueryWithValue}
                      />
                      <SampleQuery
                        title='Animal health'
                        description='vaccines AND pets'
                        value='vaccines AND pets'
                        onClick={submitQueryWithValue}
                      />
                      <SampleQuery
                        title='Alternative energy sources'
                        description='nuclear power OR solar power'
                        value='nuclear power OR solar power'
                        onClick={submitQueryWithValue}
                      />
                    </div>
                  </div>;
                }

                if (searchResponse === null) {
                  return ([]).map((paper) => Paper(keywords, paper));
                }

                return searchResponse.results.map((paper) => Paper(keywords, paper));
              })()
            }
          </div>
        </div>
      </div>
    </div>
  );
}
