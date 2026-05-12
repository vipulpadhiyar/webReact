import { seoTypeEnum, seoTypeTitleEnum } from 'utils/constants';

import CommonSeo from '../CommonSeo';

const AddCityAreaCategoryServiceSeo = () => {
  return (
    <>
      <CommonSeo
        type={seoTypeEnum.cityAreaCategoryService}
        name={seoTypeTitleEnum.cityAreaCategoryService}
      />
    </>
  );
};

export default AddCityAreaCategoryServiceSeo;
