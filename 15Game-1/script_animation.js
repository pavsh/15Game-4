


var blocked;
var Indexempty;
var Button_Clicked;

        function shuffle(){
        Indexempty = 15;
        var arr = new Array();
        for (var j = 0; j < 15; j++)
            arr[j]=j+1;
        arr[15]=-1;
        for (var jj = 14; j > 0; jj--) {


            var R = Math.floor(Math.random() * jj);
            var temp = arr[jj];
            arr[jj] = arr[R];
            arr[R] = temp;
            }
 
        for (var i = 0; i < 15; i++) {
            var tempButton = document.getElementById(i);
            tempButton.value = arr[i].toString();
            tempButton.tabIndex = i;
            var row = Math.floor(i / 4);
            var col = Math.floor(i % 4);
            tempButton.style.pixelLeft = 100 + col * 50;
            tempButton.style.pixelTop = 100 + row * 50;
            var R = 150 + Math.floor(Math.random() * 105);
            var G = 150 + Math.floor(Math.random() * 105);
            var B = 150 + Math.floor(Math.random() * 105);
            tempButton.style.backgroundColor = 'rgb(' + R.toString() + ',' + G.toString() + ',' + B.toString() + ')';

        }
        blocked = false;
        }
        function myClick(index)
        {

            if (blocked == true)
                return;
            else
                
            Button_Clicked = document.getElementById(index);
            var place = Button_Clicked.tabIndex;
            var pressedcol = place % 4;
            var pressedrow = place / 4;
            if (pressedrow != 0)
                pressedrow = Math.floor(pressedrow);
            var emptycol = Indexempty % 4;
            var emptyrow = Indexempty / 4;
            if (emptyrow != 0)
                emptyrow = Math.floor(emptyrow);

            if (Math.abs(i_1 - i_2) + Math.abs(j_1 - j_2) == 1) {
                if (pressedcol > emptycol)
                    motionLeft((pressedcol - emptycol) * 50);
                if (pressedcol < emptycol)
                    motionRight((emptycol - pressedcol) * 50);
                if (pressedrow > emptyrow)
                    motionUp((pressedrow - emptyrow) * 50);
                if (pressedrow < emptyrow)
                    motionDown((emptycol - pressedrow) * 50);
                Button_Clicked.tabIndex = Indexempty;
                Indexempty = place;
                check();
                blocked = false;
            }
            else
                blocked = false;
        }

        function motionLeft(delta) {


            if (delta <= 0) {
                blocked = false;
                check();
                return;

            }
            Button_Clicked.style.pixelLeft -= 5;
            window.setTimeout('motionLeft(' + (delta - 5).toString() + ')', 100);
        }
        function motionRight(delta) {


            if (delta <= 0) {
                blocked = false;
                check();
                return;

            }
            Button_Clicked.style.pixelLeft += 5;
            window.setTimeout('motionRight(' + (delta - 5).toString() + ')', 100);
        }
        function motionUp(delta) {


            if (delta <= 0) {
                blocked = false;
                check();
                return;

            }
            Button_Clicked.style.pixelLeft -= 5;
            window.setTimeout('motionLeft(' + (delta - 5).toString() + ')', 100);
        }
        function motionDown(delta) {


            if (delta <= 0) {
                blocked = false;
                check();
                return;

            }
            Button_Clicked.style.pixelLeft += 5;
            window.setTimeout('motionLeft(' + (delta - 5).toString() + ')', 100);
        }
        function check() {

            var counter=1;
            var i;
            while(counter<=2)
            {

                for(i=0;i<15;i++)
                {
                    var tempbutton = document.getElementById(i);
                    if (tempbutton.value == counter && tempbutton.tabIndex == counter - 1) {


                        counter++;
                        break;
                    }


                }
                if (i == 15)
                    return;
            }
            if(confirm("Game is over, New game"))
                shuffle();


            



        }