import React from "react";

interface Alert {
  title: string;
  content: string;
};

const Alert = ({ title, content }: Alert) => {
  return (
    <div
      className="p-4 bg-red-800 rounded-md"
    >
      <div className="flex">
        <div className="shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-5 w-5 text-red-700"
          >
            <path
              fill-rule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-red-500 font-medium text-sm">{title}</h3>
          <div className="text-red-300 text-sm mt-2">
            <p>
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
