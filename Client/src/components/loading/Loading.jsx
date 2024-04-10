import React from "react";
import ReactLoading from "react-loading";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loading__overlay">
      <ReactLoading type="spin" height={80} width={80} />
    </div>
  );
};

export default Loading;
