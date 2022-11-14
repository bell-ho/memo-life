import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import AppLayout from '~/components/AppLayout';
import PostCard from '~/components/PostCard';
import Head from 'next/head';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { queryKeys } from '~/react_query/constants';
import { loadPostAPI } from '~/api/posts';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: singlePost } = useQuery([queryKeys.posts, id], () =>
    loadPostAPI(Number(id)),
  );

  if (!singlePost) {
    return <div>존재하지 않는 게시물입니다.</div>;
  }

  return (
    <AppLayout>
      <Head>
        <title>
          {singlePost.User.nickname}
          님의 글
        </title>
        <meta name="description" content={singlePost.content} />
        <meta
          //og가 붙으면 공유했을때 미리보기가 뜸
          property="og:title"
          content={`${singlePost.User.nickname}님의 게시글`}
        />
        <meta property="og:description" content={singlePost.content} />
        <meta
          property="og:image"
          content={
            singlePost.Images[0]
              ? singlePost.Images[0].src
              : 'https://supercola.co.kr/favicon.ico'
          }
        />
        <meta
          property="og:url"
          content={`https://supercola.co.kr/post/${id}`}
        />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

//미리 만들어놔야 할 것들 불러오기
// export async function getStaticPaths() {
//   // 제한을 둬야함 (할만한 것들만)
//   return {
//     paths: [
//       { params: { id: '93' } },
//       { params: { id: '94' } },
//       { params: { id: '95' } },
//     ],
//     fallback: true,
//   };
// }

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
  await queryClient.prefetchQuery([queryKeys.posts, id], () =>
    loadPostAPI(Number(id)),
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
export default Post;
