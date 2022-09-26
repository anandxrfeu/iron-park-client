import "./Profile.css"
import {useState,  useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MainWrapper from "../../components/layout/MainWrapper";
import MapWrapper from "../../components/map/MapWrapper";
import { AuthContext } from "../../contexts/authContext"
import apiService from "../../services/api.service";
import profilePic from "../../assets/images/profile-pic.svg"

const Profile = (props) => {

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const isLoggedIn = authContext.loggedInUser.token !== ""
    const user = authContext.loggedInUser.user

    const [imageUrl, setImageUrl] = useState(user.profileImageUrl)

    const name = useRef()
    const password = useRef()

    useEffect( () => {
        setImageUrl(user.profileImageUrl)
    }, [user])

    const handleSubmit = async (event) => {
        event.preventDefault();
        let payload = {
            profileImageUrl: imageUrl

        }
        
        if(name.current.value !== user.name && name.current.value !== ""){
            payload.name = name.current.value
        }
        if(password.current.value !== ""){
            payload.password = password.current.value
        }
        try{
            const updatedUser = await apiService.updateUserInfo(payload)
            authContext.setLoggedInUser({token:authContext.loggedInUser.token, user: updatedUser })
            localStorage.setItem("loggedInUser", JSON.stringify({token:authContext.loggedInUser.token, user: updatedUser}))
        }catch(error){
            console.log(error)
        }
    }

    const handleFileUpload = async (e) =>{
        const uploadData = new FormData()
        uploadData.append("imageUrl", e.target.files[0])
        try{
            const data = await apiService.uploadFile(uploadData)
            setImageUrl(data.filePath)
        }catch(err){
            console.log(err)
        }
      }

    const onDeletehandler = async () => {
        console.log("In onDeletehandler... ")   
        try{
            await apiService.deleteUser()
            localStorage.removeItem("loggedInUser")
            authContext.setLoggedInUser({ token: "", user: {} })
            navigate("/");
        }catch(error){
            console.log(error)
        }
    }

    if(!isLoggedIn){
        return <p>Loading...</p>
    }

    return (
        <MainWrapper>
        <div className="main-left">
          <MapWrapper />
        </div>
        <div className="main-right">
          <div className="form-controls">
            
          <form onSubmit={handleSubmit} className="profile-form">
            <h1 className="profile-form__header">Update profile</h1>
            {imageUrl && (
                <div className="profile-form__image">
                <img src={imageUrl} alt="profile" />
                <input
                    type="file"
                    name="imageUrl"
                    onChange={handleFileUpload}
                />
            </div>
            )}
            

            <div  className="profile-form__email">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                ref={name}
                defaultValue={user.name}
              />
            </div>

            <div  className="profile-form__email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={user.email}
              />
            </div>

            <div  className="profile-form__password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                ref={password}
                placeholder="************"
              />
            </div>
            
            <div className="profile-form__btns">
                <button disabled={imageUrl === ""} className="profile-form__btn" type="submit">Save</button>
                <button className="profile-form__btn btn_delete" onClick={onDeletehandler} type="button">Delete</button>
            </div>

          </form>

          </div>
          <footer>Built by Anand & Christian</footer>
        </div>
    </MainWrapper>
    )

}

export default Profile;