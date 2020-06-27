import React,{useState, useEffect} from "react";
import styled from "styled-components"


const JOURS = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"]
const MOIS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre",]
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December",]

const Jours = () => <div className="jours">{JOURS.map(element=><div className="jour" key={element}> {element.slice(0,3)}</div>)}</div>

const Semaines = ({semaines}) => {
    return semaines.map((semaine,index)=>{
            return(
                <div key={index} className="semaine">{semaine.map(day=><div className="day" key={day}> {day}</div>)}</div>
            );
        
    })
}
  
const Calendar = () => {
    const d = new Date()
    const month = d.getMonth()
    const year = d.getFullYear()
    const [currentMonth,setMonth] = useState(month)
    const [currentYear,setYear] = useState(year)
    const [lastdayOfMonth, setLastDay] = useState(31)
    const [days,setDays] = useState([])
    const [firstDay,setFirstDay] = useState(1)
    const [semaines,setSemaine] = useState([])
    const [semaineDone,setSemaineDone] = useState(false)
    const [lastdayOfLastMonth, setLastOfLastMonth] = useState(31)
    
    useEffect(()=> {
        getLastday()
        getLastdayOfLastMonth()
        getDays()
        monthSpliter()
        today()
    })
    
    const nextMonth = () => {
        if(currentMonth>10){
            setYear(currentYear+1)
        }
        setMonth((currentMonth+1)%12)
        setLastDay(31)
        setLastOfLastMonth(31)
        setFirstDay(1)
        setDays([])
        setSemaine([])
        setSemaineDone(!semaineDone)
        today()

    }
   
    const previousMonth = () => {
        if(currentMonth<1){
            setYear(currentYear-1)
        }
        setMonth((currentMonth-1+12)%12);
        setLastDay(31)
        setLastOfLastMonth(31)
        setFirstDay(1)
        setDays([])
        setSemaine([])
        setSemaineDone(!semaineDone)
        today()
    }
    const getDays = () => {
        if(days.length<lastdayOfMonth){
            const temp = [...days]
            temp.push(firstDay)
            setDays(temp)
            setFirstDay(firstDay+1)
        }
    }
    const getLastday = () =>{
        let p = (new Date(`${MONTHS[currentMonth]} ${lastdayOfMonth} ${currentYear}`)).getDate()
        
        if(p<lastdayOfMonth){
            setLastDay(lastdayOfMonth-1)
        }
    }
    const getLastdayOfLastMonth = () =>{
        let p = (new Date(`${MONTHS[currentMonth-1]} ${lastdayOfLastMonth} ${currentYear}`)).getDate()
        
        if(p<lastdayOfLastMonth){
            setLastOfLastMonth(lastdayOfLastMonth-1)
        }
    }
    const today = () => {
        
        let elements = Array.from(document.getElementsByClassName("day"))
        if(currentMonth===month && currentYear===year){
            const date = new Date(Date.now()).getDate()
            const today = elements.filter(element=>element.innerText===date.toString())[0]
            if(today){
                today.classList.add("today")
            }
        }
        const fdom = elements.filter(element=>element.innerText==="1")[0]
        const index = elements.indexOf(fdom)
        
        if(index!==-1){
            let newE = elements.splice(index,lastdayOfMonth)
            
            newE.forEach(ele=>{
                ele.classList.add("actual")
            })
            elements.forEach(ele=>{
                ele.classList.add("not-actual")
            })

            
        }

        
        
    }
    
    const monthSpliter = () => {
        const checkDay = (new Date(`${MONTHS[currentMonth]} ${1} ${currentYear}`)).getDay()
        let ldolm = lastdayOfLastMonth
        let fdom = 1
        if(days.length===lastdayOfMonth&&!semaineDone){
            let first = [...days]
           
            let sec = first.splice(7-checkDay)
            if(first.length!==7){
                let decalage = 7-first.length
                for(let i=0;i<decalage;i++){
                    first.unshift(ldolm)
                    ldolm = ldolm-1
                }
            }
            let th = sec.splice(7)
            let fo = th.splice(7)
            let fi = fo.splice(7)
            let si = fi.splice(7)
            if(fi.length!==7){
                let decalage = 7-fi.length
                for(let i=0;i<decalage;i++){
                    fi.push(fdom)
                    fdom = fdom+1
                }
            } console.log(fi)
            if(si.length!==7){
                let decalage = 7-si.length
                for(let i=0;i<decalage;i++){
                    si.push(fdom)
                    fdom = fdom+1
                }
            }
            setSemaine([first,sec,th,fo,fi,si])
            setSemaineDone(!semaineDone)
        }
    }
    return(
        <>
         <div className="buttonContainer">
            <button onClick={previousMonth} >&lt;</button><span>{MOIS[currentMonth]}  {currentYear}</span><button onClick={nextMonth}>&gt;</button>
        </div>
        <TableWrapper>            
                <Jours />
                <div className="week-container">
                    <Semaines semaines={semaines} />
                </div>
        </TableWrapper></>
    );
}

const TableWrapper = styled.div`
    width: 20em;
    height: 20em;
    border: 1px solid orange;
    display: grid;
    grid-template-rows: 10% 90%;

    .jours{
        display: flex;
        justify-content: space-between;
        border:1px  solid orange;
        border-left: none;
        border-top: none;
        width: 100%;
        color: orange;
    }
    .week-container{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .semaine{
            display: flex;
        justify-content: space-between;
        //border:1px  solid orange;
        width: 100%;
        //text-align: center;
        }
        
       .actual{
           //background: green;
       }
       .not-actual{
           color: rgba(255,255,255,0.2)
       }
       .today{
            background: orange !important;
            color: #282c34;  
            border-radius: 5px;
        }
    }
    .jour,.day{
        width: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
  
    
`;
export default Calendar