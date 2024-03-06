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
