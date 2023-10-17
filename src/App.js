import React from "react";
// import { DataQuery } from "@dhis2/app-runtime";
// import i18n from "@dhis2/d2-i18n";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import "./styles/styles.css";
import { Provider } from "react-redux";
import { store } from "./stores";

// require('do/tenv').config();

console.log(process.env) 

const query = {
	me: {
		resource: "me",
	},
};

const MyApp = () => (
	<Provider store={store}>
		<Box sx={{ display: "flex" }}>
			<CssBaseline />			
			<Box
				component="main"
				sx={{ flexGrow: 1, bgcolor: "#dedede", p: 3 }}
			>
				<Dashboard />
			</Box>
		</Box>
	</Provider>
);

export default MyApp;
