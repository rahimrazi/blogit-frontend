import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddNewCategory from "./components/Categories/AddNewCategory";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navigation/Navbar";

import Login from "./components/Users/Login/Login";
import Register from "./components/Users/Register/Register";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";

import AdminProtectedRoute from "./components/Navigation/ProtectedRoutes/AdminProtectedRoute";
import CreatePost from "./components/Posts/CreatePost";
import UserProtectedRoute from "./components/Navigation/ProtectedRoutes/UserProtectedRoute";
import PostsList from "./components/Posts/PostList";



function App() {
  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          
          <Route element={<AdminProtectedRoute />}>
            {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
            {/* <Route path="/send-mail" element={<SendEmail />} /> */}

            {/* <Route path="/users" element={<UsersList />} /> */}
            {/* <Route path="/reported-list" element={<ReportedPost />} /> */}

            <Route path="/add-category" element={<AddNewCategory />} />

            <Route path="/update-category/:id" element={<UpdateCategory />} />
          </Route>
          {/* <Route exact path="/add-category" element={<AddNewCategory />} /> */}

          <Route
            path="/create-post"
            element={
              <UserProtectedRoute>
                <CreatePost />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/posts"
            element={
              
                <PostsList />
              
            }
          />
          
          
          
          <Route exact path="/category-list" element={<CategoryList />} />
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
