import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from "react-icons/fi";


const Admin = () => {
  const topics = [
    {
      id: 1,
      name: "Next.js",
      description: "Learn about Next.js features and best practices."
    },
    {
      id: 2,
      name: "React",
      description: "UI component library"
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-4 py-10">

        <div className="max-w-5xl mx-auto">
          {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-500 mt-2">Manage quizzes, users, and settings</p>
            </div>

            {/* Stats */}
              <div className='grid grid-cols-2 gap-4 mt-6'>
                <div className='bg-white rounded-lg shadow-md p-4 flex flex-col items-center'>
                  <p className='text-2xl font-bold text-gray-800'>2 </p>
                  <p className='text-gray-500'>topics</p>
                </div>
                <div className='bg-white rounded-lg shadow-md p-4 flex flex-col items-center'>
                  <p className='text-2xl font-bold text-gray-800'>20</p>
                  <p className='text-gray-500'>questions</p>
                </div>
              </div>

              {/* Cards */}
              <div>
                <h1 className='text-2xl font-bold text-gray-800 mt-6'>Topics</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6'>
                  {topics.map((topic) => (
                    <div className='bg-white rounded-lg shadow-md  flex flex-col gap-4' key={topic.id}>
                      <div className='p-6 min-h-33 flex flex-col gap-2'>
                        <h2 className='text-lg font-semibold text-gray-800'>{topic.name}</h2>
                        <p className='text-gray-500'>{topic.description}</p>
                      </div>
                      <hr />
                      <div className='flex justify-center items-center mx-auto  bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors px-4 py-2 mb-3'>
                        <Link className='flex items-center gap-2' 
                          to={`/create-quiz/${topic.id}/question`}>
                          <p>Create Quiz</p>
                          <FiArrowRight />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

          </div>

      </div>
    </>
            
             
  )
}

export default Admin