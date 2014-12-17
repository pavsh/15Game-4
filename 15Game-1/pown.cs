using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _15Game_1
{
    public class pown
    {
        private int Value;
     private int Row;
       private int Col;
       private bool isEmpty = false;
      public  pown()
        {
            Row= -1;
            Col = -1;
        }
       public  pown(int x,int y,int Val)
      {
          Row = x;
          Col = y;
          Value = Val;
      }
       public int getRow()
       {
           return Row;
       }
       public int getCol()
       {
           return Col;
       }
      public void setX(int x)
       {
           Row = x;
       }
        public void setY(int y)
      {
          Col = y;
      }
        public bool Empty()
        {
            return isEmpty;
        }
        public void setEmpty(bool em)
        {
            isEmpty = em;
        }
        public int getValue()
        {
            return Value;
        }
    }
}