import React, { useState } from 'react';

interface Page {
  title: string;
  content: string;
}

interface Props {
  pages: Record<string, Page>;
  savePage: (pageName: string, updatedPage: Page) => void;
}

const EditPage: React.FC<Props> = ({ pages, savePage }) => {
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [pageData, setPageData] = useState<Page>({ title: '', content: '' });
  const [message, setMessage] = useState<string>('');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pageName = e.target.value;
    setSelectedPage(pageName);
    if (pages[pageName]) {
      setPageData(pages[pageName]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPageData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!pageData.title || !pageData.content) {
      setMessage('Please fill out both title and content fields.');
      return;
    }

    if (selectedPage) {
      savePage(selectedPage, pageData);
      setMessage('Page saved successfully!');
    }
  };

  return (
    <div>
      <h3>Edit pages</h3>
      {message && <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}
      <div>
        <label>Select page:</label>
        <select value={selectedPage} onChange={handleSelectChange}>
          <option value="">Select...</option>
          {Object.keys(pages).map((pageName) => (
            <option key={pageName} value={pageName}>
              {pageName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={pageData.title}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Content:</label>
        <textarea
          name="content"
          value={pageData.content}
          onChange={handleInputChange}
        />
      </div>

      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditPage;
