import React, { useState } from 'react';

interface CommentFormProps {
  articleId: string;
  onCommentSubmit: (content: string, articleId: string) => void; // Change userId type to number
}

const CreateComment: React.FC<CommentFormProps> = ({ articleId, onCommentSubmit }) => {
  const [commentContent, setCommentContent] = useState('');



  const handleCommentSubmit = () => {
    onCommentSubmit(commentContent, articleId);
    setCommentContent('');
  };

  return (
    <div>
      <textarea
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder="Write your comment..."
      />
      <button onClick={handleCommentSubmit}>Submit Comment</button>
    </div>
  );
};

export default CreateComment;
