const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

const createTodo = function () {
  const newLi = document.createElement("li");
  const newSpan = document.createElement("span");
  const newBtn = document.createElement("button");

  //addEventListener : 이벤트 발생까지 기다렸다가 응답한다.
  newBtn.addEventListener("click", () => {
    newLi.classList.toggle("complete");
    //toggle: 있으면 remove, 없으면 add
  });

  newLi.addEventListener("dblclick", () => {
    newLi.remove();
  });

  newSpan.textContent = todoInput.value;
  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan);
  todoList.appendChild(newLi);
  todoInput.value = "";
  saveItemsFn();
};

const keyCodeCheck = function () {
  //console.log(window.event); 이걸로 'enter' 키의 keyCode 확인
  if (event.keyCode === 13 && todoInput.value !== "") {
    //window는 전역객체로서, 최상위에 존재하는 객체이며, 생력가능
    createTodo();
  }
};

const deleteAll = function () {
  const liList = document.querySelectorAll("li");
  for (let i = 0; i < liList.length; i++) {
    liList[i].remove();
  }
};

const saveItemsFn = function () {
  const saveItems = [];
  for (let i = 0; i < todoList.children.length; i++) {
    //반복문을 돌면서, 매회 공간이 초기화 되기때문에 const 사용 가능!
    const todoObj = {
      contents: todoList.children[i].querySelector("span").textContent,
      complete: todoList.children[i].classList.contains("complete"),
      //해당 li에 'complete' class가 존재하는지의 여부
    };
    saveItems.push(todoObj);
  }
  console.log(saveItems);
};
