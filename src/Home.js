import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemHeight = 10; // Height of each item in vh

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://randomuser.me/api?results=${Math.ceil((window.innerHeight / 16 + 1) / itemHeight)}`
      );
      const { results } = response.data;
      setData((prevData) => [...prevData, ...results]);
      setHasMore(results.length > 0);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [itemHeight]);

  const handleLogout = () => {
    navigate('/');
  };

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - itemHeight && !isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading, hasMore, itemHeight]);

  useEffect(() => {
    fetchData();
  }, [fetchData, page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className='main'>
      <div className="home-container">
        <nav>
          <div className="nav-container">
            <h1 className='nav-icon'>Contacts</h1>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>

        <ul className="contact-list">
          {data.map((item, index) => (
            <li key={index} className="contact-item">
              <img src={item.picture.medium} alt="User" className="contact-item-image" />
              <div className="contact-item-details">
                <span className="contact-item-name">{`${item.name.first} ${item.name.last}`}</span>
                <span className="contact-item-email">{item.email}</span>
              </div>
            </li>
          ))}
        </ul>

        {isLoading && <p className="loading-message">Loading...</p>}
      </div>
    </div>
  );
};

export default Home;
