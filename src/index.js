let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyContainer = document.getElementById("toy-collection")
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function getToys(){
    fetch('http://localhost:3000/toys')
      .then(resp => resp.json())
      .then(toys => renderToys(toys)); 
  }

  const renderToys = (toys) => {
    toys.forEach(toy => {
      const toyDiv = document.createElement("div")
      toyDiv.className = "card"
      toyDiv.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
      `
      
      toyContainer.append(toyDiv)
    })
  }

  document.addEventListener("submit", e => {
    e.preventDefault()
    const form = e.target

    const newToy = {
      name: form.name.value,
      image: form.image.value,
      likes: 0
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(newToy),
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
    }

    fetch('http://localhost:3000/toys', options)
      .then(resp => resp.json())
      .then(toy => renderToy(toy)); 

    const renderToy = (toy) => {
      const toyDiv = document.createElement("div")
      toyDiv.className = "card"
      toyDiv.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
      `
   
      
      toyContainer.append(toyDiv)
    }   
  })
   
  document.addEventListener("click", e => {
     if (e.target.className === "like-btn"){
       let toyLikes = e.target.parentNode.querySelector("p")
       toyLikes.innerText = `${parseInt(toyLikes.innerText)+1} Likes`
     }
   })

  getToys()
});
