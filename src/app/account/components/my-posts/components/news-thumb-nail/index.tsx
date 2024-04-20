

import tailwindTemplates from '@/styles/taliwind-templates'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NewsThumbNail = ({data}:{data:{title:string , body:string , _id:string}}) => {
  return (
    <div className={tailwindTemplates.wrapper}>
      <Image src={''} width={100} alt='' />
      <div>{data.title}</div>
      <div>{data.body}</div>
      <button onClick={f=>f} className={tailwindTemplates.button}>delete</button>
      <Link href={'/account/news-editor/' + data._id}>
        <button onClick={f=>f} className={tailwindTemplates.button}>edit</button>
      </Link>
    </div>
  )
}

export default NewsThumbNail