import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './Home'
import ReservePage from './Reserve'
import OfferPage from './Offer'
import LoginPage from './Login'
import SignupPage from './Signup'
import DriverPage from './Driver'
import CarPage from './Vehicle'
import VehiclePage from './Vehicle'
import AdminPage from './Admin'

export const AppRoutes = () => {
    return(
        <Router>
            <Routes>
                <Route path='/' element={<LoginPage/>} />
                <Route path='/reserve' element={<ReservePage/>} />
                <Route path='/offer' element={<OfferPage/>} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/signup' element={<SignupPage/>} />
                <Route path='/driver' element={<DriverPage/>} />
                 <Route path='/vehicle' element={<VehiclePage/>} />
                 <Route path='/admin' element={<AdminPage/>} />
            </Routes>
        </Router>
    )

}