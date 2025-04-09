import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Banner from './components/Banner/Banner';
import Blogs from './components/Blogs/Blogs';
import BlogPost from './components/BlogPost/BlogPost';

function App() {
  return (
    <Router>
      <div className="App">
        <Banner />
        <Routes>
          <Route path="/" element={<div className="home-content"><h1>Greetings!</h1></div>} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
