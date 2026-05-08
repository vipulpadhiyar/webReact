import { seoTypeEnum, seoTypeTitleEnum } from 'utils/constants';

import CommonSeo from '../CommonSeo';

const AddCityCategorySeo = () => {
  return (
    <>
      <CommonSeo type={seoTypeEnum.cityCategory} name={seoTypeTitleEnum.cityCategory} />
    </>
  );
};

export default AddCityCategorySeo;
