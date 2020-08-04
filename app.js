//APP TO CONVERT BETWEEN ROMAN AND STANDARD NUMERALS

// ************ DATA ***********

//LIMIT TO LESS THAN 4000!

const dataCtrl = (() =>{
   //Data objects will be needed here.

   //This may be better

   const romanArr = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
   const standArr = [1, 5, 10, 50, 100, 500, 1000];

   return {
      removeCommas : (input) => {
         input = input.replace(',', "");
         return input;
      },

      //Determine type of conversion by reading input
      getType : (input) => {
         let type, romanRegEx, stanRegEx, letterRegEx;
         romanRegEx = /^(?=[MDCLXVI])M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$/ig;
         stanRegEx = /[0-9]/g;
         letterRegEx = /[a-z]/gi;

         //Check input
         if (!input){  
            //No input given
            alert(`You have to, you know, enter a number here bub. It can be Roman or Standard, but it's gotta be something. Come on. Get it together.`);
            controller.init();
            
         } else if (stanRegEx.test(input) && input < 4000 && input > 0){  
            //Correctly formatted number of the proper amount.
            type = 'StanToRom';
            
         } else if (stanRegEx.test(input) && input >= 4000) { 
            //Too high a number
            alert ('Yeah, so that number is too high. Roman numerals are limited to numbers below 4000. Can you imagine a world where the highest number was 3999?');
            controller.init();
            
         } else if (stanRegEx.test(input) && input < 1){ 
            //Too low number
            alert(`Okay, so the Romans did't have a concept of zero, and certinaly no concept of negative numbers. Wild, eh? Does this mean there was no debt...?`)
            controller.init();
            
         } else if (romanRegEx.test(input)){ 
            //Correctly formatted Roman numeral
            type = 'RomToStan';
         } else if(!romanRegEx.test(input) && letterRegEx.test(input)){ 
            //Letters but not a proper Roman numeral
            alert(`You're killing me here, bub. I'm not sure what you entered, but it wasn't a Roman numeral and it wasn't a Standard numeral. You typed your name didn't you? Or maybe some naughty words. Grow up and try again.`);
            controller.init();
           
         }
         else { 
            //Just plain screwed it up. Most likely a combination of letters and numbers.
            alert (`Okay, I'm not saying you are dumb or anything, but let's get it together. ONLY STANDARD NUMERALS OR ONLY ROMAN NUMERALS. Pick one for Pete's sake. And let's keep it to POSITIVE numbers less than 4000. Roman numerals can't go any higher. Okay...let's try this one more time.`)
            controller.init();
         }
         return type;
      }, 

      //Convert from Standard to Roman
      toRoman : (input) => {

         let length = input.length;
         let result = "";
         let valArr = [];

         let multiplier = 1;
         for (let i = length-1; i >= 0 ; i--){
            valArr.unshift(input[i] * multiplier);
            multiplier *= 10;
         }

         //THOUSANDS
         if (valArr[0] >= 1000){
            let thousands = valArr[0]/1000;
            for (let i = 0; i < thousands; i++){
               result += 'M';
            }
            valArr.shift();
         }
         
         //HUNDREDS
         //Zero in hundreds place
         if (valArr[0]===0){
            valArr.shift();
         }
         //900
         else if (valArr[0] === 900) {  
            result += 'CM';
            valArr.shift();
         } 
         //500
         else if(valArr[0] === 500){ //Exactly 500
            result += 'D';
            valArr.shift();
         }
         else if (valArr[0] > 500){ //More than 500. Some hundreds will be left
            result += 'D';
            valArr[0] = valArr[0] - 500;
         }
         //400
         else if (valArr[0] === 400){
            result += 'CD';
            valArr.shift();
         }
         //100 - 300
         if (valArr[0] >= 100){
            let hundreds = valArr[0]/100;
            for (let i = 0; i < hundreds; i++){
               result += 'C';
            }
            valArr.shift();
         }

         //TENS

         //Zero in tens place
         if (valArr[0]===0){
            valArr.shift();
         }
         //90
         else if (valArr[0] === 90){
            result += 'XC';
            valArr.shift();
         }
         //50
         else if (valArr[0] ===  50){
            result += 'L';
            valArr.shift();
         } 
         //Between 90 and 50 - some tens leftover;
         else if (valArr[0] > 50){
            result += 'L';
            valArr[0] = valArr[0] - 50;
         }
         //40
         else if (valArr[0] === 40){
            result += 'XL';
            valArr.shift();
         }
         //Tens between 10 and 40 (including those leftover from removing 50
         if (valArr[0] >= 10) {
            let tens = valArr[0] / 10;
            for (let i = 0; i < tens; i++){
               result += 'X';
            }
            valArr.shift();
         }

         //ONES
         //Zero in ones place
         if (valArr[0]===0){
            valArr.shift();
         }
         //Nine
         else if (valArr[0] === 9){
            result += 'IX';
            valArr.shift();
         }
         //5
         else if (valArr[0] ===  50){
            result += 'V';
            valArr.shift();
         } 
         //Between 9 and 5 - some ones leftover;
         else if (valArr[0] > 5){
            result += 'V';
            valArr[0] = valArr[0] - 5;
         }
         //4
         else if (valArr[0] === 4){
            result += 'IV';
            valArr.shift();
         }

         //Ones between 1 and 4 (including those leftover from removing 5)
         if (valArr[0] >= 1) {
            let ones = valArr[0];
            for (let i = 0; i < ones; i++){
               result += 'I';
            }
            valArr.shift();
         }
         return result;
      },

      // Convert from Roman to Standard
      toStandard : (input) => {
         //make all the letters upper case, just in case.
         let num = input.toUpperCase();
         let romanArray = [];
         let integerArray = [];
         const romanValues = {
            I : 1,
            V : 5,
            X : 10,
            L : 50,
            C : 100,
            D : 500,
            M : 1000
         };
         
         //Put the letters' values into the array
         for (let i = 0; i < num.length; i++){
            let key = num[i];
            romanArray.push(romanValues[key]);
         };
      
         //Iterate the number values for combo numbers (Ex: IV = 4);
         for (let i = 0; i < romanArray.length; i++){
            if (romanArray[i] < romanArray[i+1]){
               integerArray.push(romanArray[i+1] - romanArray[i]);
               i++;
            } else {
               integerArray.push(romanArray[i]);
            }
         }
         
         //Add them up. 
         let result = integerArray.reduce((total, current) => total + current);
         
         return result;
      }
   }
})();

