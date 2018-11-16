 (function () {
     var table = document.createElement("table");
     var myBoard = document.getElementById("myBoard");
     var count = 0;
     var start, end;
     var cols = 'HGFEDCBA'.split('')

     function draw() {

         for (var i = 8; i > 0; i--) {
             var tr = document.createElement('tr');
             for (var j = 8; j > 0; j--) {
                 var td = document.createElement('td');
                 if (j == 8) {
                     var cellNum = document.createElement("span");

                     cellNum.textContent = i;
                     cellNum.className = "cellNum";
                     td.appendChild(cellNum);
                 }
                 if (i == 1) {
                     var cellChar = document.createElement("span");
                     cellChar.textContent = cols[j - 1];
                     cellChar.className = "cellChar";
                     td.appendChild(cellChar);
                 }
                 if (i % 2 == j % 2) {
                     td.className = "white square";

                 } else {
                     td.className = "black square";

                 }
                 td.id = cols[j - 1] + i;
                 td.onclick = function () {
                     $('.pathNum').remove();
                     $('.animated').removeClass('animated');

                     if (count == 0) {
                         count++;
                         start = this.id;
                         moveKnight(this, 1);

                     } else if (count == 1) {
                         count = 0;
                         end = this.id;
                         getPath();
                     }
                 };
                 tr.appendChild(td);
             }
             table.appendChild(tr);
         }
         myBoard.appendChild(table);
     }

     function moveKnight(element, index) {
         var tempKnight = document.getElementById("knight");
         if (tempKnight) tempKnight.parentNode.removeChild(tempKnight);
         var knight = document.createElement("img");
         var pathNum = document.createElement("span");
         pathNum.textContent = index;
         pathNum.className = "pathNum";
         knight.src = "wN.png";
         knight.id = "knight";
         element.classList.add("animated");
         element.appendChild(knight);
         element.appendChild(pathNum);
     }

     function getPath() {
         var url = "https://v86wed9i20.execute-api.eu-west-1.amazonaws.com/public/knight-path?start=" + start + "&end=" + end;
         $.get(url, function (data, status) {
             if (data) {
                 var path = data.replace(/[^a-zA-Z0-9-,]/g, '');
                 path = path.split(',');
                 for (let i = 0; i < path.length; i++) {

                     setTimeout(() => {
                         var cell = document.getElementById(path[i]);
                         moveKnight(cell, i);
                     }, i * 1000);
                 }
             }
         });


     }
     window.chessModule = {};
     window.chessModule.draw = draw;

 })();

