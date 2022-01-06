import React, { useState } from "react";

import { IconButton, TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

export default function UserSearchComponent({ searchFunc }) {
	const [searchUserName, setsearchUserName] = useState({
		searchBy: "first_name",
		name: "",
	});

	function searchChangeHandler(e) {
		setsearchUserName((p) => {
			return { ...p, name: e.target.value };
		});
	}

	function submitHandler(e) {
		e.preventDefault();
		searchFunc(searchUserName);
	}

	return (
		<div className="user-search">
			<form action="" onSubmit={submitHandler}>
				<span>Search By &nbsp;</span>
				<select
					name="searchBy"
					id=""
					onChange={(e) => {
						const val = e.target.value;
						setsearchUserName((p) => {
							return { ...p, searchBy: val };
						});
					}}
				>
					<option value="first_name">First Name</option>
					<option value="last_name">Last Name</option>
				</select>
				&nbsp;
				<TextField
					placeholder="Search User"
					size="small"
					onChange={searchChangeHandler}
					value={searchUserName.name}
				/>
				<IconButton onClick={submitHandler}>
					<SearchIcon />
				</IconButton>
			</form>
		</div>
	);
}
