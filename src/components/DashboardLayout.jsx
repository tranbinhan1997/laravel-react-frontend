import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from '../axios';
import { useAuth } from '../contexts/AuthContext';
import Loading from "../pages/common/Loading";

export default function DefaultLayout() {
	const { user, setUser } = useAuth();
	const [loading, setLoading] = React.useState(false)

	// check if user is logged in or not from server
	useEffect(() => {
		(async () => {
			try {
				const resp = await axios.get('/user');
				if (resp.status === 200) {
					setUser(resp.data.data);
				}
			} catch (error) {
				if (error.response.status === 401) {
					localStorage.removeItem('user');
					window.location.href = '/';
				}
			}
		})();
	}, []);

	// if user is not logged in, redirect to login page
	if (!user) {
		return <Navigate to="/" />;
	}

	// logout user
	const handleLogout = async () => {
		setLoading(true);
		try {
			const resp = await axios.post('/logout');
			if (resp.status === 200) {
				setLoading(false);
				localStorage.removeItem('user');
				window.location.href = '/';
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (loading) {
        return <Loading/>
    }

	return (
		<>
			<nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
				<div className="flex flex-wrap items-center justify-between mx-auto">
					<NavLink to="/profile" className="flex items-center">
						<img
							src="https://t4.ftcdn.net/jpg/01/68/19/99/360_F_168199905_Vbjdxtr54j3xuwC1ml2GKEvFLybiTREo.webp"
							className="h-6 mr-3 sm:h-9"
							alt="DCodeMania Logo"
						/>
						<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
							DCodeMania
						</span>
					</NavLink>
					<button
						data-collapse-toggle="navbar-default"
						type="button"
						className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						aria-controls="navbar-default"
						aria-expanded="false">
						<span className="sr-only">Open main menu</span>
						<svg
							className="w-6 h-6"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
								clipRule="evenodd"></path>
						</svg>
					</button>
					<div className="w-full md:block md:w-auto" id="navbar-default">
						<ul className="flex flex-col rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
							<li>
								<NavLink
									to="/chat"
									className={({ isActive }) =>
										isActive
											? 'block py-2 pl-3 pr-4 text-secondary bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-secondary'
											: 'block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-secondary'
									}>
									Chat
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/profile"
									className={({ isActive }) =>
										isActive
											? 'block py-2 pl-3 pr-4 text-secondary bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-secondary'
											: 'block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-secondary'
									}>
									Profile
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/about"
									className={({ isActive }) =>
										isActive
											? 'block py-2 pl-3 pr-4 text-secondary bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-secondary'
											: 'block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-secondary'
									}>
									About
								</NavLink>
							</li>

							<li>
								<button
									onClick={handleLogout}
									className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
									Logout
								</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<main className="flex justify-center flex-col items-center mt-10">
				<Outlet />
			</main>
		</>
	);
}
