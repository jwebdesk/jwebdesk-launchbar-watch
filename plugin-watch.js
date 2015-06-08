define([
    "jwebkit",    
    "jwebdesk",
], function(jwk, jwebdesk) {
    
    function instalar_plugin(launchbar) {
        var data = new jwk.Node({time: ""});
        
        launchbar.add_component("watch", {
            "data": data,
            "ui_type": "panel",
            "template.main": "<div>{{data}}</div>",
            "datapath": "time"
        }).done(function (tree) {
            
            tree.one("render", function (){
                launchbar.adjust_size("watch");
            })
        
        });

        var time = (new Date()).getTime();
        function show5() {
            if (!document.layers&&!document.all&&!document.getElementById) return;
            var Digital = new Date();
            Digital.setTime(time);
            time = time+1000;
            var hours = Digital.getHours();
            var minutes = Digital.getMinutes();
            var seconds = Digital.getSeconds();
            if (hours<10) hours="0"+hours;
            if (minutes<=9) minutes="0"+minutes;
            if (seconds<=9) seconds="0"+seconds;
            myclock=hours+":"+minutes+":"+seconds;        
            data.time = myclock;
            setTimeout(show5,1000)
        }
        show5();
        
    }
    
    jwebdesk.wait_app("jwebdesk~jwebdesk-launchbar@alpha-0.5").done(function (proxy) {        
        instalar_plugin(proxy.instance)
    });
    
});