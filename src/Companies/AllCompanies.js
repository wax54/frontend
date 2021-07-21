import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import CompanyList from "./CompanyList";

const AllCompanies = () => {
    const [companies, setCompanies] = useState(false);
    const [query, setQuery] = useState({});
    
    useEffect(() => {
        async function getAllCompanies() {
            try {
                const companies = await JoblyApi.getCompanies(query);
                setCompanies(companies);
            } catch (e) {
                setCompanies([]);
            }
        }
        getAllCompanies();
    }, [query]);

    const searchByName = term => { term ? setQuery({ name: term }) : setQuery({}) };

    if (companies === false) return <p>Loading Companies...</p>
    else return <CompanyList companies={companies} search={searchByName}/>
};
export default AllCompanies