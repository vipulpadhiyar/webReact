import { createGlobalStyle } from 'styled-components';

export const AntAutocompletes = createGlobalStyle`
  .ant-select-auto-complete {
    width: 100%;
    .ant-row {
      margin-bottom: 24px;
    }
    .ant-input {
      padding: 9px 11px;
    }
    &.ant-select-sm {
      .ant-input {
        padding: 9px 11px;
      }
    }
    .ant-input-wrapper {
      height: 100%;
    }
    .ant-btn {
      height: 100%;
    }
    .ant-input-search .ant-input-lg {
      line-height: 1.143;
    }
    .ant-select-single {
      height: unset;
    }
    .anticon {
      width: 16px;
      height: 16px;
    }
  }
`;
