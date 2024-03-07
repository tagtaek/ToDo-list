const promiseTest = function () {
  return new Promise((resolver, reject) => {
    setTimeout(() => {
      resolver(100);
      //reject('error');
    }, 5000);
  });
};

//res를 받고나서 promiseTest를 실행시키겠다.
promiseTest().then((res) => {
  console.log(res);
});

//shallow copy
const obj = {
  name: "taek",
  age: 26,
  hobby: { one: "coding", two: "watching drama" },
};
const shallowCopy = obj;
shallowCopy.hobby.one = "sleeping";
obj;
// age: 26
// hobby: {one: 'sleeping', two: 'watching drama'}
// name: "taek"
// [[Prototype]]: Object

//deep copy
const obj = {
  name: "taek",
  age: 26,
  hobby: { one: "coding", two: "watching drama" },
};
const copy = JSON.stringify(obj);
const deepCopy = JSON.parse(copy);

deepCopy.hobby.one = "sleeping";
obj;
//age: 26
// hobby: {one: 'coding', two: 'watching drama'}
// name: "taek"
// [[Prototype]]: Object
