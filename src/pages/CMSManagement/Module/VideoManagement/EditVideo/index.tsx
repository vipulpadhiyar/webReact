import { commonStyles } from 'components/common/UploadImage/styles';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { RenderTextInput } from 'components/common/FormField';
import ContentHeader from 'components/layout/contentHeader';

import { videoApi } from 'services/api/video';
import { videoKeys } from 'services/hooks/queryKeys';
import { useVideoView } from 'services/hooks/video';

import {
  VITE_REACT_APP_IMAGE_URL,
  VITE_REACT_APP_IMAGE_URL_TEMP,
  uploadImageEnum
} from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';

const pathNames: any = [
  {
    title: 'Video Management',
    href: ROUTES.videoManagement
  },
  {
    title: 'Edit'
  }
];

const EditVideo = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { _id } = useParams();
  const { data } = useVideoView(_id);
  const [form] = Form.useForm();
  const { uploadVideo, updateVideoDetails } = videoApi;
  const [fileList, setFileList] = useState<any>([]);
  const [fileData, setFileData] = useState<any>([]);
  const [imageUrl, setImageUrl] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    form.setFieldsValue({
      videoName: data?.name
    });
    if (data) {
      setFileData([{ name: data?.video }, { thumbnail: data?.thumbnail }]);
      setImageUrl(`${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.video}/${data?.thumbnail}`);
    }
  }, [data, form]);

  const beforeUpload = (file: any) => {
    const isVideo = file.type.startsWith('video/');
    if (!isVideo) {
      message.error('You can only upload video files!');
    }
    return isVideo || Upload.LIST_IGNORE;
  };

  const handleChange = (info: any) => {
    let newFileList = [...info.fileList];

    // Limit to one file
    if (newFileList.length > 1) {
      newFileList = [newFileList[0]];
    }

    setFileList(newFileList);
  };

  const handlePreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const video = document.createElement('video');
    video.src = src;
    video.controls = true;
    const videoWindow: any = window.open(src);
    videoWindow.document.write(video.outerHTML);
  };

  const customUpload = ({ file, onSuccess, onError }: any) => {
    setLoading(true);
    const formData: any = new FormData();
    const fileArray = [file];
    fileArray?.map((value) => {
      formData.append('files', value);
    });
    formData.append('moduleName', uploadImageEnum.video);
    uploadVideo(formData)
      .then((res) => {
        setFileData(res);
        setLoading(false);
        setImageUrl(
          `${VITE_REACT_APP_IMAGE_URL_TEMP}${uploadImageEnum.video}/${res?.[1]?.thumbnail}`
        );
        onSuccess(res);
      })
      .catch((err) => {
        setLoading(false);
        message.error(err?.message);
        onError(err);
      });
  };

  const onSubmit = (values: { videoName: string }) => {
    if (fileData?.length === 0 || !imageUrl) {
      message.error('Please upload video');
      return;
    }
    const payload = {
      _id: data?._id ?? '',
      name: values?.videoName?.trim(),
      video: fileData?.[0]?.name,
      thumbnail: fileData?.[1]?.thumbnail
    };
    updateVideoDetails(payload)
      .then((res) => {
        message.success(res?.message);
        queryClient.invalidateQueries(videoKeys.all);
        navigate(ROUTES.videoManagement);
      })
      .catch((err) => {
        message.error(err?.message);
      });
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <div className="shadow-paper">
      <ContentHeader pathNames={pathNames} />
      <Form form={form} onFinish={onSubmit}>
        <div className="d-flex justify-content-end mb-30 m-130">
          <Button type="primary" htmlType="submit" size="large">
            Save
          </Button>
        </div>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} lg={24}>
            <label>
              <span style={commonStyles.colorCode}>*</span> Video
            </label>
            <Upload
              beforeUpload={beforeUpload}
              onChange={handleChange}
              customRequest={customUpload}
              showUploadList={false}
              onPreview={handlePreview}
              fileList={fileList}
              listType="picture-card"
              maxCount={1}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{ width: '100%', maxWidth: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Col>
          <Col xs={24} lg={12}>
            <RenderTextInput
              label="Video Name"
              placeholder="Please enter video name"
              name={'videoName'}
              rules={[
                {
                  required: true,
                  message: ''
                },
                {
                  validator: (_: any, value: any) => {
                    if (!value || !value.trim()) {
                      return Promise.reject(new Error('Please enter video name'));
                    }
                    const trimmedValue = value.trim();
                    if (trimmedValue.length < 2 || trimmedValue.length > 50) {
                      return Promise.reject(
                        new Error('Video name must be between 2 and 50 characters')
                      );
                    }
                    return Promise.resolve();
                  }
                }
              ]}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default React.memo(EditVideo);
