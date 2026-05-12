import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useState } from 'react';

import { categoryAPI } from 'services/api/category';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

// const beforeUpload = (file: RcFile) => {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('You can upload only JPG & PNG File.');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB');
//   }
//   return isJpgOrPng && isLt2M;
// };

const UploadImageSeoFileList = (props: any) => {
  const { setImageUrl, imageUrl, setImageUrlPath, moduleName, keyIndex, fileListName } = props;
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImageUrl] = useState<string>();

  const customRequest = async (options: any) => {
    const { file, onSuccess, onError } = options;

    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can upload only JPG & PNG File.');
      onError('Invalid file type');
      return;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB');
      onError('Image must be smaller than 2MB');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('files', file);
    formData.append('moduleName', moduleName);

    try {
      const res = await categoryAPI.uploadImg(formData);
      const imageUrl: string = res[0].name;
      setImageUrlPath(imageUrl);
      props.form.setFieldValue([fileListName, keyIndex, 'image'], imageUrl);
      props.form.setFields([{ name: [fileListName, keyIndex, 'image'], errors: [] }]);
      onSuccess(imageUrl, file);
    } catch (error) {
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setImageUrl(url);
        setCurrentImageUrl(url);
      });
    } else if (info.file.status === 'error') {
      return;
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
      // beforeUpload={beforeUpload}
      customRequest={customRequest}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img src={currentImage ?? imageUrl} alt="avatar" style={{ width: '100%' }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadImageSeoFileList;
