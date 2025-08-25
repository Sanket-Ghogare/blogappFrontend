import React, { useState } from 'react';
import {
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
        if (!value.trim()) return 'First name is required';
        if (value.trim().length < 2) return 'First name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'First name should only contain letters';
        return '';
      
      case 'lastName':
        if (!value.trim()) return 'Last name is required';
        if (value.trim().length < 2) return 'Last name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Last name should only contain letters';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters long';
        return '';
      
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Check if all required fields are filled and valid
  const isFormValid = formData.firstName.trim() !== '' && 
                     formData.lastName.trim() !== '' && 
                     formData.email.trim() !== '' && 
                     formData.message.trim() !== '' &&
                     errors.firstName === '' &&
                     errors.lastName === '' &&
                     errors.email === '' &&
                     errors.message === '';

  const handleSubmit = () => {
    // Validate all fields before submission
    const newErrors = {
      firstName: validateField('firstName', formData.firstName),
      lastName: validateField('lastName', formData.lastName),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message)
    };
    
    setErrors(newErrors);
    
    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    
    if (!hasErrors && isFormValid) {
      alert('Message sent successfully!');
      // Reset form after submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });
      setErrors({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-6 sm:py-10">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">Contact Us</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">We'd love to hear from you!</p>
      </div>

      {/* Contact Form */}
      <div className="max-w-4xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-10 space-y-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 ${
                  errors.firstName 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                }`}
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 ${
                  errors.lastName 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                }`}
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              required
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
              placeholder="Write your message here..."
              required
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 resize-vertical ${
                errors.message 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
              }`}
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.message}</p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="button"
              disabled={!isFormValid}
              onClick={handleSubmit}
              className={`w-full sm:w-auto px-8 py-3 rounded-md font-medium transition-all duration-200 transform ${
                isFormValid 
                  ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer' 
                  : 'bg-gray-400 dark:bg-gray-600 text-gray-200 dark:text-gray-400 cursor-not-allowed opacity-60'
              }`}
            >
              {isFormValid ? 'Send Message' : 'Fill All Required Fields'}
            </button>
          </div>

          {/* Form validation status */}
          {!isFormValid && (
            <p className="text-sm text-red-500 dark:text-red-400 mt-2">
              Please fill in all required fields before submitting.
            </p>
          )}
        </div>

        {/* Social Links */}
        <div className="flex justify-center items-center gap-6 mt-10 pt-6 border-t border-gray-300 dark:border-gray-600">
          <a
            href="mailto:sanketvghogare@gmail.com"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            title="Email"
          >
            <EnvelopeIcon className="h-6 w-6" />
          </a>
          <a
            href="https://github.com/Sanket-Ghogare"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            title="GitHub"
          >
            <FaGithub className="h-6 w-6" />
          </a>
          <a
            href="https://instagram.com/_sanket_ghogare_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200"
            title="Instagram"
          >
            <FaInstagram className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com/in/sanketghogare"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200"
            title="LinkedIn"
          >
            <FaLinkedin className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;