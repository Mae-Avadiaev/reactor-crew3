import {useState, useEffect} from "react";
import UserComment from "../UserComment/UserComment";
import userPhoto from "../../images/user-avatar.jpeg"
import CommentInput from "../CommentInput/CommentInput";

function Comment(props) {

    const [userCommentsList, setUserCommentsList] = useState([])
    const [display, setDisplay] = useState(true)

    useEffect(() => {
        if (userCommentsList.length === 0)
            props.setIsBlankComment(true)
        else
            props.setIsBlankComment(false)
    }, [userCommentsList])

    const openComment = () => {
        if (userCommentsList.length > 0) {
            props.setLogOfOpenedComments(prevState => [prevState[1], props.index])
        }
    }

    useEffect(() => {
        //closing condition
        if (props.logOfOpenedComments[1] !== props.index &&
            props.logOfOpenedComments[0] === props.index) {
            setTimeout(() => {
                setDisplay(false)
            }, 1000)

        //opening condition
        } else if (props.logOfOpenedComments[1] === props.index) {
            setDisplay(true)
        }
    }, [props.logOfOpenedComments])

    // to control the hover of BlueCircle element when the window is opened and closed
    const [isBlueCircleOnHover, setIsBlueCircleOnHover] = useState(false);

    const handleMouseEnter = () => {
        setIsBlueCircleOnHover(true);
    };

    const handleMouseLeave = () => {
        setIsBlueCircleOnHover(false);
    };

    const isOpened = props.index === props.logOfOpenedComments[1]

    const blueCircleStyle = {
        width: isBlueCircleOnHover && !isOpened ? "200px" : "40px",
        height: isBlueCircleOnHover && !isOpened ? "auto" : "40px",
        borderRadius: isBlueCircleOnHover && !isOpened ? "0 18px 18px 18px" : "0 50% 50% 50%",
        alignItems: isBlueCircleOnHover && !isOpened ? "flex-start" : "center",
        padding: isBlueCircleOnHover && !isOpened ? "10px" : "0",
        backgroundColor: props.isBlankComment && isOpened ? "#4397F7" :"#2B2B2B",
        filter: props.isBlankComment && isOpened ? "drop-shadow(0 0 2px #4397F7)" : "drop-shadow(0 0 2px #2B2B2B)"
    }

    return (
        <div
            className="Comment"
            style={{top: props.y - 35, left: props.x}}
        >
            <div
                className="BlueCircle"
                onClick={openComment}
                style={blueCircleStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img
                    className="UserPhoto"
                    src={userPhoto}
                    alt="User Photo"
                    style={isOpened ? {opacity: "0"} : {opacity: "100%"}}
                />
                {userCommentsList.length > 0 &&
                    <div className="CommentPreviewDataContainer">
                        <div className="NameAndDateContainer">
                            <p className="UserName">{userCommentsList[0].userName}</p>
                            <p className="PostDate">
                                {Math.floor((Date.now() - userCommentsList[0].postDate) / 1000 / 60) + " min ago"}
                            </p>
                        </div>
                        <p className="InitialComment">{userCommentsList[0].content}</p>
                    </div>
                }
            </div>
            <div
                className="CommentsContainer"
                style={display ? {zIndex: 10} : {display: "none"}}
            >
                {userCommentsList.map((userComment, index) => {
                    return (
                        <UserComment
                            {...userComment}
                            opacity={isOpened ? 100 : 0}
                            transitionRatio={(((index + 2) * 3) / 10 )}
                            isReply={false}
                            setUserCommentsList={setUserCommentsList}
                            index={index}
                            isOpened={isOpened}
                        />
                    )
                })}
                <CommentInput
                    userCommentsList={userCommentsList}
                    setUserCommentsList={setUserCommentsList}
                    isOpened={isOpened}
                    isReply={false}
                />
            </div>

        </div>
    )
}

export default Comment