import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import VideoCards from "./VideoCards";
import { useYoutubeApi } from "./Context/YoutubeApi";

export default function Videos() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    queryKey: ["videos", keyword],
    queryFn: () => {
      return youtube.search(keyword);
    },
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Ooops!</p>}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2 gap-2 gap-y-4">
        {videos &&
          videos.map((video) => {
            return <VideoCards key={video.id} video={video} />;
          })}
      </ul>
    </>
  );
}
