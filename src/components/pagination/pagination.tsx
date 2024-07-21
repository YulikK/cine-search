import React from 'react';
import { ChevronLeftIcon } from '../icons/chevron-left-icon/chevron-left-icon.tsx';
import { ChevronRightIcon } from '../icons/chevron-right-icon/chevron-right-icon.tsx';
import { useRequestParams } from '../../hooks/use-request-params.tsx';
import { DEFAULT_PAGE } from '../../common/constant.tsx';
import { updateParams } from '../../utils/params.tsx';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}
export const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const { searchParams, setSearchParams } = useRequestParams();
  const page = parseInt(searchParams.get('page') || `${DEFAULT_PAGE}`, 10);
  const getPageNumbers = (): number[] => {
    const maxPagesToShow = 5;
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, page + 2);

    if (page <= 3) {
      endPage = Math.min(totalPages, maxPagesToShow);
    } else if (page + 2 >= totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i += 1) {
      pages.push(i);
    }
    return pages;
  };

  const handlePrevious = (): void => {
    if (page > 1) {
      const newPage = page - 1;
      setSearchParams({
        page: newPage.toString(),
      });
    }
  };

  const handleNext = (): void => {
    if (page < totalPages) {
      const newPage = page + 1;
      setSearchParams({
        page: newPage.toString(),
      });
    }
  };

  const onPageClick = (newPage: number): void => {
    setSearchParams(updateParams('page', newPage.toString(), searchParams));
  };

  return (
    <nav className="flex items-center justify-center space-x-2 mt-10">
      <button
        onClick={handlePrevious}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>
      {getPageNumbers().map((pageItem) => (
        <button
          key={pageItem}
          onClick={() => onPageClick(pageItem)}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-3 py-2 gap-1 ${
            pageItem === page
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          {pageItem}
        </button>
      ))}
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </nav>
  );
};
