import { Navigate } from 'react-router-dom';

import { authStore } from 'services/store/auth';

import { SubAdminRole } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';

const ProtectedRoute = ({ element, requiredAccess }: any) => {
  const { userData } = authStore();
  const hasAccess =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    userData?.access?.includes(requiredAccess) || userData?.access?.includes(SubAdminRole.ALL);
  if (hasAccess) {
    return element;
  } else {
    return <Navigate replace to={ROUTES.pageNotFound} />;
  }
};

export default ProtectedRoute;
