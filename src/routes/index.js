import { Routes, Route, useLocation } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import AdminCourses from '../pages/AdminCourses';
import AdminFooter from '../pages/AdminFooter';
import Admin from '../pages/NewAdmin';
import Home from '../pages/Home';
import Private from './Private'


function RoutesApp() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/admin" element={<Private> <Admin /> </Private>} />
        </Routes>
    )
}

export default RoutesApp;