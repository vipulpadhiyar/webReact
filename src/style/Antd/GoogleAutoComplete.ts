import { createGlobalStyle } from 'styled-components';

export const GoogleAutoComplete = createGlobalStyle`
.autoCompleteFormItem{
    &.ant-form-item-has-error{
        .autoCompleteInput{
            border-color:  #dc3545;
        }
    }
    .autoCompleteInput{
        box-sizing: border-box;
        margin: 0;
        padding: 10px 11px;
        color: #000000;
        font-size: 14px;
        line-height: 1;
        list-style: none;
        font-family: sans-serif;
        position: relative;
        display: inline-block;
        width: 100%;
        min-width: 0;
        background-color: #ffffff;
        background-image: none;
        border-width: 1px;
        border-style: solid;
        border-color: #A3A3A3;
        border-radius: 4px;
        transition: all 0.2s;
    }
}
`;
