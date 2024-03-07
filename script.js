const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

//localStorage에 있는 data를 받아오고, 문자열로 변환된 data른 원형으로 되돌림
const savedTodoList = JSON.parse(localStorage.getItem("saved-items"));

const createTodo = function (storageData) {
  let todoContents = todoInput.value;
  if (storageData) {
    //storageData가 있는 경우
    todoContents = storageData.contents;
  }
  const newLi = document.createElement("li");
  const newSpan = document.createElement("span");
  const newBtn = document.createElement("button");

  //addEventListener : 이벤트 발생까지 기다렸다가 응답한다.
  newBtn.addEventListener("click", () => {
    newLi.classList.toggle("complete");
    //toggle: 있으면 remove, 없으면 add
    saveItemsFn();
  });

  newLi.addEventListener("dblclick", () => {
    newLi.remove();
    saveItemsFn();
  });

  //optional chaining:
  //storageData가 있으면 complete를 찾고, 없거나 null이면 찾지 않음.
  if (storageData?.complete === true) {
    newLi.classList.add("complete");
  }

  newSpan.textContent = todoContents;
  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan);
  todoList.appendChild(newLi);
  todoInput.value = "";
  saveItemsFn();
};

const keyCodeCheck = function () {
  //console.log(window.event); 이걸로 'enter' 키의 keyCode 확인
  if (event.keyCode === 13 && todoInput.value.trim() !== "") {
    //window는 전역객체로서, 최상위에 존재하는 객체이며, 생력가능
    createTodo();
  }
};

const deleteAll = function () {
  const liList = document.querySelectorAll("li");
  for (let i = 0; i < liList.length; i++) {
    liList[i].remove();
  }
  saveItemsFn();
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

  //삼항연산자
  saveItems.length === 0
    ? localStorage.removeItem("saved-items")
    : localStorage.setItem("saved-items", JSON.stringify(saveItems));
  //String(saveItems) 하면 에러남
  //배열이나 객체를 문자열로 변환하기 위한 데이터 포맷: JSON
  //console.log(JSON.stringify(saveItems));
};

// createTodo는 함수표현식 -> 호이스팅 문제로 이 if문을 가장 아래로 내렷다.
if (savedTodoList) {
  for (let i = 0; i < savedTodoList.length; i++) {
    createTodo(savedTodoList[i]);
  }
}

const weatherDataActive = function ({ location, weather }) {
  const locationNameTag = document.querySelector("#location-name-tag");
  locationNameTag.textContent = location;
};

const weatherSearch = function ({ latitude, longitude }) {
  //position 파라미터에 구조분해할당 적용
  fetch(
    //비동기로 작동하는 함수는, then을 사용하여 기다려준다.
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1294813a283563e298e1b432365374fe`
  )
    .then((res) => {
      //JSON.parse() : response에 '바디'만 존재할 때 사용가능
      return res.json(); //body + header까지 존재할 때
    }) //json으로 변환하는 시간이 또 걸리므로 return해주고 또 then으로 받기
    .then((json) => {
      const weatherData = {
        location: json.name,
        weather: json.weather[0].main,
      };
      weatherDataActive(weatherData);
    })
    .catch((err) => {
      //then과 붙어다니며 오류의 원인을 알려주는 메소드
      console.log(err);
    });

  //promise 객체: 아직 data를 받지 못했는데 console.log가 먼저실행되어
  //데이터를 받아오겠다는 약속을 의미하는 객체
};

//위치 불러오는데 성공햇을 때 콜백함수
const accessToGeo = function ({ coords }) {
  //position객체에서 coords를 파라미터로 바로 뽑아온다.(구조분해할당 적용)

  //복사가아니라 구조분해할당에는 '...rest' 필요없음
  const { latitude, longitude } = coords;
  //shorthand property
  const positionObj = {
    //키와 값이 똑같으면 이렇게 작성 가능
    latitude,
    longitude,
  };

  weatherSearch(positionObj);
};

const askForLocation = function () {
  navigator.geolocation.getCurrentPosition(accessToGeo, (err) => {
    console.log(err);
  });
};
askForLocation();

//깊복, 얖복까지 듣고 원시타입과 참조타입 정리 -> spread연산자 및 객체 복사 정리
//JSON 데이터활용 5:08
