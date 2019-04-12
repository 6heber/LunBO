var timer = null,
    index = 0,
    pics = byId("banner").getElementsByTagName("div"),
    dots = byId("dost").getElementsByTagName("span"),
    size = pics.length,
    prev = byId("pre"),
    next = byId("next"),
    menuItems = byId("menu-content").getElementsByTagName("div"),
    subMenu = byId("sub-menu"),
    subItems = subMenu.getElementsByClassName("inner-box");

function byId(id){
    return typeof(id)==="string"?document.getElementById(id):id;
}

// �����ʱ��,ֹͣ�Զ�����
function stopAutoPlay(){
    if(timer){
        clearInterval(timer);
    }
}

// ͼƬ�Զ��ֲ�
function startAutoPlay(){
    timer = setInterval(function(){
        index++;
        if(index >= size){
            index = 0;
        }
        changeImg();
    },3000)
}

function changeImg(){
    for(var i=0,len=dots.length;i<len;i++){
        dots[i].className = "";
        pics[i].style.display = "none";
    }
    dots[index].className = "active";
    pics[index].style.display = "block";
}

function slideImg(){
    var main = byId("box");
    var banner = byId("banner");
    var menuContent = byId("menu-content");
    main.onmouseover = function(){
        stopAutoPlay();
    }
    main.onmouseout = function(){
        startAutoPlay();
    }
    main.onmouseout();

    // ��������л�
    for(var i=0,len=dots.length;i<len;i++){
        dots[i].id = i;
        dots[i].onclick = function(){
            index = this.id;
            changeImg();
        }
    }

    // ��һ��
    next.onclick = function(){
        index++;
        if(index>=size) index=0;
        changeImg();
    }

    // ��һ��
    prev.onclick = function(){
        index--;
        if(index<0) index=size-1;
        changeImg();
    }

    // �˵�
    for(var m=0,mlen=menuItems.length;m<mlen;m++){
        menuItems[m].setAttribute("data-index",m);
        menuItems[m].onmouseover = function(){
            subMenu.className = "sub-menu";
            var idx = this.getAttribute("data-index");
            for(var j=0,jlen=subItems.length;j<jlen;j++){
                subItems[j].style.display = 'none';
                menuItems[j].style.background = "none";
            }
            subItems[idx].style.display = "block";
            menuItems[idx].style.background = "rgba(0,0,0,0.1)";
        }
    }

    subMenu.onmouseover = function(){
        subMenu.className = "sub-menu";
    }

    subMenu.onmouseout = function(){
        subMenu.className = "sub-menu hide";
    }

    menuContent.onmouseout = function(){
        subMenu.className = "sub-menu hide";
    }
}

slideImg();