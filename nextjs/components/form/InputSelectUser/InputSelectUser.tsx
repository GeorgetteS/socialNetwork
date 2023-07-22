import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Select, Skeleton, Spin } from 'antd';

import { userDTO } from '../../../restApi/userApi/userConstructor';
import { InputSelect, InputSelectProps } from '../InputSelect/InputSelect';
import { useLazyGetUserListQuery } from '../../../restApi/userApi/userApi';
import { UserListQueryParams } from '../../../restApi/userApi/getUserListQuery';
import { UserUi } from '../../../UI/UserUi';
import { useDebounce } from '../../../hook/useDebounce';

type InputSelectUserProps = Omit<InputSelectProps<userDTO['id']>, 'options'>;

const PER_PAGE = 10;

export const InputSelectUser = ({ ...props }: InputSelectUserProps) => {
  const [options, setOptions] = useState<userDTO[]>([]);
  const [loadList, listQuery] = useLazyGetUserListQuery();

  const router = useRouter();

  const { data: chunkData, isLoading, isFetching } = listQuery;

  const { userList: chunkOptions = [], meta } = chunkData || { listOptions: [] };

  const onSelect = (option) => {
    router.push(`/profile/${option}`);
    (document.activeElement as HTMLElement).blur();
  };

  const isNeedMoreChunk = () => {
    const isOnLastPage = meta?.page === meta?.totalPages;

    if (!meta || isFetching || isOnLastPage) {
      return false;
    }

    return true;
  };

  const handleSearch = useDebounce((value) => {
    setOptions([]);

    loadList(makeQuery({ searchText: value }));
  }, 300);

  const handleScrollOnEnd = () => {
    if (isNeedMoreChunk()) {
      loadList(makeQuery({ page: meta.page + 1 }));
    }
  };

  const loadInitialList = async () => {
    const data = await loadList(makeQuery());

    return data.data.userList;
  };

  useLayoutEffect(() => {
    loadInitialList().then((data) => setOptions([...data]));
  }, []);

  useEffect(() => {
    setOptions((prev) => [...prev, ...chunkOptions]);
  }, [chunkData]);

  if (isLoading) {
    return <Skeleton paragraph={{ rows: 0 }} />;
  }

  return (
    <InputSelect {...props} onSearch={handleSearch} value="" onSelect={onSelect}>
      {options.map((option) => {
        return (
          <Select.Option key={option.id}>
            <UserUi avatar={option.avatar} title={option.fullname} />
          </Select.Option>
        );
      })}
      <Select.Option disabled key={'trigger'}>
        <LastOptionVisibleTrigger
          onMount={handleScrollOnEnd}
          isLoading={isFetching}
          text={'Больше нет пользователей'}
        />
      </Select.Option>
    </InputSelect>
  );
};

const makeQuery = ({
  page = 1,
  searchText = '',
  limit = PER_PAGE,
}: Partial<UserListQueryParams> = {}): UserListQueryParams => {
  if (!searchText) return { page, limit };

  return {
    page,
    searchText,
    limit,
  };
};

const LastOptionVisibleTrigger = ({
  onMount,
  isLoading,
  text,
}: {
  onMount: () => void;
  isLoading: boolean;
  text: string;
}) => {
  useEffect(() => {
    onMount();
  }, []);
  return <div> {isLoading ? <Spin /> : text}</div>;
};
