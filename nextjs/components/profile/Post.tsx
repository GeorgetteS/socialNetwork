import { FC } from 'react';
import { Avatar, Card, Carousel } from 'antd';
import Image from 'next/image';

import styles from '../../styles/Post.module.css';
import { AvatarUi } from '../../UI/AvatarUi';

export const Post = ({ text = '', images = [], avatar }) => {
  const PostCarousel = images.length ? (
    <Carousel dotPosition="bottom">
      {images.map((imageUrl, i) => {
        return <Image key={i} src={imageUrl} width={500} height={500} alt="PostIImage"></Image>;
      })}
    </Carousel>
  ) : null;

  return (
    <Card className={styles.root} title={<AvatarUi name={'sdgvjh'} text={'rget'} />}>
      {text && <Card.Grid style={{ width: '100%' }}>{text}</Card.Grid>}
      {PostCarousel && <Card.Grid style={{ width: '100%' }}> {PostCarousel}</Card.Grid>}
      <Card.Grid style={{ width: '100%' }}></Card.Grid>
      <Card.Grid style={{ width: '100%' }}></Card.Grid>
    </Card>
  );
};
