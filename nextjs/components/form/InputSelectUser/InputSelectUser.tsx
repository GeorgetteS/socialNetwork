import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Select, Skeleton, Spin } from 'antd';

import { userDTO } from '../../../restApi/userApi/userConstructor';
import { InputSelect, InputSelectProps } from '../InputSelect/InputSelect';

import { UserUi } from '../../../UI/UserUi';
import { useGetUserList } from '../../../hook/useGetUserList';

type InputSelectUserProps = Omit<InputSelectProps<userDTO['id']>, 'options'>;

const PER_PAGE = 10;

export const InputSelectUser = ({ ...props }: InputSelectUserProps) => {
  const { options, isFetching, isLoading, handleScrollOnEnd, handleSearch } =
    useGetUserList(PER_PAGE);

  const router = useRouter();

  const onSelect = (option) => {
    router.push(`/profile/${option}`);
    (document.activeElement as HTMLElement).blur();
  };

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
