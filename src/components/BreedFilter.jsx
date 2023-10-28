import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Client } from "@petfinder/petfinder-js";
import '../App.css';

const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const API_SECRET = import.meta.env.VITE_APP_SECRET_KEY;

const BreedFilter = ({ animalType, onBreedChange }) => {
    const client = new Client({ apiKey: API_KEY, secret: API_SECRET });
    const [breeds, setBreeds] = useState([]);
  
    const breedListInitialize = async () => {
      try {
        const response = await client.animalData.breeds(animalType);
        console.log('Breeds:', response.data);
        if (response.data.breeds) {
          setBreeds(response.data.breeds);
        } else {
          console.error('No breeds found.');
        }
      } catch (error) {
        setBreeds([]);
        console.error('Error fetching breeds list:', error);
      }
    };

    const onChange = (e) => {
        const selectedBreed = e;
        onBreedChange(selectedBreed);
    }
  
    useEffect(() => {
      breedListInitialize();
    }, [animalType]);
  
    return (
      <div>
        <label className='breed-label'  htmlFor="breed">Select Breed:</label>
        <select className='breed-dropdown'  id="breed" onChange={(e) => onChange(e.target.value)}>
          <option value="">All Breeds</option>
          {breeds.map((breed) => (
            <option key={breed.id} value={breed.id}>
              {breed.name}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default BreedFilter;