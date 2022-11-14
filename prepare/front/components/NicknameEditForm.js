import React, { useCallback, useMemo } from 'react';
import { Form, Input } from 'antd';
import useInput from '~/hook/useInput';
import { useQuery } from 'react-query';
import { queryKeys } from '~/react_query/constants';
import { changeNicknameAPI, loadMyInfoAPI } from '~/api/users';

const NicknameEditForm = () => {
  const style = useMemo(() => ({
    marginBottom: '20px',
    border: '1px solid #d9d9d9',
    padding: '20px',
  }));
  const { data: me } = useQuery([queryKeys.users], loadMyInfoAPI);

  const [nickname, onChangeNickname] = useInput(me?.nickname || '');

  const onSubmit = useCallback(() => {
    changeNicknameAPI(nickname);
  }, [nickname]);

  return (
    <Form style={style} onFinish={onSubmit}>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="닉네임"
        enterButton="수정"
        onSearch={onSubmit}
      />
    </Form>
  );
};

export default NicknameEditForm;
