window.onload = function(){ //Acciones tras cargar la página
pantalla=document.getElementById("textoPantalla"); //elemento pantalla de salida
panbin=document.getElementById("binario");
panoct=document.getElementById("octal");
panhex=document.getElementById("hexa");
var divs = document.getElementsByClassName("btn");
var btnb =document.getElementsByClassName("largo")

    //Recorres la lista de elementos seleccionados
    for (var i=0; i< divs.length; i++) {
        //Añades un evento a cada elemento
        divs[i].addEventListener("click",function() {
           //Aquí la función que se ejecutará cuando se dispare el event
           updateValue();
        });

        if(i<3)
          btnb[i].addEventListener("click",function() {
             //Aquí la función que se ejecutará cuando se dispare el event
             updateValue();
        });
    }
}

x="0"; //número en pantalla
xi=1; //iniciar número en pantalla: 1=si; 0=no;
coma=0; //estado coma decimal 0=no, 1=si;
ni=0; //número oculto o en espera.
op="no"; //operación en curso; "no" =  sin operación.

//mostrar número en pantalla según se va escribiendo:
function numero(xx) { //recoge el número pulsado en el argumento.
         if (x=="0" || xi==1  ) {	// inicializar un número,
            pantalla.value=xx; //mostrar en pantalla
            x=xx; //guardar número
            if (xx==".") { //si escribimos una coma al principio del número
               pantalla.value="0."; //escribimos 0.
               x=xx; //guardar número
               coma=1; //cambiar estado de la coma
               }
           }
           else { //continuar escribiendo un número
               if (xx=="." && coma==0) { //si escribimos una coma decimal pòr primera vez
                   pantalla.value+=xx;
                   x+=xx;
                   coma=1; //cambiar el estado de la coma
               }
               //si intentamos escribir una segunda coma decimal no realiza ninguna acción.
               else if (xx=="." && coma==1) {}
               //Resto de casos: escribir un número del 0 al 9:
               else {
                   pantalla.value+=xx;
                   x+=xx
               }
            }
            xi=0 //el número está iniciado y podemos ampliarlo.
         }
function operar(s) {
         igualar() //si hay operaciones pendientes se realizan primero
         ni=x //ponemos el 1º número en "numero en espera" para poder escribir el segundo.
         op=s; //guardamos tipo de operación.
         xi=1; //inicializar pantalla.
         }
function igualar() {
         if (op=="no") { //no hay ninguna operación pendiente.
            pantalla.value=x;	//mostramos el mismo número
            }
         else {
            if(op!='c' && op!='p' && op!='m'){
           //con operación pendiente resolvemos
            sl=ni+op+x; // escribimos la operación en una cadena
            sol=eval(sl) //convertimos la cadena a código y resolvemos
            }
            else {
              if(op=='c'){
                   sol=combinaciones(parseInt(ni),parseInt(x));
                   }

                   else
                       if(op=='p'){
                         sol=permutaciones(parseInt(ni),parseInt(x));
                          }

                            else{
                            sol=modulo(parseInt(ni),parseInt(x));
                             }
            }
            pantalla.value=sol //mostramos la solución
            x=sol; //guardamos la solución
            op="no"; //ya no hay operaciones pendientes
            xi=1; //se puede reiniciar la pantalla.
          }
        }
function raizc() {
         x=Math.sqrt(x) //resolver raíz cuadrada.
         pantalla.value=x; //mostrar en pantalla resultado
         op="no"; //quitar operaciones pendientes.
         xi=1; //se puede reiniciar la pantalla
         }

function log10(){
         x=Math.log10(x)
         pantalla.value=x; //mostrar en pantalla resultado
         op="no"; //quitar operaciones pendientes.
         xi=1; //se puede reiniciar la pantalla
         }
function ln(){
          x=Math.log(x)
          pantalla.value=x; //mostrar en pantalla resultado
          op="no"; //quitar operaciones pendientes.
          xi=1; //se puede reiniciar la pantalla
          }
function fact(){
         x=factorial(x);
         pantalla.value=x; //mostrar en pantalla resultado
         op="no"; //quitar operaciones pendientes.
         xi=1; //se puede reiniciar la pantalla
         }
function sen(){
         x=Math.sin((x/180)*Math.PI);
         pantalla.value=x; //mostrar en pantalla resultado
         op="no"; //quitar operaciones pendientes.
         xi=1; //se puede reiniciar la pantalla

         }
