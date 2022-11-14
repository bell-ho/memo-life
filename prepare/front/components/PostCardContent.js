import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button, Input } from 'antd';

const { TextArea } = Input;

const PostCardContent = ({
  postData,
  editMode,
  onCancelUpdate,
  onChangePost,
}) => {
  const [loading, setLoading] = useState(false);
  const [editText, setEditText] = useState(postData);

  const onChangeText = useCallback(
    (e) => {
      setEditText(e.target.value);
    },
    [editText],
  );

  const onChange = useCallback(() => {
    setLoading(true);
    onChangePost(editText)
      .then(() => {
        onCancelUpdate();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [editText, onCancelUpdate, onChangePost]);

  return (
    <div>
      {editMode ? (
        <>
          <TextArea value={editText} onChange={onChangeText} />
          <Button.Group>
            <Button loading={loading} onClick={onChange}>
              수정
            </Button>
            <Button type="danger" onClick={onCancelUpdate}>
              취소
            </Button>
          </Button.Group>
        </>
      ) : (
        postData.split(/(#[^\s#]+)/g).map((v, i) => {
          if (v.match(/(#[^\s#]+)/g)) {
            return (
              <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}>
                <a>{v}</a>
              </Link>
            );
          }
          return v;
        })
      )}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
  onCancelUpdate: PropTypes.func.isRequired,
  onChangePost: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
};

PostCardContent.defaultProps = {
  editMode: false,
};

export default PostCardContent;
