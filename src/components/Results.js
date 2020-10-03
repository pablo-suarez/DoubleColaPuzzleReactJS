import React from 'react';
import sheldon from '../assets/sheldon.png';
import leonard from '../assets/leonard.png';
import penny from '../assets/penny.png';
import rajesh from '../assets/rajesh.png';
import howard from '../assets/howard.png';
import freezer from '../assets/freezer.png'
import "./styles.css";
const verifyLast = (name,i,soda,queuei,coun,open) =>{
    if(i==(soda) && (coun/queuei)==open){
        return <img style={{height:"140px"}} src={name} alt='name'/>;
    }else{
        return <img src={name} alt='name'/>;
    }
}
const printAct = (queue,soda,len) => {
    let code=[],coun=1;
    let open=soda;
    soda=Math.ceil(soda);
    code.push(<img src={freezer} alt='freezer'/>);
    for(var i=0; i<len ; i++){
        for(var j=0; j<queue[i] ; j++){
            console.log("Entro aqui");
            switch(i){
                case 0:
                    code.push(verifyLast(sheldon,i,(soda-1),queue[i],coun,open)); 
                break;
                case 1:
                    code.push(verifyLast(leonard,i,(soda-1),queue[i],coun,open)); 
                break;
                case 2:
                    code.push(verifyLast(penny,i,(soda-1),queue[i],coun,open)); 
                break;
                case 3:    
                    code.push(verifyLast(rajesh,i,(soda-1),queue[i],coun,open));       
                break;
                case 4:
                    code.push(verifyLast(howard,i,(soda-1),queue[i],coun,open)); 
                break;
                default:
                    code+="error";
                    break;
            }
            coun++;
        }
    }
    return code;
}
const whoIsNext = (names, soda) =>{
    let total=0,oldtotal=0, n=0, flag=false, len = names.length,code=[];
    let queue=[1,1,1,1,1];
    if(soda <= names.length){


      return <div>
          <h1>{names[soda-1]}</h1>
                <div>{printAct(queue,soda,len)}</div>
          </div>

    }
    while(total < soda && !flag){
        code.push(<div>{printAct(queue,soda,len)}</div>);
      total += len*(Math.pow(2, n));
        
      n++;
      queue=queue.map(function(x){
        return x*2;
      })
      console.log(queue);
      if(total + len*(Math.pow(2, n)) >= soda){
        flag = true;
        oldtotal=total;
        total += len*(Math.pow(2, n));
            var numInPlace = Math.pow(2, n);
            var remainder = soda - oldtotal;
          
          var place = remainder/numInPlace;
            
        code.push(<div>{printAct(queue,place,len)}</div>);
      }
    }    
    
    return <div>
        <div>{names[place-1]}</div>
        <div>{code}</div>
    </div>
  }
const Results= () =>{
    return(
        <div>
            {whoIsNext(["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"], 20)}
            
        </div>
    );

}

export default Results; 