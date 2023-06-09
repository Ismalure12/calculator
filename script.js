const screan=document.querySelector(".screan")
const number=document.querySelectorAll(".data-num")
const clearbtn=document.querySelector(".clear")
const deletebtn=document.querySelector(".delete")
const equal=document.querySelector(".equal")
const operator=document.querySelectorAll(".data-operator")
const currentscrean=document.querySelector(".current-operation")
const operationscrean=document.querySelector(".last-operation")
const decimal=document.querySelector(".decimal")
let firstoperand="";
let secondoperand="";
let operation=NaN;
let point;
let hold=false;



const keyboard=(e)=>{
   if(e.key==="Backspace"){deleteButton()}
   if(e.key==="Delete"){clearButton()}
   if(e.key==="Enter"){setoperation()}
   if(e.key==="+"||e.key==="-"){
   operationOperator()
   pressOperator(e.key)}
   if(e.key==="*"){
      operationOperator()
      pressOperator("×")}
      if(e.key==="/"){
         operationOperator()
         pressOperator("÷")}
   
   
   if(e.key>=0||e.key<=9||e.key==="."){ write(e.key)}
   
}
window.addEventListener("keydown",(keyboard))




const write=(number)=>{
      if(number===(".")&currentscrean.textContent.includes(".")){
         if(operation){ currentscrean.appendChild(document.createTextNode("0"));operation===NaN}else{
         return false// if already point is there another wont write
         }
       }
    
    if(number===(".")&currentscrean.firstChild.textContent===("0")){
      currentscrean.firstChild.textContent=("")
      currentscrean.appendChild(document.createTextNode("0."))
      operationscrean.textContent=""
    // if . is the first number we clicked 0. will be showed
   }else{
      
             currentscrean.firstChild.textContent=("")//since the first number is 0 we want to remove when clicked one of numbers
            if(currentscrean.textContent.length<=15)  currentscrean.appendChild(document.createTextNode(number))
            if(currentscrean.textContent==="."){currentscrean.lastChild.textContent=("")
                currentscrean.appendChild(document.createTextNode("0."))}
             firstoperand=parseInt(currentscrean.textContent)//since text current screan text content is string we converted to num
             if(currentscrean.textContent.includes(".")){
             firstoperand=Number(currentscrean.textContent)//parseInt doesnt read . so we used numbers
                } else{
                firstoperand=parseInt(currentscrean.textContent)}
             if((operation)){
                operationscrean.textContent=("")// when operation happens and we click number we want to reset  operation screan
                operation=NaN
             }
           
          }
       hold=true;
   
}


number.forEach(number=>{
   number.addEventListener("click",()=>{
      write(number.textContent)
   
   })
})




const operationOperator=()=>{
   if(hold===false&operationscrean.textContent.includes("")){
      return false}   
   // here we want operation to happen if already operator was there and we click another operator
 else{
   if(operationscrean.textContent.includes("+")){
         
           operation=add(secondoperand,firstoperand)
            currentscrean.textContent=(operation)
            operationscrean.textContent=("")
          firstoperand=operation
          operation=NaN
        }
        else if(operationscrean.textContent.includes("-")){
         
            operation=sub(secondoperand,firstoperand)
            currentscrean.textContent=(operation)
            operationscrean.textContent=("")
          firstoperand=operation
          operation=NaN
        }
       else if(operationscrean.textContent.includes("×")){
         
         operation=roundResult(multiply(firstoperand,secondoperand)) 
            currentscrean.textContent=(operation)
            operationscrean.textContent=("")
          firstoperand=operation
          operation=NaN
        }
        else if(operationscrean.textContent.includes("÷")){
         if(firstoperand===0){
            currentscrean.textContent="Cannot divide by zero"
            operationscrean.textContent=""
            firstoperand=currentscrean.textContent
           }else{ 
            operation=roundResult(divide(firstoperand,secondoperand)) 
            currentscrean.textContent=(operation)
            operationscrean.textContent=("")
          firstoperand=operation
          operation=NaN}
           }
        }
             
}
operator.forEach(operator=>{ operator.addEventListener("click",()=>{
   operationOperator()
})
})

