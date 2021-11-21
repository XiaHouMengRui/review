<!--
 * @Author: your name
 * @Date: 2020-11-15 00:27:21
 * @LastEditTime: 2021-11-21 10:59:16
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \手写函数\http相关.md
-->
## http 和 https
----
问题1:为什么会有http1.0,http1.1到http2.0的演变

* http1.0每次请求都需要创建TCP链接,为了解决这个缺点,http1.1则默认支持**长连接**.
* http1.1如果同时有多个请求排队,头部的请求阻塞,则后面请求只能等待(头部阻塞);为了解决这个问题,http2.0支持**多路复用**.
* 同时http2.0支持请求头压缩,

问题2: http和https的主要区别

几个名词: SSL(Secure Sockets Layer 安全套接字协议),TCP(Transmission Control Protocol 传输控制协议),TLS(Transport Layer Security 安全传输层协议)

http的特点:

80端口

* 无状态:协议对客户端没有状态存储,对事物处理没有"记忆"能力,比如访问一个网站需要反复进行登录操作;
* 短链接:HTTP/1.1之前,由于无状态特点,每次请求需要通过TCP三次握手四次挥手,和服务器重新建立连接.比如某个客户机在短时间多次请求同一个资源,服务器并不能区别是否已经响应过用户的请求,所以每次需要重新响应请求,需要耗费不必要的时间和流量;
* 通信使用明文、请求和响应不会对通信方进行确认、无法保护数据的完整性

https的特点:

443端口

https = http + TLS/SSL