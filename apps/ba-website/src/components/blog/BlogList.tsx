import React from 'react';
import { Post } from 'types';

type Props = { posts: Post[] };

const BlogList = ({ posts }: Props) => {
  // console.log(posts?.length);

  if (!posts || posts?.length < 0) return <h1>No posts found</h1>;

  return (
    <div>
      {posts.map((post) => (
        <h1 key={post._id}>{post.title}</h1>
      ))}
    </div>
  );
};

export default BlogList;
