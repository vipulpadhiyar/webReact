import { Spinner, Wrapper } from './style';

import { LoadingIcon } from 'components/svg';

import { authStore } from 'services/store/auth';

interface IProps {
  children?: React.ReactNode;
}

export const LoaderWrapper: React.FC<IProps> = ({ children }) => {
  return <>{children}</>;
};

export const Loader: React.FC<IProps> = ({ children }) => {
  const { isLoading } = authStore((state) => state);

  return (
    <>
      {isLoading ? (
        <Wrapper>
          <Spinner>
            <LoadingIcon />
          </Spinner>
          {children}
        </Wrapper>
      ) : (
        children
      )}
    </>
  );
};
