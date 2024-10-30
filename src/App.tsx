import { Route, Routes } from 'react-router-dom';
import MainContainer from './containers/MainContainer/MainContainer.tsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<MainContainer />} />
      </Routes>
    </>

  );
};

export default App;