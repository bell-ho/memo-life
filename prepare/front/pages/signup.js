import React, { useCallback, useEffect, useState } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { Button, Checkbox, Form, Input } from 'antd';
import useInput from '~/hook/useInput';
import styled from 'styled-components';
import Router from 'next/router';
import axios from 'axios';
import { loadMyInfoAPI, signUpAPI } from '~/api/users';
import { useQuery } from 'react-query';
import { queryKeys } from '~/react_query/constants';

const ErrorMessage = styled.div`
  color: red;
`;

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const { data: me } = useQuery([queryKeys.users], loadMyInfoAPI);

  useEffect(() => {
    if (me) {
      console.log('redirects to /');
      Router.replace('/');
    }
  }, [me]);

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [passwordError, setPasswordError] = useState(false);

  const [passwordCheck, setPasswordCheck] = useState('');
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }

    setLoading(true);

    signUpAPI({ email, password, nickname })
      .then(() => {
        Router.replace('/');
      })
      .catch((error) => {
        alert(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email, nickname, password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input
            name="user-email"
            value={email}
            required
            type="email"
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input
            name="user-nickname"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            name="user-password"
            value={password}
            type="password"
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호 재입력</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            혐오감이나 공포감을 주는 사진은 처벌받을 수 있습니다.
          </Checkbox>
          {termError && <ErrorMessage>동의를 확인하십시오.</ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export const getServerSideProps = async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  const data = await loadMyInfoAPI();
  if (!data) {
    return {
      props: {
        redirect: {
          destination: '/',
          permanent: false,
        },
      },
    };
  }
  return {
    props: {},
  };
};

export default SignUp;
