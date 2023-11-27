import React from 'react';

const Popup = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-4 shadow-md rounded-md">
                <p>{message}</p>
                <button
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Popup;
