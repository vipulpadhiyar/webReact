import { Wrapper } from './style';

import {
  LoadingOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { Button, Col, Form, Row, Upload, message } from 'antd';
import React, { useState } from 'react';

import { subCategoryAPI } from 'services/api/subCategory';
import { videoApi } from 'services/api/video';

import {
  VITE_REACT_APP_IMAGE_URL,
  VITE_REACT_APP_IMAGE_URL_TEMP,
  uploadImageEnum
} from 'utils/constants';

const BannerImageCommon = ({
  setUploadedFiles,
  uploadedFiles,
  fromEdit,
  setNewUploadedFiles,
  setRemoveUploadedFiles,
  initialUploadedFiles
}: any) => {
  const { uploadVideo } = videoApi;
  const { deleteBannerMedia } = subCategoryAPI;

  const [loading, setLoading] = useState<boolean>(false);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const beforeUpload = (file: any) => {
    const isSupportedType =
      ['image/jpeg', 'image/png'].includes(file.type) || file.type.startsWith('video/');

    if (!isSupportedType) {
      message.error('You can only upload JPG/PNG and video files!');
      return Upload.LIST_IGNORE;
    }

    if (file.type.startsWith('image/')) {
      const isImageSizeValid = file.size / 1024 / 1024 < 2;
      if (!isImageSizeValid) {
        message.error('Image must be smaller than 2MB!');
        return Upload.LIST_IGNORE;
      }
    }
    return true;
  };

  const customUpload = (options: any, index: number) => {
    const { file, onSuccess, onError } = options;
    setLoading(true);
    const formData = new FormData();
    formData.append('files', file);
    formData.append('moduleName', uploadImageEnum.subCategory);

    uploadVideo(formData)
      .then((res) => {
        setLoading(false);
        const updatedFile = file.type.startsWith('image/')
          ? { media: res?.[0]?.name, isNew: true }
          : { media: res?.[0]?.name, thumbnail: res?.[1]?.thumbnail, isNew: true };
        setUploadedFiles((prevFiles: any) => {
          const newFiles = [...prevFiles];
          if (fromEdit) {
            const oldFile = newFiles[index];

            // Check if the old file is in the initialFiles array
            const isInitialFile = initialUploadedFiles.some(
              (initialFile: any) => initialFile.media === oldFile?.media
            );

            // Push to removedFiles if the old file is an initial file
            if (isInitialFile) {
              setRemoveUploadedFiles((prevRemoved: any) => [...prevRemoved, oldFile]);
            }
          }
          newFiles[index] = updatedFile; // Update the specific index with the new file
          return newFiles;
        });

        fromEdit &&
          setNewUploadedFiles((prevFiles: any) => {
            const newFiles = [...prevFiles];
            const fileExistIndex = newFiles.findIndex(
              (file: any) => file.media === uploadedFiles[index]?.media
            );
            if (fileExistIndex !== -1) {
              newFiles[fileExistIndex] = updatedFile; // Replace the existing file
            } else {
              newFiles.push(updatedFile); // Add the new file if it doesn't exist
            }

            return newFiles;
          });

        message.success('Upload successful');
        onSuccess(res);
      })
      .catch((err) => {
        setLoading(false);
        message.error(err?.message);
        onError(err);
      });
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
    const isVideo = file.type.startsWith('video/');
    const previewWindow: any = window.open(src);
    if (isVideo) {
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      previewWindow.document.write(video.outerHTML);
    } else {
      const img = document.createElement('img');
      img.src = src;
      previewWindow.document.write(img.outerHTML);
    }
  };

  return (
    <Wrapper className="faq">
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24}>
          <h3 className="faq-title">Banner Image and Video</h3>
        </Col>
        <Col xs={24}>
          <Row gutter={[16, 16]}>
            <Form.List name="bannerMedia">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <React.Fragment key={key}>
                      <Col lg={12}>
                        <Form.Item
                          {...restField}
                          name={[name, 'image']}
                          valuePropName="fileList"
                          getValueFromEvent={(e) => e && e.fileList}
                          rules={[{ required: true, message: 'Please upload an image or video' }]}
                          initialValue={
                            initialUploadedFiles?.[index] ? [initialUploadedFiles[index]] : []
                          }
                        >
                          <Upload
                            beforeUpload={beforeUpload}
                            customRequest={(options) => customUpload(options, index)} // Pass the index to the customUpload function
                            showUploadList={false}
                            onPreview={handlePreview}
                            listType="picture-card"
                            maxCount={1}
                          >
                            {uploadedFiles?.[index] && uploadedFiles?.[index]?.thumbnail ? (
                              <img
                                src={
                                  fromEdit && !uploadedFiles?.[index]?.isNew
                                    ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.subCategory}/${uploadedFiles?.[index]?.thumbnail}`
                                    : `${VITE_REACT_APP_IMAGE_URL_TEMP}${uploadImageEnum.subCategory}/${uploadedFiles?.[index]?.thumbnail}`
                                }
                                alt="avatar"
                                style={{
                                  width: '100%',
                                  maxWidth: '100%',
                                  height: '100%',
                                  objectFit: 'contain'
                                }}
                              />
                            ) : uploadedFiles?.[index] && uploadedFiles?.[index]?.media ? (
                              <img
                                src={
                                  fromEdit && !uploadedFiles?.[index]?.isNew
                                    ? `${VITE_REACT_APP_IMAGE_URL}${uploadImageEnum.subCategory}/${uploadedFiles?.[index]?.media}`
                                    : `${VITE_REACT_APP_IMAGE_URL_TEMP}${uploadImageEnum.subCategory}/${uploadedFiles?.[index]?.media}`
                                }
                                style={{
                                  width: '100%',
                                  maxWidth: '100%',
                                  height: '100%',
                                  objectFit: 'contain'
                                }}
                                alt="avatar"
                              />
                            ) : (
                              uploadButton
                            )}
                          </Upload>
                        </Form.Item>
                      </Col>

                      <Col>
                        <div className="faqBtn">
                          <Button
                            type="link"
                            className="minusBtn"
                            onClick={() => {
                              if (fromEdit && uploadedFiles?.[index]) {
                                const deleteObj = uploadedFiles?.[index];
                                if (deleteObj?.uid) {
                                  delete deleteObj?.uid;
                                }
                                deleteBannerMedia(deleteObj)
                                  .then(() => {
                                    remove(name);
                                    setUploadedFiles((prevFiles: any) => {
                                      const newFiles = [...prevFiles];
                                      newFiles.splice(index, 1);
                                      return newFiles;
                                    });
                                    setNewUploadedFiles((prevFiles: any) => {
                                      const newFiles = prevFiles.filter(
                                        (file: any) => file !== uploadedFiles?.[index]
                                      );
                                      return newFiles;
                                    });
                                  })
                                  .catch(() => {});
                              } else {
                                remove(name);
                                setUploadedFiles((prevFiles: any) => {
                                  const newFiles = [...prevFiles];
                                  newFiles.splice(index, 1);
                                  return newFiles;
                                });
                              }
                            }}
                          >
                            <MinusCircleOutlined />
                          </Button>
                        </div>
                      </Col>
                    </React.Fragment>
                  ))}
                  <Col md={24}>
                    <div className="faqBtn">
                      <Button
                        type="primary"
                        className="plusBtn"
                        onClick={() => {
                          add();
                        }}
                      >
                        Add
                        <PlusCircleOutlined />
                      </Button>
                    </div>
                  </Col>
                </>
              )}
            </Form.List>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default BannerImageCommon;
