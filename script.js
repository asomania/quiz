var sorular = new Object();//soru havuzu için obje oluşturma
//soru havuzu ve indise göre şık eşleşitirme
sorular.soru = ['Pablo Escobar hangi sarayın önünde fotoğraf çekinmiştir ?', 'Sodyum elentinin atom numarası kaçtır ?'
    , 'Türkiyenin son başbakanı kimdir ?', 'Pi sayısının yaklaşık değeri kaçtır', 'Aşağıdaki klüplerden hangisi daha önce kurulmuştur ?',
    'Nobel edebiyat ödülü alan yazarımız kimdir'];
sorular.soruTemp = [];//soru havuzunda çakışma olmasın diye temp e aktarıyorum

sorular.a = ['Tac Mahal', '9', 'Binavi Yıvdırım', '3.14', 'Fenerbahce', 'Sabahattin Ali'];
sorular.aTemp = [];
sorular.b = ['Arjantin Sarayı', '13', 'Fuat Oktay', '4.12', 'Beşiktas', 'Orhan Pamuklu'];
sorular.bTemp = [];
sorular.c = ['Beyaz Saray', '11', 'Muharrem İnce', '3.74', 'Galatasaray', 'Halikarnas Balıkçısı'];
sorular.cTemp = [];
sorular.d = ['Topkapı Sarayı', '7', 'Abdullah Gül', '2.74', 'Adana Demirspor', 'Orhan Pamuk'];
sorular.dTemp = [];
sorular.cevap = ['c', 'c', 'a', 'a', 'b', 'd'];
sorular.cevapTemp = [];

//soru havuzu sayfa yenilendiğinde havuzu karıştırır

Array.prototype.karistir = function () {
    var i = this.length, j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
    return this;
}
//indis dizisini oluşturma
var dizi = new Array();
for (i = 0; (i < sorular.soru.length); i++) {
    dizi[i] = i;
}
// indis dizisini rasgele karıştırma 
dizi.karistir();
// 4,1,2,5,3,0
//karıştırılan diziyi eşit indislerle karıştırıp soru havuzu yapmak

for (l = 0; (l < sorular.soru.length); l++) {
    sorular.soruTemp[l] = sorular.soru[dizi[l]];
    sorular.aTemp[l] = sorular.a[dizi[l]];
    sorular.bTemp[l] = sorular.b[dizi[l]];
    sorular.cTemp[l] = sorular.c[dizi[l]];
    sorular.dTemp[l] = sorular.d[dizi[l]];
    sorular.cevapTemp[l] = sorular.cevap[dizi[l]];
}
var l = 0;
var dogru = 0;
//sayfa her yenilendiğinde soru havuzuna göre farklı sorular getirek havuz bitine kadar cevaplama
var isaretle = 0;
var width=100;

//süre barı
function mybar(){
    document.getElementById("mybar").style.width=width+"%";
    if(width>=0){
        document.getElementById("mybar").innerHTML=width+"%";
    }
    if(l!=sorular.soru.length+1){
        
        width--;
        if(width==0){
            document.getElementById('konteynir').innerHTML = '<h2>Süreniz bitmiştir</h2>';
            document.getElementById('cevapla').setAttribute('onclick', 'sonucGetir()');
            document.getElementById('cevapla').innerHTML = "Sonuç";
        }
    }//son soruya gelmişse ve bitmişse süre barını kaldırır
    else{
    document.getElementById("bar").remove();
    }
   
}
var sure=sorular.soru.length*10;

setInterval("mybar()",(100/sure)*100);
function cevapla() {

    var a=document.getElementById("a");
    var b=document.getElementById("b");
    var c=document.getElementById("c");
    var d=document.getElementById("d");

    document.getElementById("konteynir").innerHTML = '<form action="index.html" id="konteynir" name="konteynir"> <label>' + sorular.soruTemp[l] +
        '</label> <br></br> <input type="radio" name="sorux" id="a"  value="a" ><b>a)</b>' + sorular.aTemp[l] +
        '<input type="radio" name="sorux" id="b" value="b"><b>b)</b>' + sorular.bTemp[l] +
        '<input type="radio" name="sorux" id="c" value="c"><b>c)</b>' + sorular.cTemp[l] +
        '<input type="radio" name="sorux"  id="d" value="d"><b>d)</b>' + sorular.dTemp[l] +
        '</form>';

        
    //son seçilen şıkka göre eğer dizideki elemana göre şık dizisindeki değer eşitse doğru sayısı artar

    if (l != 0) {
        if(a.checked==true){
            isaretle="a";
        }else if(b.checked==true){
            isaretle="b";
        }else if(c.checked==true){
            isaretle="c";
        }else if(d.checked==true){
            isaretle="d";
        }
        if (isaretle == sorular.cevapTemp[l-1]) {
            dogru++;
            //eski deger bellekte kalmasın
            isaretle=null;
        }
    }


    //yarına kaçının doğru olduğu ve und hatası çözümü
    if (l == sorular.soru.length) {
        document.getElementById('konteynir').innerHTML = '<h2>Sorular bitmiştir</h2>';
        document.getElementById('cevapla').setAttribute('onclick', 'sonucGetir()');
        document.getElementById('cevapla').innerHTML = "Sonuç";
    }
    l++;
}

function sonucGetir() {
    document.getElementById('konteynir').innerHTML = "Vay be "+dogru+" doğru yapmışın";
    document.getElementById('cevapla').remove(); 
}