import { useState } from 'react';
import { Button, Card, Space, Upload, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import ImgCrop from 'antd-img-crop';

import { userDTO } from '../../restApi/userApi/userConstructor';
import { UserUi } from '../../UI/UserUi';
import { usePatchUserMutation } from '../../restApi/userApi/userApi';
import { allowedExtensionsImg } from '../constants';

export const ProfileEditor = ({ avatar, about, id }: userDTO) => {
  const [textAreaValue, setTextAreaValue] = useState(about);
  const [isInputValuechanged, setInputValueChanged] = useState(false);
  const [patchUser] = usePatchUserMutation();

  const onChangeInputValue = (e) => {
    setInputValueChanged(true);
    setTextAreaValue(e.target.value);
  };

  const checkExtension = (file) => {
    const extension = file.type.split('/').pop();
    if (allowedExtensionsImg.includes('.' + extension)) {
      return true;
    }

    message.error('Неверный формат файла! Допустимые форматы: ' + allowedExtensionsImg.join(', '));

    return Upload.LIST_IGNORE;
  };

  const patchUserInfo = () => {
    const formData = new FormData();

    formData.append('id', id);
    formData.append('about', textAreaValue);
    patchUser(formData);
    setInputValueChanged(false);
  };
  const patchFile = (file) => {
    const formData = new FormData();

    formData.append('id', id);
    formData.append('avatar', file.file);

    patchUser(formData);
  };

  return (
    <Card
      headStyle={{ padding: '10px' }}
      title={
        <ImgCrop rotationSlider>
          <Upload
            style={{ cursor: 'pointer' }}
            listType="text"
            method="PATCH"
            showUploadList={false}
            beforeUpload={checkExtension}
            accept={allowedExtensionsImg.join(', ')}
            customRequest={patchFile}>
            <UserUi
              size={64}
              avatar={avatar || 'downloadFoto.png'}
              cursorPointer={true}
              title={'Измените аватар'}
            />
          </Upload>
        </ImgCrop>
      }>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <TextArea
          rows={4}
          placeholder="Расскажите о себе"
          style={{ resize: 'none' }}
          value={textAreaValue}
          onChange={(e) => onChangeInputValue(e)}
        />
        <Button disabled={!isInputValuechanged && true} onClick={patchUserInfo}>
          Изменить
        </Button>
      </Space>
    </Card>
  );
};
