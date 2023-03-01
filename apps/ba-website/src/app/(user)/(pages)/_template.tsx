import React from 'react';
import groq from 'groq';
import { previewData } from 'next/headers';

import BlogList from '@/components/blog/BlogList';
import PreviewBlogList from '@/components/studio/PreviewBlogList';
import PreviewSuspense from '@/components/studio/PreviewSuspense';
import { client } from '@/lib/sanity.client';

const query = groq`*[_type=='post'] {...,author->, categories[]-> } | order(_createdAt desc)`;

type Props = {};

const HomePage = async (props: Props) => {
    if (previewData())
        return (
            <PreviewSuspense
                fallback={
                    <div role='status'>
                        <p className='text-center text-lg animate-pulse text-blue-500'>
                            Loading Preview Data
                        </p>
                    </div>
                }
            >
                {/* Preview blog list */}
                <PreviewBlogList query={query} />
            </PreviewSuspense>
        );

    const posts = await client.fetch(query);
    return <BlogList posts={posts} />;
};

export default HomePage;
