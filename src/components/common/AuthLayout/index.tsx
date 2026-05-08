import { ReactNode } from 'react';

import { AuthWrapper } from './Auth.Styled';

export interface IAuthProps {
  containerClassName?: string;
  authBg?: string;
  children?: ReactNode;
}
const AuthLayout = (props: IAuthProps) => {
  const { containerClassName, authBg, children } = props;
  return (
    <AuthWrapper className={`authLayout ${containerClassName}`}>
      <div className={`authWrapper ${!authBg ? 'authBg' : authBg}`}>{children}</div>
    </AuthWrapper>
  );
};

export default AuthLayout;
