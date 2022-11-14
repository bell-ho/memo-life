import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import PostForm from '~/components/PostForm';
import PostCard from '~/components/PostCard';

import { useInView } from 'react-intersection-observer';
import {
  dehydrate,
  QueryClient,
  useInfiniteQuery,
  useQuery,
} from 'react-query';
import { loadPostsAPI } from '~/api/posts';
import { loadMyInfoAPI } from '~/api/users';
import { queryKeys } from '~/react_query/constants';

export const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null;

  if (pageIndex === 0) return `/posts?lastId=0`;

  return `/posts?lastId=${
    previousPageData?.[previousPageData?.length - 1].id || 0
  }&limit=10`;
};

const Home = () => {
  const [ref, inView] = useInView();
  const { data: me } = useQuery([queryKeys.users], loadMyInfoAPI);

  const {
    data,
    isLoading: loadPostsLoading,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryKeys.posts],
    ({ pageParam = '' }) => loadPostsAPI(pageParam),
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
      {me && <PostForm />}
      {mainPosts.map((post, i) => (
        <PostCard key={post.id} post={post} />
      ))}
      <div
        ref={readToLoad ? ref : undefined}
        style={{ height: 50, backgroundColor: 'yellow' }}
      />
    </AppLayout>
  );
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery('posts', () => loadPostsAPI());
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
export default Home;
