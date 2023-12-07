import Header from './header';
import Footer from './footer';
import { Route, Routes } from 'react-router';
import About from './about';
import Blog from './blog';
import Home from './home';
import Resume from './resume';
import Contact from './contact';
import './style.css';

function App() {
  return (
    <div className="App frontend">
      <Header />
      <div className='main-body'>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;