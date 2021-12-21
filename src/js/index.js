function cipher() {
  //changes the inputs under the buttons based on the caesar cipher
  function changeHTML(type) {
    var html;
    switch (type) {
      case "caesar":
        html = '<label for="shift">Right shift:&nbsp;</label><input type="text" id="shift" size="5">';
        break;
    }
    $("#data").html(html);
  };

  //Caesar cipher, p = 1 for encryption and p = -1 for decryption
  function caesar(p) {
    var shift = $("#shift").val();    //how much to shift the letters by
    if (shift === "" || isNaN(shift) || shift != parseInt(shift)) {
      alert("Please enter an integer to shift by.");
      return false;
    } else
      shift = parseInt(shift) * p;    //if p = -1, reverses the shift for decryption

    var text = $("#input").val().toUpperCase();
    var letters = text.split("");
    var char;
    for (var i = 0; i < letters.length; i++) {
      char = letters[i].charCodeAt(0);
      if (char > 64 && char < 91) {    //A = 65, Z = 90
        char = (char - 65 + shift).mod(26) + 65;  //bring charcode range to 0-25, apply shift modulo 26, return char range to normal
      }
      letters[i] = char;
    }
    $("#output").val(String.fromCharCode.apply(null, letters));
  }


  
  //greatest common divisor, using Euclid's algorithm
  function gcd(x, y) {
    var z;
    while (y != 0) {
      z = x;
      x = y;
      y = z.mod(y);
    }
    return x;
  }

  //to account for negative number modulo javascript bug
  Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
  }

  //find modular inverse of an integer "a", mod "m"
  function modInv(a, m) {
    var v = 1;
    var d = a;
    var u = (a == 1);
    var t = 1 - u;
    if (t == 1) {
      var c = m.mod(a);
      u = Math.floor(m / a);
      while (c != 1 && t == 1) {
        var q = Math.floor(d / c);
        d = d.mod(c);
        v += (q * u);
        t = (d != 1);
        if (t == 1) {
          q = Math.floor(c / d);
          c = c.mod(d);
          u += (q * v);
        }
      }
      u = v * (1 - t) + t * (m - u);
    }
    return u;
  }

  return {
    changeHTML: changeHTML,
    caesar: caesar
  };
};

$(document).ready(function() {
  $("#input").focus();
  var c = cipher();

  //changes inputs below buttons based on selected cipher
  $(".btn-ciph").click(function() {
    var ciphType = $(this).attr("id");
    c.changeHTML(ciphType);
  });

  //encrypts text based on selected cipher, 1 is passed as arg to signify encryption
  $("#encrypt").click(function() {
    var ciphType = $(".active").attr("id");
    if (ciphType == "caesar")
      c.caesar(1);
  });

  //decrypts text based on selected cipher, -1 is passed as arg to signify decryption
  $("#decrypt").click(function() {
    var ciphType = $(".active").attr("id");
    if (ciphType == "caesar")
      c.caesar(-1);
  });
});
