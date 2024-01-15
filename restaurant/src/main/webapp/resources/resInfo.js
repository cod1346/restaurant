var star1 = document.querySelector(".star1")
var star2 = document.querySelector(".star2")
var star3 = document.querySelector(".star3")
var star4 = document.querySelector(".star4")
var star5 = document.querySelector(".star5")

var starFill = "<svg xmlns='http://www.w3.org/2000/svg' color='blue' width='16' height='16' fill='currentColor' class='bi bi-star-fill' viewBox='0 0 16 16'>"
+"<path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z'/>"
+"</svg>"
var star = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-star' viewBox='0 0 16 16'>"
+"<path d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z'/>"
+"</svg>"
var score = false
star1.addEventListener("click",()=>{
  star1.innerHTML=starFill
  star2.innerHTML=star
  star3.innerHTML=star
  star4.innerHTML=star
  star5.innerHTML=star
  document.querySelector("#score").value=1
  score=true
})
star2.addEventListener("click",()=>{
  star1.innerHTML=starFill
  star2.innerHTML=starFill
  star3.innerHTML=star
  star4.innerHTML=star
  star5.innerHTML=star
  document.querySelector("#score").value=2
  score=true
})
star3.addEventListener("click",()=>{
  star1.innerHTML=starFill
  star2.innerHTML=starFill
  star3.innerHTML=starFill
  star4.innerHTML=star
  star5.innerHTML=star
  document.querySelector("#score").value=3
  score=true
})
star4.addEventListener("click",()=>{
  star1.innerHTML=starFill
  star2.innerHTML=starFill
  star3.innerHTML=starFill
  star4.innerHTML=starFill
  star5.innerHTML=star
  document.querySelector("#score").value=4
  score=true
})
star5.addEventListener("click",()=>{
  star1.innerHTML=starFill
  star2.innerHTML=starFill
  star3.innerHTML=starFill
  star4.innerHTML=starFill
  star5.innerHTML=starFill
  document.querySelector("#score").value=5
  score=true
})

document.querySelector(".submit-btn").addEventListener("click",()=>{
  if(!score){
    alert("별점을 등록해주세요.")
  }else{
    document.querySelector("#form").submit()
  }
})

document.querySelectorAll(".comment-score").forEach(e=>{
  var coScore = parseInt(e.innerHTML);
  if(coScore==1){
    e.innerHTML=starFill+star+star+star+star
  }else if(coScore==2){
    e.innerHTML=starFill+starFill+star+star+star
  }else if(coScore==3){
    e.innerHTML=starFill+starFill+starFill+star+star
  }else if(coScore==4){
    e.innerHTML=starFill+starFill+starFill+starFill+star
  }else if(coScore==5){
    e.innerHTML=starFill+starFill+starFill+starFill+starFill
  }
})