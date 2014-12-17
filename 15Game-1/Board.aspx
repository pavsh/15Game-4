<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Board.aspx.cs" Inherits="_15Game_1.Board" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<script data-require="angular.js@1.1.x" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.js" data-semver="1.1.5"></script>
<script src="script.js"></script>
<head runat="server">
    
    <title></title>
    
</head>
   
<body ng-app="moveModule">
   <div ng-controller="mainController" >
    <form id="form1" runat="server" >
      
        </form>
       <textarea id="TextArea1" cols="20" name="S1" rows="2">{{onMouseMoveResult}}</textarea>
       <textarea id="TextArea4" cols="20" name="S1" rows="2">{{pageCordBF}}</textarea>
       <textarea id="TextArea2" cols="20" name="S1" rows="2">{{pageCord}}</textarea>
       <textarea id="TextArea3" cols="20" name="S1" rows="2">{{relCord}}</textarea>
       <textarea id="TextArea5" cols="20" name="S1" rows="2">{{onSecondBtnClickResult}}</textarea>
       <textarea id="TextArea6" cols="20" name="S1" rows="2">{{onMouseDownResult}}</textarea>
       <textarea id="TextArea7" cols="20" name="S1" rows="2">{{onMouseUpResult}}</textarea>
     </div> 
</body>
</html>
