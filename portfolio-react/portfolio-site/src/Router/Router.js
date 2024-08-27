import { Routes, Route } from "react-router-dom";
import Home from '../Home';
import BlogHome from '../BlogHome'
import IndividualBlogPost from '../IndividualBlogPost'
import PortfolioHome from '../PortfolioHome'
import AdminHome from '../AdminHome'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminHome />}/>
      <Route path="/blog" element={<BlogHome />} />
      <Route path="/blog/:id" element={<IndividualBlogPost />} />
      <Route path="/portfolio" element={<PortfolioHome />} />
    </Routes>
  );
}

export default Router;
