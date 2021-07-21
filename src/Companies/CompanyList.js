import React from "react";

import CompanyCard from "./CompanyCard";
import Search from "../Helpers/Search";

const CompanyList = ({ companies, search }) => {
    return (
        <div className="CompanyList">
            {search ? 
                (
                <div className="CompanyList-search">
                    <Search search={search}/>
                </div> 
                ) : null 
            } 

            <div className="CompanyList-list">
                { companies.length 
                        ? companies.map(comp => 
                            <CompanyCard company={comp} key={comp.handle}/>) 
                        : <p>No Companies Found!</p>
                }
            </div>
        </div> 
    )
};
export default CompanyList