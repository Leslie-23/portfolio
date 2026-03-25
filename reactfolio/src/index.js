import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/themeContext";
import { GameProvider } from "./HOME/Experience/GameUI";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider>
				<GameProvider>
					<App />
				</GameProvider>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>
);
