import { AntButton } from './AntButton';
import { AntCheckbox } from './AntCheckbox';
import { AntDropdown } from './AntDropdown';
import { AntFormFields } from './AntFormFields';
import { AntFormInputs } from './AntFormInputs';
import { GoogleAutoComplete } from './GoogleAutoComplete';
import { AntAutocompletes } from './autoComplete';

const AntdStyle = () => {
  return (
    <>
      <AntDropdown />
      <AntButton />
      <AntFormInputs />
      <GoogleAutoComplete />
      <AntAutocompletes />
      <AntCheckbox />
      <AntFormFields />
    </>
  );
};

export default AntdStyle;
