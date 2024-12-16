import React, { useState } from "react";
import Groq from "groq-sdk";
import { Loader2, AlertTriangle } from "lucide-react";

// Initialize Groq
const apiKey = import.meta.env.VITE_GROQ_API_KEY;
const groq = new Groq({ apiKey: apiKey, dangerouslyAllowBrowser: true });

// Custom Alert component
const CustomAlert = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
    <div className="flex items-center">
      <AlertTriangle className="h-5 w-5 mr-2" />
      <span className="block sm:inline">{message}</span>
    </div>
  </div>
);

// Job Card component
const JobCard = ({ title, description }) => (
  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg mb-4 transition-transform transform hover:scale-105">
    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </div>
);

// Job Assistance component
const JobAssistance = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an AI job advisor. Provide job suggestions based on the user's experience, skills, interests, and other relevant factors. Return a JSON array of jobs with titles and descriptions tailored."
          },
          {
            role: "user",
            content: JSON.stringify(formData),
          },
        ],
        model: "mixtral-8x7b-32768",
      });
  
      const responseContent = response.choices[0]?.message?.content || "";
  
      console.log("AI Response:", responseContent);
  
      let jobsList = [];
      try {
        const parsedResponse = JSON.parse(responseContent);
        if (!Array.isArray(parsedResponse.jobs)) {
          throw new Error("Response does not contain a valid 'jobs' array");
        }
        jobsList = parsedResponse.jobs;
      } catch (parseError) {
        console.error("JSON Parsing Error:", parseError);
        setError("Received invalid data. Please try again.");
        return;
      }
  
      setJobs(jobsList);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("An error occurred while fetching job suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto mt-10 mb-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Personalized Job Search</h2>

      <JobAssistanceForm onSubmit={handleSubmit} />

      {loading && <div className="text-center">Loading...</div>}
      {error && <CustomAlert message={error} />}

      <div className="mt-6">
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <JobCard key={index} title={job.title} description={job.description} />
          ))
        ) : (
          <p>No jobs available.</p>
        )}
      </div>

    </div>
  );
};

// Job Assistance Form component
const JobAssistanceForm = ({ onSubmit }) => {
  const [skills, setSkills] = useState("");
  const [legalRestrictions, setLegalRestrictions] = useState("");
  const [interest, setInterest] = useState("");
  const [rehabilitationPrograms, setRehabilitationPrograms] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      skills,
      legalRestrictions,
      interest,
      rehabilitationPrograms,
    });
    // Reset form fields
    setSkills("");
    setLegalRestrictions("");
    setInterest("");
    setRehabilitationPrograms("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">


      <div>
        <label className="block text-gray-700">Skills and Training</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="List your skills and training"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-gray-700">Legal Restrictions</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Specify any legal restrictions"
          value={legalRestrictions}
          onChange={(e) => setLegalRestrictions(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-gray-700">Interests</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="What are your interests?"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-gray-700">Rehabilitation Programs</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Any rehabilitation programs you are part of?"
          value={rehabilitationPrograms}
          onChange={(e) => setRehabilitationPrograms(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export default JobAssistance;
