import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';
import { BASE_URL } from '..';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true; //this makes the data avalable ti use and not unaitharized also whenwver u call a middleware in ur backend function that check for authentication if u dont use this command it will always give error
                const res = await axios.get(`http://localhost:8080/api/v1/user`);

                // console.log("other users -> ", res);
  
                // store
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers();
    }, [])

}

export default useGetOtherUsers