import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { db } from "../firebase";
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';
import { useParams } from 'react-router-dom';

export default function Category() {
  // fetching the data of the offers section
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastfetchlisting, setLastfetchlisting] = useState(null);
  const params = useParams();

  useEffect(()=>{
    async function fetchListing(){
      try {
        // get refernce 
        const listingRef = collection(db,"listings");
        // write a query to fethc the data
        const q = query(listingRef, where("type","==",params.categoryName), orderBy("timestamp","desc"), limit(8));
        // Execute the query
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastfetchlisting(lastVisible);
        let listings = [];
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error("Could not fetch listing!!")
        
      }
    }
    fetchListing();
  },[params.categoryName]);
  
  // fetch more listings
  async function onFetchMoreListings(){
    try {
      // get refernce 
      const listingRef = collection(db,"listings");
      // write a query to fethc the data
      const q = query(listingRef, where("type","==",params.categoryName), orderBy("timestamp","desc"),
      startAfter(lastfetchlisting),
       limit(4));
      // Execute the query
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastfetchlisting(lastVisible);
      let listings = [];
      querySnap.forEach((doc)=>{
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings((prevState)=>[...prevState, ...listings])
      setLoading(false)
    } catch (error) {
      toast.error("Could not fetch listing!!")
      
    }
  }

  return (
    <div className='max-w-6xl mx-auto px-3'> 
      <h1 className='text-3xl text-center mt-6 font-bold mb-6'>{params.categoryName === "rent" ? "Places for rent" : "Places for sale"}</h1>
      {loading ? (
        <Spinner />
      ): listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {listings.map((listing)=>{
                return <ListingItem key={listing.id} listing = {listing.data} id={listing.id}/>
              })}
            </ul>
          </main>
          {lastfetchlisting &&(
            <div className='flex justify-center items-center'>
              <button onClick={onFetchMoreListings} className='bg-white px-3 py-1.5 text-gray-500 hover:text-gray-900 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out'>
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <p>There are no current {params.categoryName === "rent" ? "places for rent" : "places for sale"}</p>
      )}
    </div>
  )
}
