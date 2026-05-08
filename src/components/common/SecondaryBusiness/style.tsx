import { theme } from 'style/Theme';

import styled from 'styled-components';

export const Wrapper = styled.div`
  &.faq {
    .faq-title {
      background-color: ${theme.color.primaryLight};
      padding: 15px 25px;
      border-radius: 6px;
      margin: 30px 0;
      text-transform: uppercase;
    }
    .faqBtn {
      display: flex;
      justify-content: flex-end;
      gap: 20px;
      margin-top: 20px;
      .minusBtn {
        color: ${theme.color.primary};
        svg {
          font-size: 24px;
          color: ${theme.color.primary};
        }
      }
    }
  }
`;
