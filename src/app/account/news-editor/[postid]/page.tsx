import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { Suspense } from 'react'
import PostById from './components/user-post-by-id';

const NewsEditor = async ({params}:{params:Params}) => {

  return (
    <div>
      <h3>the news editor</h3>
      <PostById postId={params.postid} />
    </div>
  )
}

export default NewsEditor

// function getPostById (postId:string) {

//   fetch('http://localhost:3001/api/account/' + postId , {
//     headers:{
      
//     }
//   })

//   return 
// }
