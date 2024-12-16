import React, { useState } from 'react';
import faqImage from '../assets/img/wonderingimg.png'; 

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="flex-row  md:flex px-16 md:px-32 p-8 pr-12 pl-12 rounded-lg bg-gray-50 md:text-xl">
               {/* Left side image and heading */}
              <div className="flex-1 mb-8 lg:mb-0 lg:mr-8">
                  <h2 className="text-3xl lg:text-4xl  font-bold mb-4">You’re probably wondering...</h2>
                  <img src={faqImage} alt="FAQ illustration" className="rounded-md mt-4 " />
              </div> 
              
              {/* Right side FAQ section */}
              <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                  <div>
                      {faqData.map((faq, index) => (
                          <div key={index} className="mb-4">
                              <button
                                  className="w-full text-left font-semibold text-gray-900 py-2 border-b flex justify-between items-center"
                                  onClick={() => toggleFAQ(index)}
                              >
                                  {faq.question}
                                  <span>{activeIndex === index ? '-' : '+'}</span>
                              </button>
                              {activeIndex === index && (
                                  <div className="py-2 text-gray-700">
                                      {faq.answer}
                                  </div>
                              )}
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      );
}

const faqData = [
    {
        question: 'How does the job assistance work?',
        answer: 'Our platform connects ex-cons with job opportunities by matching their skills with available positions. We also offer resume building and interview preparation resources.'
    },
    {
        question: 'Can I get legal assistance for record expungement?',
        answer: 'Yes, we offer resources and legal support for record expungement and connecting with pro-bono legal services to help clear your record.'
    },
    {
        question: 'Do you offer financial management advice?',
        answer: 'We provide guidance on managing finances, budgeting, and improving credit, helping individuals build a stable financial foundation.'
    },
    {
        question: 'Is there vocational training available?',
        answer: 'Yes, our platform partners with vocational training programs to help individuals learn new skills and increase their employability.'
    }
];


