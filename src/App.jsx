import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Client } from "@petfinder/petfinder-js";
import AnimalInfo from './components/AnimalInfo';
import BreedFilter from './components/BreedFilter';
import { Route, Routes, Link } from "react-router-dom";
import AnimalGraph from './components/AnimalGraph'
import AnimalDetail from './components/AnimalDetail';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

function App() {

  const [searchBar, setSearchBar] = useState('');
  const [animalList, setAnimalList] = useState([]);
  const [page, setPage] = useState(1);
  const [animalType, setAnimalType] = useState('');
  const [selectedBreed, setSelectedBreed] = useState(''); 

  const handleAnimalType = (event) => {
    setAnimalType(event.target.value);
  }

  const handleSearch = (event) => {
    setSearchBar(event.target.value);
  };

  const clearRadio = (event) =>{
    setAnimalType('');
    setSearchBar('');
    setSelectedBreed('');
  }
  const handleBreedChange = (breed) => {
    setSelectedBreed(breed);
  };

  return (
    <>
      <div className='nav-bar-container'>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/graphPage">Graph</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={
          <div>
            <h1>Let's adopt pets!</h1>
            <div className='filter-options'>
              <label className='radio-labels' htmlFor='dog-radio'>Dog</label>
              <input className='radio-buttons' type="radio" value = "dog" id="dog-radio" checked={animalType === "dog"} onChange = {handleAnimalType}></input>
              <label className='radio-labels' htmlFor='cat-radio'>Cat</label>
              <input className='radio-buttons' type="radio" value = "cat" id="cat-radio" checked={animalType === "cat"} onChange = {handleAnimalType}></input>
              <button className='clear-radio' onClick={clearRadio}>Clear</button>
              <br></br>
              <input className='search-bar'
              type="text"
              placeholder="Search by name"
              value={searchBar}
              onChange={handleSearch}
            />
            <BreedFilter
              animalType={animalType}
              onBreedChange={handleBreedChange}
            >
            </BreedFilter>
            </div>
            
            <div className="animal-list">
                <AnimalInfo 
                  searchBar={searchBar} 
                  page = {page}
                  animalType = {animalType}
                  breed = {selectedBreed}
                ></AnimalInfo>
            </div>
          </div>
        } />
        <Route path="/graphPage" element={<AnimalGraph></AnimalGraph>} />
        <Route path="/detail/:animalId" element={<AnimalDetail />} />
      </Routes>
    </>
  )
}

export default App
