import React, { useContext } from "react";
import UserContext from "../UserContext";
import "./JobCard.css";


const JobCard = ({ job }) => { 
    const {user, applyToJob} = useContext(UserContext);
    const apply = () => {
        applyToJob(job.id);
    }
    let applicationButton;

    if(user.applications.find(id => job.id === id)){
        applicationButton = <button disabled>Already Applied!</button>
    } else {
        applicationButton = <button onClick={apply}>Apply!</button>
    }

    return (
        <div className="JobCard">
            <div>{job.id}</div>
            <div>{job.title}</div>

            <div>{ job.equity }</div >

            <div>{ job.salary }</div >

            <div>{ job.companyHandle }</div>
            { applicationButton }

        </div> 
    )
};
export default JobCard