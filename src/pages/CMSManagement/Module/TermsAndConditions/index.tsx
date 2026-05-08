import { Button } from 'antd';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

import { RenderCkEditor } from 'components/common/FormField';

import { cmsAPI } from 'services/api/cms';
import { cmsForm, getCms } from 'services/api/cms/type';

const TermsAndCondition = () => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const requestPayload: getCms = {
      cmsType: 'cms',
      titleKey: 'termsAndCond'
    };
    cmsAPI.getCMSApi(requestPayload).then((res) => {
      setValue(res?.titleValue);
    });
  }, []);

  const onSaveTermsAndConditions = () => {
    const requestPayload: cmsForm = {
      cmsType: 'cms',
      titleKey: 'termsAndCond',
      titleValue: value
    };
    cmsAPI.createCMSApi(requestPayload);
  };

  return (
    <div className="shadow-paper">
      <div className="d-flex justify-content-end mb-30 m-130">
        <Button type="primary" size="large" onClick={onSaveTermsAndConditions}>
          Save
        </Button>
      </div>

      {/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
      {/* <RenderCkEditor
        data={value}
        onChange={(evt: any) => {
          const newContent = evt.editor.getData();
          setValue(newContent);
        }}
      /> */}
      <RenderCkEditor value={value} onChange={setValue} />
    </div>
  );
};

export default TermsAndCondition;
