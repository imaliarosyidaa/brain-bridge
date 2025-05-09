import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "./Tab";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const AccountSettings = () => {
    const { auth } = useAuth();
    const arrayName = auth.nama.split(" ")
    const [first_name, setFirstName] = useState(arrayName[0]);
    const [last_name, setLastName] = useState(arrayName.slice(1).join(' '));
    const [email, setEmail] = useState(auth.email);
    const [phone_number, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');

    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const dataUser = await axios.get('/api/profile',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "*/*",
                        Authorization: `Bearer ${auth.accessToken}`
                    },
                    withCredentials: true
                }
            );
            setPhoneNumber(dataUser?.data?.phone_number)
            setDescription(dataUser?.data?.description)
            setFirstName(dataUser?.data?.first_name)
            setLastName(dataUser?.data?.last_name)
            setEmail(dataUser?.data?.email)
        }
        fetchData();
    }, [auth.accessToken]);

    async function updateProfile(event) {
        event.preventDefault();

        try {
            const response = await axios.put('/api/profile',
                JSON.stringify({
                    first_name,
                    last_name,
                    email,
                    phone_number,
                    description,
                    photo
                }), {
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "*/*",
                    Authorization: `Bearer ${auth.accessToken}`
                },
                withCredentials: true
            }
            );
        } catch (error) {
            console.error("Error response:", error.response?.data || error.message);
            alert("update failed, please check your credentials.");
        }
    }


    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">
            <Tab />
            <form onSubmit={updateProfile} method="PUT">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Please enter your first name"
                            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-orange-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Please enter your last name"
                            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-orange-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Please enter your email"
                            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-orange-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                            <span className="pl-1 text-gray-500">(Optional)</span>
                        </label>
                        <input
                            type="text"
                            name="phone_number"
                            value={phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+62 Please enter your phone number"
                            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-orange-200"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        What You Say
                        <span className="pl-1 text-gray-500">(Optional)</span>
                    </label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Write your argument about this platform"
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-orange-200"
                        rows="4"
                    ></textarea>
                </div>

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue text-white rounded hover:bg-sky-500"
                    >
                        Update Profile
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setFirstName('')
                            setLastName('')
                            setEmail('')
                            setPhoneNumber('')
                            setDescription('')
                            setPhoneNumber('')
                            setPhoto('')
                        }}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                        Reset
                    </button>
                </div>

                {error && <p className="text-red-500 mt-4">{error}</p>}
            </form>
        </div>
    );
};

export default AccountSettings;
