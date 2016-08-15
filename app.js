/**
* Created by Xue on 16-3-30.
*/
window.onload = function(){
     imgLocation("container","box");
     var imgData={"data":[{"src":"照片 (1).jpg"},{"src":"照片 (2).jpg"},{"src":"照片 (3).jpg"},{"src":"照片 (4).jpg"},{"src":"照片 (5).jpg"},{"src":"照片 (6).jpg"},
        {"src":"照片 (7).jpg"},{"src":"照片 (8).jpg"},{"src":"照片 (9).jpg"},{"src":"照片 (10).jpg"},{"src":"照片 (11).jpg"},{"src":"照片 (12).jpg"},{"src":"照片 (13).jpg"}]};
     window.onscroll=function(){
         if(checkFlag("container","box")){
             var cparent=document.getElementById("container");
             for(var i=0;i<imgData.data.length;i++){
                 var ccontent=document.createElement("div");
                 ccontent.className="box";
                 cparent.appendChild(ccontent);
                 var boximg=document.createElement("div");
                 boximg.className="box_img";
                 ccontent.appendChild(boximg);
                 var img = document.createElement("img");
                 img.src=imgData.data[i].src;
                 boximg.appendChild(img);
             }
             imgLocation("container","box");
         }
     }
}

function checkFlag(parent,content){
    var cparent=document.getElementById(parent);
    var ccontent=getChildElement(cparent,content);
    var lastContentHeight=ccontent[ccontent.length-1].offsetTop;
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
    if(lastContentHeight < scrollTop+pageHeight){
        return true;
    }
}

function imgLocation(parent,content){
    //将parent下所有文件全部内容取出
    var cparent=document.getElementById(parent);
    var ccontent=getChildElement(cparent,content);
    var imgWidth=ccontent[0].offsetWidth;
    var cols=Math.floor(document.documentElement.clientWidth / imgWidth);
    cparent.style.cssText="width:" + imgWidth*cols +"px;margin:0px auto";
    var BoxHeightArr=[];
    for(var i=0;i<ccontent.length;i++){
        if(i<cols){
            BoxHeightArr[i]=ccontent[i].offsetHeight;
            console.log(BoxHeightArr)
        }else{
            var minheight=Math.min.apply(null,BoxHeightArr);
            console.log(minheight)
            var minIndex=getminheightLocation( BoxHeightArr,minheight);
            console.log(minIndex)
            ccontent[i].style.position="absolute";
            ccontent[i].style.top=minheight+"px";
            ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";
            BoxHeightArr[minIndex]=BoxHeightArr[minIndex]+ ccontent[i].offsetHeight;
        }
    }
}

function getminheightLocation(BoxHeightArr,minHeight){
    for(var i in BoxHeightArr){
        if(BoxHeightArr[i]== minHeight){
            return i;
        }
    }
}

function getChildElement(parent,content){
    var  contentArr=[];
    var allcontent=parent.getElementsByTagName("*");
    for(var i=0;i<allcontent.length;i++){
        if(allcontent[i].className==content){
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}