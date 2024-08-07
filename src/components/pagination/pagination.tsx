import React from 'react';
import { ChevronLeftIcon } from '../icons/chevron-left-icon/chevron-left-icon.tsx';
import { ChevronRightIcon } from '../icons/chevron-right-icon/chevron-right-icon.tsx';

interface PaginationProps {
  page: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}
export const Pagination: React.FC<PaginationProps> = (props) => {
  const getPageNumbers = (): number[] => {
    const maxPagesToShow = 5;
    let startPage = Math.max(1, props.page - 2);
    let endPage = Math.min(props.totalPages, props.page + 2);

    if (props.page <= 3) {
      endPage = Math.min(props.totalPages, maxPagesToShow);
    } else if (props.page + 2 >= props.totalPages) {
      startPage = Math.max(1, props.totalPages - maxPagesToShow + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i += 1) {
      pages.push(i);
    }
    return pages;
  };

  const handlePrevious = (): void => {
    if (props.page > 1) {
      props.handlePageChange(props.page - 1);
    }
  };

  const handleNext = (): void => {
    if (props.page < props.totalPages) {
      props.handlePageChange(props.page + 1);
    }
  };

  const onPageClick = (newPage: number): void => {
    props.handlePageChange(newPage);
  };

  return (
    <nav className="flex items-center justify-center space-x-2 mt-10">
      <button
        onClick={handlePrevious}
        disabled={props.page === 1}
        aria-label="Previous page"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>
      {getPageNumbers().map((pageItem) => (
        <button
          key={pageItem}
          onClick={() => onPageClick(pageItem)}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-3 py-2 gap-1 ${
            pageItem === props.page
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          {pageItem}
        </button>
      ))}
      <button
        onClick={handleNext}
        disabled={props.page === props.totalPages}
        aria-label="Next page"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </nav>
  );
};
