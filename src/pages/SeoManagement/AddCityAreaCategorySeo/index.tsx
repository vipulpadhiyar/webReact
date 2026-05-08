import { seoTypeEnum, seoTypeTitleEnum } from 'utils/constants';

import CommonSeo from '../CommonSeo';

const AddCityAreaCategorySeo = () => {
  return (
    <>
      <CommonSeo type={seoTypeEnum.cityAreaCategory} name={seoTypeTitleEnum.cityAreaCategory} />
    </>
  );
};

export default AddCityAreaCategorySeo;
