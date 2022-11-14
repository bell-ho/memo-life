import React, { useCallback, useState } from 'react';
import { Avatar, Button, Card, Comment, List, Popover, Space } from 'antd';
import {
  EllipsisOutlined,
  LikeOutlined,
  LikeTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import PostImages from '~/components/PostImages';
import CommentForm from '~/components/CommentForm';
import PostCardContent from '~/components/PostCardContent';
import FollowButton from '~/components/FollowButton';
import Link from 'next/link';
import moment from 'moment';
import PostImagesSlick from '~/components/PostImagesSlick';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { queryKeys } from '~/react_query/constants';
import { loadMyInfoAPI } from '~/api/users';
import {
  likePostAPI,
  removePostAPI,
  retweetAPI,
  unlikePostAPI,
  updatePostAPI,
} from '~/api/posts';

moment.locale('ko');

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const PostCard = ({ post }) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const { data: me } = useQuery([queryKeys.users], loadMyInfoAPI);

  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const likeMutation = useMutation([queryKeys.posts, post.id], likePostAPI, {
    onMutate() {
      if (!me) return;
      queryClient.setQueryData([queryKeys.posts], (data) => {
        const found = data?.pages.flat().find((v) => v.id === post.id);
        if (found) {
          found.Likers.push({ id: me.id });
        }
        return {
          pageParams: data?.pageParams || [],
          pages: data?.pages || [],
        };
      });
    },
    onSettled() {
      queryClient.refetchQueries([queryKeys.posts]);
    },
  });

  const unlikeMutation = useMutation(
    [queryKeys.posts, post.id],
    unlikePostAPI,
    {
      onMutate() {
        if (!me) return;
        queryClient.setQueryData([queryKeys.posts], (data) => {
          const found = data?.pages.flat().find((v) => v.id === post.id);
          if (found) {
            const index = found.Likers.findIndex((v) => v.id === me?.id);
            found.Likers.splice(index, 1);
          }
          return {
            pageParams: data?.pageParams || [],
            pages: data?.pages || [],
          };
        });
      },
      onSettled() {
        queryClient.refetchQueries([queryKeys.posts]);
      },
    },
  );

  const onClickUpdate = useCallback(() => {
    setEditMode(true);
  }, []);

  const onCancelUpdate = useCallback(() => {
    setEditMode(false);
  }, []);

  const onChangePost = useCallback(
    (editText) => {
      return updatePostAPI({
        PostId: post.id,
        content: editText,
      });
    },
    [post],
  );

  const onLike = useCallback(() => {
    if (!me?.id) {
      return alert('로그인이 필요합니다.');
    }
    likeMutation.mutate(post?.id);
  }, [me, post?.id, likeMutation]);

  const onUnLike = useCallback(() => {
    if (!me?.id) {
      return alert('로그인이 필요합니다.');
    }
    unlikeMutation.mutate(post?.id);
  }, [me, post?.id, unlikeMutation]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!me?.id) {
      return alert('로그인이 필요합니다.');
    }
    setLoading(true);
    removePostAPI(post.id)
      .then(() => {
        queryClient.invalidateQueries([queryKeys.posts]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [me?.id, post.id]);

  const onRetweet = useCallback(() => {
    if (!me?.id) {
      return alert('로그인이 필요합니다.');
    }
    retweetAPI(post.id)
      .then(() => {
        queryClient.invalidateQueries([queryKeys.posts]);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }, [me?.id, post.id]);

  const liked = post.Likers.find((v) => me?.id && v.id === me.id);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={
          !post?.hide &&
          post?.Images[0] && <PostImagesSlick images={post.Images} />
        }
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked ? (
            <div onClick={onUnLike}>
              <LikeTwoTone key="heart" style={{ marginRight: 3 }} />
              {`${post.Likers.length}`}
            </div>
          ) : (
            <div onClick={onLike}>
              <LikeOutlined key="heart" style={{ marginRight: 3 }} />
              {`${post.Likers.length}`}
            </div>
          ),
          <div onClick={onToggleComment}>
            <MessageOutlined key="comment" style={{ marginRight: 3 }} />
            {`${post.Comments.length}`}
          </div>,
          <Popover
            key="more"
            content={
              !post?.hide && (
                <Button.Group>
                  {me?.id && post.User.id === me?.id ? (
                    <>
                      {!post.RetweetId && (
                        <Button onClick={onClickUpdate}>수정</Button>
                      )}
                      <Button
                        type="danger"
                        loading={loading}
                        onClick={onRemovePost}
                      >
                        삭제
                      </Button>
                    </>
                  ) : (
                    <Button>신고</Button>
                  )}
                </Button.Group>
              )
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={
          post.RetweetId ? `${post.User.nickname}님이 리트윗했습니다.` : null
        }
        extra={me?.id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? ( //리트윗 게시물
          <Card
            cover={
              !post?.Retweet.hide &&
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }
          >
            <div style={{ float: 'right' }}>
              {moment(post.createdAt).startOf('m').fromNow()}
            </div>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.Retweet.User.id}`} prefetch={false}>
                  <a>
                    <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.Retweet.User.nickname}
              description={
                <PostCardContent
                  onChangePost={onChangePost}
                  onCancelUpdate={onCancelUpdate}
                  postData={
                    post?.Retweet.hide
                      ? '삭제된 게시글 입니다.'
                      : post.Retweet.content
                  }
                />
              }
            />
          </Card>
        ) : (
          <>
            <div style={{ float: 'right' }}>
              {moment(post.createdAt).startOf('m').fromNow()}
            </div>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.User.id}`} prefetch={false}>
                  <a>
                    <Avatar>{post.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.User.nickname}
              description={
                <>
                  <PostCardContent
                    editMode={editMode}
                    onChangePost={onChangePost}
                    onCancelUpdate={onCancelUpdate}
                    postData={
                      post?.hide ? '삭제된 게시글 입니다' : post.content
                    }
                  />
                </>
              }
            />
          </>
        )}
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={
                    <Link href={`/user/${item.User.id}`} prefetch={false}>
                      <a>
                        <Avatar>{item.User.nickname?.[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    hide: PropTypes.bool,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
