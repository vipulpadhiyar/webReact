import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem';
import React from 'react';
import { Link } from 'react-router-dom';

import { StyledBreadcrumb } from './breadcrumb.styled';

const Breadcrumb = ({ pathNames }: any) => {
  return (
    <StyledBreadcrumb>
      {pathNames?.length
        ? pathNames.map((path: any) => (
            <BreadcrumbItem key={path.title}>
              {path?.href ? (
                <Link className="ant-breadcrumb-link" to={path.href}>
                  {path.title}
                </Link>
              ) : (
                path.title
              )}
            </BreadcrumbItem>
          ))
        : null}
    </StyledBreadcrumb>
  );
};

export default React.memo(Breadcrumb);
