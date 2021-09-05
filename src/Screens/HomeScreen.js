import React from "react";
import "./styles/HomeScreen.css";
//components
import Nav from "../Components/Nav";
import Banner from "../Components/Banner";
import requests from "../Components/Requests";
import Row from "../Components/Row";

function HomeScreen() {
	return (
		<div className="homeScreen">
			<Nav />
			<Banner />
			<Row title="Trending Now" fetchUrl={requests.fetchTrending} isLargeRow />
			<Row
				title="Comedy Movies"
				fetchUrl={requests.fetchComedyMovies}
				isLargeRow
			/>

			<Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
			<Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
			<Row
				title="NETFLIX ORIGNALS"
				fetchUrl={requests.fetchNetflixOriginals}
				isLargeRow
			/>
			<Row
				title="Horror Movies"
				fetchUrl={requests.fetchHorrorMovies}
				isLargeRow
			/>
			<Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
			<Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
		</div>
	);
}
export default HomeScreen;
