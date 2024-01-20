import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { get } from 'http';

function Navbar() {
    const [id,setid] = useState("");
    const getId = async() => {
        const res = await axios.get("/api/users/me");
        setid(res.data.data._id);
    }
    getId();
  return (
    <div>
        <ul className='flex gap-10 py-6 pl-16'>
            <Link  href={`/profile/${id}`}>Home</Link>
            <Link href='/explore'>Explore</Link>
            <Link href={`/profile/${id}/create`}>Create</Link>
        </ul>
    </div>
  )
}

export default Navbar