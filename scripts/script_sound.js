const scrollUp = document.getElementsByClassName("goUp")[0]
scrollUp.addEventListener("click", () =>{
  scroll({top:0, behavior:"auto"})
})