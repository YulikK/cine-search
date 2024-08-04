import React from 'react';
import classNames from 'classnames';
import { MoviesDetails } from '../../types/api.tsx';
import { XIcon } from '../icons/x-icon/x-icon.tsx';
import { StarIcon } from '../icons/star-icon/star-icon.tsx';
import { DEFAULT_DETAILS, URL_POSTER } from '../../common/constant.tsx';
import { CalendarIcon } from '../icons/calendar-icon/calendar-icon.tsx';
import { ClockIcon } from '../icons/clock-icon/clock-icon.tsx';
import Image from 'next/image';
import { useRequestParamsContext } from '../../hooks/params-provider.tsx';

interface MovieDetailsProps {
  movie: MoviesDetails;
}
export const MovieCardDetails: React.FC<MovieDetailsProps> = (props) => {
  const selectedMovie = props.movie;
  const { params, setParams } = useRequestParamsContext();

  const poster = selectedMovie.backdropPath || selectedMovie.posterPath || '';

  const handleCloseClick = (): void => {
    setParams({ ...params, details: DEFAULT_DETAILS });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-foreground">
          {selectedMovie.title}
        </h1>
        <button onClick={handleCloseClick}>
          <XIcon className="w-6 h-6 text-muted-foreground hover:text-accent-foreground" />
        </button>
      </div>
      <div className="grid gap-4">
        <Image
          src={poster ? `${URL_POSTER}${poster}` : '/images/no-poster.png'}
          alt={selectedMovie.title}
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
                  {selectedMovie.voteAverage}
                </div>
              </div>
              {selectedMovie.adult && (
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  18+
                </div>
              )}
            </div>
            <div className="flex items-center justify-self-end gap-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                <div className="text-muted-foreground">
                  {selectedMovie.releaseDate}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-muted-foreground" />
                <div className="text-muted-foreground">
                  {selectedMovie.runtime}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-base text-foreground italic">
              {selectedMovie.tagline}
            </div>
          </div>

          <p className="text-muted-foreground mb-5">{selectedMovie.overview}</p>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {selectedMovie.genres.map((genre, index) => (
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
                {selectedMovie.originalLanguage.toUpperCase()}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Status</div>
              <div className="text-base text-foreground ">
                {selectedMovie.status}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Budget</div>
              <div className="text-base text-foreground ">
                ${selectedMovie.budget.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Revenue</div>
              <div className="text-base text-foreground ">
                ${selectedMovie.revenue.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
