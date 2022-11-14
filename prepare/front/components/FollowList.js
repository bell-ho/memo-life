import React from 'react';
import { Button, Card, List } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { removeFollowerAPI, unfollowAPI } from '~/api/follows';
import { useQueryClient } from 'react-query';
import { queryKeys } from '~/react_query/constants';

const FollowList = ({ header, data, onClickMore, loading }) => {
  const queryClient = useQueryClient();
  const onCancel = (id) => () => {
    if (header === '팔로잉') {
      unfollowAPI(id).then(() => {
        queryClient.invalidateQueries([queryKeys.followings]);
        queryClient.invalidateQueries([queryKeys.users]);
      });
      return;
    }
    removeFollowerAPI(id).then(() => {
      queryClient.invalidateQueries([queryKeys.followers]);
      queryClient.invalidateQueries([queryKeys.users]);
    });
  };
  return (
    <List
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <Button onClick={onClickMore} loading={loading}>
            더 보기
          </Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card
            actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}
          >
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onClickMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default FollowList;
