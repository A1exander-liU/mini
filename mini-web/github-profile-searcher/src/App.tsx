import { useEffect } from 'react';
import TopBar from './components/topbar';
import { API } from './services/api/api';

function App() {
  useEffect(() => {
    API.user('A1exander-liU');
  }, []);

  return (
    <>
      <TopBar />
    </>
  );
}

export default App;
