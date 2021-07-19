import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import joblyApi from "../api";
import JobsList from "../Jobs/JobsList";

const CompanyDetail = () => {
    const history = useHistory();
    const handle = useParams().handle;
    const [ company, setCompany ] = useState(false);
    const [jobs, setJobs] = useState([]);

    const filterJobs = term => {
        setJobs(company.jobs.filter(job => job.title.toLowerCase().includes(term.toLowerCase()))
        );
    }

    useEffect( () => {
        async function getCompany(){
            try {
                const company = await joblyApi.getCompany(handle);
                setCompany(company);
                setJobs(company.jobs);
            } catch (e) {
                history.push("/companies")
            }
        }
        getCompany();
    }, [handle, history]);
    
    if(company === false) return <p>Loading Company Data...</p>
    else {
        const {name, description, numEmployees, logoUrl} = company;
        return (
            <div className="Company">
                <div>{ name }</div>
                <div>{ description }</div>
                <div>{ numEmployees }</div>
                <img src={ logoUrl } alt={name}/>
                {<JobsList jobs={jobs} search={filterJobs}/>}
            </div>
        )
    }
};
export default CompanyDetail