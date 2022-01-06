import React, { useState } from "react";

import { IconButton, List, ListItem } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { userDataContext } from "../../App";
import { useEffect } from "react";

export default function Details() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [userData] = useContext(userDataContext);

	const [user, setUser] = useState({});

	const userDetailsMap = {
		first_name: "First Name",
		last_name: "Last Name",
		company_name: "Company Name",
		city: "City",
		state: "State",
		zip: "Zip",
		email: "Email",
		web: "Website",
		age: "Age",
	};

	useEffect(() => {
		if (userData.length > 0) {
			setUser(userData.find((item) => item.id == id));
		}
	}, [userData]);

	console.log("Details render");

	return (
		<div style={{ width: "95%", margin: "auto" }}>
			<div
				style={{
					display: "flex",
					justifyContent: "left",
					alignItems: "center",
				}}
			>
				<span>
					<IconButton onClick={() => navigate("/Users")}>
						<ArrowBackIcon fontSize="large" />
					</IconButton>
				</span>

				<h1>Details: {user.first_name + " " + user.last_name}</h1>
			</div>
			{user && (
				<List
					sx={{
						"&:last-child": {
							borderBottom: "solid 2px grey",
						},
					}}
				>
					{Object.keys(userDetailsMap).map((key, idx) => {
						return (
							<ListItem
								key={idx}
								sx={{
									borderTop: "solid 2px grey",
									display: "flex",
									alignItems: "center",
									height: "10vh",
								}}
							>
								<h3>{userDetailsMap[key]}: </h3>
								{key === "web" ? (
									<span>
										&nbsp;
										<a href={user[key]} target="_blank">
											{user[key]}
										</a>
									</span>
								) : (
									<span>&nbsp;{user[key]}</span>
								)}
							</ListItem>
						);
					})}
				</List>
			)}
		</div>
	);
}
