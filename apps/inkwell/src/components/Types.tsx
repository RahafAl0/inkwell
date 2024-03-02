
export interface Article {
    id: number;
    title: string;
    content: string;
    userId : number;
    author: {
      username: string;
    };

  }
  