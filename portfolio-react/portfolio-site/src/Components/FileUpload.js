import { ChangeEvent, useState } from 'react';

function FileUpload(authToken) {
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    // 👇 Uploading the file using the fetch API to the server
    fetch('http://localhost:8000/imageupload/', {
      // 👇 Set headers manually for single file upload
      headers: new Headers({
        'Content-Disposition': `attachment; filename="${file.name}"`,
        'content-length': `${file.size}`, // 👈 Headers need to be a string
        'authentication': 'Token ' + authToken,
        }),
        method: 'POST',
        body: file,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>

      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}

export default FileUpload;
