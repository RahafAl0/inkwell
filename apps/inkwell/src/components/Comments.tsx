import { useState } from 'react';
import { useCreateCommentMutation } from '../store/apis/commentApi';
import { Comment } from '../../../../libs/type';



function Comments({ comments }: { comments: Comment[] }) {
  const [comment, setComment] = useState('');
  const [createComment, { isLoading, isError }] = useCreateCommentMutation();

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    console.log(comment);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await createComment({ comment });
      console.log('success', response);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <form className='h-screen flex items-center justify-center' onSubmit={handleSubmit}>
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600">
        <div className="px-4 py-2 bg-white rounded-t-lg ">
          <label htmlFor="comment" className="sr-only bg-white">
            Your comment
          </label>
          <textarea
            id="comment"
            rows={4}
            className="w-full px-0 text-sm text-black bg-white border-0 focus:ring-0 dark:placeholder-gray-400"
            placeholder="Write a comment..."
            required
            onChange={handleCommentChange}
          />
        </div>
      </div>
      <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Post comment
        </button>
        <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
          <button
            type="button"
            className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            {isLoading ? 'Posting...' : 'Cancel'}
          </button>
          {isError && ( 
            <p className="text-red-500 text-sm font-light">
            comment creation failed. Please try again.
          </p>
          )}
        </div>
      </div>
    </form>
  );
}

export default Comments;