import commentButtonIcon from "../../images/comment-button-icon.png"

function CommentButton(props) {

    return (
        <img
            src={commentButtonIcon}
            alt="comment tool"
            onClick={props.selectCommentTool}
            className="CommentButton"
        />
    )
}

export default CommentButton