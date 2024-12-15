import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Cart from './components/user/Cart';
import ProductRoutes from './components/routes/ProductRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import UserRoutes from './components/routes/UserRoutes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/product/*' element={<ProductRoutes/>}/>
          <Route path='/user/*' element={<UserRoutes/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
