


var utils = (function (){
    function toArray(likeAry){

        try{
            return Array.prototype.slice.call(likeAry,0);
        }catch(e){
            var ary = [];
            for(var i = 0 ; i < likeAry.length; i++){
                ary.push(likeAry[i]);
            }
            return ary;
        }
    }
    function jsonParse(jsonStr){

            return "JSON" in window ? JSON.parse(jsonStr) : eval('('+jsonStr+')');
        }
    function getRandom(n,m){

            if(isNaN(n)||isNaN(m)){
                return Math.random();
            }
            return Math.round(Math.random()*(m-n)+n);
        }
    function prev(ele){

            var prev = ele.previousSibling; // comment text  element
            while ( prev && prev.nodeType != 1){
                prev = prev.previousSibling;
            }
            return prev;
        }
    function next(ele){
            if("nextElementSibling" in ele){
                return ele.nextElementSibling;
            }
            var next = ele.nextSibling;
            while (next && next.nodeType != 1){
                next = next.nextSibling;
            }
            return next;
        }
    function children(ele,tagName){
            var childs = ele.childNodes;
            var ary = [];
            for(var i = 0; i < childs.length; i++){
                if(childs[i].nodeType == 1){
                    ary.push(childs[i]);
                }
            }

            if(typeof tagName == "string"){
                for( i = 0; i < ary.length; i++ ){
                    // 'SPAN'  'DIV'
                    if(ary[i].nodeName !== tagName.toUpperCase()){
                        ary.splice(i,1);
                        i--;
                    }
                }
            }
            return ary;
        }
    function win(attr,val){
        if(typeof val !== 'undefined'){
            document.documentElement[attr] = val;
            document.body[attr] = val;
            return;
        }
        return document.documentElement[attr] || document.body[attr];
    }
    function offset(ele){
        var l = 0,t = 0;
        l += ele.offsetLeft;
        t += ele.offsetTop;
        var par = ele.offsetParent;
        while (par){
            if(window.navigator.userAgent.indexOf('MSIE 8') === -1){
                l += par.clientLeft;
                t += par.clientTop;
            }
            l += par.offsetLeft;
            t += par.offsetTop;
            par = par.offsetParent;
        }
        return {left : l, top : t};
    }
    function getCss(ele,attr){
        var val = null;
        if(window.getComputedStyle){
            val = window.getComputedStyle(ele)[attr];
        }else{
            if(attr == 'opacity'){
                val = ele.currentStyle.filter;
                var reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1]/100 : 1;
            }else{
                val = ele.currentStyle[attr];
            }
        }
        // -5.5px
        var reg = /^-?\d+(\.\d+)?(px|pt|em|rem|deg)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    }
    function setCss(ele,attr,val){
        if(attr == 'opacity'){
            ele.style.opacity = val;
            ele.style.filter = 'alpha(opacity='+ val*100 + ')';
            return;
        }
        if(attr == 'float'){
            ele.style.cssFloat = val;
            ele.style.styleFloat = val;
            return;
        }
        var reg = /^(width|height|left|top|right|bottom|(margin|padding)(Left|Top|Right|Bottom)?)$/;
        if(reg.test(attr)){
            if(!isNaN(val)){
                val += 'px';
            }
        }
        ele.style[attr] = val;
    }
    function getElesByClass(className,context){
        context = context || document;
        if(context.getElementsByClassName){
            return context.getElementsByClassName(className);
        }
        // for IE8-
        var classNameAry = className.replace(/(^ +| +$)/g,'').split(/ +/);
        // [c1,c2]
        var tags = context.getElementsByTagName('*');
        var ary = [];
        for(var i = 0; i < tags.length; i++){
            var curTag = tags[i];
            var tagIsOk = true;
            for(var j = 0; j < classNameAry.length; j++){
                var reg = new RegExp("(^| +)" + classNameAry[j] + "( +|$)");
                if(!reg.test(curTag.className)){
                    tagIsOk = false;
                    break;
                }
            }
            if(tagIsOk){
                ary.push(curTag);
            }
        }
        return ary;

    }
    function hasClass(ele,className){
        var reg = new RegExp('(^| +)'+className+'( +|$)');
        return reg.test(ele.className);
    }
    function addClass(ele,className){
        var classNameAry = className.replace(/(^ +| +$)/g,'').split(/ +/);
        for(var i = 0; i < classNameAry.length; i++){
            var curClass = classNameAry[i];
            if(!hasClass(ele,curClass)){
                ele.className += ' ' + curClass;
            }
        }
    }
    function removeClass(ele,className){
        var classNameAry = className.replace(/(^ +| +$)/g,'').split(/ +/);
        for(var i = 0; i < classNameAry.length; i++){
            var curClass = classNameAry[i];
            var reg = new RegExp("(^| +)" + curClass + "( +|$)","g");
            ele.className = ele.className.replace(reg,' ');
        }
    }
    function toggleClass(ele,className){
        if(hasClass(ele,className)){
            removeClass(ele,className)
        }else{
            addClass(ele,className)
        }
    }
    function prevAll(ele){
        var ary = [];
        var pre = prev(ele);
        while (pre){
            ary.unshift(pre);
            pre = prev(pre);
        }
        return ary;
    }
    function nextAll(ele){
        var ary = [];
        var nex = next(ele);
        while (nex){
            ary.push(nex);
            nex = next(nex);
        }
        return ary;
    }
    function siblings(ele){
        return prevAll(ele).concat(nextAll(ele));
    }
    function sibling(ele){
        var ary = [];
        var pre = prev(ele);
        var nex = next(ele);
        pre && ary.push(pre);
        nex && ary.push(nex);
        return ary;
    }
    function index(ele){
        return prevAll(ele).length;
    }
    function fadeIn(ele){ // 淡入
        window.clearInterval(ele.timer); // 历史遗留问题
        ele.timer = window.setInterval(function (){
            var val = utils.getCss(ele,'opacity');
            if(val >= 1){
                window.clearInterval(ele.timer);
                return;
            }
            val += 0.01; //'0.010.01'
            utils.setCss(ele,'opacity',val);
        },20);

    }








    return {
        fadeIn:fadeIn, // opacity淡入
        hasClass : hasClass, // 判断一个元素是否存在一个类
        addClass : addClass,//给div1添加一个c8

        removeClass : removeClass,//删除一个元素的一个类名
        toggleClass : toggleClass,// 如果存在就删除，如果不存在就添加
        prevAll : prevAll,//获取所有上面（哥哥）个节点
        nextAll : nextAll,//获取所有弟弟节点
        sibling : sibling,//相邻的兄弟节点
        siblings : siblings,//获取所有的兄弟节点
        index : index,//索引index
        setCss : setCss,/// 获取已经生效的样式:并重新给予期赋值(div1,'opacity',0.5);)
        getCss : getCss,// 获取已经生效的样式 （如img ,"opacity"）
        offset : offset,//获取当前元素
        win : win,///窗口方法，一个值为获取，俩个值为（当前值，替换值）
        toArray : toArray,////字符串 转化成数组
        jsonParse : jsonParse,//// 获取数据
        getRandom : getRandom, //随机数
        prev : prev,///获取上一个节点
        next : next,///获取弟弟节点
        children : children,//获取下面的所有元素，如（tad,div）俩个参数，是指定查找XX下面的XX
        getElesByClass : getElesByClass//按class名字获取元素
    };

})();








