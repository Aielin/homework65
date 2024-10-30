import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import Page from '../../components/Page/Page';
import EditPage from '../../components/EditPage/EditPage.tsx';
import { getPages, savePage } from '../../axiosAPI.ts';


interface PageData {
  title: string;
  content: string;
}

const MainContainer: React.FC = () => {
  const [pages, setPages] = useState<Record<string, PageData>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPages();
        if (data) {
          setPages(data);
        }
      } catch (error) {
        console.error('Error fetching pages:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);


  const handleSavePage = async (pageName: string, updatedPage: PageData) => {
    try {
      setPages((prev) => ({ ...prev, [pageName]: updatedPage }));
      await savePage(pageName, updatedPage);
    } catch (error) {
      console.error('Error saving page:', error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Navigation />
      <Routes>
        <Route path="/pages/:pageName" element={<Page pages={pages} />} />
        <Route path="/pages/admin" element={<EditPage pages={pages} savePage={handleSavePage} />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </div>
  );
};


export default MainContainer;
