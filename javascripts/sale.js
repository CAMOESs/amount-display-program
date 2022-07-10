const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = [];

const products = [
    {
        id : 1,
        name : `オリジナルブレンド200g 500円`,
        price : 500,
    },
    {
        id : 2,
        name : `オリジナルブレンド500g 900円`,
        price : 900,
    },
    {
        id : 3,
        name : `スペシャルブレンド200g 700円`,
        price : 700,
    },
    {
        id : 4,
        name : `スペシャルブレンド500g 1200円`,
        price : 1200,
    }
]


function add() {
    const price = priceElement.value;
    const number = numberElement.value;
    const Id = parseInt(price);
    const data = products.find(e => e.id == Id);
    
    let purchase = {
      data: data,
      number: parseInt(number),
    };
  
    const newPurchase = purchases.findIndex((item) => item.data.id === purchase.data.id) // --1
    if(purchases.length < 1 || newPurchase === -1) {
      purchases.push(purchase)
    } else {
      purchases[newPurchase].number += purchase.number
    }
  
    window.alert(`${display()}\n小計${subtotal()}円`);
    priceElement.value = "";
    numberElement.value = "";
  }
function display() {
    return purchases.map(purchase => {
      return `${purchase.data.name} ${purchase.data.price}円:${purchase.number}点\n`;
    }).join("");
  };
  
  function subtotal() {
    return purchases.reduce((prev, purchase) => {
        return prev + purchase.data.price * purchase.number;
    }, 0);
  }

function calc() {
  const sum = subtotal();
  const postage = calcPostageFromPurchase(sum);
  window.alert(`${display()}\n小計は${sum}円、送料は${postage}円です。合計は${sum + postage}円です`);
  purchases = [];
  priceElement.value= "";
  numberElement.value = "";
}

function calcPostageFromPurchase(sum) {
  if (sum == 0 || sum >= 3000) {
    return 0;
  } else if (sum < 1000){
   return 500;
  } else {
   return 250;
  }
}
 