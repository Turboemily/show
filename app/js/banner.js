/**
 * Created by mac on 16/8/5.
 */
///index banner
(function () {
    function main() {
        $.ajax({
            url: " http://datainfo.duapp.com/shopdata/getBanner.php",
            data: {},
            dataType: "jsonp",
            success: function (data) {
                getImg(data);
                initBanner();
            }
        })

        index();
        sort();
    }

    //---------首页banner-----////
    function initBanner() {
        var mySwiper = new Swiper('.swiper-container', {
            loop: true,
            pagination: '.swiper-pagination',
            autoplay: 3000,
            speed: 300
        });
    }

    function getImg(data) {
        var swiperwrapper = $('.swiper-wrapper');
        $.each(data, function (i) {
            var img = JSON.parse(data[i].goodsBenUrl);
            // console.log(img[0])
            var swiperSlide = $("<div class='swiper-slide' style='background: url(" + img[0] + ")'></div>");
            swiperwrapper.append(swiperSlide);
        })
    }


    ////////index首页/////////
    function index() {
        $.ajax({
            url: " http://datainfo.duapp.com/shopdata/getGoods.php",
            data: {},
            dataType: "jsonp",
            success: function (data) {
                console.log(data);
                getGoodsImg(data);
            }
        })
        function getGoodsImg(data) {
            var index_content_goods = $('.index_content_goods');
            $.each(data, function (i) {
                var img = data[i].goodsListImg;
                var price = JSON.parse(data[i].price);
                var discount = JSON.parse(data[i].discount);
                var $index_content_goods_div = $("<div id='"+i+"' class='index_content_goods_div'></div>");
                var $left = $("<div class='goods_left' style='width:38%;height:100%;float:left;'><img src='" + img + "'  style='width: 100%;height:100%;'></div>");
                var $right=$("<div class='goods_right' style='width:60%;height:100%;float: right;position: relative;'><p>"
                    + (data[i].goodsName) + "</p><span>&yen;" + price + "</span><span class='line_through' style='padding-left:2.5rem;'>"
                    + oldPrice(price, discount) + "</span><br><span>" + discount + "折</span><img class='shopping_add'  src='img/shoppingcar_10.png'></div>");
                $index_content_goods_div.append($right);
                $index_content_goods_div.append($left);
                var $add=$("<p style='position: absolute;top: 10rem;'>加入购物车</p>");
                index_content_goods.append($index_content_goods_div);
                $right.append($add);
                $add.bind('click',function () {
                    console.log(data[i].goodsID);//得到商品ID
                    if(typeof(Storage)!=="undefined")
                    {
                        localStorage.goodsID=data[i].goodsID;
                    }
                    console.log(localStorage.userID);
                    updataCar({
                        userID:localStorage.userID,
                        goodsID:data[i].goodsID,
                        number:1,
                        callback:function(data){
                        }
                    });
                })

            });
        }
    }

    /*购物车更新函数，参数为{userID:"",goodsID:"",number:"",callback:function}*/
    function updataCar(opt) {
        $.get("http://datainfo.duapp.com/shopdata/updatecar.php", {
            userID: opt.userID,
            goodsID: opt.goodsID,
            number: opt.number
        }, function (data) {

            var thisData = data;
            // ajax_getCar({
            //     userID: opt.userID,
            //     callback: function (data) {
            //         window.localStorage["car"] = JSON.stringify(data);
            //         if (opt.callback && typeof(opt.callback) == "function") {
            //             opt.callback(thisData);
            //         }
            //     }
            // });

        })
    }

    function oldPrice(price, discount) {
         var oldprice;
         if (discount == 0) {
             oldprice = price;
        } else {
            oldprice = Math.floor(price / (discount / 10));
        }
        return oldprice;
    }



//-------sort商品分类页面--------//
    function sort() {
        $.get("http://datainfo.duapp.com/shopdata/getclass.php", function (data) {
            data = JSON.parse(data);
            var sort_container = $(".sort_container");
            //console.log(data);
            $.each(data, function (i) {
                //console.log(data[i].className);
                var sort_content3 = (" <div class='sort_content3'><a href='goodslist.html?classID=" + encodeURI(data[i].classID) + "&className="
                + encodeURI(data[i].className) + "'>" + data[i].className + "</a></div>");
                sort_container.append(sort_content3);

            });
            var sortcontent3 = $(".sort_content3");

            sortcontent3.click(function () {
                sortcontent3.toggleClass("sort_content4");
            })
        });
        var img1 = $("#sort_img1");
        var img2 = $("#sort_img2");
        var index_content_goods = $(".index_content_goods");
        img1.bind('click', function () {
            img1.css("display", "none");
            img2.css("display", "block");
            $(".sort_content3").css("display", "block");
            index_content_goods.css('display', 'none');
        });
        img2.bind('click', function () {
            img1.css("display", "block");
            img2.css("display", "none");
            $(".sort_content3").css("display", "none");
            index_content_goods.css('display', 'block');
        });
    }

    main();
})();
