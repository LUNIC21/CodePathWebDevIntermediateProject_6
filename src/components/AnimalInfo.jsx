import { useEffect, useState } from "react";
import axios from 'axios';
import { Client } from "@petfinder/petfinder-js";
import '../App.css';
import defaultPetImage from '../assets/default-pet-image.jpg';
import { Link } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const API_SECRET = import.meta.env.VITE_APP_SECRET_KEY;

const AnimalInfo = ({ searchBar, page, breed, animalType }) =>{

    // const API_LIST = "https://api.petfinder.com/v2/animals"
    const [animalList, setAnimalList] = useState([]);
    const client = new Client({ apiKey: API_KEY, secret: API_SECRET });

    const [filteredAnimalList, setFilteredAnimalList] = useState([]);

    const animalListInitialize = async () => {
        try {
            const response = await client.animal.search({
                limit: 100,
                page: page,
                type: animalType,
                breed: breed || undefined

            });
            console.log('Animal list response:', response);
            setAnimalList(response.data.animals);
        } catch (error) {
            console.error('Error fetching animal list:', error);
        }
    };

    useEffect(() => {
        animalListInitialize();
    }, []);

    useEffect(() => {
        const filteredAnimals = animalList.filter((animal) =>
            animal.name.toLowerCase().includes(searchBar.toLowerCase())
        );
        setFilteredAnimalList(filteredAnimals);
        console.log(breed);
    }, [searchBar, animalList, breed]);

    useEffect(() => {
        animalListInitialize();
    }, [page, animalType]);

    return (
        <div className="list-container">
            <div className="animal-list">
                <h2>Animal List</h2>
                
                {animalList.map((animal) => {
                    // Check if the animal's name includes the search bar text
                    if (animal.name.toLowerCase().includes(searchBar.toLowerCase())) {
                        return (
                            <div key={animal.id} className="animal-card">
                                <h3 className="animal-name">{animal.name}</h3>
                                <Link to={`/detail/${animal.id}`}>
                                    {animal.photos.length > 0 ? (
                                        <img className="animal-photo" src={animal.photos[0].large} alt={animal.name}></img>
                                    ) : (
                                        <img className="animal-photo" src={defaultPetImage} alt="default" />
                                    )}
                                </Link>
                                <br></br>
                                <span className="animal-metadata">species: {animal.species}</span>
                                <span className="animal-metadata">breed: {animal.breeds.primary} {animal.breeds.secondary && animal.breeds.secondary}</span>
                                <span className="animal-metadata">coat: {animal.coat}</span>
                                <span className="animal-metadata">color: {animal.colors.primary} {animal.colors.secondary && animal.colors.secondary} </span>
                                <span className="animal-metadata">age: {animal.age}</span>
                                <span className="animal-metadata">gender: {animal.gender}</span>
                                <span className="animal-metadata">size: {animal.size}</span>

                                <div className="animal-tags">
                                    Tags: {animal.tags.map((tag, index) => (
                                        <span key={index} className="animal-tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    } else {
                        return null; // Hide the card if it doesn't match the search criteria
                    }
                })}
            </div>
        </div>
    );
}

export default AnimalInfo;