// import React, { useState } from "react";
// import axios from "axios";

// const UploadForm = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (!selectedFile) {
//       return alert("Please select a file");
//     }

//     const formData = new FormData();
//     formData.append("csvFile", selectedFile);

//     axios
//       .post("http://localhost:3000/upload", formData)
//       .then((response) => {
//         alert(response.data.message);
//       })
//       .catch((error) => {
//         console.error(error);
//         alert("An error occurred while uploading the file");
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" onChange={handleFileChange} />
//       <button type="submit">Upload</button>
//     </form>
//   );
// };

// export default UploadForm;
import React from "react";

const UploadForm = () => {
  return <div>UploadForm</div>;
};

export default UploadForm;
