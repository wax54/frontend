import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import JobsList from "./JobsList";

const AllJobs = () => {
    const [jobs, setJobs] = useState(false);
    const [query, setQuery] = useState(false);


    useEffect(() => {
        async function getAllJobs(){
            try {
                const jobs = await JoblyApi.getJobs(query); 
                setJobs(jobs);
            } catch {
                setJobs([]);
            }
        }
        getAllJobs();
    }, [query]);


    const searchByTitle = term => { term ? setQuery({ title: term }) : setQuery({}) };

    if(jobs === false) return <p>Loading Jobs...</p>
    else return <JobsList jobs={jobs} search={searchByTitle}/> 
};
export default AllJobs