const pressOperator=(oper)=>{ 

   if(hold===false&operationscrean.textContent.includes("")){
      (currentscrean.textContent==="Cannot divide by zero")? false : 
      operationscrean.textContent=(parseInt(currentscrean.textContent)+oper)}
         
  if(hold){
(currentscrean.textContent==="Cannot divide by zero")? false : 
   
operationscrean.appendChild(document.createTextNode(currentscrean.textContent+oper))// to produce like 1+ or 2-

 if(firstoperand!=="")currentscrean.textContent=firstoperand// after operator we want current screan to adapt the new number and remove old one

if(operationscrean.textContent.includes(".")){
   //parseInt doesnt read . so we used numbers but the proplem is numbers return NaN if string is like "1.2+" so we removed the symbols
 if(operationscrean.textContent.includes("×")) {point= operationscrean.textContent.replace("×","") }
  if (operationscrean.textContent.includes("+")) {point=  operationscrean.textContent.replace("+","")}
  if(operationscrean.textContent.includes("-")){point=  operationscrean.textContent.replace("-","")}
  if(operationscrean.textContent.includes("÷")) point=  operationscrean.textContent.replace("÷","")
 secondoperand=Number(point)
    }else {
 secondoperand=parseInt(operationscrean.textContent)//second operand = whatevere in operation screan removed from the symbol since parseInt cant read symbols
    }
   }
hold=false;
}
operator.forEach(operator=>{  operator.addEventListener("click",()=>{ 
   pressOperator(operator.textContent)
} )})

 



const setoperation=()=>{
   // we want operation to happen whe we click equal
   if (operationscrean.textContent.includes("=")){return false}
    if(operationscrean.textContent.includes("+")){
       operation=add(firstoperand,secondoperand)
       operationscrean.textContent=(operationscrean.textContent+currentscrean.textContent+"=")
    currentscrean.textContent=(operation)
   
    
    }
    if(operationscrean.textContent.includes("-")){
      operation=sub(firstoperand,secondoperand)
        operationscrean.textContent=(operationscrean.textContent+currentscrean.textContent+"=")
     currentscrean.textContent=(operation)
     }
     if(operationscrean.textContent.includes("×")){
      operation=roundResult(multiply(firstoperand,secondoperand)) 
        operationscrean.textContent=(operationscrean.textContent+currentscrean.textContent+"=")
     currentscrean.textContent=(operation)
     } 
    
     if(operationscrean.textContent.includes("÷")){
      if(firstoperand===0){
         currentscrean.textContent="Cannot divide by zero"
         operationscrean.textContent=""
        }else{
         operation=roundResult(divide(firstoperand,secondoperand)) 
        operationscrean.textContent=(operationscrean.textContent+currentscrean.textContent+"=")
     currentscrean.textContent=(operation)}
   
     }
  
}
equal.addEventListener("click",(setoperation))

function add(a,b){return a+b}
function sub(a,b){return a-b}
function multiply(a,b){return a*b}
function divide(a,b){return a/b}
function roundResult(number) {
   return Math.round(number * 1000) / 1000
 }
// write(operator)
// clear button removes all data
const clearButton=()=>{
   
    currentscrean.textContent=("")
    operationscrean.textContent=""
    currentscrean.appendChild(document.createTextNode("0"))
    operation=NaN
    secondoperand=""
    hold=false
    firstoperand=currentscrean.textContent

}
const deleteButton=()=>{
   // this deletes the last Number in currentscrean
   if(operation){operationscrean.textContent=""
   firstoperand=currentscrean.textContent;operation=NaN}
   else{
   if(currentscrean.textContent!==("0")){
     currentscrean.lastChild.remove();
     if(currentscrean.textContent===("")){currentscrean.textContent=("0")}
     firstoperand=""
     operation=NaN
    }}
}
clearbtn.addEventListener("click",(clearButton))
deletebtn.addEventListener("click",(deleteButton))




  

