import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(10);

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos');
      const data = await response.json();
      setPhotos(data);
    };

    fetchPhotos();
  }, []);

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const nextPage = () => {
    if (currentPage < Math.ceil(photos.length / photosPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <h1>Photos</h1>
      <div className="photo-cards">
        {currentPhotos.map(photo => (
          <div key={photo.id} className="card">
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <h3>{photo.title}</h3>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(photos.length / photosPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
