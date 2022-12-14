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
    const res =  await this.api.patch("/users/profile", user);
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

  async getAllParkingSpots(latitude, longitude){
    const res = await this.api.get(`/parkingspots?latitude=${latitude}&longitude=${longitude}`)
    return res.data
  }

  async reserveParkingSpot(id, payload){
    const res = await this.api.patch(`/parkingspots/${id}`, payload)
    return res.data
  }

  async unReserveParkingSpot(id, payload){
    const res = await this.api.patch(`/parkingspots/${id}`, payload)
    return res.data
  }

  async createReservation(payload){
    const res = await this.api.post('/reservations/', payload)
    return res.data
  }

  async getReservationInfo(id){
    const res = await this.api.get(`/reservations/${id}`)
    return res.data
  }

  async extendReservation(id, payload){
    const res = await this.api.patch(`reservations/${id}`, payload)
    return res.data
  }

  async makePayment(payload){
    const res = await this.api.post(`/create-payment-intent`, payload)
    return res.data
  }

  async createCheckOutSession(payload){
    const res = await this.api.post(`/create-checkout-session`, payload)
    return res.data
  }

  async getGeocodedArea(searchText){
    //
  }

}

export default new ApiService();