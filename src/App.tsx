import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blog } from "./pages/Blog";
import Blogs from "./pages/Blogs";
import Publish from "./pages/Publish";
import Profile from "./pages/Profile";
import PrivateRoutes from "./components/PrivateRoutes";
import Appbar from "./components/Appbar";
import ProfileEdit from "./pages/ProfileEdit";

function App() {
  const location = useLocation();
  const shouldRenderAppbar = !["/signin", "/signup"].includes(
    location.pathname
  );
  return (
    <>
      {shouldRenderAppbar && <Appbar />}
      <Routes>
        <Route path="/" element={<PrivateRoutes />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/publish" element={<Publish />}>
          <Route path=":id" element={<Publish />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
      </Routes>
    </>
  );
}
const AppRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
export default AppRouter;
