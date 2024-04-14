"use client";
import axios from "axios";

const createJob = async (m_company, m_position) => {
  try {
    const token = localStorage.getItem("jobToken");
    if (!token) {
      throw new Error("No token found");
    }

    const company = String(m_company);
    const position = String(m_position);
    console.log(company);
    const jobData = {
      company: company,
      position: position,
    };
    console.log(jobData);

    const response = await axios.post(
      "https://jobapi-qfqj.onrender.com/api/v1/jobs",
      jobData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Job created:", response.data.job);
    return response.data.job;
  } catch (error) {
    console.error("Error creating job:", error);
    throw new Error("Failed to create job");
  }
};

export default createJob;
