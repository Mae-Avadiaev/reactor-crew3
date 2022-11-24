import userPhoto from "../../images/user-avatar.jpeg";
import {useEffect, useRef, useState} from "react";
import editIcon from "../../images/pencil-icon.png"
import replyIcon from "../../images/reply-icon.png"
import deleteIcon from "../../images/delete-icon.png"
import CommentInput from "../CommentInput/CommentInput";

function UserComment(props) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    const ref = useRef(null)


    const [replyList, setReplyList] = useState([])
    const [mode, setMode] = useState("")

    const toggleReplyMode = () => {
        setMode(prevState => {
            if (prevState === "reply")
                return ""
            else
                return "reply"
        })
    }

    // const addReply = () => {
    //   setReplyList(prevState => [...prevState,
    //       {
    //           content: userInput,
    //           key: userCommentsList.length,
    //           userName: "Private Data",
    //           postDate: Date.now()
    //       }
    //   ])
    // }

    const toggleEditMode = () => {
        setMode(prevState => {
            if (prevState === "edit")
                return ""
            else
                return "edit"
        })
    }

    const [userEditInput, setUserEditInput] = useState(props.content)

    const handleUserInput = (event) => {
        setUserEditInput(event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            props.setUserCommentsList(prevState => {
                let newComment = {...prevState[props.index], content: userEditInput}
                return [...prevState.slice(0, props.index), newComment, ...prevState.slice(props.index + 1)]
            })
            setMode("")
        }
    }

    const deleteComment = () => {
        props.setUserCommentsList(prevState => {
            return [...prevState.slice(0, props.index), ...prevState.slice(props.index + 1)]
        })
    }

    useEffect(() => {
        if (props.isOpened === false) {
            setIsMenuOpen(false)
            setMode("")
        }
    }, [props.isOpened])

    return (
        <>
            <div className="UserCommentAndMenuContainer" ref={ref}>
                <div
                    className="UserCommentContainer"
                    style={{
                        opacity: props.opacity + "%",
                        transition: "opacity " + props.transitionRatio + "s",
                        marginLeft: props.isReply ? "20px" : "0"
                    }}
                >
                    {/*{props.isReply &&*/}
                    {/*    <div className="ReplyIndentation" style={{height: ref.current.offsetHeight + 10}}/>*/}
                    {/*}*/}
                    <div className="CommentDataAndMenuContainer">
                        <div className="CommentDataContainer">
                            <img
                                className="UserPhotoComment"
                                src={userPhoto}
                                alt="User Photo"
                            />
                            <p className="UserNameComment">{props.userName}</p>
                            <p className="PostDate">
                                {Math.floor((Date.now() - props.postDate) / 1000 / 60) + " min ago"}
                            </p>
                        </div>
                        <p
                            onClick={toggleMenu}
                            style={{margin: "8px 0 0 0"}}
                        >⋯</p>
                    </div>
                    {mode === "edit" ?
                        <input
                            className="Input EditInput"
                            typeof="text"
                            onChange={handleUserInput}
                            onKeyDown={handleKeyDown}
                            value={userEditInput}
                            autoFocus
                        />
                        :
                        <p className="UserComment">{props.content}</p>
                    }
                </div>
                {isMenuOpen &&
                    <div
                        className="UserCommentMenu"
                        style={{
                            left: ref.current.offsetWidth + 6,
                            height: props.isReply ? ref.current.offsetHeight / 3 * 2 : ref.current.offsetHeight
                        }}
                    >
                        {!props.isReply &&
                        <div className="UserCommentButton ReplyButton" onClick={toggleReplyMode}>
                            <img className="ReplyIcon" src={replyIcon} alt="Reply Icon"/>
                        </div>}
                        <div className="UserCommentButton EditButton" onClick={toggleEditMode}>
                            <img className="EditIcon" src={editIcon} alt="Edit Icon"/>
                        </div>
                        <div className="UserCommentButton DeleteButton" onClick={deleteComment}>
                            <img className="DeleteIcon" src={deleteIcon} alt="Delete Icon"/>
                        </div>
                    </div>
                }
            </div>
            {replyList.map((reply, index) => {
                return <UserComment
                    {...reply}
                    isReply={true}
                    opacity={props.opacity}
                    transitionRatio={props.transitionRatio}
                    setUserCommentsList={setReplyList}
                    index={index}
                    isOpened={props.isOpened}
                />
            }) }
            {mode === "reply" &&
            <>
                <CommentInput
                    userCommentsList={replyList}
                    setUserCommentsList={setReplyList}
                    isOpened={props.isOpened}
                    isReply={true}
                    setIsMenuOpen={setIsMenuOpen}
                />
            </>
            }
        </>
    )
}

export default UserComment