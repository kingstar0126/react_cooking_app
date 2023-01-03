// POST comment
const addComment = async (comment, token) => {
  const response = await fetch(
    `https://cook-master-backend.onrender.com/api/posts/comments`,
    {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 201) {
    const addedComment = await response.json();
    return addedComment;
  }
};

// GET comments
const getAllComments = async (id) => {
  const response = await fetch(
    `https://cook-master-backend.onrender.com/api/posts/${id}/comments`
  );

  if (response.status === 200) {
    const comments = await response.json();
    return comments;
  }
};

const commentService = {
  addComment,
  getAllComments,
};

export default commentService;
