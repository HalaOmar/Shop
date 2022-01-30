$(document).ready(function(){

    $('.add-to-cart').on('click',function(event){

       
        event.preventDefault();

        var dataId  = $(this).attr('data-id')
// alert(dataId)

        $.post("/user/add-to-cart/" ,{id : dataId} , function(data,status){

            alert ( data , status )
        //   let items_count= parseInt( $('#items-count span').text() ) +1
          $('#items-count span').text(data)
       
        })  
             
    })
  });

$(document).ready(function(){

$('.delete-btn').on('click',function(){
var productid = $(this).attr('data-index')
$('#clicked-item').attr("value",productid)


$('#deletemodal').modal('show');
})
});

$(document).ready(function(){

$('.product-edit-btn').on('click',function(){

var txt=$(this).parents('.foredit').children('.name').text()
$('.edited-prod').val(txt)
var price=$(this).parents('.foredit').children('.editprice').text()
$('.price').val(price)
var cartdisc=$(this).parents('.foredit').children('.cartdisc').text()
$('.cartdisc').val(cartdisc)
var category=$(this).parents('.foredit').children('.editcategory').text()
$('.category-to-edit').val(category)
var productid = $(this).attr('data-index')
$('#edit_Byid').val(productid)
var img = $(this).parents('.foredit').children('.image').text()
$('.edit-img').text=img

$('#editmodal').modal('show');
})
});

$(document).ready(function(){

$('.cat-li').on('click',function(){
var category_select = $(this).children('.li-href').text()
$('.category').val(category_select)

})
} );

$(document).ready(function(){

$('.image').on('click' , function(){

$('#editmodal').modal('show');

})
})

$(document).ready(function(){

  $('.pagin').on( 'click' , function(e){
e.preventDefault()
const bulletIndex= $(this).attr('data-n') 
showSlide(bulletIndex)
activeBullet(bulletIndex)
  })
})

function showSlide(bulletIndex){

  var slides=document.getElementsByClassName('slide')

  for (let index = 0; index < slides.length; index++) {
  const element = slides[index];
  const slideIndex=  element.getAttribute('data-slide')

  slideIndex == bulletIndex ? element.classList.add('active-slide') : element.classList.remove('active-slide')

}

}

function activeBullet(bulletIndex){

  var bullets = document.getElementsByClassName('pagin')
  for (let index = 0; index < bullets.length; index++) {
    const element = bullets[index];
    element.getAttribute('data-n') == bulletIndex ? element.parentElement.classList.add('active')
                                                  : element.parentElement.classList.remove('active')
    
  }
}