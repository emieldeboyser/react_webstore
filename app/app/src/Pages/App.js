import { Navigate, Route, Routes } from "react-router-dom";
import Container from "../components/Global/Container/Container";
import AppHeader from "./Header/AppHeader";
import AuthContainer from "../contexts/AuthContainer";
import Footer from "../components/Global/Footer/Footer";
import Home from "./Home/home";
import Catalogus from "./Catalogus/catalogus";
import Admin from "./Admin/Admin";
import Profile from "./Profile/profile";
import EditProfile from "./Profile/editProfile";
import ProductDetail from "./Catalogus/catalogusDetail";
import WishlistPage from "./Wishlist/wishlist";
import AddCouponCode from "./Admin/Add/addCoupon";
import EditCoupon from "./Admin/Edit/editCoupon";
import EditProduct from "./Admin/Edit/editProduct";
import AddProduct from "./Admin/Add/addProduct";
import EditUser from "./Admin/Edit/editUser";
import NotFound from "./NotFound/notFound";
import Cart from "./Cart/cart";
import Checkout from "./Checkout/checkout";
import OrderConfirm from "./Checkout/orderConfirm";

const App = () => {
  return (
    <AuthContainer>
      <AppHeader />
      <Container>
        <Routes>
          {/* route */}
          <Route path="/" element={<Home />} />
          {/* not admin views */}
          <Route path="/catalogus" element={<Catalogus />} />
          <Route path="/catalogus/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:id" element={<OrderConfirm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          {/* admin routs */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/addCoupon" element={<AddCouponCode />} />
          <Route path="/admin/editCoupon/:id" element={<EditCoupon />} />
          <Route path="/admin/addProduct" element={<AddProduct />} />
          <Route path="/admin/product/:id" element={<EditProduct />} />
          <Route path="/admin/users/:id" element={<EditUser />} />
          {/* Error handling */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </AuthContainer>
  );
};

export default App;
