// lispオブジェクト種別
var TAG_CONS = 0;
var TAG_SYMBOL = 1;
var TAG_NUM = 2;

var nil=[];

function Symbol(str) {
  this.tag = TAG_SYMBOL;
  this.name = str;
}

function Num(val) {
  this.tag = TAG_NUM;
  this.num = val;
}

var symbol_set = [];

function CreateSymbol(str) {
  var i;
  for (i=0; i<symbol_set.length; i++) {
    if (symbol_set[i] == str)
      return symbol_set[i];
  }
  symbol_set[i] = new Symbol(str);
  return symbol_set[i];
}

function Cons() {
  this.tag = TAG_CONS;
  this.car = nil;
  this.cdr = nil;
}

function CreateNum(n) {
  return new Num(n);
}

function CreateCons() {
  return new Cons();
}

function CAR(x) {
  if (x == nil)
    return nil;
  return x.car;
}

function CDR(x) {
  if (x == nil)
    return nil;
  return x.cdr;
}

function SetCAR(x, val) {
  x.car = val;
}

function SetCDR(x, val) {
  x.cdr = val;
}
/////////////////
function tokenize(str) {
  str=str.replace(/\(/g,"( ");
  str=str.replace(/\)^$/g," )");
  str=str.replace(/'(\w+)\b/g,"(quote ($1))");

  arr = str.split(' ');

  return arr;
}

function InputToLObject(arr){
  var rtn;
	var token = arr.shift();
      if(token == "("){
        return InputToList(arr);
      }
      else if(isFinite(token)){
        return CreateNum(Number(token));
      }
      else{
        return CreateSymbol(token);
      }
}

function InputToList(arr){
  var dotFlg =false;
  var cons = CreateCons();
  var cons1 = cons;
  while(arr[0] != ")"){
    if(arr[0] == "."){
      dotFlg=true;
      arr.shift();
    }
    else{
      if(dotFlg === true){
        SetCDR(cons1,InputToLObject(arr));
        dotFlg =false;
      }
      else{
	    if(CAR(cons) == nil){
          SetCAR(cons,InputToLObject(arr));
	    }
	    else{
	      // 新しくCons対を作成
		  var tmp = CreateCons();
		  SetCAR(tmp,InputToLObject(arr));
		
		  SetCDR(cons1,tmp);
		  cons1 = CDR(cons1);
	    }
      }
    }
  }
  arr.shift();
  return cons;
}
//////////////////
/* Output */
function LObjectToOutput(listobj){
    var out = "";
    var car =  CDR(listobj);
    var cdr  = CDR(listobj);
    if(car.tag == TAG_CONS){
	out += ListToOutput(cdr);
    }
    if (car.tag == TAG_SYMBOL){
	out += car.name;
    }
    if (car.tag == TAG_NUM){
	out += car.num;	
    }
    return out;
}
function ListToOutput(list){
    var out = "(";
    var car = CAR(list);
    out += LObjectToOutput();
    return out + ")";
}
//////////////////////

// グローバル環境を作成
//var arr =tokenize('((dummy . dummy) (nil . nli) (#t . #t) (#f . #f))');
//var global_env = InputToLObject(arr);

// 環境を表示
//console.log(global_env);

// テスト
//console.log(tokenize('(* 5 20)'));
//console.log(InputToLObject(["+"]));
//console.log(InputToLObject(["3"]));
//console.log(InputToLObject(["(",")"]));
//console.log(InputToList(["+",")"]));
//console.log(InputToList(["+","10","20",")"]));
//console.log(InputToLObject(["(","+","10","20",")"]));
//console.log(InputToLObject(["(","2",".","3",")"]));
