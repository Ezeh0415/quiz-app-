import { useState, useEffect } from "react";
const Main = () => {

   const [question, setQuestion] = useState([
    // {
    //     questionText: 'who is the owner of tesla',
    //     questionAnswer:[
    //       { questionTest: 'Elon musk', isCorrect : true},
    //       { questionTest: 'Bill Gate', isCorrect : false},
    //       { questionTest: 'Mark zugarbeg', isCorrect : false},
    //       { questionTest: 'alico dangote', isCorrect : false}
    //     ]
    //   },
    //   {
    //     questionText: 'How to import useState in react',
    //     questionAnswer:[
    //       { questionTest: 'import (useState) from ./react', isCorrect : false},
    //       { questionTest: 'import [useState] from ./react', isCorrect : false},
    //       { questionTest: 'import useState from ./react', isCorrect : false},
    //       { questionTest: 'import {useState} from ./react', isCorrect : true}
          
    //     ]
    //   },
    //   {
    //     questionText: 'what is the correct thing to add to a useEffect to stop it from running each time a function is clicked',
    //     questionAnswer:[
    //       { questionTest: 'by adding a function inside', isCorrect : false},
    //       { questionTest: 'By useing timeout for it', isCorrect : false},
    //       { questionTest: 'by adding dependence in the useEffect', isCorrect : true},
    //       { questionTest: 'none of the above', isCorrect : false}
    //     ]
    //   },
    //   {
    //     questionText: 'whats the correct way to add dependence in useEffect',
    //     questionAnswer:[
    //       { questionTest: 'uesEffect(() => {})', isCorrect : false},
    //       { questionTest: 'uesEffect(() => {},[])', isCorrect : true},
    //       { questionTest: 'uesEffect() => {})', isCorrect : false},
    //       { questionTest: 'uesEffect([], () => {})', isCorrect : false},
    //     ]
    //   },
    //   {
    //     questionText: 'whats the correct way to create react app',
    //     questionAnswer:[
    //       { questionTest: 'create-react-app filename', isCorrect : false},
    //       { questionTest: 'react-app-create filename', isCorrect : false},
    //       { questionTest: 'npm create-react-app filename', isCorrect : false},
    //       { questionTest: 'npx create-react-app filename', isCorrect : true},
    //     ]
    //   }
      null
   ])
 
 


  const [currentQuestion, setCurrentQuestion] = useState(0)

  const  [score, setScore] = useState(0)

  const [showScore, setShowScore] = useState(false);

  const handleClickAnswer = (isCorrect) => {

   if(isCorrect === true) {
      const NewScore = score + 1;
      setScore(NewScore); 
   }

    const NextQuestion = currentQuestion + 1;

    if (NextQuestion < question.length) {
      setCurrentQuestion(NextQuestion);
    }else {
      setShowScore(true);
    }

   
  }

  const handleResetClick = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false)
  }

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch('http://localhost:4000/question');

          if(!response.ok) {
            throw new Error('poor network or network response is not ok');
          }

          const jsonData = await response.json();
         setQuestion(jsonData);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData()
    }, []);

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch('http://localhost:5000/question');

          if(!response.ok) {
            throw new Error('poor network or network response is not ok');
          }

          const jsonData = await response.json();
         setQuestion(jsonData);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData()
    }, []);


//   useEffect(() => {
//     fetch ('http://localhost:4000/question')
//       .then(res => {
//         return res.json()
//       })
//       .then(data => {
//         return data;
//       })
//      console.log(data)
//  }, [])

//  useEffect(() => {
//    fetch ('http://localhost:5000/question')
//      .then(res => {
//        return res.json()
//      })
//      .then(data => {
//      //  console.log(data)
//        setQuestion(data)
//      })
// }, [])

    return (
    <div className="test">
    {showScore ? <div className="main-score">
            <h2>your score is {score} out of {question.length}</h2>
            <button onClick={handleResetClick}>Reset quiz</button>
         </div>
         :question && <div className="quiz-box">
          <div className="question-sec">
            <h2>Question {currentQuestion + 1}/{question.length}</h2>
             <div>{question[currentQuestion].questionText}</div>
         </div>
         <div className="answer-section">
            {question[currentQuestion].questionAnswer.map((questionAnswer) =>
             <button onClick={() => handleClickAnswer(questionAnswer.isCorrect)}>{questionAnswer.questionTest}</button>)}
         </div>
       </div>
         
      } 

        </div>
     );
}
 
export default Main;