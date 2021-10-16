// 每次调用$.get()或$.post()或$.ajax()的时候，会先调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给Ajax的配置对象
// options是每次ajax请求的配置对象
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    // 在真正发起ajax请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url);
})