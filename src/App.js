import React from 'react'
import './App.css'
import {ques} from './Question';

class App extends React.Component{


      state={
            userAnswer:null,
            currentQuestion:0,
            options:[],
            score:0,
            disable:"none",
            gameover:false
      }
 loadQuestion = ()=>{
      const {currentQuestion} = this.state
        this.setState(()=>{
              return{
                    id:ques[currentQuestion].id,
                    questions:ques[currentQuestion].question,
                    options:ques[currentQuestion].option,
                    answer:ques[currentQuestion].ans
              }
        })
 }

 componentDidMount(){
      this.loadQuestion()
   }

   //component update
   componentDidUpdate(prevProps,prevState){
      const {currentQuestion} = this.state
      if(this.state.currentQuestion !== prevState.currentQuestion){
            this.setState(()=>{

                 return{
                  disable:"none",
                  id:ques[currentQuestion].id,
                  questions:ques[currentQuestion].question,
                  options:ques[currentQuestion].option,
                  answer:ques[currentQuestion].ans
                 }

            })
      }
   }
 //user selected option
 
   userSelected = ans =>{
      this.setState(()=>{
            return{
                 userAnswer:ans,
                 disable:"block" 
            }
      })
  }

  //next button control
  handlenext = ()=>{
    const {score,userAnswer,answer} = this.state

    if(userAnswer === answer){
          this.setState({score:score +1})
    }

         this.setState({currentQuestion:this.state.currentQuestion + 1})
         const {currentQuestion} = this.state 
      }

//result show 
finished = () =>{
      const {score,userAnswer,answer} = this.state

      if(userAnswer === answer){
            this.setState({score:score +1})
      }
       if(this.state.currentQuestion === ques.length -1){
             this.setState({gameover:true})
       }
}

    render(){
           const {score,gameover,questions,options,userAnswer,id,disable,currentQuestion} = this.state
             if(gameover){
                    return(
                          <div class="result">
                                <div className="nav">
                                      <span>GAMEOVER</span>
                                </div>
                                <div className="detail">
                    <p>Your Score:{score}</p>
                                </div>
                                
                          </div>
                    )
             }
           return(
                 <div className="wrapper">
                       <div className="header">
                       <span id="label">?</span>
                      <div className="question">
                         <p>{questions}</p>
                      </div>
                       </div>
                         
                       <div className="option">
                          {options.map(data=>(
                                 <button
                                className={`${userAnswer === data.opt?"selected":""}`}      
                                 onClick={()=>this.userSelected(data.opt)}
                          ><span>{data.count}</span>{data.opt}</button>
                          ))}
                             
                       </div>

                       {currentQuestion < ques.length -1 &&
                       <span  onClick={this.handlenext}
                       className="ion-arrow-right-c"
                       style={{display:disable}}
                      
                       ></span>
    }
      
      {currentQuestion === ques.length -1 &&
             <span  onClick={this.finished}
             className="ion-ios-pause"
             style={{display:disable}}
            
             ></span>
      }

                 </div>
           )
    }
}
export default App
/*

*/