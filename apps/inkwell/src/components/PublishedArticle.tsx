import Navbar from './Navbar';
import { useGetArticlesQuery } from '../store/apis/articleApi';
import { useCreateCommentMutation } from '../store/apis/commentApi';
import CreateComment from './CreateComment'; 
import { Article, Comment } from '../../../../libs/type';

function PublishedArticle() {
  const { data: articles, isLoading } = useGetArticlesQuery({
    include: 'comments',
  });

  const [createComment] = useCreateCommentMutation();

  const handleCommentSubmit = async (content: string, articleId: string) => {
    try {
      const articleIdNumber = parseInt(articleId, 10);
      const userIdString = localStorage.getItem('userId');
      const userId = userIdString ? parseInt(userIdString, 10) : 0;
      console.log('userId',typeof userId);

  
      const response = await createComment({
        userId: userId,
        content: content,
        articleId: articleIdNumber,
      });
  
      console.log('success', response);
    } catch (error) {
      console.log('error', error);
    }
  };
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-red-100 min-h-screen flex items-center justify-center">
      <Navbar />
      <div>
        <h1 className="text-2xl font-semibold mb-4">Articles</h1>
        <div>
          {articles.map((article: Article) => (
            <div
              key={article.id}
              className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4"
            >
              <div className="md:flex">
                <div className="p-8">
                  <p className="mt-2 text-gray-500">{article.author.username}</p>
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    {article.title}
                  </div>
                  <p className="mt-2 text-gray-500">{article.content}</p>

                  {article.comments.map((comment: Comment) => (
                    <div key={comment.id} className="border-t border-gray-200 pt-4 mt-4">
                      <p className="text-gray-500">{comment.content}</p>
                    </div>
                  ))}

                  <CreateComment
                    articleId={article.id.toString()}
                    onCommentSubmit={(content) => handleCommentSubmit(content, article.id.toString())}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default PublishedArticle;
