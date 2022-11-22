import postButton from "../../images/post-button.png"
import {useState, useEffect} from "react";
import UserComment from "../UserComment/UserComment";

function Comment(props) {

    const [userCommentsList, setUserCommentsList] = useState([])
    const [userInput, setUserInput] = useState("")
    const [display, setDisplay] = useState(true)

    const postUserComment = () => {
        setUserCommentsList(prevState => [
            ...prevState,
            {
                content: userInput,
                key: userCommentsList.length
            }
        ])
        setUserInput("")
    }

    const handleUserInput = (event) => {
        setUserInput(event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter')
            postUserComment()
    }

    useEffect(() => {
        if (userCommentsList.length === 0) {
            if (userInput !== "")
                props.setIsBlankComment(false)
            else
                props.setIsBlankComment(true)
        } else {
            props.setIsBlankComment(false)
        }
    }, [userInput, props, userCommentsList])

    const openComment = () => {
        if (userCommentsList.length > 0) {
            props.setIndexOfOpenedComment(props.index)
        }
    }

    // useEffect(() => {
    //     console.log(props.index, props.indexOfOpenedComment !== props.index)
    //     if (props.indexOfOpenedComment !== props.index) {
    //         setTimeout(() => {
    //             setDisplay(false)
    //         }, 1000)
    //     } else {
    //         setDisplay(true)
    //     }
    // }, [props.indexOfOpenedComment])

    return (
        <div
            className="Comment"
            style={{top: props.y - 20, left: props.x}}
        >
            <div
                className="BlueCircle"
                onClick={openComment}
                style={props.index !== props.indexOfOpenedComment ?
                    {borderRadius: "50% 50% 50% 0"} : {borderRadius: "50%"}}
            >
                <p
                    className="CommentsCount"
                    style={props.index !== props.indexOfOpenedComment ? {opacity: "100%"} : {opacity: "0"}}
                >
                    {userCommentsList.length}
                </p>
            </div>
            <div
                className="CommentsContainer"
                // style={display ? {} : {display: "none"}}
            >
                <div
                    className="CommentInputContainer"
                    style={props.index === props.indexOfOpenedComment ?
                        {opacity: "100%", transition: "opacity 0.3s"} :
                        {opacity: "0", transition: "opacity 0.3s"}}
                >
                    <input
                        className="Input"
                        typeof="text"
                        placeholder="Add a comment"
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
                {userCommentsList.slice(0).reverse().map((userComment, index) => {
                    return (
                        <UserComment
                            {...userComment}
                            opacity={props.index === props.indexOfOpenedComment ? 100 : 0}
                            transitionRatio={(((index + 2) * 3) / 10 )}
                        />
                    )
                })}
            </div>

        </div>
    )
}

export default Comment