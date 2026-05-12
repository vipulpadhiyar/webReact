import { theme } from 'style/Theme';

import styled from 'styled-components';

export const Wrapper = styled.div`
  .dashboardInfo {
    padding: 30px;
    background-color: ${theme?.color?.primaryLight};
    border-radius: 10px;
    margin: 0px;
    height: 100%;
    text-align: center;
    .number {
      display: inline-block;
      margin-bottom: 3px;
      font-weight: 700;
      font-size: 36px;
      color: ${theme?.color?.black};
    }

    .infoTitle {
      font-weight: 400;
      font-size: 16px;
      color: ${theme?.color?.dark};
    }
  }
`;
