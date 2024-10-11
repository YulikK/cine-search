import { useMemo } from 'react';

function useBaseUrl(): string | undefined {
  const windowDefined = typeof window !== 'undefined';

  const baseUrl = useMemo((): string | undefined => {
    if (windowDefined) {
      const { protocol, hostname, port } = window.location;
      const portPart = port ? `:${port}` : '';

      return `${protocol}//${hostname}${portPart}`;
    }

    return undefined;
  }, [windowDefined]);

  return baseUrl;
}

export default useBaseUrl;
