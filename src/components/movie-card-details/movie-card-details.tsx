import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { MoviesDetails } from '../../types/api.tsx';
import { XIcon } from '../icons/x-icon/x-icon.tsx';
import { StarIcon } from '../icons/star-icon/star-icon.tsx';
import { URL_POSTER } from '../../common/constant.tsx';
import NO_POSTER_IMG from '../../assets/img/placeholder.svg';
import { CalendarIcon } from '../icons/calendar-icon/calendar-icon.tsx';
import { ClockIcon } from '../icons/clock-icon/clock-icon.tsx';
import { useRequestParams } from '../../hooks/use-request-params.tsx';

interface MovieDetailsProps {
  movie: MoviesDetails;
}
export const MovieCardDetails: React.FC<MovieDetailsProps> = (props) => {
  const selectedMovie = props.movie;
  const navigate = useNavigate();
  const { searchParams, setSearchParams } = useRequestParams();

  const poster = selectedMovie.backdropPath || selectedMovie.posterPath || '';

  const handleCloseClick = (): void => {
    const saveSearchParams = new URLSearchParams(searchParams.toString());
    navigate(`/`);
    setSearchParams(Object.fromEntries(saveSearchParams.entries()));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold ">{selectedMovie.title}</h1>
        <button onClick={handleCloseClick}>
          <XIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="grid gap-4">
        <img
          src={poster ? `${URL_POSTER}${poster}` : NO_POSTER_IMG}
          alt={selectedMovie.title}
          width={300}
          height={450}
          className={classNames(
            'w-full',
            'h-[450px]',
            'object-cover',
            'rounded-lg',
            { noPoster: !poster }
          )}
        />
        <div className="grid gap-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5 text-yellow-500" />
                <div className="text-2xl font-bold">
                  {selectedMovie.voteAverage}
                </div>
              </div>
              {selectedMovie.adult ? (
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  18+
                </div>
              ) : (
                <></>
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
            <div className="text-base italic">{selectedMovie.tagline}</div>
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
              <div className="text-base">
                {selectedMovie.originalLanguage.toUpperCase()}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Status</div>
              <div className="text-base">{selectedMovie.status}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Budget</div>
              <div className="text-base">
                ${selectedMovie.budget.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Revenue</div>
              <div className="text-base">
                ${selectedMovie.revenue.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
