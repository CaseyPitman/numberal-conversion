//APP TO CONVERT BETWEEN ROMAN AND STANDARD NUMERALS

// ************ DATA ***********

//LIMIT TO LESS THAN 4000!

const dataCtrl = (() =>{
   //Data objects will be needed here.
   const roman = {
      I : 1,
      V : 5, 
      X : 10,
      L : 50, 
      C : 100,
      D : 500,
      M : 1000
   };

   //This may be better

   const romanArr = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
   const standArr = [1, 5, 10, 50, 100, 500, 1000];

   return {
      //Determine type of conversion by reading input
      getType : (input) => {
         let type, romanRegEx, stanRegEx, letterRegEx;
         console.log(input);
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
         //comma check
      },

      // Convert from Roman to Standard
      toStandard : (input) => {
         //make all the letters upper case, just in case.
         // add in commas
      }
   }

   //convert toStandard 
   //return standard
   
   //convert toRoman
   //return Roman
   
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

      getInput : () => {
         return elements.input.value;
      }


   //Get input
      //return input
   
   //Display results

      //Change inner text for result
      //Display none main page
      //Display block result

      //return


   //Clear results
      //return
   };

})();

// ************ CONTROLLER ***********

const controller = ((data, ui) => {

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
      console.log(input);

      //Check input for commas and remove them

      //Check input for type
      type = data.getType(input);
      console.log(type);
      
      

};
      
      //Determine type of conversion -DATA 
      //pass input
      
      //Make conversion - pass input and type
      //If R to S call toStandard
      //result =
      //Else if S to R call toRoman
      //result =
      
      //Display results - pass input and result



   return {
      init: () =>{
         //clear page and set up page
         //set selector to "selected"
         //Make select visible
         //Hide result
         console.log('yeah that works');
         eventListeners();
      }
   }

})(dataCtrl, uiCtrl);

 controller.init();


//Event listeners
   //Convert button click
   // document.getElementById("convert-btn").addEventListener('click', controller)
   //Convert button enter

   //Reset page click (init);