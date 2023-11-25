import React from "react";
import BlogData from "./components/BlogData";
import WebsiteForm from "./components/WebsiteForm";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <div>
        <h1>Web Scrapping App</h1>
      </div>
      <Routes>
        <Route path="/" element={<WebsiteForm />} />
        <Route path="/websiteData" element={<BlogData />} />
      </Routes>
    </div>
  );
};

export default App;
