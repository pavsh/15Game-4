using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

namespace _15Game_1
{
       
    public partial class Board : System.Web.UI.Page
    {

        Button[] arrButtons;
       
        protected void Page_Load(object sender, EventArgs e)
        {

            arrButtons = new Button[15];
          for(short i=0;i<15;i++)
          {
              arrButtons[i] = new Button();
              arrButtons[i].ID = i.ToString();
              arrButtons[i].TabIndex = i;
              arrButtons[i].Attributes.Add("Onclick", "javascript:myClick(" + i.ToString() + ");return false;");
              arrButtons[i].Font.Size = new FontUnit("X-Large");
               arrButtons[i].Style["position"]="Absolute";
               arrButtons[i].Attributes.Add("ng-mousemove", "onMouseMove($event)");
              // arrButtons[i].Attributes.Add("ng-model", "ButtonId");
              // arrButtons[i].Attributes.Add("ng-click", "onSecondBtnClick(ButtonId)");
              arrButtons[i].Width = 50;
               arrButtons[i].Height = 50;

              form1.Controls.Add( arrButtons[i]);

          }

          ClientScript.RegisterStartupScript(typeof(Page), "shuffle", "<Script>javascript:shuffle();</script>");
        }

       

       
    }

    
}