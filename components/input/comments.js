import {useState, useEffect, useContext} from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const {eventId} = props;
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      // notificationCtx.showNotification({
      //   title: "Loading comments...",
      //   message: "Loading comments.",
      //   status: "pending",
      // });
      fetch("/api/comments/" + eventId)
        .then((response) => {
          return response.json();
          // if (response.ok) {
          //   return response.json();
          // }
          // return response.json().then((data) => {
          //   throw new Error(data.message || "Something went wrong");
          // });
        })
        .then((data) => {
          console.log("data", data);
          setIsFetchingComments(false);
          // notificationCtx.showNotification({
          //   title: "Success!!",
          //   message: "Successfully loaded  comments.",
          //   status: "success",
          // });
          setComments(data.comments);
        });
      // .catch((error) => {
      //   notificationCtx.showNotification({
      //     title: "Error",
      //     message: error.message || "Opps something went wrong.",
      //     status: "error",
      //   });
      // });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
    // if(!showComments) {

    // }
  }

  function addCommentHandler(commentData) {
    // console.log(commentData);
    // send data to API
    notificationCtx.showNotification({
      title: "Saving comments...",
      message: "Saving your new  comments.",
      status: "pending",
    });
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully submitted.",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Error fetching for comments.",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
