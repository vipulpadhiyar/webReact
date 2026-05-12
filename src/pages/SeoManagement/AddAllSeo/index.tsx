import { seoTypeEnum, seoTypeTitleEnum } from 'utils/constants';

import CommonSeo from '../CommonSeo';

const AddAllSeo = () => {
  return (
    <>
      <CommonSeo type={seoTypeEnum.all} name={seoTypeTitleEnum.all} />
    </>
  );
};

export default AddAllSeo;
