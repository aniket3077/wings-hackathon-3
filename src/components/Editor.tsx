"use client"
import React from 'react'
import Markdown from 'react-markdown'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import remarkGfm from 'remark-gfm'
import { userMarkdown } from "@/store/atom/userMarkdown" 



function Editor() {
    const setMarkdown = useSetRecoilState(userMarkdown);
    const markdown = useRecoilValue(userMarkdown)
  return (
    
        <textarea value={markdown} onChange={(e) => setMarkdown(e.target.value)} className=' p-3 prose border-2 lg:border-black lg:h-[80vh] lg:w-[40vw] h-[44vh] ' />
      
  
  );
}

export default Editor