// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import './styles/featuredComponent.css';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// const FeaturedComponent = () => {
//   const [destinations, setDestinations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchDestinations();
//   }, []);

//   const fetchDestinations = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${API_URL}/api/featured-destinations`);
//       setDestinations(response.data);
//     } catch (err) {
//       setError('Failed to fetch destinations');
//       console.error('Error fetching destinations:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="featured-container">
//       <div className="featured-header">
//         <h2>HUNDREDS OF</h2>
//         <h1>Featured Destinations</h1>
//       </div>

//       {loading ? (
//         <div className="featured-loading">Loading...</div>
//       ) : error ? (
//         <div className="featured-error">{error}</div>
//       ) : (
//         <div className="featured-slider">
//           <button className="featured-nav-button featured-nav-prev">
//             <FaArrowLeft />
//             <span>BACK</span>
//           </button>
          
//           <div className="featured-destinations">
//             {destinations.map((destination) => (
//               <div key={destination._id} className="featured-card">
//                 <img src={`${API_URL}${destination.image}`} alt={destination.heading} />
//                 <div className="featured-content">
//                   <h3>{destination.heading}</h3>
//                   <p>{destination.caption}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <button className="featured-nav-button featured-nav-next">
//             <span>NEXT</span>
//             <FaArrowRight />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FeaturedComponent;
