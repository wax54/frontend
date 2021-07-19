import React, { useEffect, useState } from "react";
import joblyApi from "../api";

import CompanyCard from "./CompanyCard";
import Search from "../Helpers/Search";

const CompanyList = () => {
    const [ isLoading, setIsLoading ] = useState(true);

    const [ companies, setCompanies ] = useState([]);
    const [ query, setQuery ] = useState({});

    useEffect( () => {
        async function getCompanies() {
            setIsLoading(true);

            const companies = await joblyApi.getCompanies(query);
            setCompanies(companies);

            setIsLoading(false);
        }
        getCompanies();
    }, [query]);

    const searchCompanies = term => { term ? setQuery({ name: term }) : setQuery({}) };

    return (
        <div className="CompanyList">
            <div className="CompanyList-search">
                <Search search={searchCompanies}/>
            </div>

            <div className="CompanyList-list">
                {isLoading 
                    ? <p>Loading Companies</p>
                    : companies.length 
                        ? companies.map(comp => 
                            <CompanyCard company={comp} key={comp.handle}/>) 
                        : <p>No Companies Found!</p>
                }
            </div>
        </div> 
    )
};
export default CompanyList