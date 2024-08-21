import { useSearchParams } from '@remix-run/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { DEFAULT_DETAILS } from '~/common/constant';
import { setMovieDetails } from '~/store/reducers/movies';
import { getParams, setParams } from '~/utils/params';
import { XIcon } from '../icons/x-icon/x-icon';

export const CloseButton: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  function handleDetailsClose(): void {
    const params = getParams(
      searchParams && searchParams.get('page'),
      searchParams && searchParams.get('query'),
      DEFAULT_DETAILS.toString()
    );

    setSearchParams(setParams(params));
    dispatch(setMovieDetails(null));
  }

  return (
    <button onClick={handleDetailsClose}>
      <XIcon className="w-6 h-6 text-muted-foreground hover:text-accent-foreground" />
    </button>
  );
};
