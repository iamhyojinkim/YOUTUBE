import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useYoutubeApi } from "./Context/YoutubeApi";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ChannelInfo({ id, name }) {
  const { youtube } = useYoutubeApi();
  const {
    state: { video },
  } = useLocation();

  const { data: url } = useQuery({
    queryKey: ["channel", id],
    queryFn: () => {
      return youtube.channelImageURL(id);
    },
  });

  const [like, setLike] = useState(() => {
    const savedLike = localStorage.getItem(`${video.id}`);
    return savedLike ? JSON.parse(savedLike) : false;
  });

  useEffect(() => {
    localStorage.setItem(`${video.id}`, JSON.stringify(like));
  }, [like, video.id]);

  const handleLike = () => setLike(!like);

  return (
    <>
      <div className="flex my-4 mb-8 items-center">
        <div>
          {url && (
            <img className="rounded-full w-10 h-10" src={url} alt={name} />
          )}
        </div>
        <p className="text-lg font-medium ml-2">{name}</p>
        <div className="flex cursor-pointer text-2xl ml-5 mr-5">
          <div className="mr-5" onClick={handleLike}>
            {like ? <FaThumbsUp /> : <FaRegThumbsUp />}
          </div>
        </div>
      </div>
    </>
  );
}
