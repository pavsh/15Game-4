//==============================================================
//Shuffle
//==============================================================
var blocked = false;
var Indexempty;
var Button_Clicked;
var newGame;

function shuffle() {

    Indexempty = 15;
    var arr = new Array();
    for (var j = 0; j < 15; j++)
        arr[j] = j + 1;
    arr[15] = -1;
    for (var jj = 14; jj > 0; jj--) {

        var R = Math.floor(Math.random() * jj);
        var temp = arr[jj];
        arr[jj] = arr[R];
        arr[R] = temp;
    }
    for (var i = 0; i < 15; i++) {
        var tempButton = document.getElementById(i.toString());
        tempButton.value = arr[i].toString();
        tempButton.tabIndex = i;
        tempButton.setAttribute('ng-click', "onSecondBtnClick($event)");
        tempButton.setAttribute('ng-mousedown', "onMouseDown($event)");
        tempButton.setAttribute('ng-mouseup', "onMouseUp($event)");
        //tempButton.setAttribute('ng-mousemove', "onMouseUp($event)");
        var row = Math.floor(i / 4);
        var col = i % 4;

        tempButton.style.left = (100 + col * 50) + "px";
        tempButton.style.top = (100 + row * 50) + "px";

        var R = 150 + Math.floor(Math.random() * 105);
        var G = 150 + Math.floor(Math.random() * 105);
        var B = 150 + Math.floor(Math.random() * 105);
        tempButton.style.backgroundColor = 'rgb(' + R.toString() + ',' + G.toString() + ',' + B.toString() + ')';

    }
    blocked = false;
}

//==============================================================
//Click Handle
//==============================================================
function myClick(index) {
/*          
    if (blocked == true) {
               
        return;
    }
           

           
    blocked = true;
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

    if ((Math.abs(pressedcol - emptycol) + Math.abs(pressedrow - emptyrow)) == 1) {
        if (pressedcol > emptycol)
            motionLeft((pressedcol - emptycol) * 50);
        if (pressedcol < emptycol)
            motionRight((emptycol - pressedcol) * 50);
        if (pressedrow > emptyrow)
            motionUp((pressedrow - emptyrow) * 50);
        if (pressedrow < emptyrow)
            motionDown((emptyrow - pressedrow) * 50);
        Button_Clicked.tabIndex = Indexempty;
        Indexempty = place;
               
               
              
    }
    else
        blocked = false;
        */
}

function motionLeft(delta) {


    if (delta <= 0) {
        blocked = false;
        //check();
        return;

    }
    Button_Clicked.style.left = parseInt(Button_Clicked.style.left) - 5 + "px";
    window.setTimeout('motionLeft(' + (delta - 5).toString() + ')', 20);
}

function motionRight(delta) {


    if (delta <= 0) {
        blocked = false;
        //check();
        return;

    }
    Button_Clicked.style.left = parseInt(Button_Clicked.style.left) + 5 + "px";
    window.setTimeout('motionRight(' + (delta - 5).toString() + ')', 20);
}

function motionUp(delta) {


    if (delta <= 0) {
        blocked = false;
        console.log(" motion:" + blocked.toString());
        check();

        return;

    }
    Button_Clicked.style.top = parseInt(Button_Clicked.style.top) - 5 + "px";
    window.setTimeout('motionUp(' + (delta - 5).toString() + ')', 20);
}

function motionDown(delta) {


    if (delta <= 0) {
        blocked = false;
        // check();
        return;

    }
    Button_Clicked.style.top = parseInt(Button_Clicked.style.top) + 5 + "px";
    window.setTimeout('motionDown(' + (delta - 5).toString() + ')', 20);
}

//==============================================================
//GameOver Check
//==============================================================
function check() {

    var counter = 1;
    var i;
    while (counter <= 2) {

        for (i = 0; i < 15; i++) {
            var tempbutton = document.getElementById(i);
            if (tempbutton.value == counter && tempbutton.tabIndex == counter - 1) {


                counter++;
                break;
            }


        }
        if (i == 15)
            return;
    }


    if (confirm("Game is over, do you want New game?")) {

        shuffle();

    }

}


