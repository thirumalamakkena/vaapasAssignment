import { useState } from "react";
import Card from "../Card";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchImage = async () => {
    const dogUrl = "https://dog.ceo/api/breeds/image/random";
    const dogData = await fetch(dogUrl);
    const dogJsonData = await dogData.json();
    return dogJsonData.message;
  };

  const handleSearch = async () => {
    setSearchResults([]);
    if (searchTerm === "") {
      alert("Please enter a search term");
      setSearchResults([]);
      return;
    }
    setErrorMsg("Loading Search Results...");
    const url = "https://openlibrary.org/search.json";
    const searchUrl = `${url}?q=${searchTerm}`;
    const data = await fetch(searchUrl);
    const jsonData = await data.json();
    if(data.status === 404) alert("No results found");  
    if(data.status === 500) alert("Server error");
    if(data.status === 503) alert("Service unavailable");
    if(data.status === 504) alert("Gateway timeout");
    
    const results = jsonData.docs.map((book) => ({
      id: uuidv4(),
      title: book.title,
      author: book.author_name,
      year: book.first_publish_year,
    }));
    for (let i = 0; i < results.length; i++) {
      const message = await fetchImage();
      results[i].image = message;
    }
    setSearchResults(results);
    setErrorMsg("");
    if (results.length === 0) alert("No results found");
  };

  return (
    <div className="app-container">
      <h1 className="heading">Welcome to the Movie Search App</h1>
      <p className="para">Search for your favorite movies</p>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search movies..."
        className="search_input"
      />
      <br />
      <button className="search_btn" onClick={handleSearch}>Search</button>
      <br />
      <p className="error">{errorMsg}</p>
      <ul className="movie_container">
        {searchResults.map((book) => (
          <Card
            key={book.id}
            image={book.image}
            title={book.title}
            author={book.author}
            publishedYear={book.year}
          />
        ))}
      </ul>
    </div>
  );
};

export default Home;
