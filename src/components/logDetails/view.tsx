import React from "react";

const LogDetails = ({ log }: any) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-neutral-950">
      <div className="mb-2">
        <span className="font-bold">ID:</span> {log._id}
      </div>
      <div className="mb-2">
        <span className="font-bold">Level:</span> {log.level}
      </div>
      <div className="mb-2">
        <span className="font-bold">Message:</span> {log.message}
      </div>
      <div className="mb-2">
        <span className="font-bold">Metadata:</span>
        <pre className="bg-gray-100 p-2 rounded-md">
          {JSON.stringify(log.metadata, null, 2)}
        </pre>
      </div>
      <div className="mb-2">
        <span className="font-bold">Log Function:</span> {log.metadata.logFunc}
      </div>
      <div className="mb-2">
        <span className="font-bold">Bot ID:</span> {log.bot}
      </div>
      <div className="mb-2">
        <span className="font-bold">Created At:</span> {log.createdAt}
      </div>
      <div className="mb-2">
        <span className="font-bold">Updated At:</span> {log.updatedAt}
      </div>
    </div>
  );
};

export default LogDetails;
