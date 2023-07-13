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
    </main>
  );
}
