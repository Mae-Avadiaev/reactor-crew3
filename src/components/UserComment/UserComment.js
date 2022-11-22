function UserComment(props) {

    return (
        <div
            className="UserCommentContainer"
            style={{
                opacity: props.opacity + "%",
                transition: "opacity " + props.transitionRatio + "s"
            }}
        >
            <p className="UserComment">{props.content}</p>
        </div>
    )
}

export default UserComment