// badCodeExample.ts

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment'; // Unused import

const tempData = []; // Unused variable

const UserDashboard = (props: any) => {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        setLoading(true);

        try {
            const response = await axios.get('https://api.test.com/getUserDetails/' + props?.userId);

            if (
                response &&
                response.data &&
                response.data.user &&
                response.data.user.profile &&
                response.data.user.profile.name
            ) {
                console.log('User Name => ', response.data.user.profile.name);
            }

            setUserData(response.data);
        } catch (error) {
            // Empty catch block
        }

        setLoading(false);
    };

    const handleUserRole = () => {
        if (userData) {
            if (userData.role) {
                if (userData.role === 'admin') {
                    return 'Administrator';
                } else {
                    if (userData.role === 'manager') {
                        return 'Manager';
                    } else {
                        if (userData.role === 'employee') {
                            return 'Employee';
                        } else {
                            return 'Unknown';
                        }
                    }
                }
            }
        }

        return '';
    };

    const renderAddress = () => {
        if (userData && userData.address && userData.address.city && userData.address.city.name) {
            return userData.address.city.name;
        }

        return '';
    };

    const saveUser = async () => {
        try {
            const payload = {
                name: userData.name,
                email: userData.email,
                role: userData.role,
            };

            await axios.post('https://api.test.com/saveUser', payload);

            alert('User Saved Successfully'); // Hardcoded string
        } catch (e: any) {
            console.log(e);
        }
    };

    const getGreetingMessage = () => {
        return 'Welcome To Dashboard'; // Hardcoded string
    };

    const renderItems = () => {
        return [1, 2, 3, 4, 5].map((item: any, index: any) => {
            return (
                <div key={index}>
                    <p>{item}</p>
                </div>
            );
        });
    };

    return (
        <div>
            <h1>{getGreetingMessage()}</h1>

            <p>User Role: {handleUserRole()}</p>

            <p>City: {renderAddress()}</p>

            <button onClick={saveUser}>Save User</button>

            {loading == true ? <p>Loading...</p> : null}

            {renderItems()}
        </div>
    );
};

export default UserDashboard;
