'use client';
import React from 'react';
import { Post } from 'types';

import BlogList from '@/components/blog/BlogList';
import { usePreview } from '@/lib/sanity.preview';

type Props = {
  query: string;
};

const PreviewBlogList = ({ query }: Props) => {
  const posts: Post[] = usePreview(null, query);

  return <BlogList posts={posts} />;
};

export default PreviewBlogList;
