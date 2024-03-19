
const menubttn = document.querySelector('.menu');
menubttn.addEventListener('click', event=>{
  const searchbttn = document.querySelector('.search');
  const carthbttn = document.querySelector('.cart');
  const profilebttn = document.querySelector('.profile');
  if(searchbttn.classList.contains('absolute')||
    carthbttn.classList.contains('absolute') ||
    profilebttn.classList.contains('absolute')){
      carthbttn.classList.remove('absolute');
      profilebttn.classList.remove('absolute');
      document.querySelector('nav').classList.remove('navClosed');
      document.querySelector('.account-c').style.width = '100%';
  }else{
    carthbttn.classList.add('absolute');
    profilebttn.classList.add('absolute');
    document.querySelector('nav').classList.add('navClosed');
    document.querySelector('.account-c').removeAttribute('style');
  }
});
document.querySelectorAll('nav ul li').forEach((li)=>{
  li.addEventListener('click', event=>{
    const searchbttn = document.querySelector('.search');
    const carthbttn = document.querySelector('.cart');
    const profilebttn = document.querySelector('.profile');
    carthbttn.classList.add('absolute');
    profilebttn.classList.add('absolute');
    document.querySelector('nav').classList.add('navClosed');
    document.querySelector('.account-c').removeAttribute('style');
  });
});


function scrollTo(landClass){
  const sections = document.querySelectorAll('main>*');
  let totalH = 0;
  sections.forEach((section)=>{
    if(section == document.querySelector(landClass)){
      document.querySelector('main').scrollTop = totalH - 80;
    }
    totalH += section.offsetHeight;
  });
}
// Home
document.getElementById('home').addEventListener('click',event=>{
  scrollTo('.front-p');
});
// Category
document.getElementById('ctgry').addEventListener('click',event=>{
  scrollTo('.categories');
});
// Products
document.getElementById('prdct').addEventListener('click',event=>{
  scrollTo('.Products');
});


function hideoverflowname(text){
  let compressedText = "";
  for(let i=0;i<42;i++){
    if(text[i]){
      compressedText += text[i];
    }
  }
  return compressedText;
}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


fetch("products.json")
.then(response => response.json())
.then(data => {
  shuffleArray(data.Items);

  const allprc = document.querySelector('.All-products-c');
  function displayItems(i){
    const product = document.createElement('div');
    product.setAttribute('class','product');

    const toinsert = '<div class="pimg-c"><img src="Items/'+data.Items[i].filename+'.webp"></div><div class="prdct-n">'+data.Items[i].product+'</div><div class="prdct-m"><div class="price">₱'+data.Items[i].price+'</div><button class="add2cart" id="'+i+'">Add to Cart</button></div>';
    product.innerHTML = toinsert;
    allprc.append(product);
  }

  function getItems(){
    allprc.innerHTML = '';
    for(let i=0;i<data.Items.length;i++){
      displayItems(i);
    }
  }
  getItems();
  
  // Header Logo
  document.querySelector('.hlogo-c').addEventListener('click',event=>{
    shuffleArray(data.Items);
    getItems();
  });


  // Add2Cart
  const collectedProduct = document.querySelectorAll('.product');
  collectedProduct.forEach((product)=>{
    product.querySelector('.add2cart').addEventListener('click',event=>{
      document.querySelector('.cart img').removeAttribute('class');
      document.querySelector('.cart img').setAttribute('src',product.querySelector('.pimg-c img').src);
      document.querySelector('.cart img').classList.add('cartAnimation');
      setTimeout(() => {
        document.querySelector('.cart img').removeAttribute('class');
      }, 500);
    });
  });

});