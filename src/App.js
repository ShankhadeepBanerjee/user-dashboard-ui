import { createContext, useEffect, useState } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";
import Users from "./components/Users/Users";
import Details from "./components/Details/Details";

import LinearProgress from "@mui/material/LinearProgress";

export const userDataContext = createContext();

function App() {
	console.log("App rendered");

	const navigate = useNavigate();
	const [userData, setUserData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let data;
		(async () => {
			data = await (
				await fetch(
					"https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json"
				)
			).json();

			navigate("/users");
			setUserData(data);
			setLoading(false);
		})();
	}, []);

	return (
		<userDataContext.Provider value={[userData, setUserData]}>
			<div className="App">
				{loading && <LinearProgress />}
				<Routes>
					<Route path="/users" element={<Users />} />
					<Route path="/users/:id" element={<Details />} />
				</Routes>
			</div>
		</userDataContext.Provider>
	);
}

export default App;
