import { createContext, useContext } from 'react';
import { RequestParamsHook, useRequestParams } from './use-request-params';

const RequestParamsContext = createContext<RequestParamsHook | undefined>(
  undefined
);

interface RequestParamsProviderProps {
  children: React.ReactNode;
}

export const RequestParamsProvider = ({
  children,
}: RequestParamsProviderProps): React.ReactElement => {
  const requestParams = useRequestParams();

  return (
    <RequestParamsContext.Provider value={requestParams}>
      {children}
    </RequestParamsContext.Provider>
  );
};

export const useRequestParamsContext = (): RequestParamsHook => {
  const context = useContext(RequestParamsContext);
  if (!context) {
    throw new Error(
      'useRequestParamsContext must be used within a RequestParamsProvider'
    );
  }
  return context;
};
