import React, { useEffect } from 'react';
import AppLayout from '~/components/AppLayout';
import PostCard from '~/components/PostCard';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import { dehydrate, QueryClient, useInfiniteQuery } from 'react-query';
import { queryKeys } from '~/react_query/constants';
import { loadHashtagPostsAPI } from '~/api/posts';

const Hashtag = () => {
  const [ref, inView] = useInView();
  const router = useRouter();
  const { tag } = router.query;

  const {
    data,
    isLoading: loadPostsLoading,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryKeys.hashtag, tag],
    ({ pageParam = '' }) => loadHashtagPostsAPI(tag, pageParam),
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
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
      <div
        ref={readToLoad ? ref : undefined}
        style={{ height: 50, backgroundColor: 'white' }}
      />
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
  const tag = context.params?.tag;
  if (!tag) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  await queryClient.prefetchInfiniteQuery([queryKeys.hashtag, tag], () =>
    loadHashtagPostsAPI(tag),
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Hashtag;
