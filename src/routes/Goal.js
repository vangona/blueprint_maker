import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DreamFinding from "../components/finding/DreamFinding";
import LongtermFinding from "../components/finding/LongtermFinding";
import ShorttermFinding from "../components/finding/ShorttermFinding";
import PlanFinding from "../components/finding/PlanFinding";
import RoutineFinding from "../components/finding/RoutineFinding";

const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 50px;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const DreamLabel = styled.label``;

const DreamContainer = styled.div``;

const DreamInput = styled.input``;

const GoalStateBtn = styled.button`
    width: 150px;
    border: white 1px solid;
    border-radius: 15px;
    padding: 3px;
    color: white;
    background-color: transparent;
    margin: 10px;
    :hover {
        cursor: pointer;
    }
`;

const PrevBtn = styled.button``;

const Goal = ({userObj, targets}) => {
    const [goalState, setGoalState] = useState("");

    const sendGoalState = (state) => {
        setGoalState(state);
    }

    const onClick = (e) => {
        const name = e.target.getAttribute("name")
        if (name === "prev") {
            setGoalState("");
        }
        if (name === "target") {
            setGoalState("target");
        }
        if (name === "dream") {
            setGoalState("dream")
        }
        if (name === "longterm") {
            setGoalState("longterm")
        }
        if (name === "shortterm") {
            setGoalState("shortterm")
        }
    }

    useEffect(() => {
    }, [])
    
    return (
        <Container>
            {!goalState &&
            <>
                <DreamContainer>
                    <DreamLabel>내 꿈은 </DreamLabel>
                    <DreamInput type="text" />
                </DreamContainer>
                <GoalStateBtn onClick={onClick} name="target">목표 세우기</GoalStateBtn>
            </>
            }
            {goalState === "target" && 
            <>
                <GoalStateBtn onClick={onClick} name="longterm">1년 이상, 장기 목표</GoalStateBtn>
                <GoalStateBtn onClick={onClick} name="shortterm">1년 이하, 단기 목표</GoalStateBtn>
                <PrevBtn name="prev" onClick={onClick}>홈으로</PrevBtn>
            </>
            }
            {goalState === "dream" &&
            <>
            <DreamFinding userObj={userObj} sendGoalState={sendGoalState} />
            <PrevBtn name="prev" onClick={onClick}>홈으로</PrevBtn>
            </>
            }
            {goalState === "longterm" &&
            <>
            <LongtermFinding userObj={userObj} sendGoalState={sendGoalState} />
            <PrevBtn name="prev" onClick={onClick}>홈으로</PrevBtn>
            </>
            }
            {goalState === "shortterm" &&
            <>
            <ShorttermFinding userObj={userObj} sendGoalState={sendGoalState} />
            <PrevBtn name="prev" onClick={onClick}>홈으로</PrevBtn>
            </>
            }
        </Container>
    )
}

export default Goal;