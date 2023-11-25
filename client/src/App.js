import React, { useState, useEffect } from "react";
import "./App.css";
import DownloadButton from "./components/DownloadButton";

const App = () => {
  const [data, setData] = useState(null);

  const downloadData = (data, format) => {
    const dataString = data
      .map((row) => Object.values(row).join(","))
      .join("\n");

    const blob = new Blob([dataString], {
      type:
        format === "csv"
          ? "text/csv"
          : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const fileName = `blog-details.${format}`;
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  };

  useEffect(() => {
    fetch("http://localhost:7000/data")
      .then((response) => response.json())
      .then((responseData) => {
        const sortedData = responseData.data.sort((a, b) => {
          const dateA = new Date(a.BlogDate);
          const dateB = new Date(b.BlogDate);
          return dateB.getTime() - dateA.getTime();
        });
        setData(sortedData);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Blog Details</h1>

      <div>
        <DownloadButton
          text="Download CSV"
          onClick={() => downloadData(data, "csv")}
        />
        <DownloadButton
          text="Download Excel"
          onClick={() => downloadData(data, "xlsx")}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Blog Title</th>
            <th>Blog Date</th>
            <th>Blog Image URL</th>
            <th>Blog Like Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map((blog) => (
            <tr key={blog.BlogTitle}>
              <td>{blog.BlogTitle}</td>
              <td>{blog.BlogDate}</td>
              <td>
                <img src={blog.BlogImgUrl} alt={blog.BlogTitle} />
              </td>
              <td>{blog.BlogLikeCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
