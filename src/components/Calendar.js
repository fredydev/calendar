import React,{useState, useEffect} from "react";
import styled from "styled-components"


const Jours_liste = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"]
const Mois = ["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre",]
const Months = ["January","February","March","April","May","June","July","August","September","October","November","December",]
const Jours = () => <tr className="jours">{Jours_liste.map(element=><th className="jour" key={element}> {element.slice(0,3)}</th>)}</tr>
const Semaine = ({semaines}) => {
    return semaines.map((semaine,index)=>{
        return(
            <tr key={index} className="semaine">{semaine.map(day=><td key={day}> {day}</td>)}</tr>
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
    
    useEffect(()=> {
        getLastday()
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
        let p = (new Date(`${Months[currentMonth]} ${lastdayOfMonth} ${currentYear}`)).getDate()
        
        if(p<lastdayOfMonth){
            setLastDay(lastdayOfMonth-1)
        }
    }
    const today = () => {
        const elements = Array.from(document.getElementsByTagName("td"))
        elements.forEach(element=>{
            if(element.innerText.length>3){
                element.innerText=""
            }
        })
        if(currentMonth===month && currentYear===year){
            const date = new Date(Date.now()).getDate()
            const today = elements.filter(element=>element.innerText===date.toString())[0]
            if(today){
                today.classList.add("today")
            }
        }
    }
    const monthSpliter = () => {
        const checkDay = (new Date(`${Months[currentMonth]} ${1} ${currentYear}`)).getDay()
        if(days.length===lastdayOfMonth&&!semaineDone){
            //console.log(days)
            let first = [...days]
           
            let sec = first.splice(7-checkDay)
            if(first.length!==7){
                let decalage = 7-first.length
                for(let i=0;i<decalage;i++){
                    first.unshift(`none${i}`)
                }
            }
            let th = sec.splice(7)
            let fo = th.splice(7)
            let fi = fo.splice(7)
            let si = fi.splice(7)
            setSemaine([first,sec,th,fo,fi,si])
            setSemaineDone(!semaineDone)
        }
    }
    return(
        <>
         <div className="buttonContainer"><button onClick={previousMonth} >&lt;</button>{Mois[currentMonth]}  {currentYear}<button onClick={nextMonth}>&gt;</button></div>
        <TableWrapper>            
            <tbody>
                <Jours />
                <Semaine semaines={semaines} />
            </tbody>
        </TableWrapper></>
    );
}
const TableWrapper = styled.table`
transition: all 0.3s ease-in-out;
    width: 800px;
    height: 400px;
    border:1px solid orange;
    border-top: none;
   tbody{
       .jours{
        border:1px solid orange;
           .jour{
               color: orange;
               text-align: center;
               border: 1px solid orange;
               border-right: none;
               border-left: none;
           }
       }
       .today{
           background: rgba(255,255,255,5);
           color: #282c34;  
           border-radius: 5px;
       }
        .semaine td{
            //background: blue;
            // border: 1px solid green;
            text-align: center; 
            transition: all 0.3s ease-in-out;
        }
    }
    
`;
export default Calendar