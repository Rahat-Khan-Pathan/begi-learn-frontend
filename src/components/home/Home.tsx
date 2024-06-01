import React from "react";
import useAuthStore from "../../store/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="container w-[90%] m-auto">
                <header className="bg-slate-600 rounded-2xl text-white">
                    <div className="container mx-auto px-4 py-20 text-center">
                        <h1 className="text-5xl font-bold">
                            Welcome to BegiLearn
                        </h1>
                        <p className="mt-4 text-md lg:text-xl">
                            The best place to enhance your coding skills and
                            compete with others.
                        </p>
                        <button
                            onClick={() => navigate("/problems")}
                            className="btn btn-md bg-teal-600 hover:bg-teal-700 text-white mt-8"
                        >
                            Get Started
                        </button>
                    </div>
                </header>
                <section
                    id="features"
                    className="py-12 mt-8 rounded-2xl bg-gray-200"
                >
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl font-bold mb-8">Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white p-8 shadow-lg rounded-lg">
                                <div className="text-3xl text-blue-600 mb-4">
                                    <i className="fas fa-code"></i>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">
                                    Practice Problems
                                </h3>
                                <p className="text-gray-600">
                                    Solve a wide variety of problems to improve
                                    your coding skills.
                                </p>
                            </div>
                            <div className="bg-white p-8 shadow-lg rounded-lg">
                                <div className="text-3xl text-blue-600 mb-4">
                                    <i className="fas fa-trophy"></i>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">
                                    Competitions
                                </h3>
                                <p className="text-gray-600">
                                    Participate in coding competitions and see
                                    where you stand among peers.
                                </p>
                            </div>
                            <div className="bg-white p-8 shadow-lg rounded-lg">
                                <div className="text-3xl text-blue-600 mb-4">
                                    <i className="fas fa-chart-line"></i>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">
                                    Analytics
                                </h3>
                                <p className="text-gray-600">
                                    Track your progress and see detailed
                                    analytics of your performance.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="contact"
                    className="py-20 mt-12 rounded-2xl bg-gray-200"
                >
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
                        <p className="text-gray-600">
                            Have questions? Feel free to reach out to us at{" "}
                            <a
                                href="mailto:contact@begilearn.com"
                                className="text-blue-600"
                            >
                                rahatkhanpathan99@gmail.com
                            </a>
                        </p>
                    </div>
                </section>
            </div>
            <footer className="bg-gray-800 m-0 mt-12 text-white py-4">
                <div className="container mx-auto px-4 text-center">
                    <p>
                        &copy; {new Date().getFullYear()} BegiLearn. All rights
                        reserved.
                    </p>
                </div>
            </footer>
        </>
    );
};

export default Home;
