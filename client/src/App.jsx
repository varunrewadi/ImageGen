import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Gallery from "./pages/Gallery.jsx";
import Layout from "./components/Layout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
