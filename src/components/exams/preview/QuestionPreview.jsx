import React, { useState } from "react";
import EditIcon from "../../../../public/pencil-svgrepo-com.svg";

const QuestionPreview = ({ questions, onRefresh, onAddNew }) => {
  const handleImageClick = (url) => {
    // Open the image in a new floating browser window
    const newWindow = window.open(
      `http://localhost:3000/drive/image/${url}`,
      "_blank",
      "width=800,height=600,resizable=yes,scrollbars=yes"
    );
    if (newWindow) {
      newWindow.focus();
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-6 bg-gray-100">
      {questions.map((question, questionIndex) => (
        <div
          key={question.id}
          className="w-full p-6 mb-6 bg-white border-l-4 border-green-400 shadow-lg rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold text-gray-700">
              Question {questionIndex + 1}:
            </h3>
            {/* Edit button with pencil icon */}
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <img src={EditIcon} alt="Edit" className="w-6 h-6" />
            </button>
          </div>

          {/* Rendering question context */}
          {question.context.map((contextItem) => (
            <div key={contextItem.id} className="mb-4">
              {contextItem.type === "text" && (
                <p className="text-gray-600">{contextItem.text}</p>
              )}
              {contextItem.type === "image" && contextItem.url && (
                <div className="relative w-full h-40 border-2 border-blue-400 border-dashed rounded-lg bg-blue-50">
                  <img
                    src={`http://localhost:3000/drive/image/${contextItem.url}`}
                    alt="Question related"
                    className="object-cover w-full h-full rounded-lg cursor-pointer"
                    onClick={() => handleImageClick(contextItem.url)}
                  />
                </div>
              )}
            </div>
          ))}

          <h4 className="mt-6 mb-4 text-xl font-semibold text-gray-700">
            Options:
          </h4>

          {/* Rendering options context */}
          {question.options.map((option, optionIndex) => (
            <div
              key={option.id}
              className={`p-4 mb-4 rounded-lg shadow bg-gray-50 ${
                option.id === question.answer
                  ? "bg-green-400 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {/* Option number and content */}
              <div className="text-lg font-semibold">
                Option {optionIndex + 1}:
              </div>
              {option.context.map((optionContext) => (
                <div key={optionContext.id} className="mb-2">
                  {optionContext.type === "text" && (
                    <p className="text-gray-600">{optionContext.text}</p>
                  )}
                  {optionContext.type === "image" && optionContext.url && (
                    <div className="relative w-full h-40 border-2 border-blue-400 border-dashed rounded-lg bg-blue-50">
                      <img
                        src={`http://localhost:3000/drive/image/${optionContext.url}`}
                        alt="Option related"
                        className="object-cover w-full h-full rounded-lg cursor-pointer"
                        onClick={() => handleImageClick(optionContext.url)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

      {/* Refresh and Add New Buttons */}
      <div className="flex justify-center w-full gap-4 mt-8">
        <button
          className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={onRefresh}
        >
          Refresh
        </button>
        <button
          className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
          onClick={onAddNew}
        >
          Add New
        </button>
      </div>
    </div>
  );
};

export default QuestionPreview;
