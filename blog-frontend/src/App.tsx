import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';


function App () {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<PostListPage />} />
          <Route path="/posts/:post_id" element={<PostDetailPage/>} />
        </Routes>
    </Router>
  );
}

export default App;
