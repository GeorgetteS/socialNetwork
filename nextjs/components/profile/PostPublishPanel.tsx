import React from 'react';
import { FC, useState } from 'react';
import { Button, Card, Upload, message, notification } from 'antd';
import { useSelector } from 'react-redux';

import ImgCrop from 'antd-img-crop';
import TextArea from 'antd/lib/input/TextArea';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

import styles from '../../styles/PostPublishPanel.module.css';

import { userIdSelector } from '../../redux/user/userSelectors';
import { useSetPostMutation } from '../../restApi/postApi/postApi';
import { allowedExtensionsImg } from '../constants';

export const PostPublishPanel: FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [textAreaValue, setTextAreaValue] = useState('');
  const UserId = useSelector(userIdSelector);

  const [setPost] = useSetPostMutation();

  const isPostReadyForPublishing = !(textAreaValue || fileList.length);

  const checkExtension = (file) => {
    const extension = file.type.split('/').pop();
    if (allowedExtensionsImg.includes('.' + extension)) {
      return true;
    }

    message.error('Неверный формат файла! Допустимые форматы: ' + allowedExtensionsImg.join(', '));

    return Upload.LIST_IGNORE;
  };

  const prepareFormData = () => {
    const request = new FormData();

    request.append('UserId', UserId);
    request.append('text', textAreaValue);

    fileList.forEach((file) => request.append('postImages', file.originFileObj));

    return request;
  };

  const submitPost = () => {
    const formData = prepareFormData();

    setPost(formData)
      .unwrap()
      .then(() => {
        notification.success({
          message: '!',
        });
        setFileList([]);
        setTextAreaValue('');
      })
      .catch((error) => {
        if (error.status === 401) {
          notification.error({
            message: error.data.message,
          });
        }
      });
  };

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <Card size="small">
      <TextArea
        rows={4}
        placeholder="Что у вас нового?"
        style={{ resize: 'none' }}
        value={textAreaValue}
        onChange={(e) => setTextAreaValue(e.target.value)}
      />
      <div className={styles.row}>
        <ImgCrop rotationSlider>
          <Upload
            fileList={fileList}
            onChange={onChange}
            listType="picture-card"
            showUploadList={{ showPreviewIcon: false }}
            accept={allowedExtensionsImg.join(', ')}
            maxCount={3}
            beforeUpload={checkExtension}>
            <Button>Загрузить фото</Button>
          </Upload>
        </ImgCrop>
        <Button
          type="primary"
          htmlType="submit"
          onClick={submitPost}
          disabled={isPostReadyForPublishing}>
          Опубликовать
        </Button>
      </div>
    </Card>
  );
};
