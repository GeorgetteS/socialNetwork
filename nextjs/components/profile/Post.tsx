import { FC } from 'react';
import { Card, Carousel } from 'antd';
import Image from 'next/image';

import styles from '../../styles/Post.module.css';
import { AvatarUi } from '../../UI/AvatarUi';
import { postDTO } from '../../api/postApi/postConstructor';

type TPost = postDTO;

export const Post: FC<TPost> = ({
  text = '',
  images = [],
  userAvatar,
  userName,
  date,
  isUpdated,
}) => {
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
          title={userName}
          size={48}
          text={isUpdated ? `обновлен ${date}` : date}
          avatar={userAvatar}
        />
      }>
      {text && <Card.Grid style={{ width: '100%' }}>{text}</Card.Grid>}
      {PostCarousel && <Card.Grid style={{ width: '100%' }}> {PostCarousel}</Card.Grid>}
      <Card.Grid style={{ width: '100%' }}></Card.Grid>
      <Card.Grid style={{ width: '100%' }}></Card.Grid>
    </Card>
  );
};
