import axios from "axios";

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_BASE,
    });

    this.api.interceptors.request.use((config) => {

      const storedUser = localStorage.getItem("loggedInUser");
    
      const loggedInUser = JSON.parse(storedUser || '""');
    
      if (loggedInUser.token) {
        config.headers = {
          Authorization: `Bearer ${loggedInUser.token}`,
        };
      }
    
      return config;
    });
  }

  async signUp(user) {
    return await this.api.post("/users/signup", user);
  }

  async login(user) {
    return await this.api.post("/users/login", user);
  }

  async updateUserInfo(user) {
    const res =  await this.api.patch("users/profile", user);
    return res.data
  }

  async uploadFile(fileData){
    const res = await this.api.post('/imageUpload', fileData)
    return res.data
  }

  async deleteUser(){
    const res = await this.api.delete('/users/profile')
    return res.data
  }

  async getAllParkingSpotsForArea(){
    const res = await this.api.get('parkingspots?area=ironhack-SP')
    return res.data
  }


}

export default new ApiService();
