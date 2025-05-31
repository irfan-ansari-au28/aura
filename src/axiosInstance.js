import axios from 'axios'

const apiUrl = `https://aura-node-dabhg7dhdxgccchq.centralindia-01.azurewebsites.net/api`;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
 
 
});
// const history = createBrowserHistory();
// const navigate = useNavigate();
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken'); // Get the access token from local storage
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // config.headers['ngrok-skip-browser-warning'] = true;
    // config.headers['withCredentials'] = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;