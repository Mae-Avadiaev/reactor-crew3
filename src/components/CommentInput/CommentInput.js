import postButton from "../../images/post-button.png";
import {useState} from "react";

function CommentInput (props) {

    const [userInput, setUserInput] = useState("")

    const postUserComment = () => {
        if (userInput !== "") {
            props.setUserCommentsList(prevState => [
                ...prevState,
                {
                    content: userInput,
                    key: props.userCommentsList.length,
                    userName: "Private Data",
                    postDate: Date.now()
                }
            ])
            setUserInput("")
            if (props.setIsMenuOpen)
                props.setIsMenuOpen(false)
        }
    }

    const handleUserInput = (event) => {
        setUserInput(event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter')
            postUserComment()
    }

    return (
        <div
            className="CommentInputContainer"
            style={
                {
                    opacity: props.isOpened ? "100%" : "0",
                    transition: "opacity " + ((props.userCommentsList.length - 1 + 2) * 3 / 10) + "s",
                    margin: props.isReply ? "0 0 10px 20px" : "0 0 10px 0"
                }
            }
        >
            <input
                className="Input"
                typeof="text"
                placeholder={props.isReply ? "Reply" : "Add a comment"}
                onChange={handleUserInput}
                onKeyDown={handleKeyDown}
                value={userInput}
                autoFocus
            />
            <img
                className="PostButton"
                src={postButton}
                alt="Post button"
                onClick={postUserComment}
            />
        </div>
    )
}

export default CommentInput