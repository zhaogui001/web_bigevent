$(function() {
    // 点击去注册账号的链接，去注册账号
    $('#link_register').on('click', function() {
        // 登录盒子隐藏
        $('.login-box').hide()
            // 注册盒子显示
        $('.register-box').show()
    })

    // 点击去登录链接，去登录
    $('#link_login').on('click', function() {
        // 登录盒子显示
        $('.login-box').show()
            // 注册盒子隐藏
        $('.register-box').hide()
    })



    // 从layui中获取检验对象form
    var form = layui.form
    var layer = layui.layer
    form.verify({
        // 自定义了一个叫做pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码6到12位，且不能出现空格！'],
        rpwd: function(value) {
            var pwd = $('.register-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })



    // 发起注册请求
    $('#form_register').on('submit', function(e) {
            // 阻止表单的默认提交事件
            e.preventDefault()
            $.post('/api/reguser', { username: $('#form_register [name=username]').val(), password: $('#form_register [name=password]').val() }, function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                layer.msg("注册成功，请登录！")

                // 模拟人的点击行为
                $('#link_login').click()
            })

        })
        // 发起登录请求
    $("#form_signin").on('submit', function(e) {
        // 阻止表单默认提交行为
        e.preventDefault()
            // 发起Ajax请求
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: {
                username: $('#form_signin [name=username]').val(),
                password: $('#form_signin [name=password]').val()
            },
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg("登陆失败！")
                }
                layer.msg("登录成功！")

                // 将获取的token值保存在localstorage
                localStorage.setItem('token', res.token)


                // 跳转到后台主页
                localtion.href = '/index.html'
            }
        })
    })
})