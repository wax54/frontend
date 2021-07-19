import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css"

const CompanyCard = ({ company: { handle, name, description, logoUrl } }) => (
    <div className="CompanyCard">
        {name}
        {logoUrl ? 
            <img src={logoUrl} alt="" width="100px"  />
            : null}
        <Link to={`/companies/${handle}`}>View Company</Link>
    </div> 
);
export default CompanyCard