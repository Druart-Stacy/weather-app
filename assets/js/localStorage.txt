// Set Item
localStorage.setItem("nameCity", "yurigahama");
// Retrieve
document.getElementById("demo").innerHTML = localStorage.getItem("nameCity");

// Removing data from localStorage
localStorage.removeItem('nameCity');