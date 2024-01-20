"use client"
import React, { use } from 'react'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userMarkdown } from '@/store/atom/userMarkdown'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
function Preview() {
    const markdown = useRecoilValue(userMarkdown)
  return (
    <div className='overflow-scroll p-3 prose lg:prose-sm border-2 border-black  h-[44vh]  lg:w-[40vw] lg:h-[80vh]'>
        <Markdown remarkPlugins={[remarkGfm]}>
            {markdown}
            </Markdown>
    </div>
  )
}

export default Preview