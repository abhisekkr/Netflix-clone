import React, { useState, useEffect } from "react";
import "./styles/Row.css";
import axios from "../Resources/axios";
import MovieDetail from "./MovieDetail";

function Row({ title, fetchUrl, isLargeRow = false }) {
	const [movies, setMovies] = useState([]);
	const [movieDetails, setMovieDetails] = useState([]);
	const [showModal, setShowModal] = useState("close");

	const base_url = "https://image.tmdb.org/t/p/original/";

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);
			return request;
		}
		fetchData();
	}, [fetchUrl]);

	const handleClick = (movie) => {
		setMovieDetails(movie);
		switch (showModal) {
			case "open":
				setShowModal("close");
				break;
			case "close":
				setShowModal("open");
				break;
			default:
				setShowModal("close");
				break;
		}
	};

	return (
		<div className="row">
			<h2>{title}</h2>

			<div className="row_posters">
				{movies.map(
					(movie) =>
						((isLargeRow && movie.poster_path) ||
							(!isLargeRow && movie.backdrop_path)) && (
							<img
								className={`row_poster ${isLargeRow && "row_posterLarge"}`}
								key={movie.id}
								onClick={() => handleClick(movie)}
								src={`${base_url}${
									isLargeRow ? movie.poster_path : movie.backdrop_path
								}`}
								alt={movie.name}
							/>
						)
				)}
			</div>

			<MovieDetail
				showModal={showModal}
				handleClick={handleClick}
				movieDetails={movieDetails}
			/>
		</div>
	);
}

export default Row;
