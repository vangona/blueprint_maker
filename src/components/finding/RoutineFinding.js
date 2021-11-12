import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { dbService } from "../../fBase";
import { Cheers } from "../CheerDB";
import Loading from "../Loading";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`;

const Question = styled.span`
    font-size: 1rem;
    margin-bottom: 20px;
    line-height: 140%;
`;

const ShorttermContainer = styled.div``;

const ShorttermTitle = styled.div`
    border: 1px solid black;
    color: black;
    padding: 10px 15px;
    border-radius: 10px;
    :hover {
        cursor: pointer;
    }
`;

const BtnContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const AnswerInput = styled.input``;

const AnswerNextBtn = styled.button``;

const AnswerPrevBtn = styled.button``;

const Cheer = styled.div`
    text-align: center;
    line-height: 25px;
`;

const CheerMent = styled.span``;

const TargetContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
`;

const TargetContent = styled.div``;

const RoutineFinding = ({userObj, targets}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [want, setWant] = useState('');
    const [need, setNeed] = useState('');
    const [numericValue, setNumericValue] = useState('');
    const [shortterms, setShortterms] = useState([]);
    const [plans, setPlans] = useState([]);
    const [date, setDate] = useState('');
    const [step, setStep] = useState('');
    const [selection, setSelection] = useState('');

    const onChange = (e) => {
        const name = e.target.getAttribute("name")
        if (name === "want") {
            setWant(e.target.value)
        } else if (name === "need") {
            setNeed(e.target.value)
        } else if (name === "value") {
            setNumericValue(e.target.value)
        } else if (name === "date") {
            setDate(e.target.value)
        }
    }

    const onClickPrev = e => {
        e.preventDefault();
        setStep(step-1);
    }

    const onClickSelection = e => {
        setSelection(JSON.parse(e.target.getAttribute("value")))
    };

    const onClick = e => {
        const name = e.target.getAttribute("name")
        if (name === "want" && want) {
            setStep(1)
        } else {
            setStep(step + 1)
        }
    }

    const onSubmit = async () => {
        const targetId = uuidv4();
        const targetObj = {
            targetId,
            want,
            need,
            numericValue,
            date,
            type: "routine",
            queryType: "target",
            state: "ongoing",
            registeredTime: Date.now(),
            cancelReason : '',
            completeFeeling: '',
        }
        await dbService.collection(`${userObj.uid}`).doc(targetId).set(targetObj)
        alert("성공적으로 설정되었습니다!")
        setWant('')
        setNeed('')
        setNumericValue('');
        setDate('');
        setStep('');
    }

    const getShortterm = () => {
        const filteredPlans = targets.filter(target => target.state === "ongoing" && target.type === "plan");
        const filteredShortterms = targets.filter(target => target.state === "ongoing" && target.type === "shortterm");
        setPlans(filteredPlans);
        setShortterms(filteredShortterms);
        setIsLoading(false);
    };

    useEffect(() => {
        getShortterm();
    }, [])

    return (
        <Container>
            {isLoading 
            ? <Loading />
            : <>
            {!step && (
                <>
                    <Question>루틴을 세워봅시다.</Question>
                    <ShorttermContainer>{shortterms.map(target => 
                    <ShorttermTitle onClick={onClickSelection} value={JSON.stringify(target)}>{target.want}</ShorttermTitle>
                    )}</ShorttermContainer>
                    <AnswerInput onChange={onChange} name="want" value={want} type="text" />
                    <BtnContainer>
                        <AnswerNextBtn onClick={onClick} name="want">다음으로</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}
            {step === 1 && (
                <>
                    <Question>하고 싶은걸 하기 위해 필요한 것이 있나요?</Question>
                    <span>(ex. 부자 되기 : 돈)</span><br />
                    <AnswerInput onChange={onChange} name="need" value={need} type="text" />
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>이전으로</AnswerPrevBtn>
                        <AnswerNextBtn name="need" onClick={onClick}>다음으로</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}
            {step === 2 && (
                <>
                    <Question>
                        필요한 것을 얻기위해 꾸준히 할 일이 있나요?
                    </Question>
                    <Question>ex) 운동</Question><br />
                    <AnswerInput onChange={onChange} name="value"  value={numericValue} type="text" />
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>이전으로</AnswerPrevBtn>
                        <AnswerNextBtn name="value" onClick={onClick}>다음으로</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}     
            {step === 3 && (
                <>
                    <Question>
                        할 일은 언제 한번씩은 해야하나요?
                    </Question>
                    <span></span><br />
                    <AnswerInput onChange={onChange} name="date"  value={date} type="date" />
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>
                            이전으로
                        </AnswerPrevBtn>
                        <AnswerNextBtn name="date" onClick={onClick}>
                            다음으로
                        </AnswerNextBtn>
                    </BtnContainer>
                    <Cheer>
                        <CheerMent>
                            {Cheers.value}
                        </CheerMent>
                    </Cheer>
                </>
            )}         
            {step === 4 && (
                <TargetContainer>
                    <TargetContent>
                        목표 : {want}
                    </TargetContent>
                    <TargetContent>
                        필요한 것 : {need}, {numericValue}
                    </TargetContent>
                    <TargetContent>
                        달성 기한 : {date}까지
                    </TargetContent>
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>
                            수정하기
                        </AnswerPrevBtn>
                        <AnswerNextBtn onClick={() => {
                            if (window.confirm("목표가 마음에 드시나요?")) { onSubmit() }
                        }}>
                            목표 설정하기
                        </AnswerNextBtn>
                    </BtnContainer>
                </TargetContainer>
            )}
            {!(step === 4) && 
            <TargetContainer>
                <TargetContent>
                    {want && `원하는 것 : ${want}`}
                </TargetContent>
                <TargetContent>
                    {need && `필요한 것 : ${need}`}
                </TargetContent>
                <TargetContent>
                    {numericValue && `수치화된 값 : ${numericValue}`}
                </TargetContent>
                <TargetContent>
                    {date && `달성 기간 : ${date}`}
                </TargetContent>
            </TargetContainer>
            }
            </>
            }
        </Container>
    )
}

export default RoutineFinding;