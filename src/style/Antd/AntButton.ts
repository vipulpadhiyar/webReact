import { theme } from 'style/Theme';

import { createGlobalStyle } from 'styled-components';

export const AntButton = createGlobalStyle`
  .ant-btn{
    min-width: 130px;
    display: flex;
    align-items: center;
    justify-content: center;    
    &.ant-btn-primary{
      svg{
        font-size: 20px;
        color: ${theme.color.white};
      }
    }
    &.ant-btn-link{
      padding: 5px;
      height: auto;
      min-width: auto;
      width: auto;
    }
  }
`;
