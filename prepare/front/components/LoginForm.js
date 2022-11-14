import React, { useCallback, useState } from 'react';
import { Button, Form, Input, Row } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from '~/hook/useInput';
import { useMutation, useQueryClient } from 'react-query';
import { logInAPI } from '~/api/users';
import { queryKeys } from '~/react_query/constants';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const mutation = useMutation([queryKeys.users], logInAPI, {
    onMutate: () => {
      setLoading(true);
    },
    onError: (error) => {
      alert(error.response?.data);
    },
    onSuccess: (user) => {
      queryClient.setQueryData([queryKeys.users], user);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onSubmitForm = useCallback(() => {
    mutation.mutate({ email, password });
  }, [email, password]); // state는 넣어줘야함 변하는 것이여서 (빈 배열로 넣으면 마운트 시점에 id와 password가 없어서 같은걸로 쳐서 리랜더링이 안됨)

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <Input
          type="email"
          name="user-email"
          value={email}
          onChange={onChangeEmail}
          required
        />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={loading}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
