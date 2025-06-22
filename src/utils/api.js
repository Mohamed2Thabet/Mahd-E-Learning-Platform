// export const makeAuthenticatedRequest = async (url, options = {}) => {
//   const token = localStorage.getItem('token');

//   if (!token) {
//     throw new Error('No valid token provided');
//   }

//   const config = {
//     ...options,
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//       ...options.headers,
//     },
//   };

//   const response = await fetch(url, config);
//   const data = await response.json();

//   if (response.status === 401) {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     window.location.href = '/login';
//     throw new Error('Token expired');
//   }

//   if (!response.ok) {
//     throw new Error(data.message || 'Request failed');
//   }

//   return data;
// };
