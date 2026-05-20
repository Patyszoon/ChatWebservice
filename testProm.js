// let p = new Promise((resolve,reject)=>{
//     let a = 1+3;
//     if (a==2) {
//         resolve('sukces');
//     } else{
//         reject('problem');
//     }
// });

// p.then((message) => {
//   console.log('uruchamia się kiedy ' + message);
// }).catch((message) =>{
//    console.log('przechwycone kiedy ' + message);
// });

const recVideo1 = new Promise((resolve,reject)=>{
    resolve('video 1 rec');
});

const recVideo2 = new Promise((resolve,reject)=>{
    resolve('video 2 rec');
});

const recVideo3 = new Promise((resolve,reject)=>{
    resolve('video 3 rec');
});

Promise.all([
    recVideo1,
    recVideo2,
    recVideo3
]).then((message) => {
    console.log(message);
  })