function cos(){
         x=Math.cos((x/180)*Math.PI);
         pantalla.value=x; //mostrar en pantalla resultado
         op="no"; //quitar operaciones pendientes.
         xi=1; //se puede reiniciar la pantalla
         }

function tan(){
         x= Math.tan((x/180)*Math.PI);
         pantalla.value=x; //mostrar en pantalla resultado
         op="no"; //quitar operaciones pendientes.
         xi=1; //se puede reiniciar la pantalla
         }

function asen(){
         x= Math.asin((x/180)*Math.PI);
         pantalla.value=x; //mostrar en pantalla resultado
         op="no"; //quitar operaciones pendientes.
         xi=1; //se puede reiniciar la pantalla
        }

function acos(){
        x= Math.acos((x/180)*Math.PI);
        pantalla.value=x; //mostrar en pantalla resultado
        op="no"; //quitar operaciones pendientes.
        xi=1; //se puede reiniciar la pantalla
        }

function atan(){
        x= Math.atan((x/180)*Math.PI);
        pantalla.value=x; //mostrar en pantalla resultado
        op="no"; //quitar operaciones pendientes.
        xi=1; //se puede reiniciar la pantalla
        }

function porcent() {
         x=x/100 //dividir por 100 el número
         pantalla.value=x; //mostrar en pantalla
         igualar() //resolver y mostrar operaciones pendientes
         xi=1 //reiniciar la pantalla
         }
function opuest() {
         nx=Number(x); //convertir en número
         nx=-nx; //cambiar de signo
         x=String(nx); //volver a convertir a cadena
         pantalla.value=x; //mostrar en pantalla.
         }
function inve() {
         nx=Number(x);
         nx=(1/nx);
         x=String(nx);
         pantalla.value=x;
         xi=1; //reiniciar pantalla al pulsar otro número.
         }

function retro(){ //Borrar sólo el último número escrito.
         cifras=x.length; //hayar número de caracteres en pantalla
         br=x.substr(cifras-1,cifras) //describir último caracter
         x=x.substr(0,cifras-1) //quitar el ultimo caracter
         if (x=="") {x="0";} //si ya no quedan caracteres, pondremos el 0
         if (br==".") {coma=0;} //Si el caracter quitado es la coma, se permite escribirla de nuevo.
         pantalla.value=x; //mostrar resultado en pantalla
         }
function borradoParcial() {
        pantalla.value=0; //Borrado de pantalla;
        x=0; //Borrado indicador número pantalla.
        coma=0;	//reiniciamos también la coma
        }
function borradoTotal() {
         pantalla.value=0; //poner pantalla a 0
         x="0"; //reiniciar número en pantalla
         coma=0; //reiniciar estado coma decimal
         ni=0 //indicador de número oculto a 0;
         op="no" //borrar operación en curso.
         }

function abinario(dec){
  return dec==1?"1":panbin.value=(abinario( Math.trunc( dec/2 )) + dec % 2);
}

function aoctal(dec) {
  return dec<=8 ? (Math.trunc(dec/8)*10)+(dec % 8)+"": panoct.value=(aoctal( Math.trunc( dec/8 )) + dec % 8);

}

function ahexa(dec){
 return dec<=16 ? vhex(Math.trunc(dec/16))+""+vhex(dec % 16) : panhex.value=(ahexa(Math.trunc (dec/16))+ vhex(dec % 16));
}

function combinaciones(n1,n2)
{
return  factorial(n1)/(factorial(n2)*factorial(n1-n2));
}

function permutaciones(n1,n2)
{
return  factorial(n1)/factorial(n1-n2);
}

function modulo(n1,n2)
{
  return n1%n2;
}
 function vhex(dec)
 {
   v="";

   switch (dec) {
     case 15:  v="F"; break;
     case 14:  v="E"; break;
     case 13:  v="D"; break;
     case 12:  v="C"; break;
     case 11:  v="B"; break;
     case 10:  v="A"; break;
     default: v=""+dec;
   }
   return v;
 }

 function factorial (n) {
  return n==0 ? 1: n *factorial(n-1);
 }

 function updateValue() {
   if(pantalla.value>0 && pantalla.value%1==0){
   panbin.value=abinario(pantalla.value);
   panoct.value=aoctal(pantalla.value);
   panhex.value=ahexa(pantalla.value);
  }
      else
        if(pantalla.value==0){
        panbin.value=0;
        panoct.value=0;
        panhex.value=0;
      }
          else {
            panbin.value="Developing";
            panoct.value="Developing";
            panhex.value="Developing";
             }
 }
