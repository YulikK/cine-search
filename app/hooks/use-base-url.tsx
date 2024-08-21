import { useMemo } from 'react';

function useBaseUrl(): string {
  return useMemo(() => {
    if (typeof window !== 'undefined') {
      const { protocol, hostname, port } = window.location;
      const portPart = port ? `:${port}` : '';
      return `${protocol}//${hostname}${portPart}`;
    }
    return '';
  }, []);
}

export default useBaseUrl;
