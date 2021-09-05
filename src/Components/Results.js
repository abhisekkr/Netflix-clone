import React, { useState, useRef } from "react";
import Nav from "./Nav";
import "./styles/Results.css";
import axios from "../Resources/axios";
import { fetchSearchString } from "./Requests";

function Results() {
	const [input, setInput] = useState("");
	const searchInput = useRef(null);
	const [searchResult, setSearchResult] = useState([]);

	const searchQuery = (query) => {
		axios
			.get(fetchSearchString(query))
			.then((response) => {
				if (response.data.total_results < 1) {
					prompt("No results Found");
				} else {
					setSearchResult(response.data.results);
				}
			})
			.catch((err) => console.log(err));
	};

	const handleSearch = (e) => {
		e.preventDefault();
		searchQuery(input);
	};
	const base_url = "https://image.tmdb.org/t/p/original/";

	console.log(searchResult);
	return (
		<div className="search">
			<Nav />
			<div className="search__body">
				<form>
					<input
						type="search"
						placeholder="Search..."
						ref={searchInput}
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="search__bodyInput"
					/>
					<button
						onClick={(e) => handleSearch(e)}
						type="submit"
						style={{ display: "none" }}
					/>
				</form>
			</div>
			<div className="result">
				<div className="result__body">
					{searchResult?.map((movie) => (
						<img
							src={`${base_url}${movie.poster_path || movie.backdrop_path}`}
							alt=""
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default Results;
