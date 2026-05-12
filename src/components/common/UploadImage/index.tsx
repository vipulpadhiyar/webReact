import { commonStyles } from './styles';

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

const UploadImage = (props: any) => {
  const {
    setImageUrl,
    imageUrl,
    setImageUrlPath,
    moduleName,
    imageValidation,
    setImageValidation
  } = props;
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImageUrl] = useState<string>();

  const customRequest = async (options: any) => {
    const { file, onSuccess, onError } = options;

    const imageTypes = ['image/jpeg', 'image/png'];
    const isImage = imageTypes.includes(file.type);
    if (!isImage) {
      message.error('You can only upload image files');
      onError('You can only upload image files');
      return;
    }

    const isLt2M = file.size / 1024 / 1024 < 2; // Adjust size limit as needed
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
      const uploadedImageUrl: string = res[0].name;
      setImageUrlPath(uploadedImageUrl);
      setImageValidation && setImageValidation('');
      onSuccess(uploadedImageUrl, file);
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
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={customRequest}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={currentImage ?? imageUrl}
            alt="avatar"
            style={{ width: '100%', maxWidth: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
      {imageValidation && <p style={commonStyles.errorMessage}>{imageValidation}</p>}
    </>
  );
};

export default UploadImage;
