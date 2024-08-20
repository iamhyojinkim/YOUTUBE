import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";

export default function VideoCards({ video, type }) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const navigate = useNavigate();
  const isList = type === "list";
  return (
    <>
      <li
        className={isList ? "flex gap-1 m-2" : ""}
        onClick={() =>
          navigate(`/videos/watch/${video.id}`, { state: { video } })
        }
      >
        <img
          className={isList ? "w-60 mr-2 rounded-md" : "w-full rounded-md"}
          src={thumbnails.medium.url}
          alt={title}
        />
        <div>
          <p className="font-semi-bold my-2 line-clamp-2">{title}</p>
          <p className="text-sm opacity-80">{channelTitle}</p>
          <p className="text-sm opacity-80">{format(publishedAt)}</p>
        </div>
      </li>
    </>
  );
}
