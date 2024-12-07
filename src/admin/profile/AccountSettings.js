import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tab from "./Tab";

const AccountSettings = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        whatYouSay: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleReset = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            whatYouSay: "",
        });
    };

    const handleSubmit = () => {
        alert("Profile updated successfully!");
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
            <Tab />

            {/* Profile Picture */}
            <div className="flex items-center mb-6">
                <div className="w-32 h-32 bg-gray-100 border-2 border-dashed rounded-full flex items-center justify-center">
                    <button className="text-sm text-gray-500">Upload your photo</button>
                </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* First Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        First name
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Please enter your first name"
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-orange-200"
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Please enter your last name"
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-orange-200"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Please enter your email"
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-orange-200"
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone number
                    </label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="+62 Please enter your phone number"
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-orange-200"
                    />
                </div>
            </div>

            {/* What You Say */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    What You Say
                </label>
                <textarea
                    name="whatYouSay"
                    value={formData.whatYouSay}
                    onChange={handleChange}
                    placeholder="Write your argument about this platform"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-orange-200"
                    rows="4"
                ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-blue text-white rounded hover:bg-sky-500"
                >
                    Update Profile
                </button>
                <button
                    onClick={handleReset}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default AccountSettings;
