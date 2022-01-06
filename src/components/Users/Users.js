import React, { useContext, useEffect, useState } from "react";

// Context
import { userDataContext } from "../../App";

// MUI components
import Pagination from "@mui/material/Pagination";
import { makeStyles } from "@mui/styles";

import Skeleton from "@mui/material/Skeleton";

// Styles
import "./Users.scss";

// Components
import TableComponent from "../TableComponent/TableComponent";
import UserSearchComponent from "../UserSearchComponent/UserSearchComponent";

const useStyles = makeStyles({
	clickable: {
		cursor: "pointer",
	},
	pagination: {
		display: "flex",
		justifyContent: "center",
	},
});

export default function Users() {
	console.log("User rendered");
	const classes = useStyles();

	const [searching, setSearching] = useState(false);

	const [userData, setUserData] = useContext(userDataContext);

	const [userList, setUserList] = useState([]);

	const [searchedList, setsearchedList] = useState([]);

	const cellPerPage = 10;

	function paginationHandler(event, page) {
		if (searching) {
			setUserList(
				searchedList.slice(
					(page - 1) * cellPerPage,
					(page - 1) * cellPerPage + cellPerPage
				)
			);
		} else {
			setUserList(
				userData.slice(
					(page - 1) * cellPerPage,
					(page - 1) * cellPerPage + cellPerPage
				)
			);
		}
	}

	function userSearchHandler({ searchBy, name }) {
		console.log(searchBy, name);
		if (name !== "") {
			const found = userData.filter((item) =>
				item[searchBy].toLowerCase().startsWith(name.toLowerCase())
			);
			setSearching(true);
			setsearchedList(found);
		} else {
			setSearching(false);
			setUserList(userData.slice(0, cellPerPage));
		}
	}

	function sortUserData(key, sortOrder) {
		if (searching) {
			setsearchedList((p) =>
				[...p].sort((a, b) => (a[key] > b[key] && sortOrder ? 1 : -1))
			);
		} else {
			setUserData((p) =>
				[...p].sort((a, b) => (a[key] > b[key] && sortOrder ? 1 : -1))
			);
		}
	}

	useEffect(() => {
		setUserList(userData.slice(0, cellPerPage));
		console.log(userData.slice(0, cellPerPage), "UserData changed");
	}, [userData]);

	useEffect(() => {
		if (searching) setUserList(searchedList.slice(0, cellPerPage));
	}, [searchedList]);

	return (
		<div className="users">
			<UserSearchComponent searchFunc={userSearchHandler} />

			{userList.length > 0 ? (
				<TableComponent userList={userList} sortFunc={sortUserData} />
			) : searching ? (
				<div>
					<h1>Sorry Nothing Found</h1>
				</div>
			) : (
				<Skeleton variant="rectangular" height={500} />
			)}

			<div className={classes.pagination}>
				<Pagination
					count={
						searching
							? Math.ceil(searchedList.length / cellPerPage)
							: Math.ceil(userData.length / cellPerPage)
					}
					variant="outlined"
					color="secondary"
					align="center"
					onChange={paginationHandler}
				/>
			</div>
		</div>
	);
}
