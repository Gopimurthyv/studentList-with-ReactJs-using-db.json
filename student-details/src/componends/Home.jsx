import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { FaPenToSquare, FaTrashCan} from 'react-icons/fa6';
import "../componends/style.css";


export default function Home() {
    const [data,setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const n = useNavigate();

    // Fetch data from the API
    const getData = async () => {
        try {
            const res = await axios.get("http://localhost:1111/Student");
            setData(res.data || []);
        } catch (error) {
            console.error("Error fetching news data:", error);
        }
    };

    useEffect(()=>{
        getData();
    },[])

    // Sort by newest
    const handleSortNewest = () => {
        const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
        setData(sortedData);
    };

    // Filter data based on search query
    const filteredData = data.filter((item) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            item.name.toLowerCase().includes(searchLower) || // Search by name
            item.city.toLowerCase().includes(searchLower) || // Search by city
            item.parentName.toLowerCase().includes(searchLower)   // Search by parentName
        );
    });

    // Delete Function
    const handleDelete = (id) => {
        axios.delete(`http://localhost:1111/Student/${id}`)  
            .then(res => {
            alert('Deleted Successfully');
            window.location.reload();
            n('/');  
        }).catch(err => {
            console.error('Error deleting:', err);
        });
    }

    // TextColor and Background-Color for Grade
    const gradeOptions = {
        LKG: { txtColor: "#000000", bgColor: "rgba(255, 215, 0, 0.9)" },
        UKG: { txtColor: "#FFFFFF", bgColor: "rgba(255, 105, 180, 0.9)" },
        I: { txtColor: "#FFFFFF", bgColor: "rgba(127, 255, 0, 0.9)" },
        II: { txtColor: "#000000", bgColor: "rgba(0, 255, 255, 0.9)" },
        III: { txtColor: "#FFFFFF", bgColor: "rgba(255, 69, 0, 0.9)" },
        IV: { txtColor: "#FFFFFF", bgColor: "rgba(148, 0, 211, 0.9)" },
        V: { txtColor: "#FFFFFF", bgColor: "rgba(30, 144, 255, 0.9)" },
        VI: { txtColor: "#FFFFFF", bgColor: "rgba(50, 205, 50, 0.9)" },
        VII: { txtColor: "#000000", bgColor: "rgba(255, 99, 71, 0.9)" },
        VIII: { txtColor: "#FFFFFF", bgColor: "rgba(138, 43, 226, 0.9)" },
        IX: { txtColor: "#FFFFFF", bgColor: "rgba(220, 20, 60, 0.9)" },
        X: { txtColor: "#000000", bgColor: "rgba(255, 140, 0, 0.9)" },
        XI: { txtColor: "#FFFFFF", bgColor: "rgba(106, 90, 205, 0.9)" },
        XII: { txtColor: "#FFFFFF", bgColor: "rgba(32, 178, 170, 0.9)" },
    };
    return (
        <>
            <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100 '>
                <h1 className='home-h1'>STUDENT DETAILS</h1>
                <div className='w-75 border shadow p-3 mb-5 bg-body-tertiary rounded p-4 white'>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        {/* Search Box */}
                        <input type="text" placeholder="Search..." className="form-control border border-dark-subtle w-25" 
                        value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                        {/* Buttons */}
                        <div className="d-flex align-items-center">
                            <Link>
                                <button className="btn btn-outline-primary rounded mx-5" onClick={handleSortNewest}>
                                    Newest
                                </button>
                            </Link>
                            <Link to="/Add">
                                <button className="btn btn-primary fw-medium">
                                    <span className="p-2 fs-5">+</span> New Student
                                </button>
                            </Link>
                        </div>
                    </div>
                    {/* Table Content */}
                    <table className='table table-striped table-hover'>
                        <thead className='text-bg-primary p-3'>
                            <th>Name</th>
                            <th>Id</th>
                            <th>Date</th>
                            <th>Parent Name</th>
                            <th>City</th>
                            <th>Grade</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((item, i) => {
                                const gradeStyle = gradeOptions[item.grade] || { txtColor: "#000000", bgColor: "#FFFFFF" };
                                return (
                                    <tr key={i}>
                                        <td>{item.name}</td>
                                        <td>{item.id}</td>
                                        <td>{item.date}</td>
                                        <td>{item.parentName}</td>
                                        <td>{item.city}</td>
                                        <td style={{color: gradeStyle.txtColor,
                                                backgroundColor: gradeStyle.bgColor,
                                                fontWeight: "bold",
                                                textAlign: "center", }}>
                                            {item.grade}
                                        </td>
                                        <td>
                                            <Link to={`/update/${item.id}`}><FaPenToSquare className='edit'/></Link> &nbsp; &nbsp;:  
                                            <span onClick={()=>handleDelete(item.id)}><FaTrashCan className='delete ms-3 shadow'/></span>
                                        </td>
                                    </tr>
                                );
                            })
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
