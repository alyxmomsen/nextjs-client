"use client";

import tailwindTemplates from "@/styles/taliwind-templates";
import axios, { Axios, AxiosResponse } from "axios";
import { loadBindings } from "next/dist/build/swc";
import Image from "next/image";
import { title } from "process";
import React, { useEffect, useLayoutEffect, useReducer, useState } from "react";

interface PostSchema {
  _id:string ;
  title: string;
  body: string;
  date_to_post: string;
  authorId: string;
  authorUserName: string;
  image_url: string;
  date: string;
}

// interface ModifyFields extends Pick<PostSchema , 'body'|'title'> {}

interface MyServerResponse<T> {
  message: string;
  payload: { descriptor: string; body: T | null };
  status: boolean;
}

/**
 *
 * @param param0
 * @returns
 */

const PostById = ({ postId }: { postId: string }) => {
  const [thePost, setPost] = useState<PostSchema | null>(null);

  const [modiyFields, dispatchModFields] = useReducer(
    (
      state: Pick<PostSchema, "title" | "body">,
      action: {
        type: string;
        payload: Partial<Pick<PostSchema, "title" | "body">>;
      } ,
    ) => ({ ...state , ...action.payload }),
    { title: "", body: "" },
  );


  useEffect(() => {
    
  }, [thePost]);

  useEffect(() => {
    getPostBYId(postId)
      .then((data) => {
        if (data) {
          setPost(data.body);
          console.log(data.body);
          const body = data.body ;
          if(body) {

            dispatchModFields({type:'update' , payload:{title:body.title , body:body.body}});
          }

        }

        console.log({ data });
      })
      .catch((err) => err)
      .finally(() => {});
  }, []);

  return (
    <div>
      <h2>Post.by.Id</h2>
      {thePost && (
        <form onSubmit={(e) => {
          e.preventDefault() ;
          
          const update = async () => {

            try {

              const response = await axios.patch('http://localhost:3001/api/user/account/thepost' , 
                {...modiyFields , postid:thePost._id}
               , {
                headers:{
                  Authorization:localStorage.getItem('access_token') ,
                }
              })

              return response ;

            } catch (err) {

              if(axios.isAxiosError(err)) {

                return null ;
              }
              else {
                return null ;
              }
            }
            
          }

          update().then(response => {
            console.log(response);
          }) ;

        }}>
          <img src={thePost.image_url} width={200} />
          <div>
            <span>author ID</span> : <span>{thePost.authorId}</span>
          </div>
          <div>
            <span>post ID</span> : <span>{thePost._id}</span>
          </div>
          <div>
            <span>author username</span> : <span>{thePost.authorUserName}</span>
          </div>
          <div>
            <span>title</span> :{" "}
            <input
              onInput={(e) => dispatchModFields({type:'update' , payload:{title:e.currentTarget.value}})}
              className={tailwindTemplates.inputText}
              type="text"
              value={modiyFields.title}
            />
          </div>
          <div>
            <span>body</span> :{" "}
            <textarea
              onInput={(e) => dispatchModFields({type:'update' , payload:{body:e.currentTarget.value}})}
              value={modiyFields.body}
              className={tailwindTemplates.textArea}
              cols={99}
              rows={3}
            />
          </div>
          <div>
            <span>creation date</span> : <span>{thePost.date}</span>
          </div>
          <div>
            <span>posted date</span> : <span>{thePost.date_to_post}</span>
          </div>
          <button className={tailwindTemplates.button} type="submit">update</button>
        </form>
      )}
    </div>
  );
};

export default PostById;

/**
 *
 * @param postId
 * @returns
 */

async function getPostBYId(postId: string) {
  try {
    const response = await axios.get<MyServerResponse<PostSchema>>(
      "http://localhost:3001/api/user/account/the_post" + `?postid=${postId}`,
      {
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      },
    );

    if (response.data.payload) {
      console.log(response.data.payload);
      return response.data.payload;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
