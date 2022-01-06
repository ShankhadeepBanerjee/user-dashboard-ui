// react
import { useEffect, useState } from "react";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";

// MUI Icons
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Context
import { userDataContext } from "../../App";

// CSS
import "./TableComponent.scss";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
	tableHead: {
		backgroundColor: "#eeeeee",
	},
	clickable: {
		cursor: "pointer",
	},
});

export default function TableComponent({ userList, sortFunc }) {
	const classes = useStyles();

	const navigate = useNavigate();

	const userListHeaders = {
		// Id: "id",
		"First Name": "first_name",
		"Last Name": "last_name",
		Age: "age",
		Email: "email",
		Website: "web",
	};

	const [catagorySortedState, setCatagorySortedState] = useState({
		catagory: "",
		sortedAsc: false,
	});

	function clickHandler(e) {
		const element = e.target;

		if (element.dataset.type === "head-cell") {
			const key = userListHeaders[element.dataset.key];

			setCatagorySortedState((p) => {
				return {
					catagory: key,
					sortedAsc: p.catagory === key ? !p.sortedAsc : true,
				};
			});

			console.log(key);
		} else if (element.dataset.type === "row-cell") {
			const key = element.parentElement.dataset.key;
			navigate(`/users/${key}`);
			console.log();
		}
	}

	useEffect(() => {
		if (catagorySortedState.catagory) {
			sortFunc(
				catagorySortedState.catagory,
				catagorySortedState.sortedAsc
			);
		}
	}, [catagorySortedState]);

	return (
		<TableContainer component={Paper}>
			<Table
				sx={{ minWidth: 650 }}
				aria-label="simple table"
				className={classes.clickable}
				onClick={clickHandler}
			>
				<TableHead className={classes.tableHead}>
					<TableRow>
						{Object.keys(userListHeaders).map((item, idx) => (
							<TableCell key={idx} align="center">
								<div className="table-head-cell">
									{catagorySortedState.catagory ===
										userListHeaders[item] && (
										<span
											style={{
												display: "flex",
												alignItems: "center",
											}}
										>
											{catagorySortedState.sortedAsc ? (
												<ArrowDropUpIcon fontSize="small" />
											) : (
												<ArrowDropDownIcon fontSize="small" />
											)}
										</span>
									)}
									<span data-type="head-cell" data-key={item}>
										{item}
									</span>
								</div>
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{userList.map((row) => (
						<TableRow
							data-key={row.id}
							key={row.id}
							sx={{
								"&:last-child td, &:last-child th": {
									border: 0,
								},
								":hover": {
									cursor: "pointer",
								},
							}}
							hover={true}
						>
							{Object.values(userListHeaders).map((item) => (
								<TableCell
									key={row.id + item}
									align="center"
									data-type="row-cell"
									data-id={row.id}
								>
									{item === "web" ? (
										<span>
											&nbsp;
											<a href={row[item]} target="_blank">
												{row[item]}
											</a>
										</span>
									) : (
										<span>&nbsp;{row[item]}</span>
									)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
