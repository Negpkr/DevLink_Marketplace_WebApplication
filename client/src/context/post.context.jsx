import React, { createContext, useState, useEffect} from "react";
import { fetchJobAndDocuments } from "../utils/firebase";
export const JobContext = createContext({
job: {},
})

//make Job details reusable in other files
export const JobProvider = ({children}) =>{
    const [job, setJob] = useState({})
    useEffect(()=>{
        const fetchJobMap = async() =>{
            const jobMap = await fetchJobAndDocuments('Jobs');
            console.log(jobMap)
            setJob(jobMap)
        }
        fetchJobMap();
    }, [])
    const value = {job}
    return(
        <JobContext.Provider value = {value}> {children}</JobContext.Provider>
    )
}
