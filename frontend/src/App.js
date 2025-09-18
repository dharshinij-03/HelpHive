import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav';
import { Routes, Route } from 'react-router-dom';
import Service from './components/Service';
import Categories from './components/Categories';
import Contact from './components/Contact';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import CreateService from './components/CreateService';
import MyBookings from './components/Mybooking';
import MyServices from './components/MyServices';
import EditService from "./components/EditService";
import CategoryServices from "./components/CategoryServices";
import Profile from './components/Profile';
// inside <Routes>
<Route path="/edit-service/:id" element={<EditService />} />

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/services' element={<Service />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path="/create-service" element={<CreateService />} /> 
        <Route path='/register' element={<Register />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='my-services' element ={<MyServices/>} />
        <Route path="/edit-service/:id" element={<EditService />} />
         <Route path ='/profile' element={<Profile/>} />
        <Route path="/services/:category" element={<CategoryServices />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
