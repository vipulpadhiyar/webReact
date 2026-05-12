import { seoTypeEnum, seoTypeTitleEnum } from 'utils/constants';

import CommonSeo from '../CommonSeo';

const AddCategorySeo = () => {
  return (
    <>
      <CommonSeo type={seoTypeEnum.category} name={seoTypeTitleEnum.category} />
    </>
  );
};

export default AddCategorySeo;
