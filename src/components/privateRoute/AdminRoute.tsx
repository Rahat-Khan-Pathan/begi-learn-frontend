import React, { ReactNode, useEffect } from "react";
import useAuthStore from "../../store/auth";
import { useNavigate } from "react-router-dom";

const AdminRoute = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const { isLoading, userObject, checkAuthStatus } = useAuthStore(
        (state) => state
    );
    useEffect(() => {
        checkAuthStatus();
    }, []);
    useEffect(() => {
        if (isLoading) {
            return;
        }
        if (userObject.role !== "ADMIN") {
            navigate("/");
        }
    }, [userObject, isLoading]);
    return (
        <div>
            {
                (!isLoading && userObject.role === "ADMIN") ? children 
                : <div className="h-[100vh] flex items-center justify-center">
                    <span className="loading  loading-dots loading-lg"></span>
                </div>
            }
        </div>
    );
};

export default AdminRoute;