// ************ UI ***********

const uiCtrl = (() => {
   
   //DOM Elements
   const elements = {
      input : document.getElementById('input'),
      convertBtn : document.getElementById('convert-btn'),
      resetBtn : document.getElementById('reset-btn'),
      result : document.getElementById('result-display'),
      start : document.getElementById('input-display')
   };

   return {
      //Retrieve elements
      getElements : () => {
         return elements;
      }, 

      //Get the input
      getInput : () => {
         return elements.input.value;
      }

   //Display results

      //Change inner text for result
      //Display none main page
      //Display block result

      //return


   //Clear display
      //return
   };

})();

// ************ CONTROLLER ***********

const controller = ((data, ui) => {
   let result;
   //Set up event listeners
   const eventListeners = () => {
      //Get DOM elements from UI
      let el = ui.getElements();
      //Submit number 
      el.convertBtn.addEventListener('click', convert);
      el.input.addEventListener("keyup", function(event) {
         if (event.key === "Enter" || event.keyCode === 13) {
             convert();
         }});
   };
   
   const convert = () =>{
      let input, type;
      
      //Get input from UI. 
      input = ui.getInput();

      //Check input for commas and remove them
      if (input.includes(',')){
         input = data.removeCommas(input);
      }

      //Check input for type
      type = data.getType(input);
      //Make conversion dependent on type determined.
      if (type === `StanToRom`){
         //Convert a standard number to a roman number. 
         result = data.toRoman(input);
      }  else if (type === 'RomToStan'){
         result = data.toStandard(input);
      }

      console.log(`input: ${input} | type: ${type} | result: ${result}`);
      
      //Display results - pass input and result
      
};
      
   return {
      init: () =>{
         console.log('Initialization');
         //ui.clear

         eventListeners();
      }
   }

})(dataCtrl, uiCtrl);

 controller.init();