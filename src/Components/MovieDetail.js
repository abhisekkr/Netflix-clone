import React, { useState } from "react";
import "./styles/MovieDetail.css";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import { IoMdCloseCircleOutline } from "react-icons/io";

function MovieDetail({ showModal, handleClick, movieDetails }) {
	const [trailerUrl, setTrailerUrl] = useState("");
	const [trailer, setTrailer] = useState(false);

	const reset = (e) => {
		handleClick(e);
	};
	const base_url = "https://image.tmdb.org/t/p/original/";

	const truncate = (string, n) => {
		return string?.length > n ? string.substr(0, n - 1) + " ... " : string;
	};

	const handleTrailer = () => {
		setTrailer(true);
		if (trailerUrl) {
			setTrailerUrl("");
		} else {
			movieTrailer(
				movieDetails?.name ||
					movieDetails?.title ||
					movieDetails?.original_name ||
					""
			)
				.then((url) => {
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get("v"));
				})
				.catch((error) => console.log(error));
		}
	};

	const opts = {
		height: "390px",
		width: "100%",
		playerVars: {
			autoplay: 1,
		},
	};

	return (
		<>
			{trailer === true ? (
				<div className="movieTrailer">
					<div className="movieDetail__rightButton">
						<IoMdCloseCircleOutline onClick={(e) => setTrailer(false)} />
					</div>
					<div className="movieDetail__trailer">
						{trailerUrl ? (
							<YouTube videoId={trailerUrl} opts={opts} />
						) : (
							<h2>Ooops! No Trailer Available on Youtube</h2>
						)}
					</div>
				</div>
			) : (
				<>
					{showModal === "open" && (
						<div className="movieDetail">
							<div className="movieDetail__left">
								<img
									src={`${base_url}${
										movieDetails.backdrop_path || movieDetails.poster_path
									}`}
									alt=""
								/>
							</div>
							<div className="movieDetail__right">
								<div className="movieDetail__rightButton">
									<IoMdCloseCircleOutline onClick={(e) => reset(e)} />
								</div>
								<h2>{movieDetails.name || movieDetails.title}</h2>
								<h4>{truncate(movieDetails.overview, 400)}</h4>
								<button onClick={() => handleTrailer()}>PLAY TRAILER</button>
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
}

export default MovieDetail;
