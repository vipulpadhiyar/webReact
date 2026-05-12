import { createGlobalStyle } from 'styled-components';

export const AntFormFields = createGlobalStyle`
/* Select Style */
.ant-select{
    &.category-filter,
    &.city-filter,
    &.area-filter{
        min-width: 160px;
        max-width: 160px;
    }
}

/* Range Css */
.ant-picker{
&.range-filter{
    min-width: 240px;
    max-width: 240px;
    
    .ant-picker-input{
        input{
            font-size: 14px;
        }
    }
}
}
`;
