import { seoTypeEnum, seoTypeTitleEnum } from 'utils/constants';

import CommonSeo from '../CommonSeo';

const AddCategoryServiceSeo = () => {
  return (
    <>
      <CommonSeo type={seoTypeEnum.categoryService} name={seoTypeTitleEnum.categoryService} />
    </>
  );
};
export default AddCategoryServiceSeo;
