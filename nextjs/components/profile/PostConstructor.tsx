import { FC, useState } from 'react';
import { Button, Card, Form, Upload } from 'antd';
import React from 'react';

import ImgCrop from 'antd-img-crop';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import TextArea from 'antd/lib/input/TextArea';

import styles from '../../styles/PostConstructor.module.css';

export const PostConstructor: FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onSubmit = (postData) => {
    console.log(postData);
    console.log(fileList);
  };

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <Card size="small">
      <Form name="post" onFinish={onSubmit}>
        <Form.Item name="TextArea">
          <TextArea rows={4} placeholder="Что у вас нового?" style={{ resize: 'none' }} />
        </Form.Item>
        <div className={styles.row}>
          <Form.Item name="upload" valuePropName="fileList">
            <ImgCrop rotationSlider>
              <Upload
                fileList={fileList}
                onChange={onChange}
                listType="picture-card"
                showUploadList={{ showPreviewIcon: false }}
                accept=".jpg, .png ">
                <Button>Загрузить фото</Button>
              </Upload>
            </ImgCrop>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Опубликовать
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
};
