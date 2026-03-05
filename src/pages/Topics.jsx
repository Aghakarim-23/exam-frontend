import React from "react";
import { RiNextjsLine } from "react-icons/ri";
import { FaReact } from "react-icons/fa";
import { TbBrandJavascript } from "react-icons/tb";
import { Link } from "react-router-dom";

const Topics = () => {
  const topics = [
    {
      id: 1,
      topicName: "JavaScript",
      slug: "javascript",
      image: <TbBrandJavascript className="w-16 h-16 text-yellow-500" />,
    },
    {
      id: 2,
      topicName: "React",
      slug: "react",
      image: <FaReact className="w-16 h-16 text-blue-500" />,
    },
    {
      id: 3,
      topicName: "Next.js",
      slug: "nextjs",
      image: <RiNextjsLine className="w-16 h-16 text-gray-800" />,
    },
  ];
  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-3 text-center">
        <div className="bg-white rounded-md shadow-lg  py-14 px-6 ">
          <h2 className="text-xl font-semibold mt-2 text-center my-6">
            Topics
          </h2>
          <div className="flex flex-col md:flex-row gap-3  ">
            {topics.map((topic, index) => (
              <li
                key={index}
                className="flex flex-col gap-4 justify-between items-center border border-gray-300 rounded-md p-3 hover:bg-gray-50 transition cursor-pointer"
              >
                {topic.image}
                <div className="flex flex-col gap-3">
                  <p>{topic.topicName}</p>
                  <Link to={`/topic/${topic.slug}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">View Questions</Link>
                </div>
              </li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Topics;
