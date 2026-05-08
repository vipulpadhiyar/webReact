import { Breadcrumb } from 'antd';
import { theme } from 'style/Theme';

import { styled } from 'styled-components';

export const StyledBreadcrumb = styled(Breadcrumb)`
  .ant-breadcrumb-link,
  .anticon {
    background: ${theme?.color?.transparent};
    font-weight: ${theme.font.weight[500]};
    font-size: 18px;
    margin-bottom: 10px;
    display: inline-block;
  }
`;
