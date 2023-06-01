import { FC } from 'react';
import { Card, Carousel } from 'antd';
import Image from 'next/image';

import styles from '../../styles/Post.module.css';
import { AvatarUi } from '../../UI/AvatarUi';
import { userDTO } from '../../api/userApi/userConstructor';
import { postDTO } from '../../api/postApi/postConstructor';

type TPost = postDTO & Omit<userDTO, 'id' | 'about'>;

export const Post: FC<TPost> = ({ text = '', images = [], avatar, fullname, date, isUpdated }) => {
  const PostCarousel = images.length ? (
    <Carousel dotPosition="bottom">
      {images.map((imageUrl, i) => {
        return <Image key={i} src={imageUrl} width={500} height={500} alt="PostIImage"></Image>;
      })}
    </Carousel>
  ) : null;

  return (
    <Card
      className={styles.root}
      title={
        <AvatarUi
          fullname={fullname}
          text={isUpdated ? `обновлен ${date}` : date}
          avatar={avatar}
        />
      }>
      {text && <Card.Grid style={{ width: '100%' }}>{text}</Card.Grid>}
      {PostCarousel && <Card.Grid style={{ width: '100%' }}> {PostCarousel}</Card.Grid>}
      <Card.Grid style={{ width: '100%' }}></Card.Grid>
      <Card.Grid style={{ width: '100%' }}></Card.Grid>
    </Card>
  );
};
