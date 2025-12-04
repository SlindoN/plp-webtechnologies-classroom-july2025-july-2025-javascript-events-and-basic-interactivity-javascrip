import React, { useState } from 'react';
import { Sun, Moon, ChevronDown, ChevronUp, Check, X } from 'lucide-react';

export default function InteractiveWebPage() {

  // Dark mode toggle state
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Counter state
  const [count, setCount] = useState(0);
  
  // FAQ collapse state
  const [openFaq, setOpenFaq] = useState(null);
  
  // Tab state
  const [activeTab, setActiveTab] = useState('tab1');
  
  // ============================================
  // PART 3: FORM VALIDATION STATE
  // ============================================
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: ''
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // ============================================
  // EVENT HANDLERS - PART 1
  // ============================================
  
  // Handle dark mode toggle - demonstrates click event
  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  // Handle counter increment - demonstrates click event
  const handleIncrement = () => {
    setCount(count + 1);
  };
  
  // Handle counter decrement - demonstrates click event
  const handleDecrement = () => {
    setCount(count - 1);
  };
  
  // Handle counter reset - demonstrates click event
  const handleReset = () => {
    setCount(0);
  };
  
  // Handle FAQ toggle - demonstrates click event with parameter
  const handleFaqToggle = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  
  // Handle tab change - demonstrates click event with parameter
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // ============================================
  // FORM VALIDATION FUNCTIONS - PART 3
  // ============================================
  
  // Validate individual field
  const validateField = (name, value) => {
    let error = '';
    
    switch(name) {
      case 'fullName':
        // Check if name is at least 2 characters and contains only letters and spaces
        if (!value.trim()) {
          error = 'Full name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Name can only contain letters and spaces';
        }
        break;
        
      case 'email':
        // Validate email format using regex
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
        
      case 'password':
        // Check password strength
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          error = 'Password must contain uppercase, lowercase, and number';
        }
        break;
        
      case 'confirmPassword':
        // Check if passwords match
        if (!value) {
          error = 'Please confirm your password';
        } else if (value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;
        
      case 'age':
        // Validate age is a number and within range
        if (!value) {
          error = 'Age is required';
        } else if (!/^\d+$/.test(value)) {
          error = 'Age must be a number';
        } else if (parseInt(value) < 13 || parseInt(value) > 120) {
          error = 'Age must be between 13 and 120';
        }
        break;
        
      default:
        break;
    }
    
    return error;
  };
  
  // Handle input change - demonstrates input event
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate field if it's been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };
  
  // Handle input blur - demonstrates blur event
  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate field
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };
  
  // Handle form submit - demonstrates submit event
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
    // Update errors
    setErrors(newErrors);
    
    // If no errors, show success message
    if (Object.keys(newErrors).length === 0) {
      setFormSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          age: ''
        });
        setTouched({});
        setErrors({});
      }, 3000);
    }
  };

  // ============================================
  // FAQ DATA
  // ============================================
  
  const faqs = [
    {
      question: "What is JavaScript?",
      answer: "JavaScript is a programming language that enables interactive web pages. It's one of the core technologies of the web, alongside HTML and CSS."
    },
    {
      question: "What are event listeners?",
      answer: "Event listeners are functions that wait for specific events (like clicks, key presses, or mouse movements) to occur on elements, then execute code in response."
    },
    {
      question: "Why is form validation important?",
      answer: "Form validation ensures data quality, improves user experience by catching errors early, and helps prevent security issues and database corruption."
    }
  ];

  // ============================================
  // RENDER
  // ============================================
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-800 text-white' : 'bg-rose-50 text-gray-800'
    }`}>
      <div className="max-w-4xl mx-auto p-6">
        
        {/* Header with Theme Toggle */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Interactive Web Page Demo</h1>
          
          {/* INTERACTIVE ELEMENT 1: Dark Mode Toggle */}
          <button
            onClick={handleThemeToggle}
            className={`p-3 rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-amber-300 text-slate-800 hover:bg-amber-200' 
                : 'bg-indigo-400 text-white hover:bg-indigo-500'
            }`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </header>

        {/* INTERACTIVE ELEMENT 2: Counter */}
        <section className={`mb-8 p-6 rounded-lg ${
          isDarkMode ? 'bg-slate-700' : 'bg-white shadow-lg border border-pink-100'
        }`}>
          <h2 className="text-2xl font-semibold mb-4">Interactive Counter</h2>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleDecrement}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                isDarkMode
                  ? 'bg-rose-400 hover:bg-rose-500 text-white'
                  : 'bg-rose-300 hover:bg-rose-400 text-rose-900'
              }`}
            >
              -
            </button>
            
            <div className="text-4xl font-bold min-w-[100px] text-center">
              {count}
            </div>
            
            <button
              onClick={handleIncrement}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                isDarkMode
                  ? 'bg-emerald-400 hover:bg-emerald-500 text-white'
                  : 'bg-emerald-300 hover:bg-emerald-400 text-emerald-900'
              }`}
            >
              +
            </button>
          </div>
          
          <div className="text-center mt-4">
            <button
              onClick={handleReset}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'bg-slate-600 hover:bg-slate-500'
                  : 'bg-purple-200 hover:bg-purple-300 text-purple-900'
              }`}
            >
              Reset
            </button>
          </div>
        </section>

        {/* INTERACTIVE ELEMENT 3: Tabbed Interface */}
        <section className={`mb-8 p-6 rounded-lg ${
          isDarkMode ? 'bg-slate-700' : 'bg-white shadow-lg border border-pink-100'
        }`}>
          <h2 className="text-2xl font-semibold mb-4">Tabbed Content</h2>
          
          <div className="flex gap-2 mb-4">
            {['tab1', 'tab2', 'tab3'].map((tab, index) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-6 py-2 rounded-t-lg font-semibold transition-colors ${
                  activeTab === tab
                    ? isDarkMode
                      ? 'bg-sky-500 text-white'
                      : 'bg-sky-300 text-sky-900'
                    : isDarkMode
                    ? 'bg-slate-600 hover:bg-slate-500'
                    : 'bg-pink-100 hover:bg-pink-200 text-pink-900'
                }`}
              >
                Tab {index + 1}
              </button>
            ))}
          </div>
          
          <div className={`p-4 rounded-b-lg rounded-tr-lg ${
            isDarkMode ? 'bg-slate-600' : 'bg-blue-50'
          }`}>
            {activeTab === 'tab1' && (
              <p>This is the content of Tab 1. Click other tabs to see different content!</p>
            )}
            {activeTab === 'tab2' && (
              <p>Welcome to Tab 2! Tabs are great for organizing related content without overwhelming users.</p>
            )}
            {activeTab === 'tab3' && (
              <p>You're viewing Tab 3. This demonstrates how JavaScript can show/hide content dynamically.</p>
            )}
          </div>
        </section>

        {/* INTERACTIVE ELEMENT 4: Collapsible FAQ */}
        <section className={`mb-8 p-6 rounded-lg ${
          isDarkMode ? 'bg-slate-700' : 'bg-white shadow-lg border border-pink-100'
        }`}>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border rounded-lg overflow-hidden ${
                  isDarkMode ? 'border-slate-600' : 'border-purple-200'
                }`}
              >
                <button
                  onClick={() => handleFaqToggle(index)}
                  className={`w-full p-4 flex justify-between items-center transition-colors ${
                    isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-lavender-50'
                  }`}
                >
                  <span className="font-semibold text-left">{faq.question}</span>
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openFaq === index && (
                  <div className={`p-4 ${
                    isDarkMode ? 'bg-slate-600' : 'bg-purple-50'
                  }`}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* PART 3: FORM VALIDATION */}
        <section className={`mb-8 p-6 rounded-lg ${
          isDarkMode ? 'bg-slate-700' : 'bg-white shadow-lg border border-pink-100'
        }`}>
          <h2 className="text-2xl font-semibold mb-4">Registration Form</h2>
          
          {formSubmitted ? (
            <div className={`p-4 rounded-lg flex items-center gap-3 ${
              isDarkMode ? 'bg-emerald-900 text-emerald-100' : 'bg-emerald-100 text-emerald-800'
            }`}>
              <Check size={24} />
              <div>
                <p className="font-semibold">Form submitted successfully!</p>
                <p className="text-sm">Your registration has been received.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Full Name Field */}
              <div>
                <label htmlFor="fullName" className="block mb-2 font-semibold">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full p-3 rounded-lg border ${
                    errors.fullName && touched.fullName
                      ? 'border-rose-400 bg-rose-50'
                      : isDarkMode
                      ? 'border-slate-500 bg-slate-600'
                      : 'border-purple-200 bg-white'
                  } ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && touched.fullName && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <X size={16} /> {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block mb-2 font-semibold">
                  Email Address *
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full p-3 rounded-lg border ${
                    errors.email && touched.email
                      ? 'border-rose-400 bg-rose-50'
                      : isDarkMode
                      ? 'border-slate-500 bg-slate-600'
                      : 'border-purple-200 bg-white'
                  } ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  placeholder="your.email@example.com"
                />
                {errors.email && touched.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <X size={16} /> {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block mb-2 font-semibold">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full p-3 rounded-lg border ${
                    errors.password && touched.password
                      ? 'border-rose-400 bg-rose-50'
                      : isDarkMode
                      ? 'border-slate-500 bg-slate-600'
                      : 'border-purple-200 bg-white'
                  } ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  placeholder="Enter a strong password"
                />
                {errors.password && touched.password && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <X size={16} /> {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 font-semibold">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full p-3 rounded-lg border ${
                    errors.confirmPassword && touched.confirmPassword
                      ? 'border-rose-400 bg-rose-50'
                      : isDarkMode
                      ? 'border-slate-500 bg-slate-600'
                      : 'border-purple-200 bg-white'
                  } ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  placeholder="Re-enter your password"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <X size={16} /> {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Age Field */}
              <div>
                <label htmlFor="age" className="block mb-2 font-semibold">
                  Age *
                </label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full p-3 rounded-lg border ${
                    errors.age && touched.age
                      ? 'border-rose-400 bg-rose-50'
                      : isDarkMode
                      ? 'border-slate-500 bg-slate-600'
                      : 'border-purple-200 bg-white'
                  } ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  placeholder="Enter your age"
                />
                {errors.age && touched.age && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <X size={16} /> {errors.age}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode
                    ? 'bg-sky-500 hover:bg-sky-600 text-white'
                    : 'bg-sky-400 hover:bg-sky-500 text-white'
                }`}
              >
                Submit Registration
              </button>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="text-center text-sm opacity-75 mt-8">
          <p>Interactive Web Page Assignment - JavaScript Event Handling & Form Validation</p>
        </footer>
      </div>
    </div>
  );
}