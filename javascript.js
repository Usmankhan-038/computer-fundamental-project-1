//  ADD TO CART BUTTON


let cartIcon= document.querySelector('#cartIcon')
let cart= document.querySelector('.cart')
let cartClose= document.querySelector('.cartClose')

cartIcon.onclick = () => {
    cart.classList.add("active");
};


cartClose.onclick = () => {
    cart.classList.remove("active");
};

if(document.readyState == 'loading'){
    document.addEventListener("DOMContentLoaded",ready);
}else{
    ready();
}

function ready(){

    var removeCartButtons = document.getElementsByClassName('removeCart')
    console.log(removeCartButtons)
    for(var i=0;i<removeCartButtons.length;i++)
    var button = removeCartButtons[i]
    button.addEventListener('click',removeCartitem)
}

var quantityInputs = document.getElementsByClassName('cart-quantity')
for(var i=0;i< quantityInputs.length;i++){
    var input = quantityInputs[i]
    input.addEventListener('change', quantitychanged)
}

var addCart = document.getElementsByClassName('add-cart')
for(var i=0;i< addCart.length;i++){
    var button=addCart[i]
    button.addEventListener("click",addCartClicked)
}
 document.getElementsByClassName('btn-buy')[0].addEventListener('click',buyButtonclicked);
function buyButtonclicked(){
    alert('your order is placed');
    var cartContent = document.getElementsByClassName('cart-content')
    while(cartContent.haschildNodes())
    cartContent.removeChild(cartContent.firstchild);
}


function removeCartitem(event){
    var buttonClicked = event.target

    buttonClicked.parentElement.remove();
    updatetotal();
}

function quantitychanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updatetotal();
}
function addCartClicked(event){
        var button = event.target
        var shopItem = button.parentElement.parentElement
        var title = shopItem.getElementsByClassName('product-title')[0].innerText
        var price = shopItem.getElementsByClassName('price')[0].innerText
        var imageSrc = shopItem.getElementsByClassName('product-img')[0].src
        addproductToCart(title, price, imageSrc);
         updatetotal()
}

function addproductToCart(title, price, imageSrc){
    var cartShopBox = document.createElement("div")
    cartShopBox.classList.add("cart-box")

    var cartItems=document.getElementsByClassName('cart-content')[0];
    var cartItemsNames=cartItems.getElementsByClassName('cart-product-title');
    for(var i=0;i<cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title) {
            alert('This item is already added to the cart');
            return;
        }
    }
    var cartBoxContent=`
                <img src="${imageSrc}" alt="" class="cart-img">
                <div class="detail-box">
                    <div class="cart-product-title">${title}</div>
                    <div class="cart-price">${price}</div>
                    <input type="number" name="number" value="1" class="cart-quantity">
                </div>
            <!-- removecart -->
            <i class="fa-solid fa-trash removeCart"></i>`;
            cartShopBox.innerHTML = cartBoxContent;
            cartItems.append(cartShopBox);
            cartShopBox.getElementsByClassName('removeCart')[0].addEventListener('click', removeCartitem)
            cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantitychanged)
}


        
function updatetotal(){
    var cartContent=document.getElementsByClassName('cart-content')[0]
    var cartBoxes =cartContent.getElementsByClassName('cart-box')
    var total=0;
    for(var i=0;i<cartBoxes.length;i++)
    {
        var cartBox=cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName('cart-price')[0]
        var quantityElement=cartBox.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace("Rs",""));
        var quantity = quantityElement.value;
       
        total= total + price* quantity;
        total=Math.round(total*100);

        document.getElementsByClassName('total-price')[0].innerText='Rs.'+total;
    }
}


// Filtration


let indicator=document.querySelector('.indicator').children;
let main=document.querySelector('.item').children;

for(let i=0;i<indicator.length;i++){
    indicator[i].onclick = function(){
        for(let x=0; x<indicator.length; x++){
            indicator[x].classList.remove('active');
        }
        this.classList.add('active');
            const displayItems =this.getAttribute('data-filter');
            for(let z=0; z<main.length; z++)
            {
                main[z].style.transform='scale(0)';
                setTimeout(()=>{
                    main[z].style.display = 'none';

                },500);
            
            if((main[z].getAttribute('data-category')==displayItems) || displayItems == 'all')
         {
            main[z].style.transform='scale(1)';
                setTimeout(()=>{
                    main[z].style.display = 'block';

                },500);
         }           
        }
    }
}