import BeatLoader from "react-spinners/BeatLoader";

function MainLoader() {
    return (
        <div style={{position : "absolute",top : "50%", left : "50%", transform : "translate(-50%,-50%"}}>
            <BeatLoader
                color="#fff"
                size={20}
            />
        </div>
    )
}

export default MainLoader