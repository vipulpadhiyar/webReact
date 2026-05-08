import { seoTypeEnum, seoTypeTitleEnum } from 'utils/constants';

import CommonSeo from '../CommonSeo';

const AddCityAreaSeo = () => {
  return (
    <>
      <CommonSeo type={seoTypeEnum.cityArea} name={seoTypeTitleEnum.cityArea} />
    </>
  );
};

export default AddCityAreaSeo;
