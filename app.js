//calling the currency exchange rate API
const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr =document.querySelector(".from select");
const toCurr =document.querySelector(".to select");
const msg = document.querySelector(".msg");

//accessing the country list


for(let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);

    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}


const updateExchangeRate= async() => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value ="1";
    }
    //console.log(fromCurr.value,toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;//we are making request to the base URL
    let response = await fetch(URL); //for using await,function has to be async
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()] //our data is available at this particular index
    //console.log(rate);

    let finalAmount = amtVal *rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

const updateFlag = (element)=>{ 
    //console.log(element);
    let currCode = element.value;
    //console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; //variables only work in a tilde
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;



}


btn.addEventListener("click",(evt) => {
    evt.preventDefault(); //to prevent form's default behaviour
    updateExchangeRate();
   

})

window.document.addEventListener("load" ,()=>{
    updateExchangeRate();

})

