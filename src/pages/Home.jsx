import React, { useEffect, useState } from 'react'
import Slider from '../components/Slider'
import { collection, getDocs, query, where, orderBy, limit} from 'firebase/firestore';
import { db } from "../firebase";
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
export default function Home() {
  // For offer
  const [offerListing, setOfferlisting] = useState(null);
  useEffect(()=>{
    async function fetchListings(){
      try {
        // get reference 
        const listingsRef = collection(db,"listings");
        // create query 
        const q = query(listingsRef, where("offer", "==", true), orderBy("timestamp","desc"), limit(4));
        // Execute the query
        const querySnap = await getDocs(q);
        let listings = [];
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data : doc.data()
          });
        });
        setOfferlisting(listings);
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  },[]);

  // Places for rent
  const [rentListing, setRentlisting] = useState(null);
  useEffect(()=>{
    async function fetchListings(){
      try {
        // get reference 
        const listingsRef = collection(db,"listings");
        // create query 
        const q = query(listingsRef, where("type", "==", "rent"), orderBy("timestamp","desc"), limit(4));
        // Execute the query
        const querySnap = await getDocs(q);
        let listings = [];
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data : doc.data(),
          });
        });
        setRentlisting(listings);
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  },[]);

  // Places for sell
  const [saleListing, setSalelisting] = useState(null);
  useEffect(()=>{
    async function fetchListings(){
      try {
        // get reference 
        const listingsRef = collection(db,"listings");
        // create query 
        const q = query(listingsRef, where("type", "==", "sale"), orderBy("timestamp","desc"), limit(4));
        // Execute the query
        const querySnap = await getDocs(q);
        let listings = [];
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data : doc.data(),
          });
        });
        setSalelisting(listings);
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  },[]);
  return (
    <div>
      <Slider />
      <div className='max-w-6xl mx-auto pt-4 space-y-6 '>
        {offerListing && offerListing.length > 0 && (
            <div className='m-2 mb-6'>
              <h2 className='px-3 text-2xl mt-6 font-semibold'>Recent Offers</h2>
              <Link to="/offers">
                <p className='px-3 text-sm text-blue-600 text-right hover:text-blue-800 font-semibold transition duration-150 ease-in-out'>Show more offers</p>
              </Link>
              <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {offerListing.map((listing)=>(
                  <ListingItem key={listing.id} listing={listing.data} id={listing.id}/>
                ))}
              </ul>
            </div>
        )}
        {rentListing && rentListing.length > 0 && (
            <div className='m-2 mb-6'>
              <h2 className='px-3 text-2xl mt-6 font-semibold'>Places for rent</h2>
              <Link to="/category/rent">
                <p className='px-3 text-sm text-right text-blue-600 hover:text-blue-800 font-semibold transition duration-150 ease-in-out'>Show more places for rent</p>
              </Link>
              <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {rentListing.map((listing)=>(
                  <ListingItem key={listing.id} listing={listing.data} id={listing.id}/>
                ))}
              </ul>
            </div>
        )}
        {saleListing && saleListing.length > 0 && (
            <div className='m-2 mb-6'>
              <h2 className='px-3 text-2xl mt-6 font-semibold'>Places for sale</h2>
              <Link to="/category/sale">
                <p className='px-3 text-sm text-right text-blue-600 hover:text-blue-800 font-semibold transition duration-150 ease-in-out'>Show more places for rent</p>
              </Link>
              <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {saleListing.map((listing)=>(
                  <ListingItem key={listing.id} listing={listing.data} id={listing.id}/>
                ))}
              </ul>
            </div>
        )}
      </div>

    </div>
  )
}
