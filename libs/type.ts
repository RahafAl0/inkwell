export interface Article {
    id: number;
    title: string;
    articleId: number;
    content: string;
    userId : number;
    author: {
      username: string;
    };
    comments: Comment[];
  }

export interface Comment {
  id: number;
  content: string; 
  userId: number;

}