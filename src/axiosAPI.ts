import axios from 'axios';

interface PageData {
  title: string;
  content: string;
}

const axiosApi = axios.create({
  baseURL: 'https://pagesapp-3d9af-default-rtdb.europe-west1.firebasedatabase.app//',
});


export const getPages = async () => {
  try {
    const response = await axiosApi.get('/pages.json');
    return response.data;
  } catch (error) {
    console.error('Error loading pages:', error);
    return null;
  }
};

export const savePage = async (pageName: string, updatedPage: PageData) => {
  try {
    await axiosApi.put(`/pages/${pageName}.json`, updatedPage);
  } catch (error) {
    console.error('Error saving page:', error);
  }
};

export default axiosApi;
