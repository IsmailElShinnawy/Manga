import './App.css';
import FlightsPage from './components/flights/FlightsPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProvideAuth from './components/context/AuthContext';
import AdminRoute from './components/HOC/AdminRoute';
import AuthenticatedRoute from './components/HOC/AuthenticatedRoute';
import Nav from './components/shared/Nav/Nav';
import AdminPage from './components/admin/AdminPage';
import LandingPage from './components/home/LandingPage';
import ProvideAdminDashboard from './components/context/AdminDashboardContext';
import Profile from './components/profile/Profile';
import ProvideReservation from './components/context/ReservationContext';
import CheckoutPage from './components/flights/CheckoutPage';
import ViewItinerary from './components/flights/ViewItinerary';
import UpdateReservation from './components/flights/UpdateReservation';

function App() {
  return (
    <ProvideAuth>
      <ProvideReservation>
        <Router>
          <Nav />
          <Switch>
            <AdminRoute path='/admin' exact>
              <ProvideAdminDashboard>
                <AdminPage />
              </ProvideAdminDashboard>
            </AdminRoute>
            <AuthenticatedRoute path='/profile' exact>
              <Profile />
            </AuthenticatedRoute>
            <AuthenticatedRoute path='/checkout' exact>
              <CheckoutPage />
            </AuthenticatedRoute>
            <AuthenticatedRoute path='/checkout/:rid/:fid/:type/:cabin' exact>
              <UpdateReservation />
            </AuthenticatedRoute>
            <Route path='/403'>
              <main className='page flex justify-center items-center'>
                403 - You are not authorized to access this page
              </main>
            </Route>
            <AuthenticatedRoute path='/itinerary/:id' exact>
              <ViewItinerary />
            </AuthenticatedRoute>
            <Route path='/flights' exact>
              <FlightsPage />
            </Route>
            <Route path='/' exact>
              <LandingPage />
            </Route>
          </Switch>
        </Router>
      </ProvideReservation>
    </ProvideAuth>
  );
}

export default App;
