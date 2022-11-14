import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { useQuery, useQueryClient } from 'react-query';
import { queryKeys } from '~/react_query/constants';
import { loadMyInfoAPI } from '~/api/users';
import { followAPI, unfollowAPI } from '~/api/follows';

const FollowButton = ({ post, key }) => {
  const [loading, setLoading] = useState(false);
  const { data: me } = useQuery([queryKeys.users], loadMyInfoAPI);
  const queryClient = useQueryClient();

  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);

  const onClickButton = useCallback(() => {
    setLoading(true);
    if (isFollowing) {
      unfollowAPI(post.User.id)
        .then(() => {
          queryClient.invalidateQueries([queryKeys.users]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      followAPI(post.User.id)
        .then(() => {
          queryClient.invalidateQueries([queryKeys.users]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [post.User.id, isFollowing]);

  //훅 보다는 아래에 작성해야함
  if (post.User.id === me.id) {
    return null;
  }

  return (
    <Button loading={loading} onClick={onClickButton}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
