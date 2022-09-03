import './style/style.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

// axios.get('https://en.wikipedia.org/w/api.php',{
//   params: {
//       action: 'query',
//       origin: '*',
//       format: 'json',
//       srsearch: val,
//   }
// })

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<SongList />} />
          <Route path="songs/new" element={<SongCreate />} />
          {/* <Route path="songs/:id" element={<SongDetail />} /> */}
        </Routes>
      </Router>
  );
};

export default App