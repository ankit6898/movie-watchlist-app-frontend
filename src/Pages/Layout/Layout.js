import { Outlet, Link } from "react-router-dom";
import Header from "../../componets/Header/Header";
import Footer from "../../componets/Footer/Footer";
const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
};

export default Layout;