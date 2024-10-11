'use client';

import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { MoviesDetails } from '../../types/api.tsx';

import { URL_POSTER } from '../../common/constant.tsx';

import { formatNumber } from '../../utils/format.ts';
import { CloseButton } from '../button-close/button-close.tsx';
import { StarIcon } from '../icons/star-icon/star-icon.tsx';
import { CalendarIcon } from '../icons/calendar-icon/calendar-icon.tsx';
import { ClockIcon } from '../icons/clock-icon/clock-icon.tsx';
import { setMovieDetails } from '../../store/reducers/movies.tsx';

interface DetailsViewProps {
  movie: MoviesDetails;
}

export const DetailsView: React.FC<DetailsViewProps> = (props) => {
  const { movie } = props;
  const poster = movie?.backdropPath || movie?.posterPath || '';
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setMovieDetails(movie));
  }, [movie]);

  return (
    <div className="flex-1 bg-background p-6 overflow-y-auto h-screen sticky top-0">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-foreground">{movie.title}</h1>
        <CloseButton />
      </div>
      <div className="grid gap-4">
        <Image
          src={poster ? `${URL_POSTER}${poster}` : '/images/no-poster.png'}
          alt={movie.title}
          height={450}
          width={300}
          className={classNames('w-full', 'object-cover', 'rounded-lg', {
            noPoster: !poster,
          })}
          priority={true}
        />
        <div className="grid gap-2">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5 text-yellow-500" />
                <div className="text-2xl font-bold text-foreground">
                  {movie.voteAverage}
                </div>
              </div>
              {movie.adult && (
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  18+
                </div>
              )}
            </div>
            <div className="flex items-center justify-self-end gap-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                <div className="text-muted-foreground">{movie.releaseDate}</div>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-muted-foreground" />
                <div className="text-muted-foreground">{movie.runtime}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-base text-foreground italic">
              {movie.tagline}
            </div>
          </div>

          <p className="text-muted-foreground mb-5">{movie.overview}</p>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {movie.genres.map((genre, index) => (
                <div
                  key={index}
                  className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium"
                >
                  {genre}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-sm text-muted-foreground">
                Original Language
              </div>
              <div className="text-base text-foreground ">
                {movie.originalLanguage.toUpperCase()}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Status</div>
              <div className="text-base text-foreground ">{movie.status}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Budget</div>
              <div className="text-base text-foreground ">
                ${formatNumber(movie.budget)}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Revenue</div>
              <div className="text-base text-foreground ">
                ${formatNumber(movie.revenue)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
