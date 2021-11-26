import './App.css';
import LoginPage from './components/auth/login/LoginPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProvideAuth from './components/context/AuthContext';
import AdminRoute from './components/HOC/AdminRoute';
import AuthenticatedRoute from './components/HOC/AuthenticatedRoute';
import Nav from './components/shared/Nav/Nav';
import AdminPage from './components/admin/AdminPage';
import LandingPage from './components/home/LandingPage';
import ProvideAdminDashboard from './components/context/AdminDashboardContext';

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Nav />
        <Switch>
          <Route path='/login' exact component={LoginPage} />
          <AdminRoute path='/admin' exact>
            <ProvideAdminDashboard>
              <AdminPage />
            </ProvideAdminDashboard>
          </AdminRoute>
          <AuthenticatedRoute path='/user'>
            <main className='page flex justify-center items-center'>User profile</main>
          </AuthenticatedRoute>
          <Route path='/403'>
            <main className='page flex justify-center items-center'>
              403 - You are not authorized to access this page
            </main>
          </Route>
          <Route path='/' exact>
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
