import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data';

const Quiz = () => {

    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false)

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_array = [Option1, Option2, Option3, Option4 ]

    const checkAns = (e,ans) => {
        if (lock === false) {
        if (question.ans===ans) {
            e.target.classList.add("correct");
            setLock(true)
            setScore(prev=>prev+1);
        }
        else{
            e.target.classList.add("wrong");
            setLock(true)
            option_array[question.ans-1].current.classList.add("correct")
        }
    }
    }

    const next = () =>{
        if (lock===true) {

            if (index === data.length -1) {
                setResult(true)
                return;
            }

            setIndex(prev => {
            const newIndex = prev + 1;
            setQuestion(data[newIndex]);
            return newIndex;
        });

            setLock(false);
            option_array.map((option)=>{
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        } 

    }

    const reset = () => {
        setIndex(0);
        setQuestion(data[0])
        setScore(0);
        setLock(false);
        setResult(false);
    }

  return (
    <>
    <h1 className='head'>Coding Knowledge Quiz - 1 to 10</h1>
    <div className='container'>
        <h1 className='heading'>Quiz App</h1>
        <hr />
        {result?<></>:<><h2>{index+1}. {question.question}</h2>
        <ul>
            <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
            <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
            <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
            <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
        </ul>
        <hr />
        <div className="index">{index+1} of {data.length} questions</div>
        </>}
{!result && <button onClick={next}>Next</button>}
        {result? <>
       
        <h2>You Scored {score} out of {data.length}</h2>
        <button className='next-btn' onClick={reset}>Reset</button>
         </>:<></>}
    </div>
    </>
  )
}

export default Quiz