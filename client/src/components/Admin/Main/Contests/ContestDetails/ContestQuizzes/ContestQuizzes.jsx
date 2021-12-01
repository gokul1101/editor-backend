import React from "react";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import './ContestQuizzes.css'
const ContestQuizzes = () => {
    const eventArr = [
        { name: "November challenge 2021" },
        { name: "Java challenge 2021" },
        { name: "Python challenge 2021" },
    ];
    return (
        <div className="container">
            <div className="d-flex flex-column" style={{ marginTop: '40px' }}>
                <p className="text-left dash-title-category pb-2">Quiz Challenges</p>
                <span className="create-con-text mt-1">
                    Add quiz to the challenge to the contest by selecting quiz challenge from our library or create
                </span>
                <span className="create-con-text">
                    of your own challenges here. To record your challenges, simply select the challenge and drag and
                </span>
                <span className="create-con-text">
                    drop to the desired location{" "}
                </span>
            </div>
            <div className="create-con">
                {/* <Link to="/contests/create-contest"> */}
                <button className="p-2 mt-3">
                    <i className="fas fa-plus pr-2 pl-2"></i>ADD CHALLENGES
                </button>
                {/* </Link> */}
            </div>

            <div className="challenge-chips d-flex flex-wrap border p-2 mt-4">
                {eventArr.length > 0 ?
                    eventArr.map((e) => {
                        return (
                            <div className="create-con">
                                <div className="p-2 mr-2 ml-2 quizzes-chip">

                                    <DeleteOutlineIcon /><span className="pl-2">{e.name}</span>
                                </div>
                            </div>
                        )
                    })
                    : <span>No changes have been made yet</span>}


            </div>
        </div>
    )
}

export default ContestQuizzes;