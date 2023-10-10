import { Card, Carousel } from 'antd';
import Image from 'next/image';

import styles from '../../styles/Post.module.css';
import { UserUi } from '../../UI/UserUi';
import { postDTO } from '../../restApi/postApi/postConstructor';

type TPost = postDTO;

export const Post = ({ text = '', images = [], userAvatar, userName, date, isUpdated }: TPost) => {
  const PostCarousel = images.length ? (
    <Carousel style={{ width: '500px' }} dotPosition="bottom">
      {images.map((imageUrl, i) => {
        return <Image key={i} src={imageUrl} width={500} height={500} alt="PostIImage"></Image>;
      })}
    </Carousel>
  ) : null;

  return (
    <Card
      className={styles.root}
      title={
        <UserUi
          title={userName}
          size={48}
          text={isUpdated ? `обновлен ${date}` : date}
          avatar={userAvatar}
        />
      }>
      {text && <Card.Grid style={{ width: '100%' }}>{text}</Card.Grid>}
      {PostCarousel && <Card.Grid style={{ width: '100%' }}> {PostCarousel}</Card.Grid>}{' '}
    </Card>
  );
};
