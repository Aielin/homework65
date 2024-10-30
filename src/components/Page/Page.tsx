import React from 'react';
import { useParams } from 'react-router-dom';

interface PageProps {
  pages: Record<string, { title: string; content: string }>;
}

const Page: React.FC<PageProps> = ({ pages }) => {
  const { pageName } = useParams<{ pageName: string }>();
  const page = pages[pageName || 'about'];

  if (!page) return <h1>Page not found</h1>;

  return (
    <div>
      <h1>{page.title}</h1>
      <p>{page.content}</p>
    </div>
  );
};

export default Page;
