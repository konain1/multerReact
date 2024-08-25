import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [imgFiles, setImgFiles] = useState([]);

  const upload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData);
      console.log('Uploaded:', response.data);
      // Refresh the image list after upload
      fetchImages();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/download');
      setImgFiles(response.data.imagess);
      console.log(response.data.imagess);
    } catch (err) {
      console.error('Error fetching images:', err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={upload}>Upload</button>
      </div>
      <div>
        {imgFiles && imgFiles.length > 0 && (
          <>
            {imgFiles.map((file, index) => (
              <div key={index} style={{ width: '400px', height: '200px' }}>
                <img 
                  src={`http://localhost:3000${file.image.split('public').join('')}`} 
                  alt={`Uploaded file ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default App;
