import { Route, Routes } from 'react-router-dom';
import ProductAdd from '../seller/ProductAdd';
import ProductEdit from '../seller/ProductEdit';
import ProductListAll from '../common/ProductListAll';
import ProductDetail from '../common/ProductDetail';


function ProductRoutes() {
    return (
        <Routes>
            <Route path='/add' element={<ProductAdd/>}/>
//            <Route path='/edit' element={<ProductEdit/>}/>
            <Route path='/listAll' element={<ProductListAll/>}/>
            <Route path='/:id' element={<ProductDetail/>}/>
        </Routes>
    );
}
export default ProductRoutes;
export { ProductAdd, ProductEdit }; // for testing