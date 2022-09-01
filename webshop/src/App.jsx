import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import Shops from './pages/Shops';
import Cart from './pages/Cart';
import SingleProduct from './pages/SingleProduct';
import AdminHome from './pages/admin/AdminHome';
import AddProduct from './pages/admin/AddProduct';
import AddUser from './pages/admin/AddUser';
import EditProduct from './pages/admin/EditProduct';
import MaintainProducts from './pages/admin/MaintainProducts';
import MaintainShops from './pages/admin/MaintainShops';
import MaintainCategories from './pages/admin/MaintainCategories';
import NavigationBar from './components/NavigationBar';
import NotFound from './pages/NotFound';
import PaymentCompleted from './pages/PaymentCompleted';
import SignIn from './pages/SignIn';
import { useContext } from 'react';
import AuthContext from './store/AuthContext';

function App() {

  const authCtx = useContext(AuthContext);

  return (
    <div>
      <NavigationBar />
      <Routes>
        {/* 11tk 6tk self-closing tag -- img, input, route */}
        <Route path="" exact element={ <HomePage /> } />
        <Route path="meist" exact element={ <AboutUs /> } />
        <Route path="poed" exact element={ <Shops /> } />
        <Route path="ostukorv" exact element={ <Cart /> } />
        <Route path="tellimus" exact element={ <PaymentCompleted /> } />
        <Route path="logi-sisse" exact element={ <SignIn /> } />
        <Route path="toode/:productId" exact element={ <SingleProduct /> } />
        {authCtx.loggedIn === true && <>
          <Route path="admin" exact element={ <AdminHome /> } />
          <Route path="admin/lisa-kasutajaid" exact element={ <AddUser /> } />
          <Route path="admin/lisa-toode" exact element={ <AddProduct /> } />
          <Route path="admin/muuda/:id" exact element={ <EditProduct /> } />
          <Route path="admin/halda-tooteid" exact element={ <MaintainProducts /> } />
          <Route path="admin/halda-poode" exact element={ <MaintainShops /> } />
          <Route path="admin/halda-kategooriaid" exact element={ <MaintainCategories /> } />
        </>}
        {authCtx.loggedIn === false && 
          <Route path="admin/*" exact element={ <Navigate to="/logi-sisse" /> } />}
        <Route path="*" exact element={ <NotFound /> } />
        {/* <Route path="*" exact element={ <Navigate to="/" /> } /> */}
      </Routes>
      {/* Footer    ctrl + ä */}
    </div>
  );
}

export default App;
