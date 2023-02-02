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
import PostDetails from "./components/Posts/PostDetails";
import UpdatePost from "./components/Posts/UpdatePost";
import UpdateComment from "./components/Comments/UpdateComment";
import Profile from "./components/Users/Profile/Profile";
import UploadProfilePhoto from "./components/Users/Profile/UploadProfilePhoto";
import UpdateProfileForm from "./components/Users/Profile/UpdateProfileForm";
import AccountVerified from "./components/Users/AccountVerification/AccountVerified";






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
           <Route
            path="/posts/:id"
            element={
              
                <PostDetails />
              
            }
          />
          <Route
            path="/update-post/:id"
            element={
              <UserProtectedRoute>
                <UpdatePost/>
                </UserProtectedRoute>
              
            }
          />
          <Route
            path="/verify-account/:token"
            element={
              <UserProtectedRoute>
                <AccountVerified/>
                </UserProtectedRoute>
              
            }
          />
          <Route
            path="/upload-profile-photo"
            element={
              <UserProtectedRoute>
                <UploadProfilePhoto/>
                </UserProtectedRoute>
              
            }
          />
          <Route
            path="/update-profile/:id"
            element={
              <UserProtectedRoute>
                <UpdateProfileForm/>
                </UserProtectedRoute>
              
            }
          />
          <Route
            path="/update-comment/:id"
            element={
              <UserProtectedRoute>
                <UpdateComment />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <UserProtectedRoute>
                <Profile />
                </UserProtectedRoute>
              
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
