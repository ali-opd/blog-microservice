export default function CommentList({ comments }) {
  const renderedComments = comments.map((c) => {
    let content;

    if (c.status === 'approved') {
      content = c.content;
    }

    if (c.status === 'pending') {
      content = 'This comment is awaiting moderation';
    }

    if (c.status === 'rejected') {
      content = 'This comment is rejected';
    }

    return <li key={c.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
}
