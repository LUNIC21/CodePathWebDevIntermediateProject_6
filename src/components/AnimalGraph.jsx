import { useEffect, useState } from "react";
import axios from 'axios';
import { Client } from "@petfinder/petfinder-js";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../Graph.css';

const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const API_SECRET = import.meta.env.VITE_APP_SECRET_KEY;

const AnimalGraph = ({ }) =>{
    const client = new Client({ apiKey: API_KEY, secret: API_SECRET });

    const [breedList, setBreedList] = useState([]);
    const [chartData, setChartData] = useState({});

    const getTotalAvailablePets = async () => {
        try {
            const response1 = await client.animal.search({
              limit: 100,
              page: 1
            });

            const response2 = await client.animal.search({
                limit: 100,
                page: 2
              });

            const response3 = await client.animal.search({
                limit: 100,
                page: 3
            });

            const combinedResponse = [
                ...response1.data.animals,
                ...response2.data.animals,
                ...response3.data.animals
            ];

            setBreedList(combinedResponse);
            
        } catch (error) {
            console.error('Error fetching total available pets count:', error);
            return 0;
        }
    };

    const processBreedData = () => {
        const breedCounts = {};
    
        breedList.forEach((animal) => {
            const primaryBreed = animal.breeds.primary;
            if (primaryBreed) {
                const breedKey = primaryBreed.toLowerCase(); // Normalize the breed name
                if (breedCounts[breedKey]) {
                    breedCounts[breedKey] += 1;
                } else {
                    breedCounts[breedKey] = 1;
                }
            }
        });
    
        // Convert the breedCounts object back into an array
        const chartData = Object.entries(breedCounts).map(([breed, count]) => ({
            breed: breed,
            count: count,
        }));
    
        // Sort the data by count in descending order
        chartData.sort((a, b) => b.count - a.count);
    
        // Slice the data to get the top 10 breeds
        const top10Breeds = chartData.slice(0, 10);
    
        setChartData(top10Breeds);
    };

    useEffect(() => {
        getTotalAvailablePets();
    }, []);

    useEffect(() => {
        if (breedList.length > 0) {
            processBreedData();
        }
    }, [breedList]);

    return (
        <div className="animal-graph">
            <h1>Graph of Top 10 Breeds</h1>
            <div style={{ marginLeft: "200px" }}>
                <ResponsiveContainer width="100%" height={800}>
                    <BarChart width={300} height={300} data={chartData}>
                        <XAxis dataKey="breed" angle={80} dy={110} height={250} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default AnimalGraph;