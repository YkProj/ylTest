 mui.init({
            gestureConfig:{
                doubletap:true
            },
            subpages:[{
                url:'',
                id:'',
                styles:{
                    top: '0px',
                    bottom: '0px'
                }
            }]
        });
    
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

//底部选项卡切换跳转
(function jumpPage(){
        //跳转页面
        var subpages = ['','auctionHall.html', 'myIndex.html'];
        var subpage_style = {
            top: '0px',
            bottom: '51px'
        };
        var Index=0;
        var actTab=subpages[],
            tittle=document.querySelector('.mui-title');
            
        var aniShow = {};//动画显示
        
        //首次启动切滑效果
             //当前激活选项
            var activeTab = subpages[0];         
             //选项卡点击事件
            mui('.mui-bar-tab').on('tap', 'a', function(e) {
                //修改对应分页
                var targetTab = this.getAttribute('href');
                $('#MainViwe').attr('src',targetTab);
                
//              //修改标题              
//              tittle.innerHTML=this.querySelector('.mui-tab-label').innerHTML;
            });
             //自定义事件，模拟点击“首页选项卡”
            document.addEventListener('gohome', function() {
                var defaultTab = document.getElementById("defaultTab");
                //模拟首页点击
                mui.trigger(defaultTab, 'tap');
                //切换选项卡高亮
                var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
                if (defaultTab !== current) {
                    current.classList.remove('mui-active');
                    defaultTab.classList.add('mui-active');
                }

        });
    })()