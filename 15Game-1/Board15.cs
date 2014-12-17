using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _15Game_1

{   
    public class Board15
    {
        static Random rnd = new Random();
        pown[,] Boardcells;
        int rowempty=3, colempty=3;
        public Board15(bool random=false)
        {
            int start = 1;
            int end = 15;
            Boardcells=new pown[4,4];
            int Counter=1;
            if (!random)
            {
                for (int i = 0; i < 4; i++)
                {
                    for (int j = 0; j < 4; j++)
                    {

                        Boardcells[i, j] = new pown(i, j, Counter);
                        Counter++;
                    }

                }
            }
            else
            {
                //Random rnd = new Random();
                List<int> randomNumbers = new List<int>(16);
                int randval = 0;
                for (int i = 0; i < 4; i++)
                {
                    for (int j = 0; j < 4; j++)
                    {
                        if (i != 3 || j != 3)
                        {
                            do
                            {
                                if (start < end)
                                {
                                    if (randomNumbers.Contains(start))
                                        start++;
                                    if (randomNumbers.Contains(end))
                                        end--;
                                }
                                randval = rnd.Next(start, end + 1);
                            }
                            while (randomNumbers.Contains(randval));
                            randomNumbers.Add(randval);
                            Boardcells[i, j] = new pown(i, j, randval);
                            Counter++;
                        }
                        
                    }

                }
            }
            //init empty cell in  cell 4,4
            Boardcells[rowempty, colempty] = new pown(rowempty,colempty,0);
            Boardcells[rowempty, colempty].setEmpty(true);



        }
        public pown getEmpty()
        {

            return Boardcells[rowempty, colempty];
                   
        }
        public bool EmptyNieghbor(pown pw)
        {
            return (checkLeft(pw) || checkRight(pw) || checkUP(pw) || checkDown(pw));
        }
        public bool checkLeft(pown pw)
        {
            if (pw.getCol() != 0)
            if (Boardcells[pw.getRow(), pw.getCol() - 1].Empty())
                return true;
            return false;
        }
        public bool checkRight(pown pw)
        {
            if (pw.getCol() != 3)
            if (Boardcells[pw.getRow(), pw.getCol() + 1].Empty())
                return true;
            return false;
        }
        public bool checkUP(pown pw)
        {
            if (pw.getRow()!=0)
            if (Boardcells[pw.getRow()-1, pw.getCol()].Empty())
                return true;
            return false;
        }
        public bool checkDown(pown pw)
        {
            if (pw.getRow()!=3)
            {
                if (Boardcells[pw.getRow() + 1, pw.getCol()].Empty())
                    return true;
            }
            return false;
        }
        //Switch between empty and given pown cells
        public void switchPowns(pown pw)
        {
            pown temp=new pown(pw.getRow(),pw.getCol(),pw.getValue());
            pown empty_pow = Boardcells[rowempty, colempty];
            pw.setX(rowempty);
            pw.setY(colempty);
            //pw.setEmpty(false);
            Boardcells[rowempty, colempty] = pw;
            rowempty = temp.getRow();
            colempty = temp.getCol();
            empty_pow.setX(rowempty);
            empty_pow.setY(colempty);
            Boardcells[rowempty, colempty] = empty_pow;
            



        }
       public bool isGameOver()
        {
            int Counter=1;
            for (int i=0;i<4;i++)
                for(int j=0;j<4;j++)
                {
                    //Check Cells except the empty one at end
                    if (i != 3 || j != 3)
                    {
                        if (Boardcells[i, j].getValue() != Counter)
                            return false;
                        Counter++;
                    }
                    

                }
            return true;
        }
        public pown GetPown(int x,int y)
        {
            return Boardcells[x, y];
        }
        public pown getPownByVal(int val)
        {
            for (int i = 0; i < 4; i++)
                for (int j = 0; j < 4; j++)
                    if (Boardcells[i, j].getValue() == val)
                        return Boardcells[i, j];

            return null;
        }
    }
}