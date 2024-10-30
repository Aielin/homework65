import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import Page from '../../components/Page/Page';

interface PageData {
  title: string;
  content: string;
}

const MainContainer: React.FC = () => {
  const [pages] = useState<Record<string, PageData>>({
    about: { title: 'About', content: 'Lorem ipsum about...' },
    contacts: { title: 'Contacts', content: 'Lorem ipsum contacts...' },
    divisions: { title: 'Divisions', content: 'Lorem ipsum divisions...' },
  });

  return (
    <div className="container">
      <Navigation />
      <Routes>
        <Route path="/pages/:pageName" element={<PageWrapper pages={pages} />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </div>
  );
};

const PageWrapper: React.FC<{ pages: Record<string, PageData> }> = ({ pages }) => {
  return <Page pages={pages} />;
};

export default MainContainer;
