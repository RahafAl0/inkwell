export interface Article {
    id: number;
    title: string;
    articleId: number;
    content: string;
    authorId: number;
    author: {
      username: string;
    };
    comments: Comment[];
  }

export interface Comment {
  id: number;
  content: string; 
  userId: number;
  articleId: number;
  author : {
    username: string;
  };
}
