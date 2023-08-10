"use client"

import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"
import List from "./List";
import Post from "../Post";
import { AuthPosts } from "../types/AuthPosts"
import EditPost from "../dashboard/EditPost";
import { useQuery } from "react-query"

export default function CreatePost() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();

  // Create a post
  const { mutate } = useMutation(
    async ({ city, country, phone }) => // Include city, country, and phone in the mutation
      await axios.post("/api/posts/addData", {
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
        toast.success("Data Added")
        setCity("")
        setCountry("")
        setPhone("")
        setIsDisabled(false)
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate({ city, country, phone }); 
  };


  const fetchAuthPosts = async () => {
    const response = await axios.get("/api/posts/getData")
    return response.data
  }

  const { data, isLoading } = useQuery(
    "foo",
    fetchAuthPosts
  )


  // const updateData = async (id: string, city: string, country: string, phone: string) => { 
  //   console.log(id, city, country, phone)
  // }

  return (
    <div>
    <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md ">
      <div className="flex flex-col my-4">
        <input
          type="text"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          name="city"
          placeholder="City"
          className="p-4 text-lg rounded-md my-2  bg-gray-200"
        />
        <input
          type="text"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
          name="country"
          placeholder="Country"
          className="p-4 text-lg rounded-md my-2  bg-gray-200"
        />
        <input
          type="text"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          name="phone"
          placeholder="Phone"
          className="p-4 text-lg rounded-md my-2  bg-gray-200"
        />
      </div>
      <div className=" flex items-center justify-between gap-2">
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Create post
        </button>
      </div>
    </form>

    

{/* 
    {data?.map((data) => (
        <EditPost
          id={data.id}
          key={data.id}
          
          name={data.city}
          title={data.city}
          comments={data.city}
        />
      ))} */}


    {data?.map((data) => (
        <List
          city={data.city}
          country={data.country}
          phone={data.phone}
          user={data.user.name}
          id = {data.id}

        />
      ))}



</div>

  );
}
