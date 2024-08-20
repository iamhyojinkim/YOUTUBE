import { createContext, useEffect, useContext, useState } from "react";
import { RelatedVideo } from "../api/RelatedVideo";
import { userChange } from "../Firebase/firebase";
import Youtube from "../api/youtube";

export const YoutubeApi = createContext();

export default function YoutubeApiProvider({ children }) {
  const [user, setUser] = useState();
  useEffect(() => {
    userChange((user) => setUser(user));
  }, []);

  const youtube = new Youtube();
  const relatedToVideoId = new RelatedVideo();
  return (
    <YoutubeApi.Provider value={{ user, youtube, relatedToVideoId }}>
      {children}
    </YoutubeApi.Provider>
  );
}
export function useYoutubeApi() {
  return useContext(YoutubeApi);
}
