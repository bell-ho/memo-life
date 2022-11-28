import React, { useCallback, useState } from 'react';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import useInput from '../hook/useInput';
import { useQuery, useQueryClient } from 'react-query';
import { queryKeys } from '~/react_query/constants';
import { loadMyInfoAPI } from '~/api/users';
import { addCommentAPI } from '~/api/comments';

const CommentForm = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const { data: me } = useQuery([queryKeys.users], loadMyInfoAPI);

  const [commentText, onChangeCommentText, setCommentText] = useInput('');
  const queryClient = useQueryClient();
  const onSubmitComment = useCallback(() => {
    if (!me) {
      alert('로그인 해주세요.');
      return;
    }

    if (me) {
      if (!commentText || commentText === '') {
        alert('문자를 입력해주세요.');
        return;
      }
      setLoading(true);
      addCommentAPI({ content: commentText, postId: post.id, userId: me.id })
        .then(() => {
          setCommentText('');
          queryClient.invalidateQueries([queryKeys.posts]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [commentText, me?.id]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.Group compact>
          <Input
            showCount
            value={commentText}
            maxLength={50}
            onChange={onChangeCommentText}
            style={{
              width: 'calc(100% - 59px)',
            }}
          />
          <Button htmlType="submit" type="primary" loading={loading}>
            등록
          </Button>
        </Input.Group>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
