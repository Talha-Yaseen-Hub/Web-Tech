// 1
function addition(a, b) {
    let sum = a + b;
    return sum;
}
console.log(addition(10, 20));
console.log(addition(5, 15));


// 2
function bitwiseAND(a, b) {
    return a & b;
}

function bitwiseOR(a, b) {
    return a | b;
}

function bitwiseXOR(a, b) {
    return a ^ b;
}

console.log("AND:", bitwiseAND(5, 3));
console.log("OR:", bitwiseOR(5, 3));
console.log("XOR:", bitwiseXOR(5, 3));


// 3
function addUp(a) {
    let sum = 0;
    for (let i = 1; i <= a; i++) {
        sum += i;
    }
    return sum;
}
console.log(addUp(4));


// 4
function progressBar(a) 
{
  let sum = "";
  if (a >= 10) 
    {
    a = a / 10;
    for (let i = 0; i< a; i++) 
    {
      sum = sum + "#";
    }
  }
  for (let i = a; i< 10; i++) {
    sum = sum + "-";
  }
  return sum;
}
console.log(progressBar(40));



// 5
function minMax(arr) {
  let size = arr.length;
  let max = arr[0];
  let min = arr[0];
  for (let i = 0; i < size; i++) {
    if (min > arr[i]) 
    {
      min = arr[i];
    }
    if (max < arr[i]) 
    {
      max = arr[i];
    }
  }
  return [min,max];
}
console.log(minMax([6, 7, 8, 9, 10]));




// 6
function calculateRepoStars(repos) 
{
    const stars = repos.map(repo => repo.stars);
    const maxStars = Math.max(stars);
    const minStars = Math.min(stars);
    const avgStars = Math.floor(
    stars.reduce((sum, star) => sum + star, 0)/stars.length);
    const VScore = Math.abs(maxStars - minStars);
    return {maxStars,minStars,avgStars,VScore};
}
const repos = [
    { name: 'repo1', stars: 12}, { name: 'repo2', stars: 45}
];
console.log(calculateRepoStars(repos));



// 7
function calculateFinalPrice(basePrice, taxRate, discountPercentage) {
  const discounte = basePrice * (1 - discountPercentage / 100);
  const tax = discounte + discounte*(taxRate/ 100);
  const result = Math.round(tax*100)/100;
  const end = Math.ceil(result);
  return  {result, end} ;
}
console.log(calculateFinalPrice(100, 15, 10))




// 8
function paginateData(items, pageNumber, pageSize=5) 
{
  const page = Math.ceil(items.length / pageSize);
  const start = (pageNumber - 1) * pageSize;
  const data = items.slice(start, start + pageSize);
  return {data, currentPage: pageNumber, pages: page,};
}
const allProducts = ["Laptop", "Mouse", "Keyboard", "Monitor",
     "Desk", "Chair", "Webcam", "Headphones",];
const result = paginateData(allProducts, 1, 4);
console.log(result);