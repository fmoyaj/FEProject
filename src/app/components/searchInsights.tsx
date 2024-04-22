import { HTMLAttributes } from "react";
import { APICallStatus, ExtendedSingleKeywordFrequency, PaperAggregateData } from "../lib";
import { useDisclosure } from "../utils/hooks";
import { DownCaretIcon } from "./down-caret";
import { ExpandableLabel } from "./expandableLabel";
import { Loader } from "./loader";

interface Props {
  keywords: string[];
  totalResults: number | null;
  aggregatedData: PaperAggregateData | null;
  searchCallStatus: APICallStatus;
  aggregateCallStatus: APICallStatus;
}

export function SearchInsights(
  { keywords, totalResults, aggregatedData, searchCallStatus, aggregateCallStatus }: Props) {
  const { isOpen, toggleOpen, close } = useDisclosure();
  const totalResultsFound = totalResults ? Number(totalResults).toLocaleString('en') : null;
  const insightsText = 'Visualize your results';

  return <div className='search-insights'>
    <div className='description-row'>
      {
        totalResultsFound !== null &&
        <>
          <p className='description text-left'>{`Showing ${totalResultsFound} results`}</p>
          <ExpandableLabel
            label={{ open: insightsText, closed: insightsText }}
            isOpen={isOpen}
            toggleOpen={toggleOpen}
            indicator={(style) => <DownCaretIcon style={style as HTMLAttributes<SVGAElement>} />}
            buttonClassName='highlight-button'
          />
        </>
      }
    </div>
    {
      isOpen &&
      <InsightsChart
        close={close}
        aggregateCallStatus={aggregateCallStatus}
        searchCallStatus={searchCallStatus}
        aggregatedData={aggregatedData}
        keywords={keywords}
        totalResults={totalResults}
      />
    }
  </div>
}

interface ChartProps {
  close: () => void;
  aggregatedData: PaperAggregateData | null;
  aggregateCallStatus: APICallStatus;
  searchCallStatus: APICallStatus;
  keywords: string[];
  totalResults: number | null;
}

function InsightsChart({
  close,
  aggregatedData,
  aggregateCallStatus,
  searchCallStatus,
  keywords,
  totalResults }: ChartProps) {
  let totalTitleMentions = 0;
  let totalAbstractMentions = 0;
  const keywordsArray: ExtendedSingleKeywordFrequency[] = keywords.map((keyword) => {
    if (aggregatedData && aggregatedData.keywordsFreq[keyword]) {
      const { title, abstract } = aggregatedData.keywordsFreq[keyword];
      totalTitleMentions += title;
      totalAbstractMentions += abstract;

      return { keyword, title, abstract };
    }
    return { keyword, title: 0, abstract: 0 };
  });
  const topTitleKeywords = keywordsArray.sort((a, b) => b.title - a.title);
  const topAbstractKeywords = keywordsArray.sort((a, b) => b.abstract - a.abstract);

  return <div className='chart'>
    <div>
      <div className='flex-row card-header'>
        <p>Your search in numbers</p>
      </div>
      <p className='text-sm'>Evaluate your search performance for the keywords you used</p>
    </div>
    <div>
      {
        (() => {
          if (aggregateCallStatus === APICallStatus.PENDING) {
            return <div className='w-full flex-row message'>
              <p className='description'>Generating your data</p>
              <Loader />
            </div>
          }

          if (aggregatedData === null || keywords.length === 0 || searchCallStatus === APICallStatus.PENDING) {
            return <div className='text-center message'>
              <p className='description'>There are currently no insights available for your search</p>
            </div>;
          }

          return <div className='main-body'>
            <div className='flex-row'>
              <p className='main-label'>Keywords</p>
              {
                keywords.map((word, i) => (<div key={`${word}-${i}`} className="tag primary">{word}</div>))
              }
            </div>
            <div className='stats-grid'>
              <StatsCard
                label='Keyword matches in title'
                value={totalTitleMentions}
                details={<StatsCardDetails topWords={topTitleKeywords} total={totalTitleMentions} valType='title' />}
              />
              <StatsCard
                label=
                'Keyword matches in abstract'
                value={totalAbstractMentions}
                details={<StatsCardDetails topWords={topAbstractKeywords} total={totalAbstractMentions} valType='abstract' />}
              />
              <StatsCard
                label='Papers in the results contain your keywords'
                value={`${Number(aggregatedData.totalPapersWithKeywords).toLocaleString()}/${Number(totalResults).toLocaleString()}`}
              />
            </div>
          </div>;
        })()
      }
    </div>
  </div>;
}

interface CardProps {
  label: string;
  value: number | string;
  details?: React.ReactNode;
}

function StatsCard({ label, value, details }: CardProps) {
  return <div className='stats-card'>
    <div className='main-value-container'>
      <p className='value'>{value}</p>
      <p className='label'>{label}</p>
    </div>
    {
      details
    }
  </div>
}


interface DetailsProps {
  topWords: ExtendedSingleKeywordFrequency[];
  total: number;
  valType: 'title' | 'abstract';
}


function StatsCardDetails({ topWords, total, valType }: DetailsProps) {
  if (topWords.length === 0) return <></>;

  return <div className='details'>
    <p className='label'>Top keywords</p>
    <div className='word-container'>
      {
        topWords.slice(0, 2).map((value, i) => (
          <div className='flex-row justify-between' key={`${value}-${i}`}>
            <p>{value.keyword}</p>
            <PercentageBar value={value[valType]} total={total} />
          </div>
        ))
      }
    </div>
  </div>
}

interface BarProps {
  value: number;
  total: number;
}

function PercentageBar({ value, total }: BarProps) {
  function calculateNearestIntegerPercentage(number: number) {
    const percentage = number * 100;
    const roundedPercentage = Math.round(percentage);
    return roundedPercentage;
  }

  function calcPercentage(value: number, total: number) {
    try {
      return calculateNearestIntegerPercentage(value / total);
    } catch {
      return null;
    }
  }

  const percentage = calcPercentage(value, total);

  return percentage === null ? <></> : <div className='percentage-bar'>
    <div className='fill' style={{ width: `${percentage}%` }}></div>
  </div>
}
