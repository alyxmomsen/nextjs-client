"use client";

import { BASE_URL } from "@/globals/glolbals";
import tailwindTemplates from "@/styles/taliwind-templates";
import axios from "axios";
import { resolve } from "path";
import React, { useEffect, useState } from "react";
import NewsThumbNail from "./components/news-thumb-nail";

interface Post {
  _id: string;
  title: string;
  body: string;
  image_url:string
}

const MyPosts = ({}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getMyPosts()
      .then((response) => {
        console.log({ response });

        setPosts(response.data.payload.body);
      })
      .catch((err) => {
        setPosts([]);
        console.error({ err });
      });
  }, []);

  return (
    <div>
      <h2>MyPosts</h2>
      <div className={tailwindTemplates.wrapper}>
        {posts.map((elem) => (
          <NewsThumbNail data={elem} />
        ))}
      </div>
    </div>
  );
};

export default MyPosts;

async function getMyPosts() {
  const token = localStorage.getItem("access_token");
  // console.log(localStorage);
  const response = await axios
    .get(`${BASE_URL}/api/user/posts`, {
      headers: {
        Authorization: token,
      },
    })
    .catch((err) => {
      return err;
    });

  return response;
}
