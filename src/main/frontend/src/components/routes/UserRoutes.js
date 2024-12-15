import { Route, Routes } from 'react-router-dom';
import Register from '../user/Register';
import Cart from '../user/Cart';
import Login from '../user/Login';

function UserRoutes() {
    return (
        <Routes>
            <Route path='/register' element={<Register/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
    );
}

export default UserRoutes; 