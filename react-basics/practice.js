const array=[2,3,4]
const {2:a}=array;
let b=array[1]
console.log(a);
console.log(b);


/*
//using fetch and async/await
async function fetchData(){

const response=await fetch('https://xyz.com');
return response.json;
}

async function loadData(){

const data=await fetchData();
console.log(data);
}
*/


/*
//using xhr callback
function requestData(callback){

const xhr=new XMLHttpRequest();
xhr.addEventListener('load',()=>{
const data = JSON.parse(xhr.response);
callback();
});

xhr.open('GET','https://xyz.com');
xhr.send();
         
}


requestData(()=>{
loadData();

});

*/
//promise .then

function gettingData(){

return new Promise(resolve=>{
 setTimeout(()=>{
   console.log('data')
  
   resolve('success');
},2000);

});

}


gettingData().then((res)=>{

console.log('data-received');
console.log(res);

})

