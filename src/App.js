import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AddNewCategory from "./components/Categories/AddNewCategory";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navigation/Navbar";


import Login from "./components/Users/Login/Login";
import Register from "./components/Users/Register/Register";
import CategoryList from "./components/Categories/CategoryList";



function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        
      
        <Routes>
          <Route exact path = '/add-category' element={<AddNewCategory/>}/>
          <Route exact path = '/category-list' element={<CategoryList/>}/>
          <Route exact path = '/' element={<HomePage />}/>
          <Route exact path = '/register' element={<Register/>}/>
          <Route path="/login" element={<Login />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
