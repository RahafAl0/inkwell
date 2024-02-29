import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useCreateArticleMutation } from '../store/apis/articleApi';
import Comments from './Comments';
import Navbar from './Navbar';

function Article() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [articleCreated, setArticleCreated] = useState(false);
  const [comments, setComments] = useState<string[]>([]);

  const [createArticle] = useCreateArticleMutation();

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    console.log(title);
  };

  const handleContetChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    console.log(content);
  };

  const handleArticleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await createArticle({ title, content });
      console.log('success', response);

      if ('data' in response) {
        const createdArticle = response.data;
        const articleComments = createdArticle.comments;
        setArticleCreated(true);
        setComments(articleComments);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-red-100 min-h-screen flex items-center justify-center">
        <form
          className="bg-red-50 w-3/4 p-6 rounded-lg shadow-md"
          onSubmit={handleArticleCreate}
        >
          <h2 className="text-2xl font-semibold mb-4">Create a New Article</h2>

          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-600">
              Article Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter the title..."
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="editor" className="block text-sm font-medium text-gray-600">
              Article Content
            </label>
            <textarea
              id="editor"
              rows={6}
              value={content}
              onChange={handleContetChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Write your article..."
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
      {articleCreated && (
        <>
          <h2>Comments</h2>
          <Comments comments={comments} />
        </>
      )}
    </div>
  );
}

export default Article;
