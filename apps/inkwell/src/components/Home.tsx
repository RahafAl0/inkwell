import Navbar from './Navbar';
import PublishedArticle from './PublishedArticle';

function Home() {


  return (
    <div className="bg-red-100 min-h-screen flex items-center justify-center">
      <Navbar />
      <PublishedArticle />
    </div>
  );
}

export default Home;
