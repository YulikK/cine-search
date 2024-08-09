import { useMemo } from 'react';

function useBaseUrl(): string | undefined {
  const baseUrl = useMemo(() => {
    if (typeof window !== 'undefined') {
      const { protocol, hostname, port } = window.location;
      const portPart = port ? `:${port}` : '';

      return `${protocol}//${hostname}${portPart}`;
    }
  }, []);

  return baseUrl;
}

export default useBaseUrl;
