import React, { useEffect } from 'react';
import AppLayout from '~/components/AppLayout';
import PostCard from '~/components/PostCard';
import { useRouter } from 'next/router';
import { Avatar, Card } from 'antd';
import Head from 'next/head';
import {
  dehydrate,
  QueryClient,
  useInfiniteQuery,
  useQuery,
} from 'react-query';
import { queryKeys } from '~/react_query/constants';
import { loadMyInfoAPI, loadUserAPI } from '~/api/users';
import { useInView } from 'react-intersection-observer';
import { loadUserPostsAPI } from '~/api/posts';

const User = () => {
  const router = useRouter();
  const { id } = router.query;
  const [ref, inView] = useInView();

  const { data: userInfo } = useQuery([queryKeys.users, id], () =>
    loadUserAPI(Number(id)),
  );

  const { data: me } = useQuery([queryKeys.users], loadMyInfoAPI);

  const {
    data,
    isLoading: loadPostsLoading,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryKeys.users, id, queryKeys.posts],
    ({ pageParam = '' }) => loadUserPostsAPI(Number(id), pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.[lastPage.length - 1]?.id;
      },
    },
  );

  const mainPosts = data?.pages.flat();
  const isEmpty = data?.pages[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data.pages[data.pages.length - 1]?.length < 10);
  const hasMorePosts = !isEmpty && !isReachingEnd;
  const readToLoad = hasMorePosts && !loadPostsLoading;

  useEffect(() => {
    if (inView && readToLoad) {
      fetchNextPage();
    }
  }, [inView, readToLoad, fetchNextPage]);

  return (
    <AppLayout>
      {userInfo && (
        <Head>
          <title>
            {userInfo.nickname}
            님의 글
          </title>
          <meta
            name="description"
            content={`${userInfo.nickname}님의 게시글`}
          />
          <meta
            property="og:title"
            content={`${userInfo.nickname}님의 게시글`}
          />
          <meta
            property="og:description"
            content={`${userInfo.nickname}님의 게시글`}
          />
          <meta
            property="og:image"
            content="https://supercola.co.kr/favicon.ico"
          />
          <meta
            property="og:url"
            content={`https://supercola.co.kr/user/${id}`}
          />
        </Head>
      )}
      {userInfo && userInfo.id !== me?.id ? (
        <Card
          style={{ marginBottom: 20 }}
          actions={[
            <div key="twit">
              글
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname?.[0]}</Avatar>}
            title={userInfo.nickname}
          />
        </Card>
      ) : null}
      {mainPosts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {/*<div*/}
      {/*  ref={readToLoad ? ref : undefined}*/}
      {/*  style={{ height: 50, backgroundColor: 'yellow' }}*/}
      {/*/>*/}
    </AppLayout>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const queryClient = new QueryClient();
  const id = context.params?.id;
  if (!id) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
  await queryClient.prefetchInfiniteQuery([queryKeys.users, id], () =>
    loadUserPostsAPI(Number(id)),
  );
  await queryClient.prefetchQuery([queryKeys.users, id], () =>
    loadUserPostsAPI(Number(id)),
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
export default User;
