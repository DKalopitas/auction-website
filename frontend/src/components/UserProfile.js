import React, { useState } from 'react';
import { useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useAuthUser } from 'react-auth-kit';

function UserProfile() {

    const [username, setUsername] = useState();
    const axiosPrivate = useAxiosPrivate();
    const auth = useAuthUser();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchData = async() => {
            try {
                const response = await axiosPrivate.get(`${auth().name}`, {})
                console.log(response.data);
                isMounted && setUsername(response.data)
            } catch(error) {
                console.error(error);
            }
        }
        fetchData();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [axiosPrivate, auth]);

    return (
        <div>
            Hello {username}
        </div>
    );
}

export default UserProfile;