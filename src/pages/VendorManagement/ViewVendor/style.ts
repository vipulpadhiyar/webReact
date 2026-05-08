import { responsive } from 'style/Common/Mixin';
import { theme } from 'style/Theme';

import styled from 'styled-components';

export const Wrapper = styled.div`
  &.ViewPage {
    .viewWrap {
      display: flex;
      align-items: center;
      border: 1px solid #f2eef7;
      margin-bottom: 20px;
      width: 49%;
      picture {
        width: 50px;
        height: 50px;
        display: inline-block;
        img {
          width: 100%;
          height: 100%;
          border-radius: 100%;
          object-fit: cover;
        }
      }
      .left,
      .right {
        padding: 10px 12px;
      }
      .left {
        width: 280px;
        font-weight: 500;
      }
      .right {
        width: calc(100% - 280px);
        border-left: 1px solid #f2eef7;
      }
    }
    .faq-title {
      background-color: ${theme.color.primaryLight};
      padding: 15px 25px;
      border-radius: 6px;
      margin: 30px 0;
      text-transform: uppercase;
    }
  }
  ${responsive('lg')`
    &.ViewPage {
      .viewWrap {
        flex-wrap:wrap;
        width:100%;
        .left {
          width: 180px;
        }
        .right {
          width: calc(100% - 280px);
        }
      }
    }
`}
  ${responsive('xs')`
    &.ViewPage {
      .viewWrap {
        flex-wrap:wrap;
        .left {
          width: 100%;
        }
        .right {
          width: 100%;
          border-left: none;
          border-top: 1px solid #f2eef7;          
        }
      }
    }
`}
`;
