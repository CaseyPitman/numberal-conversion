//APP TO CONVERT BETWEEN ROMAN AND STANDARD NUMERALS

// ************ DATA ***********

//LIMIT TO LESS THAN 4000!

const dataCtrl = (() =>{

   //HELPER FUNCTIONS FOR CONVERTING STANDARD NUMBERS TO ROMAN

   //Determing Roman for thousands place.
   const romanThousands = (num) =>{
      const thousands = {
         1 : 'M',
         2 : 'MM',
         3 : 'MMM'
      };
      return thousands[num];
   };

   //Determing Roman for hundreds place.
   const romanHundreds = (num) =>{
      const hundreds = {
         1 : 'C',
         2 : 'CC',
         3 : 'CCC',
         4 : 'CD',
         5 : 'D',
         6 : 'DC',
         7 : 'DCC',
         8 : 'DCCC',
         9 : 'CM'
      };
      return hundreds[num];
   };

   //Determing Roman for tens place.
   const romanTens = (num) =>{
      const tens = {
         1 : 'X',
         2 : 'XX',
         3 : 'XXX',
         4 : 'LX',
         5 : 'L',
         6 : 'LX',
         7 : 'LXX',
         8 : 'LXXX',
         9 : 'CX'
      }
      return tens[num];
   };

   //Determing Roman for ones place.
   const romanOnes = (num) =>{
      const ones = {
         1 : 'I',
         2 : 'II',
         3 : 'III',
         4 : 'IV',
         5 : 'V',
         6 : 'VI',
         7 : 'VII',
         8 : 'VIII',
         9 : 'XI'
      };
      return ones[num];
   };


   return {
      //Formats number input to remove commas
      removeCommas : (input) => {
         input = input.replace(',', "");
         return input;
      },

      //Determine type of conversion by reading input
      getType : (input) => {
         let type, romanRegEx, stanRegEx, letterRegEx;
         //REGEX
         //Validate Roman numeral format
         romanRegEx = /^(?=[MDCLXVI])M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$/ig;
         //Validate standard number
         stanRegEx = /[0-9]/g;
         //Check for Roman numeral input that may not include all letters. 
         letterRegEx = /[a-z]/gi;

         //Check input type
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

         } else { 
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
         let values = [];

         let multiplier = 1;
         //Array of place values of each digit in the input number. 
         for (let i = length-1; i >= 0 ; i--){
            values.unshift(input[i] * multiplier);
            multiplier *= 10;
         }
         //Convert each place value.

         //Thousands place
         if (values[0] >= 1000){
            result += romanThousands(values[0]/1000);
            values.shift();
         }

          //Hundreds place
          if (values[0] >= 100){
            result += romanHundreds(values[0]/100);
            values.shift();
         } else if (values[0] === 0){
            values.shift();
         }

          //Tens place
          if (values[0] >= 10){
            result += romanTens(values[0]/10);
            values.shift();
         } else if (values[0] === 0){
            values.shift();
         }

          //Ones place
          if (values[0] >= 1){
            result += romanOnes(values[0]);
            values.shift();
         } else if (values[0] === 0){
            values.shift();
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
      init: () => {
         console.log('Initialization');
         //ui.clear

         eventListeners();
      }
   }

})(dataCtrl, uiCtrl);

 controller.init();