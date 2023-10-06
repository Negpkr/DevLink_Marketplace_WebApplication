import React, { createContext, useState, useEffect} from "react";
import { fetchStaffAndDocuments } from "../utils/firebase";

export const StaffContext = createContext({
staff: [],
})

export const StaffProvider = ({children}) =>{
    const [staff, setStaff] = useState([])
    useEffect(()=>{
        const fetchStaffMap = async() =>{
            const staffMap = await fetchStaffAndDocuments('Jobs');
            console.log(staffMap)
        }
        fetchStaffMap();
    }, [])
    const value = {staff}
    return(
        <StaffContext.Provider value = {value}> {children}</StaffContext.Provider>
    )
}