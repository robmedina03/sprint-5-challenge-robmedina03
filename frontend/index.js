

async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY 2023`

  

  

  




  let url = ["http://localhost:3003/api/learners","http://localhost:3003/api/mentors"];

  const requests = url.map((url) => axios.get(url));

  axios.all(requests)
  
  .then(axios.spread( (learners, mentors) => {
    const learnerData = learners.data;
    const mentorData = mentors.data;

    const infoElement = document.querySelector('.info');
    infoElement.textContent = 'No learner is selected'

    const cardscontainer = document.querySelector('.cards');

    for( let i = 0;i <learnerData.length && i < mentorData.length; i++ ){

      
      const card = document.createElement('div');
      card.classList.add('card', 'closed')


      

      const namefull = document.createElement('h3')
      namefull.textContent = learnerData[i].fullName;
      card.appendChild(namefull)

      const idmentor = document.createElement('h3')
      idmentor.textContent = learnerData[i].id
     // card.appendChild(idmentor)

      const email = document.createElement('div')
      email.textContent = learnerData[i].email;
      card.appendChild(email)

      const mentorheader = document.createElement('h4')
      mentorheader.textContent = 'Mentors';
      mentorheader.style.display = 'inline'
      mentorheader.classList.add('closed')
      card.appendChild(mentorheader)
      
      
      const mentorlist = document.createElement('ul')
       mentorlist.style.display = 'none';
      
      if(learnerData[i].mentors){
        learnerData[i].mentors.forEach(mentorID =>{
          const correspondingmentor = mentorData.find((mentor) => mentor.id === mentorID)
          if(correspondingmentor){
            const mentorItem = document.createElement('li');
            
            
            const mentorName = `${correspondingmentor.firstName} ${correspondingmentor.lastName}`


            mentorItem.textContent = mentorName
            mentorlist.appendChild(mentorItem)
          
      
          }
        })
      }

          
      card.appendChild(mentorlist)

     
     
    
      
      
  
      

      cardscontainer.appendChild(card)

      

      card.addEventListener('click',event => {
      const selectedCard = event.currentTarget;
      const mentorlist = selectedCard.querySelector('ul');


        if(selectedCard.classList.contains('selected')){

          selectedCard.classList.remove('selected');
          mentorheader.classList.remove('open');
           mentorheader.classList.add('closed');
          mentorlist.style.display = 'none';
          infoElement.textContent = 'No learner is selected'; 
          namefull.textContent = learnerData[i].fullName;


          
        }else  {

          const selectedcardlist = cardscontainer.querySelectorAll('.card.selected');

          selectedcardlist.forEach(card => {

            card.classList.remove('selected');
            card.querySelector('h4').classList.remove('open')
            card.querySelector('h4').classList.add('closed');
            card.querySelector('ul').style.display = 'none';
          })

         selectedCard.classList.add('selected');
         mentorheader.classList.remove('closed');
         mentorheader.classList.add('open');
         mentorlist.style.display = 'block';
         infoElement.textContent = `The selected learner is ${learnerData[i].fullName}`
         namefull.textContent = `${learnerData[i].fullName}`

        


         
         

        }
        
          

          
        
      })
      

      
    
    }
   
    
    
    }))

    
 
  .catch(error => {
    console.log("Error:",error)
  });

 




  
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
