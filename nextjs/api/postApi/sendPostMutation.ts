export class SendPostMutation {
  query = (formData) => ({
    url: `posts`,
    method: 'POST',
    body: formData,
    formData: true,
  });
  invalidatesTags = [{ type: 'Posts', id: 'LIST' }];
}
