import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Details from './components/Details';
import DetailItem from './components/DetailItem';

function App() {
  const [items, setItems] = useState([]);
  // This react hook takes two arguments: callback function, and dep. array
  useEffect(() => {
    axios.get('/api/items')
      .then((result) => setItems(result.data))
      .catch(console.error);
  }, []);

  return (
    <Router>
      <Header />
      {items.length === 0
        ? <div>Loading...</div>
        : (
          <Routes>
            <Route path="/details" element={<Details items={items} />}>
              <Route path=":id" element={<DetailItem items={items} />} />
              <Route index element={<div>No Item Selected</div>} />
            </Route>
            <Route path="/" element={<Home items={items} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
    </Router>
  );
}

export default App;
