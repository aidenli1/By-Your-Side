import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from '../_actions/user_action';
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRoute = null) {

    //  option : null = anyone
    //  true = login user only 
    //  false = logout user only

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        const navigate = useNavigate();

        useEffect(() => {
            dispatch(auth()).then((response) => {
                console.log("auth? ", response);

                if (!response.payload.isAuth) {
                    // login yet
                    if (option) {
                        navigate("/login");
                    }
                } else {
                    // login
                    if (adminRoute && !response.payload.isAdmin) {
                        navigate("/");
                    } else {
                        if (option === false) {
                            navigate("/");
                        }
                    }
                }
            });
        }, []);

        return (
            <SpecificComponent /> // component return이 없으면 React 실행이 안됨.
        );
    }

    return <AuthenticationCheck />;
}