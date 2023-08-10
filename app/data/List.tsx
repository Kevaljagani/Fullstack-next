"use-client";

import React from 'react'
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "react-query"
import axios from "axios"
import Toggle from "../dashboard/Toggle"
import Card from './card';

type listProps = {
  city: string
  country: string
  phone: string
  user: string
  id: string
}




function List({city, country, phone, user, id}: listProps) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/posts/deleteData", { data: id }),
    {
      onError: (error) => {
        console.log(error)
      },
      onSuccess: (data) => {
        console.log(data)
        queryClient.invalidateQueries("foo")
        toast.success("Post has been deleted.")
      },
    }
  )
  
  
  const deleteData = () => {
    mutate(id)
  }

  const [toggle, setToggle] = React.useState(false)



  const Magic = async (id: string, city: string, country: string, phone: string) => { 
    console.log(id, city, country, phone)
  }

  return (

     <div>
 <table className='min-w-full bg-white border-collapse'>
  <tbody>
    <tr className='border-t'>
      <td className='py-2 px-4 w-1/5 text-left'>{user}</td>
      <td className='py-2 px-4 w-1/5 text-left'>{city}</td>
      <td className='py-2 px-4 w-1/5 text-left'>{country}</td>
      <td className='py-2 px-4 w-1/5 text-left'>{phone}</td>
      <td className='py-2 px-4 w-1/5 text-center'>
        <button onClick={deleteData} className='bg-red-500 text-white rounded-full px-4 py-2'>
          Delete
        </button>
        <button onClick={(e) => {
              e.stopPropagation()
              setToggle(true)
              Magic(id, city, country, phone)
            }} 
            
            className='ml-2 bg-teal-600 text-white rounded-full px-4 py-2'>
          Edit
        </button>
      </td>
    </tr>
  </tbody>
</table>
{toggle && <Card id1={id} city1={city} country1={country} phone1={phone} setToggle={setToggle}/>}
    </div>
  )
}

export default List