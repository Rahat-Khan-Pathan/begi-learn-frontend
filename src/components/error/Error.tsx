import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();
    return (
        <div className="mt-32">
            <div className="card w-96 bg-base-100 shadow m-auto">
                <div className="card-body">
                    <p className="mt-6">
                        <img src="/404.jpg" alt="" />
                    </p>
                    <p className='mt-6 text-center font-medium'>The page you are looking for might have been removed or not available at this moment!</p>
                    <div className="card-actions justify-center">
                        <button
                            className="btn bg-teal-600 text-white mt-4  hover:bg-teal-700"
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            GO TO HOMEPAGE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;