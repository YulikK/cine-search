import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { getSearchQuery, saveSearchQuery } from '../services/storage.tsx';

const useSearchQuery = (
  initialQuery: string
): [string, Dispatch<SetStateAction<string>>] => {
  const [searchQuery, setSearchQuery] = useState(getSearchQuery(initialQuery));

  useEffect(() => {
    saveSearchQuery(searchQuery);
    return saveSearchQuery(searchQuery);
  }, [searchQuery]);

  return [searchQuery, setSearchQuery];
};

export default useSearchQuery;