//=============================================================================
//Angularjs Module
//=============================================================================
angular.module("moveModule", [])
    .controller("mainController", function($scope) {
        // Initialization
        var DownCords = {
            x: 0,
            y: 0
        };
        var PressedBtn;
        var pressedLeft;
        var pressedTop;
        var mouseUp = true;
        var moveLeft = false;
        var moveRight = false;
        var moveDown = false;
        var moveUp = false;
        var offs= 50;
        var place;
        var targetTop=0;
        var targetLeft=0;
        $scope.onFirstBtnClickResult = "";
        $scope.secondBtnInput = "";
        $scope.onDblClickResult = "";
        $scope.onMouseDownResult = "";
        $scope.onMouseUpResult = "";
        $scope.onMouseEnterResult = "";
        $scope.onMouseLeaveResult = "";
        $scope.onMouseMoveResult = "";
        $scope.onMouseOverResult = "";

        // Utility functions

        // Accepts a MouseEvent as input and returns the x and y
        // coordinates relative to the target element.
        var getCrossBrowserElementCoords = function(mouseEvent) {
            var result = {
                x: 0,
                y: 0
            };

            if (!mouseEvent) {
                mouseEvent = window.event;
            }

            if (mouseEvent.pageX || mouseEvent.pageY) {

                result.x = mouseEvent.pageX;
                result.y = mouseEvent.pageY;
                $scope.pageCordBF = result.x + "," + result.y;

            } else if (mouseEvent.clientX || mouseEvent.clientY) {
                result.x = mouseEvent.clientX + document.body.scrollLeft +
                    document.documentElement.scrollLeft;
                result.y = mouseEvent.clientY + document.body.scrollTop +
                    document.documentElement.scrollTop;
            }

            if (mouseEvent.target) {

                var offEl = mouseEvent.target;
                var offX = 0;
                var offY = 0;

                if (typeof(offEl.offsetParent) != "undefined") {
                    while (offEl) {
                        offX += offEl.offsetLeft;
                        offY += offEl.offsetTop;

                        offEl = offEl.offsetParent;
                    }
                    $scope.relCord = offX + "," + offY;
                } else {
                    offX = offEl.x;
                    offY = offEl.y;
                }

                result.x -= offX;
                result.y -= offY;
                $scope.pageCord = result.x + "," + result.y;
            }

            return result;
        };

        var getMouseEventResult = function(mouseEvent, mouseEventDesc) {
            var coords = getCrossBrowserElementCoords(mouseEvent);
            return mouseEventDesc + " at (" + coords.x + ", " + coords.y + ")";
        };

        // Event handlers
        $scope.onFirstBtnClick = function() {
            $scope.onFirstBtnClickResult = "CLICKED";
        };

        $scope.onSecondBtnClick = function(event) {

            /*
        if (blocked == true) {
               
            return;
        }*/


        };

        $scope.onDblClick = function() {
            $scope.onDblClickResult = "DOUBLE-CLICKED";
        };

        $scope.onMouseDown = function($event) {
            console.log("empty:" + Indexempty);
           // console.log("pageX:" + $event.target.offsetLeft);
            //console.log("pageY:" + $event.target.offsetTop);
            DownCords.x = $event.target.pageX;
            DownCords.y = $event.target.pageY;
            
            
            if (!blocked) {
                 
                
            PressedBtn = $event.target;
            pressedLeft = PressedBtn.offsetLeft;
            pressedTop = PressedBtn.offsetTop;
            
            
                blocked = true;
                //Button_Clicked = event.target;
                console.log("blocked again");

                place = PressedBtn.tabIndex;
                var pressedcol = place % 4;
                var pressedrow = place / 4;
                if (pressedrow != 0)
                    pressedrow = Math.floor(pressedrow);
                var emptycol = Indexempty % 4;
                var emptyrow = Indexempty / 4;

                if (emptyrow != 0)
                    emptyrow = Math.floor(emptyrow);

                if ((Math.abs(pressedcol - emptycol) + Math.abs(pressedrow - emptyrow)) == 1) {
                    mouseUp = false;
                    $scope.onMouseDownResult = "you typed " + (pressedrow + "," + pressedcol);
                   
                    if (pressedcol > emptycol) {
                        moveLeft = true;
                        targetLeft = pressedLeft - 50;
                        offs = Math.abs(pressedLeft - $event.pageX);
                    }
                    if (pressedcol < emptycol) {
                        moveRight = true;
                        targetLeft = pressedLeft + 50;
                        console.log("MoveRight pressedLeft:" + pressedLeft + "PageX:" + $event.pageX);
                        offs = Math.abs(pressedLeft - $event.pageX);
                    }
                    if (pressedrow > emptyrow) {
                        moveUp = true;
                        targetTop = pressedTop - 50;
                        offs = Math.abs(pressedTop - $event.pageY);
                    }
                    if (pressedrow < emptyrow) {
                        moveDown = true;
                        targetTop = pressedTop + 50;
                        offs = Math.abs(pressedTop - $event.pageY);

                    }
                    console.log("blocked again");
                    console.log("offset:" + offs);
                    //PressedBtn.tabIndex = Indexempty;
                    //Indexempty = place;

                } else {


                    blocked = false;
                }

            }
            else {
                
                   
                    if ($event.target === PressedBtn) {
                        mouseUp = false;
                        if (moveLeft || moveRight)
                            offs = Math.abs(PressedBtn.offsetLeft - $event.pageX);
                        if(moveDown||moveUp)
                            offs = Math.abs(PressedBtn.offsetTop - $event.pageY);
                        console.log("new offset:" + offs);
                        console.log("still not finished");
                    } else {
                        console.log("not same button");
                    }
                
            }
            //$scope.onMouseDownResult = getMouseEventResult($event, "Mouse down");
        };

        $scope.onMouseUp = function($event) {
           
            //$scope.onMouseUpResult = getMouseEventResult($event, "Mouse up");
            console.log("Mouse UP");
            $scope.onMouseUpResult = "test:" + $event.pageX;
            mouseUp = true;

            if (changeBlocked()) {
                console.log("finish");
                blocked = false;
                moveRight = false;
                moveUp = false;
                moveLeft = false;
                moveDown = false;
                PressedBtn.tabIndex = Indexempty;
                Indexempty = place;
                check();
            }


        };

        $scope.onMouseEnter = function($event) {
            $scope.onMouseEnterResult = getMouseEventResult($event, "Mouse enter");
        };

        $scope.onMouseLeave = function($event) {

            $scope.onMouseLeaveResult = getMouseEventResult($event, "Mouse leave");
        };

        $scope.onMouseMove = function($event) {
            $scope.onMouseMoveResult = $event.pageX + "," + $event.pageY;
           
           // console.log("empty:" + Indexempty);
            if (!mouseUp) {
                console.log("mouse not up");
                if (moveRight) {

                    moveOnlyRight($event);
                }
                if (moveDown) {
                    moveOnlyDown($event);
                }
                if (moveUp) {
                    moveOnlyUp($event);
                }
                if (moveLeft) {
                    moveOnlyLeft($event);
                }
              
           }
            //$scope.onMouseMoveResult = getMouseEventResult($event, "Mouse move");

        };

        $scope.onMouseOver = function($event) {
            $scope.onMouseOverResult = getMouseEventResult($event, "Mouse over");
        };

        //Move Only to the Right
        var moveOnlyRight = function(evt) {
           // console.log("evt:" + evt.pageX);
            console.log("pressed:" + PressedBtn.offsetLeft);
           // if (PressedBtn.offsetLeft <= evt.pageX) {

                if (evt.pageX <= (PressedBtn.offsetLeft + 50)) {
                    console.log("onlyright");
                    // PressedBtn.style.left = evt.pageX + "px";
                    checkMove(evt);
                    PressedBtn.style.top = pressedTop + "px";

                } else {
                   console.log("else");
                    PressedBtn.style.left = (PressedBtn.pageX + 50) + "px";
                }
           // }
           

        };

        //Move Only to the Down
        var moveOnlyDown = function (evt) {
             console.log("evt.PageY:" + evt.pageY);
            console.log("pressed:" + PressedBtn.offsetTop);
            if (PressedBtn.offsetTop <= evt.pageY) {

                if (evt.pageY <= (PressedBtn.offsetTop + 50)) {
                    console.log("OnlyDown");
                    // PressedBtn.style.left = evt.pageX + "px";
                    checkMove(evt);
                    PressedBtn.style.left = pressedLeft + "px";

                } else {
                    console.log("else");
                    PressedBtn.style.top = (PressedBtn.pageY + 50) + "px";
                }
            }

        };
        //Move Only to the Down
        var moveOnlyUp = function (evt) {
             console.log("evt.PageY:" + evt.pageY);
            console.log("pressed:" + PressedBtn.offsetTop);
           // if (PressedBtn.offsetTop >= evt.pageY) {
            if(evt.pageY<=PressedBtn.offsetTop+50){
                if (evt.pageY >= (PressedBtn.offsetTop - 50)) {
                    console.log("OnlyUp");
                    // PressedBtn.style.left = evt.pageX + "px";
                    checkMove(evt);
                    PressedBtn.style.left = pressedLeft + "px";

                } else {
                    console.log("else");
                    PressedBtn.style.top = (PressedBtn.pageY - 50) + "px";
                }
            } 

        };
        //Move Only to the Down
        var moveOnlyLeft = function (evt) {
            // console.log("evt:" + evt.pageX);
            console.log("pressed:" + PressedBtn.offsetLeft);
            //if (PressedBtn.offsetLeft >= evt.pageX) {

                if (evt.pageX >= (PressedBtn.offsetLeft - 50)) {
                    console.log("OnlyLeft");
                    // PressedBtn.style.left = evt.pageX + "px";
                    checkMove(evt);
                    PressedBtn.style.top = pressedTop + "px";

                } else {
                    console.log("else");
                    PressedBtn.style.left = (PressedBtn.pageX - 50) + "px";
                }
            //} else
            //    console.log("left else");

        };
    var checkMove = function(evt) {

      //  console.log("pagex:"+evt.pageX);
      //  console.log("pageY:"+evt.pageY);

        //check not on other cell
        /*
        console.log("evt tabindex:" + evt.target.tabIndex);
        if (evt.target.tabIndex >= 0 && evt.target.tabIndex<=15) {
            console.log("not ok");
            console.log(evt.target.tabIndex);
            return false;
        } */
        
        // check Borders
        if (moveLeft || moveRight) {
            if (evt.pageX > 300 || evt.pageX < 100) {

                // PressedBtn.style.left = 250 + "px";


            } else {

                console.log("pressedleft:" + pressedLeft + "-" + evt.pageX);
                if (moveLeft) {
                    if ((evt.pageX - offs) > targetLeft+20) {
                        PressedBtn.style.left = (evt.pageX - offs) + "px";
                        return;
                    }

                } else {
                    if ((evt.pageX - offs) < targetLeft-20) {
                        PressedBtn.style.left = (evt.pageX - offs) + "px";
                        return;
                    }
                }
                //If Got to target left finish and raise MouseUP event
                console.log("got to end left");
                    if (moveRight)
                        PressedBtn.style.left = (pressedLeft + 50) + "px";
                    else
                        PressedBtn.style.left = (pressedLeft - 50) + "px";
                    $scope.onMouseUp(evt);
                
            }
        } else if (moveUp || moveDown) {

            if (evt.pageY > 300 || evt.pageY < 100) {

                //PressedBtn.style.top = 250 + "px";
                console.log("over 300");

            } else {
                console.log("pressedTop:" + pressedTop + "-" + evt.pageY);
                //if (Math.abs(pressedTop - evt.pageY) < 50)
                if (moveUp) {
                    if ((evt.pageY - offs) > targetTop+20) {
                        PressedBtn.style.top = (evt.pageY - offs) + "px";
                        return;
                    }
                } 
                else{
                    if ((evt.pageY - offs) < targetTop-20) {
                        PressedBtn.style.top = (evt.pageY - offs) + "px";
                        return;
                    }
                }

             //If got to the Target Top place the Button and finish(raise mouseUp event
                     console.log("got to end top");
                    if (moveDown)
                        PressedBtn.style.top = (pressedTop + 50) + "px";
                    else 
                        PressedBtn.style.top = (pressedTop - 50) + "px";
                    
                    $scope.onMouseUp(evt);
                

            }
        }

    };
    var changeBlocked = function () {
       // console.log("new left:"+PressedBtn.offsetLeft);
        console.log("target left:" + targetLeft);
      //  console.log("new top:" + PressedBtn.offsetTop);
        console.log("target top:" + targetTop);
        if(moveRight||moveLeft)
            if (PressedBtn.offsetLeft == targetLeft)
                return true;
        
        if (moveUp||moveDown)
            if (PressedBtn.offsetTop == targetTop)
                return true;
        
        return false;
    };
});