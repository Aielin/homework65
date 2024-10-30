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
  const [messageType, setMessageType] = useState<string>('');


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
      setMessageType('danger');
      return;
    }

    if (selectedPage) {
      savePage(selectedPage, pageData);
      setMessage('Page saved successfully!');
      setMessageType('success');
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Edit Pages</h3>

      {message && (
        <div className={`alert alert-${messageType} mt-3`} role="alert">
          {message}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Select page:</label>
        <select className="form-select" value={selectedPage} onChange={handleSelectChange}>
          <option value="">Select...</option>
          {Object.keys(pages).map((pageName) => (
            <option key={pageName} value={pageName}>
              {pageName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Title:</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={pageData.title}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Content:</label>
        <textarea
          name="content"
          className="form-control"
          rows={4}
          value={pageData.content}
          onChange={handleInputChange}
        />
      </div>

      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>

  );
};

export default EditPage;
