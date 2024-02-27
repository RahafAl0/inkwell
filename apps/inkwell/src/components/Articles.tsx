import React, { useState } from 'react';
import { useCreateArticleMutation } from '../store/apis/articleApi';

function Article() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [createArticle, { isLoading, isError }] = useCreateArticleMutation();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    console.log(title);
  };

  const handleContetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    console.log(content);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await createArticle({ title, content }) 
      console.log('success', response);
      
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div>
      <form
        className="max-w-2xl bg-white rounded-lg border p-2 mx-auto mt-20"
        onSubmit={handleSubmit}
      >
        <div className="px-3 mb-2 mt-2">
          <input
            onChange={handleTitleChange}
            placeholder="title"
            className=" bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-10 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
          />
          <input
            onChange={handleContetChange}
            placeholder="article"
            className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
          />
        </div>
        <div className="flex justify-end px-4">
          <button
            type="submit"
            className=" px-2.5 py-1.5 rounded-md text-white text-sm
            bg-indigo-500"
            value="Post"
          >
            {isLoading ? 'Creating Article...' : 'Create Article'}
          </button>
          {isError && (
            <p className="text-red-500 text-sm font-light">
              Article creation failed. Please try again.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Article;
