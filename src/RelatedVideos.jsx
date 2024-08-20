import { useQuery } from "@tanstack/react-query";
import { RelatedVideo } from "./api/RelatedVideo";
import { useYoutubeApi } from "./Context/YoutubeApi";
import VideoCards from "./VideoCards";

export default function RelatedVideos(videoId) {
  const { relatedToVideoId } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    queryKey: ["videos", videoId],
    queryFn: () => {
      return relatedToVideoId.search(videoId);
    },
  });
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Ooops!</p>}
      <ul>
        {videos &&
          videos.map((video) => {
            return <VideoCards video={video} type="list" />;
          })}
      </ul>
    </>
  );
}
