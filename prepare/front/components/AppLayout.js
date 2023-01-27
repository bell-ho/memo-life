import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Col, Input, Menu, Row } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import Router, { useRouter } from 'next/router';
import useInput from '~/hook/useInput';
import { useQuery } from 'react-query';
import { queryKeys } from '~/react_query/constants';
import { loadMyInfoAPI } from '~/api/users';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: Pretendard, NotoSansCJK-KR, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;;
    border: none;
    box-sizing: border-box;
    background-color: transparent;
  }

  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .ant-col:first-child {
    padding-left: 0 !important;
  }

  .ant-col:last-child {
    padding-right: 0 !important;
  }

  .ant-comment-inner {
    padding: 5px 0;
  }

  @font-face {
    font-family: Pretendard;
    src: url('/fonts/Pretendard-Bold.otf');
    font-weight: 600;
  }
`;

const AppLayout = ({ children }) => {
  const router = useRouter();
  const { data: me } = useQuery([queryKeys.users], loadMyInfoAPI);

  const [searchInput, onChangeSearchInput] = useInput('');

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Global />
      <Menu
        mode="horizontal"
        selectedKeys={[router.pathname]}
        items={[
          {
            label: (
              <Link href="/">
                <a>메모라이프</a>
              </Link>
            ),
            key: '/',
          },
          {
            label: (
              <Link href="/profile">
                <a>프로필</a>
              </Link>
            ),
            key: '/profile',
          },
          {
            label: (
              <SearchInput
                enterButton
                value={searchInput}
                onChange={onChangeSearchInput}
                onSearch={onSearch}
              />
            ),
            key: '/search',
          },
        ]}
      />
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          {/*<a*/}
          {/*  href="https://github.com/bell-ho"*/}
          {/*  target="_blank"*/}
          {/*  rel="noreferrer noopener"*/}
          {/*>*/}
          {/*  bell-ho*/}
          {/*</a>*/}
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
