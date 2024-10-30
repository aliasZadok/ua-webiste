import { useForm } from 'react-hook-form';
import { Post } from '@/types';
import { postAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

type PostFormData = Pick<Post, 'title' | 'content'>;

export const PostForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<PostFormData>();
  const { user } = useAuth();

  const onSubmit = async (data: PostFormData) => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    try {
      const newPostData: Omit<Post, 'id'> = {
        ...data,
        authorId: user.id,
        createdAt: new Date().toISOString(),
      };

      const newPost = await postAPI.createPost(newPostData);
      console.log('New post created:', newPost);
      // TODO: Update UI or redirect
    } catch (error) {
      console.error('Error creating post:', error);
      // TODO: Show error message to user
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title', { required: 'Title is required' })} />
      {errors.title && <span>{errors.title.message}</span>}
      
      <textarea {...register('content', { required: 'Content is required' })} />
      {errors.content && <span>{errors.content.message}</span>}
      
      <button type="submit">Create Post</button>
    </form>
  );
};