import React from "react";
import Search from "../Helpers/Search";
import JobCard from "./JobCard";

const JobsList = ({ jobs, search }) => (
    <div className="JobsList">
        {search ? <Search  search={search} /> : null }
        {jobs.map(job => <JobCard key={job.id} job={job} />)}
    </div> 
);
export default JobsList