
'use client'

import axios, { AxiosResponse } from 'axios';
import Image from 'next/image';
import React, { useEffect, useLayoutEffect, useState } from 'react'



interface PostSchema {
  title: string,
  body: string,
  date_to_post: string,
  authorId: string,
  authorUserName: string,
  image_url: string,
  date: string,
}

interface MyServerResponse<T> {
  message:string ,
  payload:{descriptor:string , body:T|null} ,
  status:boolean ,
}

/**
 * 
 * @param param0 
 * @returns 
 */

const PostById = ({postId}:{postId:string}) => {

    const [thePost , setPost] = useState<PostSchema|null>(null);

    useEffect(() => {
      console.log({thePost});
    } , [thePost]);

    useEffect(() => {

        getPostBYId(postId).then(data => {

          if(data) {
            setPost(data.body);
          }

          console.log({data});
        }).catch(err => err).finally(() => {})

    } , []);


  return (
    <div>
      <h2>Post.by.Id</h2>
      {
        thePost && (
          <div>
            <img src={thePost.image_url} width={200} />
            <div><span>post ID</span> : <span>{thePost.authorId}</span></div>
            <div><span>author username</span> : <span>{thePost.authorUserName}</span></div>
            <div><span>body</span> : <span>{thePost.body}</span></div>
            <div><span>creation date</span> : <span>{thePost.date}</span></div>
            <div><span>posted date</span> : <span>{thePost.date_to_post}</span></div>
            <div><span>title</span> : <span>{thePost.title}</span></div>
          </div>
        )
      }
    </div>
  )
}

export default PostById

/**
 * 
 * @param postId 
 * @returns 
 */

async function getPostBYId(postId:string) {
  try {
    const response = await axios.get<MyServerResponse<PostSchema>>('http://localhost:3001/api/user/account/the_post' + `?postid=${postId}` , {
      headers:{
        Authorization:localStorage.getItem('access_token') ,
      } ,
    });

    if(response.data.payload) {
      
      console.log(response.data.payload);
      return response.data.payload;
    }
    else {
      return null ;
    }

  } catch (error) {
    console.error(error);
    return null;
  }
}