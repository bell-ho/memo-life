import React, { useCallback, useRef, useState } from 'react';
import { Button, Form, Input } from 'antd';
import useInput from '~/hook/useInput';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { queryKeys } from '~/react_query/constants';
import { loadMyInfoAPI } from '~/api/users';
import { addPostAPI, uploadImagesAPI } from '~/api/posts';

const PostForm = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { data: me } = useQuery([queryKeys.users], loadMyInfoAPI);

  const [text, onChangeText, setText] = useInput('');
  const [imagePaths, setImagePaths] = useState([]);

  const mutation = useMutation([queryKeys.posts], addPostAPI, {
    onMutate() {
      if (!me) return;
      setLoading(true);
      queryClient.setQueryData([queryKeys.posts], (data) => {
        const newPages = data?.pages.slice() || [];
        newPages[0].unshift({
          id: 0,
          User: me,
          content: text,
          Images: imagePaths?.map((v, i) => ({ src: v, id: i })),
          Comments: [],
          Likers: [],
          createdAt: new Date().toString(),
        });
        return {
          pageParams: data?.pageParams || [],
          pages: newPages,
        };
      });
    },
    onSuccess() {
      setText('');
      setImagePaths([]);
      queryClient.refetchQueries([queryKeys.posts]);
    },
    onSettled() {
      setLoading(false);
    },
  });

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);
    mutation.mutate(formData);
  }, [mutation, text, imagePaths]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current?.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    const imageFormData = new FormData();
    const reg = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;
    [].forEach.call(e.target.files, (f) => {
      if (f.name.match(reg)) {
        imageFormData.append('image', f);
      }
    });
    uploadImagesAPI(imageFormData).then((result) => {
      setImagePaths((prev) => prev.concat(result));
    });
  }, []);

  const onRemoveImage = useCallback(
    (index) => () => {
      setImagePaths((prev) => {
        return prev.filter((v, i) => i !== index);
      });
    },
    [],
  );

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        // showCount
        maxLength={140}
        placeholder="혐짤 업로드 절대 금지"
      />
      <div>
        <input
          type="file"
          name="image"
          multiple
          hidden
          accept="image/*"
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button
          type="primary"
          style={{ float: 'right' }}
          loading={loading}
          htmlType="submit"
        >
          등록
        </Button>
      </div>
      <div style={{ maxHeight: 200, overflow: 'auto' }}>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img
              src={v.replace(/\/thumb\//, '/original/')}
              style={{ width: '190px', padding: 2 }}
              alt={v}
            />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
