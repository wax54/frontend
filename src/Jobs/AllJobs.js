import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import JobsList from "./JobsList";

const AllJobs = () => {
    const [jobs, setJobs] = useState(false);

    useEffect(() => {
        async function getAllJobs(){
            const jobs = await JoblyApi.getJobs(); 
            setJobs(jobs);
        }
        getAllJobs();
    }, []);

    if(jobs === false) return <p>Loading Jobs...</p>
    else return <JobsList jobs={jobs} /> 
};
export default AllJobs