import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaYoutube } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-white py-10 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center">
                    {/* Navigation Links */}
                    <div className="flex space-x-6 mb-6 text-gray-600">
                        <a href="#" className="hover:text-gray-900">About</a>
                        <a href="#" className="hover:text-gray-900">Accessibility</a>
                        <a href="#" className="hover:text-gray-900">Partners</a>
                    </div>
                    
                    {/* Social Media Icons */}
                    <div className="flex space-x-6 mb-6 text-gray-600">
                        <a href="#" className="hover:text-gray-900">
                            <FaFacebook size={20} />
                        </a>
                        <a href="#" className="hover:text-gray-900">
                            <FaInstagram size={20} />
                        </a>
                        <a href="#" className="hover:text-gray-900">
                            <FaTwitter size={20} />
                        </a>
                        <a href="#" className="hover:text-gray-900">
                            <FaGithub size={20} />
                        </a>
                        <a href="#" className="hover:text-gray-900">
                            <FaYoutube size={20} />
                        </a>
                    </div>
                    
                    {/* Copyright */}
                    <div className="text-sm text-gray-500">
                        © 2024 Ex-Cons Thrive. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
