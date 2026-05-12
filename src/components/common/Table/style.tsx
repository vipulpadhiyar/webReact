import { Table } from 'antd';

import { styled } from 'styled-components';

export const StyledTable = styled(Table)`
  &.ant-table-wrapper {
    picture {
      width: 50px;
      height: 50px;
      display: inline-block;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 100%;
      }
    }
    .ant-spin-container {
      .ant-table {
        .ant-table-tbody {
          .ant-table-cell {
            line-height: 20px;
          }
        }
      }
      ul.ant-pagination {
        &.ant-table-pagination {
          .ant-pagination-total-text {
          }
          li {
            & + li {
              margin-inline-end: 6px;
            }
          }
        }
      }
    }
  }
`;
