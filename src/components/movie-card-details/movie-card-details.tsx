import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { MoviesDetails } from '../../types/api';
import { XIcon } from '../icons/x-icon/x-icon';
import { StarIcon } from '../icons/star-icon/star-icon';
import { URL_POSTER } from '../../common/constant';
import { CalendarIcon } from '../icons/calendar-icon/calendar-icon';
import { ClockIcon } from '../icons/clock-icon/clock-icon';
import { formatNumber } from '../../utils/format';

interface MovieDetailsProps {
  movie: MoviesDetails;
  handleDetailsClose: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}
export const MovieCardDetails: React.FC<MovieDetailsProps> = (props) => {
  const { movie, handleDetailsClose } = props;

  const poster = movie.backdropPath || movie.posterPath || '';

  return (
    <div className="flex-1 bg-background p-6 overflow-y-auto h-screen sticky top-0">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-foreground">{movie.title}</h1>
        <button type="button" onClick={handleDetailsClose} aria-label="close">
          <XIcon className="w-6 h-6 text-muted-foreground hover:text-accent-foreground" />
        </button>
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
          priority
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
              {movie.genres.map((genre) => (
                <div
                  key={genre}
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
