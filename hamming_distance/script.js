const hammingDistance1 = function(x, y){    
    return (x^y).toString(2).replace(/0/g, '').length;
}

const hammingDistance2 = (x, y) => {
  let val = x ^ y;

  let distance;
  for (distance = 0; val > 0; distance++) {
    val &= val - 1;
  }

  return distance;
};

function run(n){

    var n1 = Math.floor(Math.random()* n);
    var n2 = Math.floor(Math.random()* n);
    
    $('.n1').html(n1.toString(2)); 
    $('.n2').html(n2.toString(2)); 
    $('.o1').html(n1); 
    $('.o2').html(n2); 
    $('.diff').html( (n1^n2) ); 
    $('.biff').html( (n1^n2).toString(2) ); 
    $('.result1').html(hammingDistance1( n1, n2 )); 
    $('.result2').html(hammingDistance2( n1, n2 )); 
}

$(document).ready(function(){
    var n = 9999;
    run(n);
});