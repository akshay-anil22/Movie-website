import "./App.css";
import React, { useState } from "react";
import { useEffect } from "react";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

//d175f8c8
const API_URL = "http://www.omdbapi.com?apikey=d175f8c8";

const movie1 = {
  Title: "Amazing Spiderman Syndrome",
  Year: "2012",
  imdbID: "tt2586634",
  Type: "movie",
  Poster: "N/A",
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalresult, setTotalResult]= useState(0);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data);
    setMovies(data.Search);
    setTotalResult(data.totalResults);
  };

  useEffect(() => {
    searchMovies("Spiderman");
  }, []);
  
  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
        <h3>Total Results : {totalresult} </h3>
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((val) => (
            <MovieCard movie={val} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2> No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
