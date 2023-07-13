import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import Spinner from '../Components/Spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper' 
import { EffectFade, Autoplay, Navigation, Pagination } from 'swiper/modules';
import "swiper/css/bundle";
import { toast } from 'react-toastify';
import {FaShare} from 'react-icons/fa'
import {FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair} from 'react-icons/fa'

export default function Listing() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [shareLinkCopied,setShareLinkCopied] = useState(false)

  SwiperCore.use([EffectFade, Autoplay, Navigation, Pagination]);

  useEffect(() => {
    async function fetchListing() {
        const docRef = doc(db, "listings", params.listingId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setListing(data);
          setLoading(false);
          console.log(listing);
        } else {
          toast.error("No image found");
        }
      }
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Swiper slidesPerView={1} navigation pagination={{ type: "progressbar" }} effect='fade' autoplay={{ delay: 4000 }}>
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div className='w-full overflow-hidden h-[300px] relative' style={{ background: `url(${listing.imgUrls[index]}) center no-repeat`, backgroundSize: "cover" }}>
              {/* Content within the SwiperSlide */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='fixed top-[13%] right-[3%] z-10 cursor-pointer bg-white border-2 border-gray-400 rounded-full w-12 h-12 flex items-center justify-center' onClick={()=>{
        navigator.clipboard.writeText(window.location.href);
        setShareLinkCopied(true);
        setTimeout(()=>{
            setShareLinkCopied(false);
        },2000)
      }}>
        <FaShare className='text-lg text-slate-500'/>
      </div>
      {shareLinkCopied && (
        <p className=' fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 z-10 rounded-md bg-white p-2'>Link Copied</p>
      )}
      <div className=' m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5'>
        <div className=' w-full h-[200px] lg:h-[400px]'>
          <p className='text-2xl font-bold mb-3 text-blue-900'>
            {listing.name} - $ {listing.offer ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}{listing.type === 'rent' ? " / month" : ""}
          </p>
          <p className='flex items-center mt-6 mb-3 font-semibold'>
            <FaMapMarkerAlt className='text-green-700 mr-1'/>{listing.address}
          </p>
          <div className='flex justify-start items-center space-x-4 w-[75%]'>
            <p className='bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md'>{listing.type ==='rent' ? "Rent" : "Sale"}</p>
            {listing.offer && (<p className=' w-full max-w-[200px] bg-green-800 rounded-md p-1 text-center text-white font-semibold shadow-md'>${(+listing.regularPrice) - (+listing.discountedPrice)} discount</p>)}
          </div>
          <p className=' my-3'>
            <span className='font-semibold'>Description - </span>{listing.description}
          </p>
          <ul className='flex space-x-2 items-center lg:space-x-10 text-sm font-semibold'>
            <li className='flex items-center whitespace-nowrap'>
              <FaBed className='mr-1 text-lg'/>{+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `1 Bed`}
            </li>
            <li className='flex items-center whitespace-nowrap'>
              <FaBath className='mr-1 text-lg'/>{+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `1 Bath`}
            </li>
            <li className='flex items-center whitespace-nowrap'>
              <FaParking className='mr-1 text-lg'/>{listing.parking  ? `Parking Spot` : `No Parking`}
            </li>
            <li className='flex items-center whitespace-nowrap'>
              <FaChair className='mr-1 text-lg'/>{listing.furniture  ? `Furnished` : `Not Furnished`}
            </li>
          </ul>
        </div>
        <div className='bg-blue-300 w-full h-[200px] lg:h-[400px] z-10 overflow-x-hidden'>

        </div>
      </div>
    </main>
  );
}
