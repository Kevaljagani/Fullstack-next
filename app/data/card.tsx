"use client"
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import toast  from "react-hot-toast";
import axios from "axios";

type ToggleProps = {
  
  setToggle: (toggle: boolean) => void
  id1: string
  city1: string
  country1: string
  phone1: string
}


export default function Card({ setToggle, id1, city1, country1, phone1 }: ToggleProps) {

  const [city, setCity] = useState(city1);
  const [country, setCountry] = useState(country1);
  const [phone, setPhone] = useState(phone1);
  const [isDisabled, setIsDisabled] = useState(false);

const queryClient = useQueryClient()

const { mutate } = useMutation(
  async ({ id1, city, country, phone }) => // Include city, country, and phone in the mutation
    await axios.patch("/api/posts/updateData", {
      id1,
      city,
      country,
      phone,
    }),
  {
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message);
      }
      setIsDisabled(false);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["foo"]);
      toast.success("Data updated")
      setCity("")
      setCountry("")
      setPhone("")
      setIsDisabled(false)
      setToggle(false)
    },
  }
);


// const updateData = async (city: string, country: string, phone: string) => {
//   console.log({city, country, phone})
//   //mutate({ city, country, phone }); 
// }

const updateData = () => { 
 mutate({ id1, city, country, phone });
}

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        setToggle(false)
      }}
      className="fixed bg-black/50 w-full h-full z-20 left-0 top-0 "
    >
      <div onClick={(e) => {
        e.stopPropagation()
        setToggle(true)
      }} 
      
      
      className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h2 className="text-xl">
          Edit this Post
        </h2>
        
        {/* inputs*/}

        <div className="flex flex-col my-4">
        <input
          type="text"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          placeholder="City"
          className="p-4 text-lg rounded-md my-2  bg-gray-200"
        />
        <input
          type="text"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
          placeholder="Country"
          className="p-4 text-lg rounded-md my-2  bg-gray-200"
        />
        <input
          type="text"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          placeholder="Phone"
          className="p-4 text-lg rounded-md my-2  bg-gray-200"
        />
      </div>


      
        <button
          onClick={updateData}
          className="bg-teal-600 text-sm text-white py-2 px-4 rounded-md"
        >
          Update
        </button>
      </div>
    </div>
  )
}