import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const Input = ({value,placeholder,onChange,label,type}) => {
    const [showpassword, setshowpassword] = useState(false)
    // const setTogglePassword = ()=>{
    //     setshowpassword(!showpassword)
    // }
  return (
    <div>
      <div className='text-[13px] text-slate-800'>{label}</div>
      <div className='input-box'>
        <input 
            className='w-full bg-transparent outline-none'
            type={type=='password' ? showpassword ? 'text' : 'password' : type}
            placeholder={placeholder}
            value = {value}
            onChange={(e)=>onChange(e)}
        />
        {type=='password' &&
            <div>
                {showpassword ? (
                    <FaRegEye
                        size={22}
                        className='text-primary cursor-pointer'
                        onClick={()=>setshowpassword(!showpassword)}
                    />
                ) : (
                    <FaRegEyeSlash
                        size={22}
                        className='text-slate-400 cursor-pointer'
                        onClick={()=>setshowpassword(!showpassword)}
                    />
                )}
            </div>
        }
      </div>
    </div>
  )
}

export default Input
