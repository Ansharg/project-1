import { getAuth, updateProfile } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { db } from '../Firebase';
import {FcHome} from 'react-icons/fc'
import ListingItem from '../Components/ListingItem';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetails,setDetailsChange]= useState(false);
  const [listings,setListings] = useState(null);
  const [loading,setLoading] = useState(true);
  const [formData,setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })
  const {name,email} = formData;
  function onLogout(){
    auth.signOut();
    navigate("/")
  }
  function onChange(e)
  {
    setFormData((prevState)=>({...prevState, [e.target.id]: e.target.value}))
  }
  async function onSubmit(e)
  {
    try {
      if (auth.currentUser.displayName!==name) {
        await updateProfile(auth.currentUser, {displayName:name});
      }
      const docRef = doc(db,"users",auth.currentUser.uid);
      await updateDoc(docRef,{name});
      toast.success("Profile details updated")
    } catch (error) {
      toast.error("Could not update the profile details");
    }
  }
  React.useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);
  return (
    <>
    <section className='max-w-6xl mx-auto flex flex-col justify-center items-center'>
      <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
      <div className='w-full md:w-[50%] mt-6 px-3 '>
        <form>
          <input type="text" id='name' value={name} disabled={!changeDetails} onChange={onChange} className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition ease-in-out rounded mb-6 ${changeDetails && "bg-red-200 focus:bg-red-200"}`} />
          <input type="email" id='email' value={email} disabled={!changeDetails} onChange={onChange} className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition ease-in-out rounded mb-6' />
          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
            <p className='flex items-center'>Do you want to change your name?<span className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer' onClick={()=>{changeDetails && onSubmit();setDetailsChange((prevState)=>!prevState)}} >{changeDetails ? "Apply change" : "Edit"}</span></p>
            <p className='text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer' onClick={onLogout}>Sign out</p>
          </div>
        </form>
        <button type="submit" className='flex items-center w-full justify-center bg-blue-600 text-white py-3 px-7 rounded transition duration-150 ease-in-out hover:bg-blue-700 active:bg-blue-800 uppercase text-sm font-medium shadow-md hover:shadow-lg'><Link to="/create-listing" className='flex items-center'><FcHome className='mr-2 text-3xl bg-red-200 rounded-full p-1 border-2' />Sell or rent your home</Link></button>
      </div>
    </section>
    <div className='max-w-6xl px-3 mt-6 mx-auto'>
      {!loading && listings.length > 0 && (
        <>
          <h2 className='text-2xl text-center font-semibold'>My Listings</h2>
          <ul>
            {listings.map((listing)=>(
              <ListingItem 
              key={listing.id}
              id={listing.id}
              listing={listing.data}/>
            ))}
          </ul>
        </>
      )}
    </div>
    </>
  )
}
