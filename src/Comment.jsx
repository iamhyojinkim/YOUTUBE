import { useState, useEffect } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { useYoutubeApi } from "./Context/YoutubeApi";
import { login } from "./Firebase/firebase";
import { CommentApi, fetchComments } from "./Firebase/firebase";

export default function Comment({ videoId }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const { user } = useYoutubeApi();

  const handleAdd = () => {
    if (text.trim()) {
      setComments([...comments, text]);
      setText("");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    await CommentApi(text, videoId);
    handleAdd();
  };

  const filteredComments = comments.filter(
    (comment) => comment.videoId === videoId
  );

  useEffect(() => {
    async function loadComments() {
      if (user) {
        const fetchedComments = await fetchComments();
        setComments(fetchedComments);
      }
    }
    loadComments();
  }, [user, comments]);

  return (
    <>
      <form onSubmit={submit}>
        <div className="p-8 flex my-4 mb-8 items-center">
          {user ? (
            <img className="rounded-full w-10 h-10" src={user.photoURL} />
          ) : (
            <IoPersonOutline className="text-2xl" />
          )}
          <input
            className="ml-5 bg-black rounded-lg"
            type="text"
            name="comment"
            value={text}
            placeholder="댓글을 입력해 주세요"
            onClick={() => !user && login()}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="ml-5" type="submit">
            등록
          </button>
        </div>
      </form>
      <div>
        <ul>
          {filteredComments.map((com, index) => (
            <li key={index}>
              <div className="p-8 flex my-4 mb-8 items-center">
                {user && (
                  <img
                    img
                    alt=""
                    className="rounded-full w-10 h-10"
                    src={user.photoURL}
                  />
                )}
                <div className="ml-5">
                  <div className="text-xs text-gray-500">
                    @{user ? user.displayName : ""}
                  </div>
                  {com.text}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
