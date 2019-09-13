//object property shorthand


const name = 'Andrew'
const userAge = 27


const user = {
    name,
    age:userAge,
    location:'Philadelphia'
}

// console.log(user);

//Object destructing

const product ={
    label: 'Red notebook',
    price:3,
    stock:201,
    salePrice:undefined,
    rating:4.2
}

// const label = product.label;
// const stock = product.stock;

// const {label:productLabel, stock, rating} = product
// console.log(label);
// console.log(stock);

const transaction = (type, {label, stock}) =>{
   console.log(type, label, stock);
   
}

transaction('order', product)