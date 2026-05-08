import { seoTypeEnum, seoTypeTitleEnum } from 'utils/constants';

import CommonSeo from '../CommonSeo';

const AddCitySeo = () => {
  return (
    <>
      <CommonSeo type={seoTypeEnum.city} name={seoTypeTitleEnum.city} />
    </>
  );
};

export default AddCitySeo;
