var YIKE=angular.module("YIKEApp",["ngRoute"]);


YIKE.config(["$routeProvider",function($routeProvider){
    /*today 今日一刻*/
    $routeProvider.when("/today",{
        controller:"TodayController",
        templateUrl:"views/today.html"
     //往期内容
    }).when("/older",{
        templateUrl:"views/older.html"
     //热门作者
    }).when("/author",{
        templateUrl:"views/author.html"
    //栏目预览
    }).when("/category",{
        templateUrl:"views/category.html"
    //我的爱好
    }).when("/favourite",{
        templateUrl:"views/favourite.html"
    //设置
    }).when("/setting",{
        templateUrl:"views/setting.html"
    }).otherwise({
          redirectTo:"/today"
    })



}])

/*
* 我们需要在$rootScope 上面去绑定这个事件。我就需要去运行这个服务.
* 我使用run 方法可以去运行这个服务.
* */
YIKE.run(["$rootScope",function($rootScope){

        /*
            我要为 navs 的元素添加 collapse
        *   headers  添加 collapse 类型
        * */
        $rootScope.collapsed=false;
        $rootScope.toggle=function(){
            //这个是点击事件.
            $rootScope.collapsed=!$rootScope.collapsed;
            /*执行动画.*/
            /*处理动画.*/
            var navs=document.querySelectorAll(".navs dd");
            /*我需要判断是 transform:translate(0%) 还是 translate(-100%)*/
            if($rootScope.collapsed){
                  for(var i=0;i<navs.length;i++){
                      navs[i].style.transform="translate(0)";
                      navs[i].style.transitionDuration=(i+1)*0.15+"s";
                      navs[i].style.transitionDelay="0.3s";
                  }
            }else{
                 for(var i=0;i<navs.length;i++){
                     /*
                     * 0,1,2,3,4,5
                     * */
                     navs[i].style.transform="translate(-100%)";
                     navs[i].style.transitionDuration=(navs.length-i)*0.01+"s";
                     navs[i].style.transitionDelay="0.3s";
                 }
            }
        }
}])


YIKE.controller("NavsController",["$scope",function($scope){
        /*现在数据都是使用的豆瓣的一刻*/
        $scope.navs=[
            {"text":"今日一刻","link":"#/today","icon":"icon-home"},
            {"text":"往期内容","link":"#/older","icon":"icon-file-empty"},
            {"text":"热门作者","link":"#/author","icon":"icon-pencil"},
            {"text":"栏目浏览","link":"#/category","icon":"icon-menu"},
            {"text":"我的喜欢","link":"#/favourite","icon":"icon-heart"},
            {"text":"设置","link":"#/setting","icon":"icon-cog"}
        ];
}]);
/*通过控制器去关联模型的数据.*/
YIKE.controller("TodayController",["$scope","$http","$filter",function($scope,$http,$filter){
        var angualrDate=$filter("date");
        //2017-03-29 这个地方要使用到过滤器.
        var currentDate=angualrDate(new Date(),"yyyy-MM-dd");
        $http({
             url:"api/today.php",
             method:"get",
             params:{
                  //2017-03-29
                  currentDate:currentDate
             }
        }).success(function(data){
            console.log(data);
            $scope.posts=data.posts;
            $scope.date=data.date;
        })

        //$http()
        //XMLHttpRequest 去请求
        //我现在请求可以发送出去，但是数据回不来. 跨域
        //google 插件.
        // 另外的一种解决跨域的方式.



}]);

