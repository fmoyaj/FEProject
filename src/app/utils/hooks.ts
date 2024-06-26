import { useCallback, useEffect, useRef, useState } from "react";
import { CoreAPIClient, QueryFormatter, SearchResult } from "../lib";
import { APICallStatus, PaperAggregateData, PaperInfo } from "../lib/types";

export function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  function close() {
    setIsOpen(false);
  }

  function open() {
    setIsOpen(true);
  }

  return { isOpen, toggleOpen, close, open };
}

export function useMouseOverElem() {
  const [isMouseOverElem, setIsMouseOverElem] = useState(false);
  const ref: any = useRef();

  useEffect(() => {
    const handleOver = (event: any) => {
      if (ref.current && ref.current.contains(event.target)) {
        setIsMouseOverElem(true);
      }
    };

    const handleLeave = (event: any) => {
      if (ref.current && ref.current.contains(event.target)) {
        setIsMouseOverElem(false);
      }
    };

    document.addEventListener('mouseover', handleOver, true);
    document.addEventListener('mouseleave', handleLeave, true);

    return () => {
      document.removeEventListener('mouseover', handleOver, true);
      document.removeEventListener('mouseleave', handleLeave, true);
    };
  }, [ref]);

  return [ref, isMouseOverElem];
};

export function useQuery() {
  const [rawQuery, setRawQuery] = useState("");
  const [cleanQuery, setCleanQuery] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

  function updateAllQueryParams(query: string) {
    setRawQuery(query);

    try {
      const { normalizedQuery, keywords } = QueryFormatter.normalizeAndGetQueryKeywords(query);
      setCleanQuery(normalizedQuery);
      setKeywords(keywords);
      return { normalizedQuery, keywords };
    } catch {
      setCleanQuery(query);
      setKeywords([]);
      return { normalizedQuery: query, keywords: [] };
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;

    updateAllQueryParams(input);
  }

  return { rawQuery, cleanQuery, keywords, handleInputChange, overrideQuery: updateAllQueryParams };
}

export function useFetchForQuery(limit: number) {
  const { rawQuery, cleanQuery, keywords: innerKeywords, handleInputChange, overrideQuery } = useQuery();
  const [keywords, setKeywords] = useState<string[]>([]);
  const [coreStatus, setCoreStatus] = useState<APICallStatus>(APICallStatus.UNSUBMITTED);
  const [searchResponse, setSearchResponse] = useState<SearchResult | null>();
  const { aggregateData, aggregateStatus, updateAggregateData } = useAggregateSearchData(innerKeywords);

  const submitQuery = useCallback(async () => {
    setCoreStatus(APICallStatus.PENDING);
    setSearchResponse(null);
    const core = new CoreAPIClient();

    await core.getPapers(cleanQuery, limit)
      .then((results) => {
        setSearchResponse(results);
        setKeywords(innerKeywords);
        setCoreStatus(APICallStatus.SUCCESS);
        updateAggregateData(results.results);
      })
      .catch(() => {
        setSearchResponse(null);
        setCoreStatus(APICallStatus.FAIL);
      });
  }, [cleanQuery, limit, innerKeywords, updateAggregateData]);

  const submitQueryWithValue = useCallback(async (value: string) => {
    const { normalizedQuery, keywords } = overrideQuery(value);
    setCoreStatus(APICallStatus.PENDING);
    setSearchResponse(null);
    const core = new CoreAPIClient();

    await core.getPapers(normalizedQuery, limit)
      .then((results) => {
        setSearchResponse(results);
        setKeywords(keywords);
        setCoreStatus(APICallStatus.SUCCESS);
        updateAggregateData(results.results);
      })
      .catch(() => {
        setSearchResponse(null);
        setCoreStatus(APICallStatus.FAIL);
      });
  }, [limit, updateAggregateData, overrideQuery]);


  return {
    handleInputChange, rawQuery, keywords, coreStatus, searchResponse, submitQuery,
    aggregateData, aggregateStatus, submitQueryWithValue
  };
}

export function useAggregateSearchData(keywords: string[]) {
  const [aggregateStatus, setAggregateStatus] = useState<APICallStatus>(APICallStatus.UNSUBMITTED);
  const [aggregateData, setAggregateData] = useState<PaperAggregateData | null>(null);

  const fetchAggregate = useCallback(async (rawData: PaperInfo[]) => {
    setAggregateData(null);
    setAggregateStatus(APICallStatus.PENDING);
    const searchResponse = await fetch('api/aggregate', {
      method: 'POST',
      body: JSON.stringify({ keywords, data: rawData })
    });
    const results = await searchResponse.json();
    return results;
  }, [keywords]);

  const updateAggregateData = useCallback(async (rawData: PaperInfo[]) => {
    fetchAggregate(rawData)
      .then((aggregatedData) => {
        setAggregateData(aggregatedData);
        setAggregateStatus(APICallStatus.SUCCESS)
      })
      .catch(() => setAggregateStatus(APICallStatus.FAIL));
  }, [fetchAggregate]);

  return { aggregateStatus, aggregateData, updateAggregateData };
}
