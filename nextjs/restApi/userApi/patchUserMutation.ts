export class PatchUserMutation {
  query = (formData) => ({
    url: `users`,
    method: 'PATCH',
    body: formData,
    formData: true,
  });
  invalidatesTags = [{ type: 'User' }];
  refetchOnSuccess = true;
}
