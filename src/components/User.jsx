

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Personal Information Section
const PersonalInfo = ({ user, isEditMode, handleInputChange }) => {
  const fields = [
    { label: "Name", name: "username" },
    { label: "Father's Name", name: "father" },
    { label: "Mother's Name", name: "mother" },
    { label: "Address", name: "address" },
    { label: "Birth Mark", name: "birthMark" },
    { label: "Aadhaar Number", name: "aadhaarNumber" },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name}>
            {isEditMode ? (
              <>
                <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  value={user[field.name] || ""}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            ) : (
              <div>
                <span className="font-semibold">{field.label}:</span> {user[field.name] || "N/A"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Contact Information Section
const ContactInfo = ({ user, isEditMode, handleInputChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          {isEditMode ? (
            <>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={user.email || ""}
                onChange={handleInputChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          ) : (
            <div>
              <span className="font-semibold">Email:</span> {user.email || "N/A"}
            </div>
          )}
        </div>
        <div>
          {isEditMode ? (
            <>
              <label className="block text-sm font-medium text-gray-700">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={user.mobile || ""}
                onChange={handleInputChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          ) : (
            <div>
              <span className="font-semibold">Mobile:</span> {user.mobile || "N/A"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Documents Section
const Documents = ({ user, isEditMode, handleInputChange, handleDocumentDelete }) => {
  const documentFields = [
    { label: "10th Mark Sheet", name: "tenResult" },
    { label: "12th Mark Sheet", name: "twelveResult" },
    { label: "Aadhar Card", name: "aadhaar" },
    { label: "PAN Card", name: "pan" },
  ];

  const getDocumentName = (doc) => {
    if (doc instanceof File) return doc.name;
    if (typeof doc === "string") return doc.split("/").pop();
    return "No document uploaded";
  };

  const getDocumentUrl = (doc) => {
    return typeof doc === "string" ? doc : "#";
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Documents</h2>
      <div className="space-y-4">
        {documentFields.map((doc) => (
          <div key={doc.name}>
            <label className="block text-sm font-medium text-gray-700">{doc.label}</label>
            {isEditMode ? (
              <div>
                {user[doc.name] && (
                  <div className="flex items-center mb-2">
                    <span>Current: {getDocumentName(user[doc.name])}</span>
                    <button
                      type="button"
                      onClick={() => handleDocumentDelete(doc.name)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  name={doc.name}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded"
                />
              </div>
            ) : (
              <div>
                {user[doc.name] ? (
                  <div className="flex items-center space-x-2">
                    <a
                      href={getDocumentUrl(user[doc.name])}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View {doc.label}
                    </a>
                    <button
                      onClick={async () => {
                        try {
                          const fileUrl = getDocumentUrl(user[doc.name]);
                          const response = await fetch(fileUrl);
                          if (!response.ok) throw new Error("Failed to fetch file");
                          const blob = await response.blob();
                          const link = document.createElement("a");
                          link.href = URL.createObjectURL(blob);
                          const filename = fileUrl.split("/").pop() || doc.label || "document";
                          link.setAttribute("download", filename);
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        } catch (error) {
                          console.error("Error downloading file:", error);
                          alert("Failed to download document.");
                        }
                      }}
                      className="ml-2 px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Download
                    </button>
                  </div>
                ) : (
                  "No document uploaded"
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Additional Information Section
const AdditionalInfo = ({ user, isEditMode, handleInputChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">NCC</label>
          {isEditMode ? (
            <input
              type="checkbox"
              name="ncc"
              checked={user.ncc || false}
              onChange={handleInputChange}
              className="mt-1"
            />
          ) : (
            <div>{user.ncc ? "Yes" : "No"}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ex-serviceman</label>
          {isEditMode ? (
            <input
              type="checkbox"
              name="xServiceMan"
              checked={user.xServiceMan || false}
              onChange={handleInputChange}
              className="mt-1"
            />
          ) : (
            <div>{user.xServiceMan ? "Yes" : "No"}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Exam Goal</label>
          {isEditMode ? (
            <input
              type="text"
              name="examGoal"
              value={user.examGoal || ""}
              onChange={handleInputChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <div>{user.examGoal || "N/A"}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Deadline</label>
          {isEditMode ? (
            <input
              type="date"
              name="deadline"
              value={user.deadline || ""}
              onChange={handleInputChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <div>{user.deadline || "N/A"}</div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const UserDashboard = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    mobile: "",
    father: "",
    mother: "",
    address: "",
    birthMark: "",
    aadhaarNumber: "",
    tenResult: null,
    twelveResult: null,
    aadhaar: null,
    pan: null,
    ncc: false,
    xServiceMan: false,
    examGoal: "",
    deadline: "",
  });
  const [originalUser, setOriginalUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:3000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("✅ User Data:", response.data);
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        if (err.response && err.response.status === 401) {
          navigate("/login");
        }
      }
    };
    fetchUser();
  }, [navigate]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setUser((prev) => ({ ...prev, [name]: files[0] }));
    } else if (type === "checkbox") {
      setUser((prev) => ({ ...prev, [name]: e.target.checked }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in user) {
      if (user[key] !== null && user[key] !== undefined) {
        if (key === "documents") {
          data.append(key, JSON.stringify(user[key] || {}));
        } else if (key === "aadhaarNumber") {
          data.append(key, user[key] || "");
        } else {
          data.append(key, user[key]);
        }
      }
    }
    console.log("🔍 Sending Data to Backend:", Object.fromEntries(data));
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put("http://localhost:3000/api/users/me", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setIsEditMode(false);
      alert("Details updated successfully!");
    } catch (err) {
      alert("Failed to update details.");
      console.error(err);
    }
  };

  // Toggle edit mode
  const handleEditToggle = () => {
    if (isEditMode) {
      setUser(originalUser);
      setIsEditMode(false);
    } else {
      setOriginalUser({ ...user });
      setIsEditMode(true);
    }
  };

  // Handle document deletion
  const handleDocumentDelete = async (docName) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await fetch(`http://localhost:3000/api/users/documents/${docName}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Failed to delete document");
      }
      setUser((prev) => ({ ...prev, [docName]: "" }));
      console.log(`Document ${docName} deleted successfully`);
    } catch (error) {
      console.error("Error deleting document:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">User Dashboard</h1>
        <div className="flex justify-end mb-6">
          {isEditMode ? (
            <>
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mr-2"
              >
                Save Changes
              </button>
              <button
                onClick={handleEditToggle}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEditToggle}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
        <div className="space-y-6">
          <PersonalInfo user={user} isEditMode={isEditMode} handleInputChange={handleInputChange} />
          <ContactInfo user={user} isEditMode={isEditMode} handleInputChange={handleInputChange} />
          <Documents
            user={user}
            isEditMode={isEditMode}
            handleInputChange={handleInputChange}
            handleDocumentDelete={handleDocumentDelete}
          />
          <AdditionalInfo
            user={user}
            isEditMode={isEditMode}
            handleInputChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;