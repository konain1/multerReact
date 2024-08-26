import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [imgFiles, setImgFiles] = useState([]);
  const [imgUrl, setImgUrl] = useState('');

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/download');
      setImgFiles(response.data.imagess);
      console.log(response.data.imagess);
    } catch (err) {
      console.error('Error fetching images:', err);
    }
  };

  const handleCloudinary = async (event) => {
    let file = event.target.files[0];
    let data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'cloudpreset');
    data.append('cloud_name', 'dleyuli2e');

    try {
      let response = await axios.post('https://api.cloudinary.com/v1_1/dleyuli2e/image/upload', data);
      let result = response.data;
      console.log(result.url);
      setImgUrl(result.url);
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
    }
  };

  const handleSendImageUrl = async () => {
    if (!imgUrl) return;

    try {
      let response = await axios.post('http://localhost:3000/imageUrl', { imageUrl: imgUrl });
      let result = response.data;
      console.log(result);
    } catch (error) {
      console.error('Error sending image URL to the server:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <div>
        <input type="file" onChange={handleCloudinary} />
        <button onClick={handleSendImageUrl}>Upload</button>
      </div>
      <div>
        {imgUrl && (
          <img
            style={{ height: '100px', width: '200px' }}
            src={imgUrl}
            alt="Uploaded to Cloudinary"
          />
        )}
        {/* Uncomment this section to display images fetched from the server */}
        {/* {imgFiles && imgFiles.length > 0 && (
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
        )} */}
      </div>
    </>
  );
}

export default App;
