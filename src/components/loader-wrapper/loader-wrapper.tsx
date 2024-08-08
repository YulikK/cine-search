import { Suspense } from 'react';
import { Loader } from '../loader/loader.tsx';

interface LoaderWrapProps {
  children: React.ReactNode;
}

export const LoaderWrap: React.FC<LoaderWrapProps> = (props) => (
  <Suspense fallback={<Loader />}>{props.children}</Suspense>
);
