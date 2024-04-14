"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://jobapi-qfqj.onrender.com/api/v1";

const getAllJobs = async () => {
  try {
    const token = localStorage.getItem("jobToken");

    const response = await axios.get(`${API_BASE_URL}/jobs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.jobs;
  } catch (error) {
    alert("Error fetching jobs:");
    throw new Error("Failed to fetch jobs");
  }
};

export default function JobsList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await getAllJobs();
        setJobs(jobsData);
      } catch (error) {
        alert("Error fetching the database, try again later");
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      const token = localStorage.getItem("jobToken");
      const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      setJobs(jobs.filter((job) => job._id !== jobId));
      alert("Deleted Succesfully");
    } catch (error) {
      alert("Could not delete the job, try again later");
    }
  };
  const handleUpdate = async (jobId, newData) => {
    try {
      const token = localStorage.getItem("jobToken");
      const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
        method: "PATCH",
        newData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to update job");
      }

      const updatedJobsCopy = [...jobs];
      const index = updatedJobsCopy.findIndex((job) => job._id === jobId);
      if (index !== -1) {
        updatedJobsCopy[index] = { ...updatedJobsCopy[index], ...newData };
        setJobs(updatedJobsCopy);
      }
    } catch (error) {
      alert("Error updating job");
    }
  };

  const showUpdateModal = (jobId) => {
    const updatedCompany = prompt("Enter updated company:");
    const updatedPosition = prompt("Enter updated position:");
    const updatedStatus = prompt(
      "Select updated status (interview/declined/pending):"
    );

    if (
      updatedCompany &&
      updatedPosition &&
      ["interview", "declined", "pending"].includes(updatedStatus)
    ) {
      const newData = {
        company: updatedCompany,
        position: updatedPosition,
        status: updatedStatus,
      };
      handleUpdate(jobId, newData);
    } else {
      alert("Invalid inputs");
      // Handle invalid input UI state
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-10">
        {jobs.map((job, index) => (
          <div
            className="p-10 w-[620px] gap-5 justify-between bg-gray-200 rounded-xl flex"
            key={job._id}
          >
            <div className="flex gap-4">
              {index + 1}.
              <div className="flex flex-col gap-5">
                <h2> Company :- {job.company}</h2>
                <p>position :- {job.position}</p>
                <p>Status :- {job.status}</p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <button
                className="btn btn-outline btn-error"
                onClick={() => handleDelete(job._id)}
              >
                Delete
              </button>
              <button
                className="btn btn-outline btn-primary"
                onClick={() => showUpdateModal(job._id)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
