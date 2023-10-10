import { Space, Spin } from 'antd';

import { AppLayout } from '../components/layout/AppLayout';
import { useGetPostsByUserIdQuery } from '../restApi/postApi/postApi';
import { postDTO } from '../restApi/postApi/postConstructor';
import { Post } from '../components/profile/Post';

const Main = () => {
  const { data: postData } = useGetPostsByUserIdQuery(5);

  const posts = postData ? (
    postData.map((post: postDTO) => {
      return <Post key={post.id} {...post} id={post.id} />;
    })
  ) : (
    <Spin />
  );

  return (
    <AppLayout>
      <Space direction="vertical" size="small" style={{ display: 'flex', maxWidth: 600 }}>
        {posts}
      </Space>
    </AppLayout>
  );
};

export default Main;
