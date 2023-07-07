import { PostConstructor } from './postConstructor';

export class GetPostsByUserIdQuery {
  query = (UserId) => `posts/${UserId}`;

  transformResponse = (response) => {
    try {
      const postList = response.map((postData) => new PostConstructor(postData).getField());

      return postList;
    } catch (e) {
      console.log(e);
    }
  };

  providesTags = (result) =>
    result
      ? [...result.map(({ id }) => ({ type: 'Posts' as const, id })), { type: 'Posts', id: 'LIST' }]
      : [{ type: 'Posts', id: 'LIST' }];
}
