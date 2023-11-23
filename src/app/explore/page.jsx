"use client";
import { useState, useEffect } from "react";
import { getCategoriesNeo4J } from "../../../neo4j";
import ExploreView from "./exploreView";

export default function Explore () {   
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategoriesNeo4J();
                setCategories(data);
            } catch (error) {
                console.error('Error al obtener categorías:', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <>
            <ExploreView categories={categories}/>
        </>
    )
}

