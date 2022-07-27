const movieSelect = document.getElementById("movie");
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');

populateUi();

let ticketPrice = +movieSelect.value;

//change the ticketPrice on user click;
movieSelect.addEventListener('change', (e)=>{
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateCountAndTotal();
});

//seat click
container.addEventListener('click', (e) => {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    e.target.classList.toggle('selected')
    updateCountAndTotal();
  }
})


function updateCountAndTotal(){
  let selectedSeats = document.querySelectorAll('.row .seat.selected');
  
  // set the the Selected seatsIndex in localStorage
  let seatsIndex = [...selectedSeats].map(seat=> {
    return  [...seats].indexOf(seat)
  });

  JSON.stringify(seatsIndex);
  
    // set the the Selected seats in localStorage
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  
  let SelectedseatsCount = selectedSeats.length; 
  count.innerText = SelectedseatsCount;
  
  total.innerText = SelectedseatsCount * ticketPrice; 
}


// set the the movie Data on the localStorage
function setMovieData(MovieIndex,MoviePrice){
  localStorage.setItem("selectedMovieIndex", MovieIndex);
  localStorage.setItem("selectedMoviePrice", MoviePrice);
}


// get data from localStorage
function populateUi(){
  let selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  
  
  if(selectedSeats !== null && selectedSeats.length > 0){
    seats.forEach((seat , index) =>{
      if(selectedSeats.indexOf(index) > -1){
          seat.classList.add('selected');
      }
    })
    }

    let selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
      movieSelect.selectedIndex = selectedMovieIndex;
    }
  

}


// initail count and total set
updateCountAndTotal();