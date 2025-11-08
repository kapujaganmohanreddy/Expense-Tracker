import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/Layouts/AuthLayout'
import Input from '../../components/Inputs/Input'
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { UserContext } from '../../context/UserContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadImage';

const Signup = () => {
  const [profilepic, setProfilepic] = useState(null);
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate();

  const handleSignUp = async (e)=>{
    e.preventDefault();
    let profileImageUrl = "";
    if(!fullName){
      setError("Please enter your name");
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }
    if(!password){
      setError("Please enter the password");
      return;
    }
    setError("");

    //Register API Call
    try{
      
      //Upload image if present
      if(profilepic){
        const imgUploadRes = await uploadImage(profilepic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      const {token, user} = response.data;
      if(token){
        localStorage.setItem("token",token);
        updateUser(user);
        navigate("/dashboard");
      }
    }
    catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }
      else{
        setError("Something went wrong. Please try again");
        console.log(error);
      }
    }
  }
  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by entering details below.
        </p>
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilepic} setImage={setProfilepic}/>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
            value = {fullName}
            placeholder = "John Snow"
            onChange={({target})=>setFullname(target.value)}
            label = "Full Name"
            type = "text"
            />
            <Input
              value = {email}
              placeholder = "johnsnow@got.com"
              onChange={({target})=>setEmail(target.value)}
              label = "Email Address"
              type = "text"
            />
            <div className='col-span-2'>
              <Input
              value = {password}
              placeholder = "Min 8 Characters"
              onChange={({target})=>setPassword(target.value)}
              label = "Password"
              type = "password"
              />
            </div>
          </div>
          {error && <div className='text-red-500 text-xs pb-2.5'>{error}</div>}
          <button type='submit' className='btn-primary cursor-pointer'>
            SIGNUP
          </button>
          <div className='text-[13px] text-slate-800 mt-3'>
            Already have an account?{" "}
            <Link className='font-medium text-primary underline cursor-pointer' to='/login'>Login</Link>
          </div>
      </form>
      </div>
    </AuthLayout>
  )
}

export default Signup
