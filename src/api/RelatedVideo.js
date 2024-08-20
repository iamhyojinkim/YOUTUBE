import axios from "axios";

export class RelatedVideo {
  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }
  async search(videoId) {
    return videoId ? this.#relatedVideos(videoId) : null;
  }
  async #relatedVideos(videoId) {
    return this.httpClient
      .get("search", {
        params: {
          part: "snippet",
          maxResults: 10,
          relatedToVideoId: videoId,
          type: "video",
        },
      })
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }
}
