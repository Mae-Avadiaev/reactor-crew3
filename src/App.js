import './App.css';
import CommentButton from "./components/CommentButton/CommentButton";
import {useEffect, useState} from "react";
import commentCursor from "./images/comment-cursor.png";
import simpleCursor from "./images/cursor.png"
import Comment from "./components/Comment/Comment";

function App() {

    const [isCommentToolSelected, setIsCommentToolSelected] = useState(false)
    const [isBlankComment, setIsBlankComment] = useState(false)
    const [logOfOpenedComments, setLogOfOpenedComments] = useState([-1, -1])

    const selectCommentTool = () => {
        setIsCommentToolSelected(prevState => !prevState)
    }

    const handleCanvasClick = (event) => {
        if (isBlankComment)
            removeBlankComment()
        if (isCommentToolSelected)
            addComment(event)
        else
            setLogOfOpenedComments(prevState => [prevState[1], -1])
    }

    const removeBlankComment = () => {
        setCommentsList(prevState => {
            prevState.pop()
            return [...prevState]
        })
        setIsBlankComment(false)
    }

    const addComment = (event) => {
        setLogOfOpenedComments(prevState => [prevState[1], commentsList.length])
        setCommentsList(prevState => [
            ...prevState,
            {
                key: commentsList.length,
                index: commentsList.length,
                x: event.clientX,
                y: event.clientY,
                setIsBlankComment: setIsBlankComment,
                setLogOfOpenedComments: setLogOfOpenedComments
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
                        logOfOpenedComments={logOfOpenedComments}
                        isBlankComment={isBlankComment}
                    />
                )
            })}
            <CommentButton selectCommentTool={selectCommentTool}/>
        </div>
  );
}

export default App;
