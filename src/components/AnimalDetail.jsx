import '../App.css';
import { useEffect, useState } from "react";
import { Client } from "@petfinder/petfinder-js";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import defaultPetImage from '../assets/default-pet-image.jpg';

const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const API_SECRET = import.meta.env.VITE_APP_SECRET_KEY;

const AnimalDetail = () => {
    const client = new Client({ apiKey: API_KEY, secret: API_SECRET });
    const [animal, setAnimal] = useState(null);

    const { animalId } = useParams();

    console.log(animalId);

    useEffect(() => {
        const fetchAnimalDetails = async () => {
            try {
                const response = await client.animal.show(animalId);
                console.log('Animal Detail:', response);
                setAnimal(response.data.animal);
            } catch (error) {
                console.error('Error fetching animal details:', error);
            }
        };

        fetchAnimalDetails();
    }, [animalId]);

    if (!animal) {
        return <div>Loading...</div>;
    }

    return (
        <div className="animal-detail">
            <h2>{animal.name}'s Details</h2>
            {animal.photos.length > 0 ? (
                <img className="animal-photo" src={animal.photos[0].large} alt={animal.name} />
            ) : <img className="animal-photo" src={defaultPetImage} alt="default" />}
            <p>Type: {animal.type}</p>
            <p>Species: {animal.species}</p>
            <p>Breeds: {animal.breeds.primary} {animal.breeds.secondary && animal.breeds.secondary}</p>
            <p>Colors: {animal.colors.primary} {animal.colors.secondary && animal.colors.secondary}</p>
            <p>Age: {animal.age}</p>
            <p>Gender: {animal.gender}</p>
            <p>Size: {animal.size}</p>
            <p>Coat: {animal.coat}</p>
            <p>Description: {animal.description}</p>
        </div>
    );
}

export default AnimalDetail;