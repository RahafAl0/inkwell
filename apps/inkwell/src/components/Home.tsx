import Navbar from './Navbar';
import { useGetArticlesQuery } from '../store/apis/articleApi';
import { Article } from '../../../../libs/type';
// import Comments from './Comments';

function Home() {
  const { data: articles, isLoading } = useGetArticlesQuery({});

  if (isLoading) return <div>Loading...</div>;

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
                  <p className="mt-2 text-gray-500">
                    {article.author.username} 
                  </p>
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    {article.title}
                  </div>
                  <p className="mt-2 text-gray-500">{article.content}</p>
                  <div></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
