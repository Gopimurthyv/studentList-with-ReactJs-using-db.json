import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Update() {
const { id } = useParams();

    const [values,setValues] = useState({
        name: '',
        id: '',
        date: '',
        parentName: '',
        city: '',
        grade: '',
    })

    useEffect(()=>{
        axios.get("http://localhost:1111/Student/" + id)
            .then(res => setValues(res.data))
            .catch(err => console.log(err));
    },[id]); 

    const n = useNavigate();
    const handleSubmit=e=>{
        e.preventDefault();
        axios.put("http://localhost:1111/Student/" + id,values)
        .then(res=>{
           /*  alert("Data Updated Successfully ! ..") */
            n('/');
        })
    }

  const gradeOptions = [
      { value: "LKG",  bgColor: "rgba(255, 215, 0, 0.9)" }, 
      { value: "UKG",  bgColor: "rgba(255, 105, 180, 0.9)" }, 
      { value: "I",  bgColor: "rgba(127, 255, 0, 0.9)" }, 
      { value: "II",  bgColor: "rgba(0, 255, 255, 0.9)" }, 
      { value: "III",  bgColor: "rgba(255, 69, 0, 0.9)" }, 
      { value: "IV",  bgColor: "rgba(148, 0, 211, 0.9)" }, 
      { value: "V",  bgColor: "rgba(30, 144, 255, 0.9)" }, 
      { value: "VI",  bgColor: "rgba(50, 205, 50, 0.9)" }, 
      { value: "VII",  bgColor: "rgba(255, 99, 71, 0.9)" }, 
      { value: "VIII",  bgColor: "rgba(138, 43, 226, 0.9)" }, 
      { value: "IX",  bgColor: "rgba(220, 20, 60, 0.9)" }, 
      { value: "X",  bgColor: "rgba(255, 140, 0, 0.9)" }, 
      { value: "XI",  bgColor: "rgba(106, 90, 205, 0.9)" }, 
      { value: "XII", bgColor: "rgba(32, 178, 170, 0.9)" }, 
    ];
  return (
    <div className="custom-container mt-5 p-4 shadow-lg rounded">
      <h4 className="mb-4 text-primary text-center">Student Details</h4>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="row mb-4">
          <div className="col-md-12">
            <label htmlFor="name" className="form-label"> Name </label>
            <input type="text" className="form-control custom-input" id="name" placeholder="Enter Student Name" 
              value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })}/>
          </div>
        </div>

        {/* Id and Date */}
        <div className="row mb-4">
          {/* Id */}
          <div className="col-md-6">
            <label htmlFor="id" className="form-label"> Student ID </label>
            <input type="number" className="form-control custom-input" id="id" placeholder="Enter Student ID"
            value={values.id} onChange={(e) => setValues({ ...values, id: e.target.value })} disabled/>
          </div>
          {/* Date */}
          <div className="col-md-6">
            <label htmlFor="date" className="form-label"> Date </label>
            <input type="date" className="form-control custom-input" id="date"
              value={values.date} onChange={(e) => setValues({ ...values, date: e.target.value })}/>
          </div>
        </div>

        {/* Parent Name and City */}
        <div className="row mb-4">
          {/* Parent Name */}
          <div className="col-md-6">
            <label htmlFor="parentName" className="form-label"> Parent Name </label>
            <input type="text" className="form-control custom-input" id="parentName" placeholder="Enter Parent's Name"
              value={values.parentName} onChange={(e) => setValues({ ...values, parentName: e.target.value })}/>
          </div>
          {/* City */}
          <div className="col-md-6">
            <label htmlFor="city" className="form-label"> City </label>
            <input type="text" className="form-control custom-input" id="city" placeholder="Enter City"
              value={values.city} onChange={(e) => setValues({ ...values, city: e.target.value })}/>
          </div>
        </div>

        {/* Grade */}
        <div className="row mb-4">
          <div className="col-md-12">
            <label htmlFor="grade" className="form-label"> Grade </label>
            <select className="form-control" id="grade" name="grade" style={{ maxHeight: "150px", overflowY: "scroll" }}
              value={values.grade} onChange={(e) => setValues({ ...values, grade: e.target.value })}>
              {gradeOptions.map((option) => (
                <option key={option.value} value={option.value}
                  style={{ 
                    color: option.bgColor,
                    padding: "4px",
                    transition: "background 0.3s ease",
                    opacity: "0.5", 
                    fontWeight: "bolder",
                  }}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary custom-btn"> SAVE </button>
          <Link class="btn btn-danger text-white ms-3" to="/">{" "}Back{" "}</Link>
        </div>
      </form>
    </div>
  )
}