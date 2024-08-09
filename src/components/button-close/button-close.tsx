'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getParams, setParams } from '../../utils/params.tsx';
import { DEFAULT_DETAILS } from '../../common/constant.tsx';
import { XIcon } from '../icons/x-icon/x-icon.tsx';

import { setMovieDetails } from '../../store/reducers/movies.tsx';

export const CloseButton: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  function handleDetailsClose(): void {
    const params = getParams(
      searchParams && searchParams.get('page'),
      searchParams && searchParams.get('query'),
      DEFAULT_DETAILS.toString()
    );

    setParams(router, params);
    dispatch(setMovieDetails(null));
  }

  return (
    <button onClick={handleDetailsClose}>
      <XIcon className="w-6 h-6 text-muted-foreground hover:text-accent-foreground" />
    </button>
  );
};
