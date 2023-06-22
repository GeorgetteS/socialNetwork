import { Spin } from 'antd';

import { useGetPostsByUserIdQuery } from '../../api/postApi/postApi';
import { postDTO } from '../../api/postApi/postConstructor';
import { Post } from './Post';
import { IUserProfileInfo } from './UserProfile';

export const Posts = ({ currentUser, skip }: IUserProfileInfo) => {
  const { data: postData } = useGetPostsByUserIdQuery(currentUser, skip);

  const posts = postData ? (
    postData.map((post: postDTO) => {
      return <Post key={post.id} {...post} id={post.id} />;
    })
  ) : (
    <Spin />
  );

  return posts;
};
