import { useState } from "react";
import Navbar from "./Navbar";
import { useCreateArticleMutation } from "../store/apis/articleApi";

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createArticle] = useCreateArticleMutation();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await createArticle({ title, content });
      console.log('success', response);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div>
      <Navbar />
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full mx-auto p-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6">Create a New Article</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Article Title</label>
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
              <label htmlFor="content" className="block text-gray-700 font-medium mb-2">Article Content</label>
              <textarea
                id="content"
                rows={6}
                value={content}
                onChange={handleContentChange}
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
      </div>
    </div>
    </div>
  );
}

export default CreateArticle;
