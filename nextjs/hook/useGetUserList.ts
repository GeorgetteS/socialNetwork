import { useEffect, useLayoutEffect, useState } from 'react';

import { userDTO } from '../restApi/userApi/userConstructor';
import { useLazyGetUserListQuery } from '../restApi/userApi/userApi';
import { UserListQueryParams } from '../restApi/userApi/getUserListQuery';
import { useDebounce } from '../hook/useDebounce';

export function useGetUserList(perPage: number) {
  const [options, setOptions] = useState<userDTO[]>([]);
  const [loadList, listQuery] = useLazyGetUserListQuery();
  const { data: chunkData, isLoading, isFetching } = listQuery;
  const { userList: chunkOptions = [], meta } = chunkData || { listOptions: [] };

  const isNeedMoreChunk = () => {
    const isOnLastPage = meta?.page === meta?.totalPages;

    if (!meta || isFetching || isOnLastPage) {
      return false;
    }

    return true;
  };

  const handleSearch = useDebounce((value) => {
    setOptions([]);

    loadList(makeQuery({ searchText: value.trim() }));
  }, 300);

  const handleScrollOnEnd = () => {
    if (isNeedMoreChunk()) {
      loadList(makeQuery({ page: meta.page + 1 }));
    }
  };

  useLayoutEffect(() => {
    loadInitialList().then((data) => setOptions([...data]));
  }, []);

  const loadInitialList = async () => {
    const data = await loadList(makeQuery());

    return data.data.userList;
  };

  useEffect(() => {
    setOptions((prev) => [...prev, ...chunkOptions]);
  }, [chunkData]);

  const makeQuery = ({
    page = 1,
    searchText = '',
    limit = perPage,
  }: Partial<UserListQueryParams> = {}): UserListQueryParams => {
    if (!searchText) return { page, limit };

    return {
      page,
      searchText,
      limit,
    };
  };

  return {
    options,
    isLoading,
    isFetching,
    handleSearch,
    handleScrollOnEnd,
  };
}
