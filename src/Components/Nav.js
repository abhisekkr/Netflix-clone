import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./styles/Nav.css";
import logo from "../Images/580b57fcd9996e24bc43c529.png";
import avatar from "../Images/Netflix-avatar.png";
import { FiSearch } from "react-icons/fi";

function Nav({ setSearchResult }) {
	const history = useHistory();
	const [show, handleShow] = useState(false);

	const transitionNavBar = () => {
		if (window.scrollY > 100) {
			handleShow(true);
		} else {
			handleShow(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", transitionNavBar);
		return () => window.removeEventListener("scroll", transitionNavBar);
	}, []);

	return (
		<>
			<div className={`nav ${show && "nav_black"}`}>
				<div className="nav_body">
					<div className="nav_contents">
						<img
							onClick={() => history.push("/")}
							className="nav_logo"
							src={logo}
							alt=""
						/>
						<div className="nav_components">
							<h4 onClick={() => history.push("/")}>HOME</h4>
							<p>ABOUT</p>
							<p>MOVIES</p>
							<p>SERIES</p>
							<p>WATCHLIST</p>
						</div>
					</div>

					<div className="nav_end">
						<FiSearch
							className="searchButton"
							onClick={() => history.push("/results")}
						/>
						<img
							onClick={() => history.push("/profile")}
							className="nav_avatar"
							src={avatar}
							alt=""
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Nav;
