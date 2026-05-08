import { seoTypeEnum, seoTypeTitleEnum } from 'utils/constants';

import CommonSeo from '../CommonSeo';

const AddCityCategoryServiceSeo = () => {
  return (
    <>
      <CommonSeo
        type={seoTypeEnum.cityCategoryService}
        name={seoTypeTitleEnum.cityCategoryService}
      />
    </>
  );
};
export default AddCityCategoryServiceSeo;
