import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import About from './pages/About';
import Profile from './pages/Profile';
import Register from './pages/Register';
import DashboardLayout from './components/DashboardLayout';
import AuthLayout from './components/AuthLayout';

const router = createBrowserRouter([
	{
		path: '/',
		element: <AuthLayout />,
		children: [
			{
				path: '/',
				element: <Login />,
			},
			{
				path: '/register',
				element: <Register />,
			},
		],
	},
	{
		path: '/',
		element: <DashboardLayout />,
		children: [
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '/profile',
				element: <Profile />,
			},
		],
	},
]);

export default router;
