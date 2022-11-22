import './App.css';
import CommentButton from "./components/CommentButton/CommentButton";
import {useEffect, useState} from "react";
import commentCursor from "./images/comment-cursor.png";
import simpleCursor from "./images/cursor.png"
import Comment from "./components/Comment/Comment";

function App() {

    const [isCommentToolSelected, setIsCommentToolSelected] = useState(false)
    const [isBlankComment, setIsBlankComment] = useState(false)
    const [indexOfOpenedComment, setIndexOfOpenedComment] = useState(-1)

    const selectCommentTool = () => {
        setIsCommentToolSelected(prevState => !prevState)
    }

    const handleCanvasClick = (event) => {
        if (isBlankComment)
            removeBlankComment()
        if (isCommentToolSelected)
            addComment(event)
        else
            setIndexOfOpenedComment(-1)
    }

    const removeBlankComment = () => {
        setCommentsList(prevState => {
            prevState.pop()
            return [...prevState]
        })
    }

    const addComment = (event) => {
        setIndexOfOpenedComment(commentsList.length)
        setCommentsList(prevState => [
            ...prevState,
            {
                key: commentsList.length,
                index: commentsList.length,
                x: event.clientX,
                y: event.clientY,
                setIsBlankComment: setIsBlankComment,
                setIndexOfOpenedComment: setIndexOfOpenedComment
            }
        ])
        setIsCommentToolSelected(false)
        setIsBlankComment(true)
    }

    const [commentsList, setCommentsList] = useState([])

    return (
        <div className="App"
             style={{
                 cursor: isCommentToolSelected ?
                     "url(" + commentCursor + "), auto" :
                     "url(" + simpleCursor + "), auto"
             }}
        >
            <main
              className="Canvas"
              onClick={handleCanvasClick}
            >
            </main>
            {commentsList.map(comment => {
                return (
                    <Comment
                        {...comment}
                        indexOfOpenedComment={indexOfOpenedComment}
                    />
                )
            })}
            <CommentButton selectCommentTool={selectCommentTool}/>
        </div>
  );
}

export default App;
