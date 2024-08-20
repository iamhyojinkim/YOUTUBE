import { useLocation } from "react-router-dom";
import RelatedVideos from "./RelatedVideos";
import ChannelInfo from "./ChannelInfo";
import Comment from "./Comment";
import { useState } from "react";

export default function VideoDetail() {
  const {
    state: { video },
  } = useLocation();

  const { title, channelId, channelTitle, description } = video.snippet;
  const [more, setMore] = useState(false);
  const handleMore = () => setMore(!more);

  return (
    <>
      <section className="flex flex-col lg:flex-row">
        <article className="basis-4/6">
          <iframe
            id="player"
            type="text/html"
            width="100%"
            height="640"
            src={`http://www.youtube.com/embed/${video.id}`}
            frameBorder="0"
          />
          <div className="p-8">
            <h2 className="text-xl font-bold">{title}</h2>
            <div className="flex items-center">
              <ChannelInfo id={channelId} name={channelTitle} />
            </div>
            <pre
              onClick={handleMore}
              className={`whitespace-pre-wrap cursor-pointer ${
                !more && "line-clamp-2"
              }`}
            >
              {description}
            </pre>
          </div>
          <Comment videoId={video.id} />
        </article>
        <section className="basis-2/6">
          <RelatedVideos id={video.id} />
        </section>
      </section>
    </>
  );
}
