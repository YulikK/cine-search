import { useMemo } from 'react';

function useBaseUrl(): string {
  return useMemo(() => {
    const { protocol, hostname, port } = window.location;
    const portPart = port ? `:${port}` : '';
    return `${protocol}//${hostname}${portPart}`;
  }, []);
}

export default useBaseUrl;
