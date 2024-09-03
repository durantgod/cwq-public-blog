<template><div><h3 id="_1、cwq-vedio是一个流媒体服务的管理端" tabindex="-1"><a class="header-anchor" href="#_1、cwq-vedio是一个流媒体服务的管理端" aria-hidden="true">#</a> 1、CWQ-VEDIO是一个流媒体服务的管理端</h3>
<p>github地址：<a href="https://github.com/chenweiquan-red/cwq-vedio.git" target="_blank" rel="noopener noreferrer">https://github.com/chenweiquan-red/cwq-vedio.git<ExternalLinkIcon/></a></p>
<p>fork from : <a href="https://gitee.com/pan648540858/wvp-GB28181-pro.git" target="_blank" rel="noopener noreferrer">https://gitee.com/pan648540858/wvp-GB28181-pro.git<ExternalLinkIcon/></a></p>
<p>完整的application.yaml：</p>
<div class="language-editorconfig line-numbers-mode" data-ext="editorconfig"><pre v-pre class="language-editorconfig"><code>spring:
  <span class="token comment"># 设置接口超时时间</span>
  mvc:
    async:
      request-timeout: 20000
  <span class="token comment"># [可选]上传文件大小限制</span>
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 100MB
  <span class="token comment"># REDIS数据库配置</span>
  redis:
    <span class="token comment"># [必须修改] Redis服务器IP, REDIS安装在本机的,使用192.168.10.250</span>
    host: 192.168.10.252
    <span class="token comment"># [必须修改] 端口号</span>
    port: 6379
    <span class="token comment"># [可选] 数据库 DB</span>
    database: 4
    <span class="token comment"># [可选] 访问密码,若你的redis服务器没有设置密码，就不需要用密码去连接</span>
    password: hhd@redis23.com
    <span class="token comment"># [可选] 超时时间</span>
    timeout: 10000
    <span class="token comment"># [可选] 一个pool最多可分配多少个jedis实例</span>
    poolMaxTotal: 1000
    <span class="token comment"># [可选] 一个pool最多有多少个状态为idle(空闲)的jedis实例</span>
    poolMaxIdle: 500
    <span class="token comment"># [可选] 最大的等待时间(秒)</span>
    poolMaxWait: 5
  <span class="token comment"># [必选] jdbc数据库配置</span>
  datasource:
    type: com.zaxxer.hikari.HikariDataSource
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://192.168.10.252:3306/wvp?useUnicode<span class="token value attr-value"><span class="token punctuation">=</span>true&amp;characterEncoding=UTF8&amp;rewriteBatchedStatements=true&amp;serverTimezone=PRC&amp;useSSL=false&amp;allowMultiQueries=true</span>
    username: root
    password: hhd@2023
    hikari:
      connection-timeout: 20000             <span class="token comment"># 是客户端等待连接池连接的最大毫秒数</span>
      initialSize: 10                       <span class="token comment"># 连接池初始化连接数</span>
      maximum-pool-size: 200                <span class="token comment"># 连接池最大连接数</span>
      minimum-idle: 5                       <span class="token comment"># 连接池最小空闲连接数</span>
      idle-timeout: 300000                  <span class="token comment"># 允许连接在连接池中空闲的最长时间（以毫秒为单位）</span>
      max-lifetime: 1200000                 <span class="token comment"># 是池中连接关闭后的最长生命周期（以毫秒为单位)</span>


<span class="token comment"># 修改分页插件为 postgresql， 数据库类型为mysql不需要</span>
<span class="token comment">#pagehelper:</span>
<span class="token comment">#    helper-dialect: postgresql</span>

<span class="token comment"># [可选] WVP监听的HTTP端口, 网页和接口调用都是这个端口</span>
server:
  port: 18080
  <span class="token comment"># [可选] HTTPS配置， 默认不开启</span>
  ssl:
    <span class="token comment"># [可选] 是否开启HTTPS访问</span>
    enabled: false
    <span class="token comment"># [可选] 证书文件路径，放置在resource/目录下即可，修改xxx为文件名</span>
    key-store: classpath:xxx.jks
    <span class="token comment"># [可选] 证书密码</span>
    key-store-password: password
    <span class="token comment"># [可选] 证书类型， 默认为jks，根据实际修改</span>
    key-store-type: JKS
    <span class="token comment"># 配置证书可以使用如下两项，如上面二选一即可</span>
    <span class="token comment"># PEM 编码证书</span>
    certificate: xx.pem
    <span class="token comment">#   私钥文件</span>
    certificate-private-key: xx.key

<span class="token comment"># 作为28181服务器的配置</span>
sip:
  <span class="token comment"># [必须修改] 本机的IP，对应你的网卡，监听什么ip就是使用什么网卡，</span>
  <span class="token comment"># 如果要监听多张网卡，可以使用逗号分隔多个IP， 例如： 192.168.1.4,10.0.0.4</span>
  <span class="token comment"># 如果不明白，就使用0.0.0.0，大部分情况都是可以的</span>
  <span class="token comment"># 请不要使用192.168.10.43，任何包括localhost在内的域名都是不可以的。</span>
  ip: 192.168.10.250
  <span class="token comment"># [可选] 没有任何业务需求，仅仅是在前端展示的时候用</span>
  show-ip: 0.0.0.0
  <span class="token comment"># [可选] 28181服务监听的端口</span>
  port: 5060
  <span class="token comment"># 根据国标6.1.2中规定，domain宜采用ID统一编码的前十位编码。国标附录D中定义前8位为中心编码（由省级、市级、区级、基层编号组成，参照GB/T 2260-2007）</span>
  <span class="token comment"># 后两位为行业编码，定义参照附录D.3</span>
  <span class="token comment"># 3701020049标识山东济南历下区 信息行业接入</span>
  <span class="token comment"># [可选]</span>
  domain: 4401020049
  <span class="token comment"># [可选]</span>
  id: 44010200492000000001
  <span class="token comment"># [可选] 默认设备认证密码，后续扩展使用设备单独密码, 移除密码将不进行校验</span>
  password: admin123
  <span class="token comment"># [可选] 国标级联注册失败，再次发起注册的时间间隔。 默认60秒</span>
  register-time-interval: 60
  <span class="token comment"># [可选] 云台控制速度</span>
  ptz-speed: 50
  <span class="token comment"># TODO [可选] 收到心跳后自动上线， 重启服务后会将所有设备置为离线，默认false，等待注册后上线。设置为true则收到心跳设置为上线。</span>
  <span class="token comment"># keepalliveToOnline: false</span>
  <span class="token comment"># 是否存储alarm信息</span>
  alarm: false

<span class="token comment"># 做为JT1078服务器的配置</span>
jt1078:
  <span class="token comment">#[必须修改] 是否开启1078的服务</span>
  enable: true
  <span class="token comment">#[必修修改] 1708设备接入的端口</span>
  port: 21078
  <span class="token comment">#[可选] 设备鉴权的密码</span>
  password: admin123

<span class="token comment">#zlm 默认服务器配置</span>
media:
  <span class="token comment"># [必须修改] zlm服务器唯一id，用于触发hook时区别是哪台服务器,general.mediaServerId</span>
  id: 035c73f7bb6b
  <span class="token comment"># [必须修改] zlm服务器的内网IP</span>
  ip: 192.168.10.250
  <span class="token comment"># [可选] 返回流地址时的ip，置空使用 media.ip</span>
  stream-ip:
  <span class="token comment"># [可选] wvp在国标信令中使用的ip，此ip为摄像机可以访问到的ip， 置空使用 media.ip</span>
  sdp-ip: 192.168.10.250
  <span class="token comment"># [可选] zlm服务器的hook所使用的IP, 默认使用sip.ip</span>
  hook-ip: 192.168.10.250
  <span class="token comment"># [必须修改] zlm服务器的http.port</span>
  http-port: 8001
  <span class="token comment"># [可选] zlm服务器的http.sslport, 置空使用zlm配置文件配置</span>
  http-ssl-port:
  <span class="token comment"># [可选] zlm服务器的rtmp.port, 置空使用zlm配置文件配置</span>
  rtmp-port:
  <span class="token comment"># [可选] zlm服务器的rtmp.sslport, 置空使用zlm配置文件配置</span>
  rtmp-ssl-port:
  <span class="token comment"># [可选] zlm服务器的 rtp_proxy.port, 置空使用zlm配置文件配置</span>
  rtp-proxy-port:
  <span class="token comment"># [可选] zlm服务器的 rtsp.port, 置空使用zlm配置文件配置</span>
  rtsp-port:
  <span class="token comment"># [可选] zlm服务器的 rtsp.sslport, 置空使用zlm配置文件配置</span>
  rtsp-ssl-port:
  <span class="token comment"># [可选] 是否自动配置ZLM, 如果希望手动配置ZLM, 可以设为false, 不建议新接触的用户修改</span>
  auto-config: false
  <span class="token comment"># [可选] zlm服务器的hook.admin_params=secret</span>
  secret: l5DPpqy3YbPE5oaJCL2AxOBOuAVwEvlG
  <span class="token comment"># 启用多端口模式, 多端口模式使用端口区分每路流，兼容性更好。 单端口使用流的ssrc区分， 点播超时建议使用多端口测试</span>
  rtp:
    <span class="token comment"># [可选] 是否启用多端口模式, 开启后会在portRange范围内选择端口用于媒体流传输</span>
    enable: true
    <span class="token comment"># [可选] 在此范围内选择端口用于媒体流传输, 必须提前在zlm上配置该属性，不然自动配置此属性可能不成功</span>
    port-range: 50000,50050 <span class="token comment"># 端口范围</span>
    <span class="token comment"># [可选] 国标级联在此范围内选择端口发送媒体流，请不要与收流端口范围重合</span>
    send-port-range: 50502,50506 <span class="token comment"># 端口范围</span>
  <span class="token comment"># 录像辅助服务， 部署此服务可以实现zlm录像的管理与下载， 0 表示不使用</span>
  record-assist-port: 18081

<span class="token comment"># [可选] 日志配置, 一般不需要改</span>
logging:
  config: classpath:logback-spring-local.xml

<span class="token comment"># [根据业务需求配置]</span>
user-settings:
  <span class="token comment"># [可选] 服务ID，不写则为000000</span>
  server-id: 000000
  <span class="token comment"># [可选] 自动点播， 使用固定流地址进行播放时，如果未点播则自动进行点播, 需要rtp.enable=true</span>
  auto-apply-play: true
  <span class="token comment"># [可选] 部分设备需要扩展SDP，需要打开此设置</span>
  senior-sdp: false
  <span class="token comment"># 保存移动位置历史轨迹：true:保留历史数据，false:仅保留最后的位置(默认)</span>
  save-position-history: false
  <span class="token comment"># 点播/录像回放 等待超时时间,单位：毫秒</span>
  play-timeout: 24000
  <span class="token comment"># 上级点播等待超时时间,单位：毫秒</span>
  platform-play-timeout: 120000
  <span class="token comment"># 是否开启接口鉴权</span>
  interface-authentication: false
  <span class="token comment"># 接口鉴权例外的接口, 即不进行接口鉴权的接口,尽量详细书写，尽量不用/**，至少两级目录</span>
  interface-authentication-excludes:
    - /api/v1/**
  <span class="token comment"># 推流直播是否录制</span>
  record-push-live: false
  <span class="token comment"># 等待音视频编码信息再返回， true： 可以根据编码选择合适的播放器，false： 可以更快点播</span>
  wait-track: false
  <span class="token comment"># 国标是否录制</span>
  record-sip: false
  <span class="token comment"># 是否将日志存储进数据库</span>
  logInDatabase: false
  <span class="token comment"># 使用推流状态作为推流通道状态</span>
  use-pushing-as-status: true
  <span class="token comment"># 使用来源请求ip作为streamIp,当且仅当你只有zlm节点它与wvp在一起的情况下开启</span>
  use-source-ip-as-stream-ip: false
  <span class="token comment"># 国标点播 按需拉流, true：有人观看拉流，无人观看释放， false：拉起后不自动释放</span>
  stream-on-demand: false
  <span class="token comment"># 推流鉴权， 默认开启</span>
  push-authority: false
  <span class="token comment"># 设备上线时是否自动同步通道</span>
  sync-channel-on-device-online: false
  <span class="token comment"># 是否使用设备来源Ip作为回复IP， 不设置则为 false</span>
  sip-use-source-ip-as-remote-address: false
  <span class="token comment"># 是否开启sip日志</span>
  sip-log: true
  <span class="token comment"># 是否开启sql日志</span>
  sql-log: false
  <span class="token comment"># 消息通道功能-缺少国标ID是否给所有上级发送消息</span>
  send-to-platforms-when-id-lost: true
  <span class="token comment"># 保持通道状态，不接受notify通道状态变化， 兼容海康平台发送错误消息</span>
  refuse-channel-status-channel-form-notify: false
  <span class="token comment"># 设置notify缓存队列最大长度，超过此长度的数据将返回486 BUSY_HERE，消息丢弃, 默认10000</span>
  max-notify-count-queue: 10000
  <span class="token comment"># 设备/通道状态变化时发送消息</span>
  device-status-notify: false
  <span class="token comment"># 上级平台点播时不使用上级平台指定的ssrc，使用自定义的ssrc，参考国标文档-点播外域设备媒体流SSRC处理方式</span>
  use-custom-ssrc-for-parent-invite: true
  <span class="token comment"># 国标级联离线后多久重试一次注册</span>
  register-again-after-time: 60
  <span class="token comment"># 国标续订方式，true为续订，每次注册在同一个会话里，false为重新注册，每次使用新的会话</span>
  register-keep-int-dialog: false
  <span class="token comment"># 跨域配置，配置你访问前端页面的地址即可， 可以配置多个</span>
  allowed-origins:
    - http://localhost:8008
    - http://127.0.0.1:8001
    - http://192.168.10.43:8080
    - http://192.168.10.250:8080
    - http://192.168.10.250:8008
    - http://192.168.10.43:8008
    - http://192.168.10.250:8001
    - http://192.168.10.250:18080
    - http://192.168.10.43:18080

<span class="token comment"># 关闭在线文档（生产环境建议关闭）</span>
springdoc:
  api-docs:
    enabled: true
  swagger-ui:
    enabled: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意的信息点：</p>
<div class="language-editorconfig line-numbers-mode" data-ext="editorconfig"><pre v-pre class="language-editorconfig"><code>1、这个配置相当于zlm流媒体服务器的账号密码，是要和流媒体服务器配置的信息一致
而且流媒体服务器的配置信息中还有IP白名单，也需要加上当前IP
media:
    id: 035c73f7bb6b
    secret: l5DPpqy3YbPE5oaJCL2AxOBOuAVwEvlG


2、SIP是填服务端地址，注意区分服务端和流媒体服务器端的区别，如果两者不在同一台服务器中就要区分好

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、cwq-vedio-web是流媒体服务管理端的前端界面" tabindex="-1"><a class="header-anchor" href="#_2、cwq-vedio-web是流媒体服务管理端的前端界面" aria-hidden="true">#</a> 2、CWQ-VEDIO-WEB是流媒体服务管理端的前端界面</h3>
<p>1、注意点是配置文件：\web_src\config下面有<br>
dev.env.js  dev 本地运行时使用的配置<br>
index.js    本地运行时使用，换为服务端：18080端口<br>
prod.env.js BASE_API: '&quot;/28181api&quot;' 配置的是代理地址，走nginx时的配置</p>
<p>index.js 配置如下：</p>
<div class="language-editorconfig line-numbers-mode" data-ext="editorconfig"><pre v-pre class="language-editorconfig"><code>'use strict'
// see http://vuejs-templates.github.io/webpack for documentation.

const path <span class="token value attr-value"><span class="token punctuation">=</span> require('path')</span>

<span class="token key attr-name">module.exports</span> <span class="token value attr-value"><span class="token punctuation">=</span> {</span>
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/debug': {
        target: 'http://192.168.10.43:18080',
        changeOrigin: true,
        pathRewrite: {
          '^/debug': '/'
        }
      },
      '/static/snap': {
        target: 'http://192.168.10.43:18080',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/static/snap': '/static/snap'
        // }
      },

    },

    // Various Dev Server settings
    host:"192.168.10.43",
    useLocalIp: false, // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    hot: true,//自动保存
    poll: false, // https://webpack.js.org/configuration/dev-server/<span class="token comment">#devserver-watchoptions-</span>
    
    // https://webpack.js.org/configuration/devtool/<span class="token comment">#development</span>
    devtool: 'cheap-module-eval-source-map',

    // https://vue-loader.vuejs.org/en/options.html<span class="token comment">#cachebusting</span>
    cacheBusting: true,
    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../../src/main/resources/static/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../../src/main/resources/static/'),
    assetsSubDirectory: './static',
    assetsPublicPath: '/',
    
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/<span class="token comment">#production</span>
    devtool: '<span class="token comment">#source-map',</span>
    
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    
    bundleAnalyzerReport: process.env.npm_config_report
  }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、流媒体服务器搭建-docker" tabindex="-1"><a class="header-anchor" href="#_3、流媒体服务器搭建-docker" aria-hidden="true">#</a> 3、流媒体服务器搭建（docker）</h3>
<p>为了避免不同版本带来的影响，镜像重新打包放到个人仓库上。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull registry.cn-shenzhen.aliyuncs.com/sz_public/public:zlmediakit-master
<span class="token function">docker</span> run <span class="token parameter variable">-id</span> <span class="token parameter variable">-p</span> <span class="token number">1935</span>:1935 <span class="token parameter variable">-p</span> <span class="token number">1935</span>:1935/udp <span class="token parameter variable">-p</span> <span class="token number">554</span>:554 <span class="token parameter variable">-p</span> <span class="token number">8000</span>:8000 <span class="token parameter variable">-p</span> <span class="token number">8001</span>:8001 <span class="token parameter variable">-p</span> <span class="token number">18081</span>:18081 <span class="token parameter variable">-p</span> <span class="token number">10000</span>:10000 <span class="token parameter variable">-p</span> <span class="token number">10000</span>:10000/udp <span class="token parameter variable">-p</span> <span class="token number">50000</span>-50050:50000-50050  <span class="token parameter variable">-p</span> <span class="token number">50000</span>-50050:50000-50050/udp <span class="token parameter variable">-v</span> /usr/local/28181/config.ini:/opt/media/conf/config.ini registry.cn-shenzhen.aliyuncs.com/sz_public/public:zlmediakit-master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>config.ini 如下(注意secret/ip白名单/开放端口等)：</p>
<div class="language-editorconfig line-numbers-mode" data-ext="editorconfig"><pre v-pre class="language-editorconfig"><code><span class="token comment">; auto-generated by mINI class {</span>

<span class="token section selector"><span class="token punctuation">[</span>api<span class="token punctuation">]</span></span>
<span class="token key attr-name">apiDebug</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">defaultSnap</span><span class="token value attr-value"><span class="token punctuation">=</span>./www/logo.png</span>
<span class="token key attr-name">downloadRoot</span><span class="token value attr-value"><span class="token punctuation">=</span>./www</span>
<span class="token key attr-name">secret</span><span class="token value attr-value"><span class="token punctuation">=</span>l5DPpqy3YbPE5oaJCL2AxOBOuAVwEvlG</span>
<span class="token key attr-name">snapRoot</span><span class="token value attr-value"><span class="token punctuation">=</span>./www/snap/</span>

<span class="token section selector"><span class="token punctuation">[</span>cluster<span class="token punctuation">]</span></span>
<span class="token key attr-name">origin_url</span><span class="token value attr-value"><span class="token punctuation">=</span></span>
<span class="token key attr-name">retry_count</span><span class="token value attr-value"><span class="token punctuation">=</span>3</span>
<span class="token key attr-name">timeout_sec</span><span class="token value attr-value"><span class="token punctuation">=</span>15</span>

<span class="token section selector"><span class="token punctuation">[</span>ffmpeg<span class="token punctuation">]</span></span>
<span class="token key attr-name">bin</span><span class="token value attr-value"><span class="token punctuation">=</span>/usr/bin/ffmpeg</span>
<span class="token key attr-name">cmd</span><span class="token value attr-value"><span class="token punctuation">=</span>%s -fflags nobuffer -i %s -c:a aac -strict -2 -ar 44100 -ab 48k -c:v libx264  -f flv %s</span>
<span class="token key attr-name">log</span><span class="token value attr-value"><span class="token punctuation">=</span>./ffmpeg/ffmpeg.log</span>
<span class="token key attr-name">restart_sec</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">snap</span><span class="token value attr-value"><span class="token punctuation">=</span>%s -i %s -y -f mjpeg -t 0.001 %s</span>

<span class="token section selector"><span class="token punctuation">[</span>general<span class="token punctuation">]</span></span>
<span class="token key attr-name">addMuteAudio</span><span class="token value attr-value"><span class="token punctuation">=</span>1</span>
<span class="token key attr-name">check_nvidia_dev</span><span class="token value attr-value"><span class="token punctuation">=</span>1</span>
<span class="token key attr-name">continue_push_ms</span><span class="token value attr-value"><span class="token punctuation">=</span>3000</span>
<span class="token key attr-name">enableVhost</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">enable_audio</span><span class="token value attr-value"><span class="token punctuation">=</span>1</span>
<span class="token key attr-name">enable_ffmpeg_log</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">flowThreshold</span><span class="token value attr-value"><span class="token punctuation">=</span>1024</span>
<span class="token key attr-name">fmp4_demand</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">hls_demand</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">maxStreamWaitMS</span><span class="token value attr-value"><span class="token punctuation">=</span>15000</span>
<span class="token key attr-name">mediaServerId</span><span class="token value attr-value"><span class="token punctuation">=</span>035c73f7bb6b</span>
<span class="token key attr-name">mergeWriteMS</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">modifyStamp</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">publishToHls</span><span class="token value attr-value"><span class="token punctuation">=</span>1</span>
<span class="token key attr-name">publishToMP4</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">resetWhenRePlay</span><span class="token value attr-value"><span class="token punctuation">=</span>1</span>
<span class="token key attr-name">rtmp_demand</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">rtsp_demand</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">streamNoneReaderDelayMS</span><span class="token value attr-value"><span class="token punctuation">=</span>10000</span>
<span class="token key attr-name">ts_demand</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">unready_frame_cache</span><span class="token value attr-value"><span class="token punctuation">=</span>100</span>
<span class="token key attr-name">wait_add_track_ms</span><span class="token value attr-value"><span class="token punctuation">=</span>3000</span>
<span class="token key attr-name">wait_track_ready_ms</span><span class="token value attr-value"><span class="token punctuation">=</span>3000</span>

<span class="token section selector"><span class="token punctuation">[</span>hls<span class="token punctuation">]</span></span>
<span class="token key attr-name">broadcastRecordTs</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">deleteDelaySec</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">fastRegister</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">fileBufSize</span><span class="token value attr-value"><span class="token punctuation">=</span>65536</span>
<span class="token key attr-name">filePath</span><span class="token value attr-value"><span class="token punctuation">=</span>./www</span>
<span class="token key attr-name">segDur</span><span class="token value attr-value"><span class="token punctuation">=</span>2</span>
<span class="token key attr-name">segKeep</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">segNum</span><span class="token value attr-value"><span class="token punctuation">=</span>3</span>
<span class="token key attr-name">segRetain</span><span class="token value attr-value"><span class="token punctuation">=</span>5</span>

<span class="token section selector"><span class="token punctuation">[</span>hook<span class="token punctuation">]</span></span>
<span class="token key attr-name">admin_params</span><span class="token value attr-value"><span class="token punctuation">=</span>secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc</span>
<span class="token key attr-name">alive_interval</span><span class="token value attr-value"><span class="token punctuation">=</span>10.0</span>
<span class="token key attr-name">enable</span><span class="token value attr-value"><span class="token punctuation">=</span>1</span>
<span class="token key attr-name">on_flow_report</span><span class="token value attr-value"><span class="token punctuation">=</span></span>
<span class="token key attr-name">on_http_access</span><span class="token value attr-value"><span class="token punctuation">=</span></span>
<span class="token key attr-name">on_play</span><span class="token value attr-value"><span class="token punctuation">=</span>http://192.168.10.250:18080/index/hook/on_play</span>
<span class="token key attr-name">on_publish</span><span class="token value attr-value"><span class="token punctuation">=</span>http://192.168.10.250:18080/index/hook/on_publish</span>
<span class="token key attr-name">on_record_mp4</span><span class="token value attr-value"><span class="token punctuation">=</span>http://192.168.10.250:18080/api/record/on_record_mp4</span>
<span class="token key attr-name">on_record_ts</span><span class="token value attr-value"><span class="token punctuation">=</span></span>
<span class="token key attr-name">on_rtp_server_timeout</span><span class="token value attr-value"><span class="token punctuation">=</span></span>
<span class="token key attr-name">on_rtsp_auth</span><span class="token value attr-value"><span class="token punctuation">=</span></span>
<span class="token key attr-name">on_rtsp_realm</span><span class="token value attr-value"><span class="token punctuation">=</span></span>
<span class="token key attr-name">on_send_rtp_stopped</span><span class="token value attr-value"><span class="token punctuation">=</span></span>
<span class="token key attr-name">on_server_exited</span><span class="token value attr-value"><span class="token punctuation">=</span></span>
<span class="token key attr-name">on_server_keepalive</span><span class="token value attr-value"><span class="token punctuation">=</span>http://192.168.10.250:18080/index/hook/on_server_keepalive</span>
<span class="token key attr-name">on_server_started</span><span class="token value attr-value"><span class="token punctuation">=</span>http://192.168.10.250:18080/index/hook/on_server_started</span>
<span class="token key attr-name">on_shell_login</span><span class="token value attr-value"><span class="token punctuation">=</span>http://192.168.10.250:18080/index/hook/on_shell_login</span>
<span class="token key attr-name">on_stream_changed</span><span class="token value attr-value"><span class="token punctuation">=</span>http://192.168.10.250:18080/index/hook/on_stream_changed</span>
<span class="token key attr-name">on_stream_none_reader</span><span class="token value attr-value"><span class="token punctuation">=</span>http://192.168.10.250:18080/index/hook/on_stream_none_reader</span>
<span class="token key attr-name">on_stream_not_found</span><span class="token value attr-value"><span class="token punctuation">=</span>http://192.168.10.250:18080/index/hook/on_stream_not_found</span>
<span class="token key attr-name">retry</span><span class="token value attr-value"><span class="token punctuation">=</span>1</span>
<span class="token key attr-name">retry_delay</span><span class="token value attr-value"><span class="token punctuation">=</span>3.000000</span>
<span class="token key attr-name">stream_changed_schemas</span><span class="token value attr-value"><span class="token punctuation">=</span>rtsp/rtmp/fmp4/ts/hls/hls.fmp4</span>
<span class="token key attr-name">timeoutSec</span><span class="token value attr-value"><span class="token punctuation">=</span>20</span>

<span class="token section selector"><span class="token punctuation">[</span>http<span class="token punctuation">]</span></span>
<span class="token key attr-name">allow_cross_domains</span><span class="token value attr-value"><span class="token punctuation">=</span>1</span>
<span class="token key attr-name">allow_ip_range</span><span class="token value attr-value"><span class="token punctuation">=</span>::1,127.0.0.1,172.16.0.0-172.31.255.255,192.168.0.0-192.168.255.255,10.0.0.0-10.255.255.255</span>
<span class="token key attr-name">charSet</span><span class="token value attr-value"><span class="token punctuation">=</span>utf-8</span>
<span class="token key attr-name">dirMenu</span><span class="token value attr-value"><span class="token punctuation">=</span>1</span>
<span class="token key attr-name">forbidCacheSuffix</span><span class="token value attr-value"><span class="token punctuation">=</span></span>
<span class="token key attr-name">forwarded_ip_header</span><span class="token value attr-value"><span class="token punctuation">=</span></span>
<span class="token key attr-name">keepAliveSecond</span><span class="token value attr-value"><span class="token punctuation">=</span>30</span>
<span class="token key attr-name">maxReqSize</span><span class="token value attr-value"><span class="token punctuation">=</span>40960</span>
<span class="token key attr-name">notFound</span><span class="token value attr-value"><span class="token punctuation">=</span>&lt;html>&lt;head>&lt;title>404 Not Found&lt;/title>&lt;/head>&lt;body bgcolor="white">&lt;center>&lt;h1>您访问的资源不存在！&lt;/h1>&lt;/center>&lt;hr>&lt;center>ZLMediaKit(git hash:a3d696d,branch:master,build time:Feb 23 2022 12:29:13)&lt;/center>&lt;/body>&lt;/html></span>
<span class="token key attr-name">port</span><span class="token value attr-value"><span class="token punctuation">=</span>8001</span>
<span class="token key attr-name">rootPath</span><span class="token value attr-value"><span class="token punctuation">=</span>./www</span>
<span class="token key attr-name">sendBufSize</span><span class="token value attr-value"><span class="token punctuation">=</span>65536</span>
<span class="token key attr-name">sslport</span><span class="token value attr-value"><span class="token punctuation">=</span>443</span>
<span class="token key attr-name">virtualPath</span><span class="token value attr-value"><span class="token punctuation">=</span></span>

<span class="token section selector"><span class="token punctuation">[</span>multicast<span class="token punctuation">]</span></span>
<span class="token key attr-name">addrMax</span><span class="token value attr-value"><span class="token punctuation">=</span>239.255.255.255</span>
<span class="token key attr-name">addrMin</span><span class="token value attr-value"><span class="token punctuation">=</span>239.0.0.0</span>
<span class="token key attr-name">udpTTL</span><span class="token value attr-value"><span class="token punctuation">=</span>64</span>

<span class="token section selector"><span class="token punctuation">[</span>protocol<span class="token punctuation">]</span></span>
<span class="token key attr-name">add_mute_audio</span><span class="token value attr-value"><span class="token punctuation">=</span>1</span>
<span class="token key attr-name">auto_close</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">continue_push_ms</span><span class="token value attr-value"><span class="token punctuation">=</span>15000</span>
<span class="token key attr-name">enable_audio</span><span class="token value attr-value"><span class="token punctuation">=</span>1</span>
<span class="token key attr-name">enable_fmp4</span><span class="token value attr-value"><span class="token punctuation">=</span>1</span>
<span class="token key attr-name">enable_hls</span><span class="token value attr-value"><span class="token punctuation">=</span>1</span>
<span class="token key attr-name">enable_hls_fmp4</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">enable_mp4</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">enable_rtmp</span><span class="token value attr-value"><span class="token punctuation">=</span>1</span>
<span class="token key attr-name">enable_rtsp</span><span class="token value attr-value"><span class="token punctuation">=</span>1</span>
<span class="token key attr-name">enable_ts</span><span class="token value attr-value"><span class="token punctuation">=</span>1</span>
<span class="token key attr-name">fmp4_demand</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">hls_demand</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">hls_save_path</span><span class="token value attr-value"><span class="token punctuation">=</span>./www</span>
<span class="token key attr-name">modify_stamp</span><span class="token value attr-value"><span class="token punctuation">=</span>2</span>
<span class="token key attr-name">mp4_as_player</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">mp4_max_second</span><span class="token value attr-value"><span class="token punctuation">=</span>3600</span>
<span class="token key attr-name">mp4_save_path</span><span class="token value attr-value"><span class="token punctuation">=</span>./www</span>
<span class="token key attr-name">paced_sender_ms</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">rtmp_demand</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">rtsp_demand</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">ts_demand</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>

<span class="token section selector"><span class="token punctuation">[</span>record<span class="token punctuation">]</span></span>
<span class="token key attr-name">appName</span><span class="token value attr-value"><span class="token punctuation">=</span>record</span>
<span class="token key attr-name">fastStart</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">fileBufSize</span><span class="token value attr-value"><span class="token punctuation">=</span>65536</span>
<span class="token key attr-name">filePath</span><span class="token value attr-value"><span class="token punctuation">=</span>./www</span>
<span class="token key attr-name">fileRepeat</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">fileSecond</span><span class="token value attr-value"><span class="token punctuation">=</span>3600</span>
<span class="token key attr-name">sampleMS</span><span class="token value attr-value"><span class="token punctuation">=</span>500</span>

<span class="token section selector"><span class="token punctuation">[</span>rtc<span class="token punctuation">]</span></span>
<span class="token key attr-name">externIP</span><span class="token value attr-value"><span class="token punctuation">=</span></span>
<span class="token key attr-name">max_bitrate</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">min_bitrate</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">port</span><span class="token value attr-value"><span class="token punctuation">=</span>8000</span>
<span class="token key attr-name">preferredCodecA</span><span class="token value attr-value"><span class="token punctuation">=</span>PCMU,PCMA,opus,mpeg4-generic</span>
<span class="token key attr-name">preferredCodecV</span><span class="token value attr-value"><span class="token punctuation">=</span>H264,H265,AV1X,VP9,VP8</span>
<span class="token key attr-name">rembBitRate</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">start_bitrate</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">tcpPort</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">timeoutSec</span><span class="token value attr-value"><span class="token punctuation">=</span>15</span>

<span class="token section selector"><span class="token punctuation">[</span>rtmp<span class="token punctuation">]</span></span>
<span class="token key attr-name">directProxy</span><span class="token value attr-value"><span class="token punctuation">=</span>1</span>
<span class="token key attr-name">enhanced</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">handshakeSecond</span><span class="token value attr-value"><span class="token punctuation">=</span>15</span>
<span class="token key attr-name">keepAliveSecond</span><span class="token value attr-value"><span class="token punctuation">=</span>15</span>
<span class="token key attr-name">modifyStamp</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">port</span><span class="token value attr-value"><span class="token punctuation">=</span>1935</span>
<span class="token key attr-name">sslport</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>

<span class="token section selector"><span class="token punctuation">[</span>rtp<span class="token punctuation">]</span></span>
<span class="token key attr-name">audioMtuSize</span><span class="token value attr-value"><span class="token punctuation">=</span>600</span>
<span class="token key attr-name">h264_stap_a</span><span class="token value attr-value"><span class="token punctuation">=</span>1</span>
<span class="token key attr-name">lowLatency</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">rtpMaxSize</span><span class="token value attr-value"><span class="token punctuation">=</span>10</span>
<span class="token key attr-name">videoMtuSize</span><span class="token value attr-value"><span class="token punctuation">=</span>1400</span>

<span class="token section selector"><span class="token punctuation">[</span>rtp_proxy<span class="token punctuation">]</span></span>
<span class="token key attr-name">dumpDir</span><span class="token value attr-value"><span class="token punctuation">=</span></span>
<span class="token key attr-name">gop_cache</span><span class="token value attr-value"><span class="token punctuation">=</span>1</span>
<span class="token key attr-name">h264_pt</span><span class="token value attr-value"><span class="token punctuation">=</span>98</span>
<span class="token key attr-name">h265_pt</span><span class="token value attr-value"><span class="token punctuation">=</span>99</span>
<span class="token key attr-name">opus_pt</span><span class="token value attr-value"><span class="token punctuation">=</span>100</span>
<span class="token key attr-name">port</span><span class="token value attr-value"><span class="token punctuation">=</span>10000</span>
<span class="token key attr-name">port_range</span><span class="token value attr-value"><span class="token punctuation">=</span>50000-50050</span>
<span class="token key attr-name">ps_pt</span><span class="token value attr-value"><span class="token punctuation">=</span>96</span>
<span class="token key attr-name">timeoutSec</span><span class="token value attr-value"><span class="token punctuation">=</span>15</span>

<span class="token section selector"><span class="token punctuation">[</span>rtsp<span class="token punctuation">]</span></span>
<span class="token key attr-name">authBasic</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">directProxy</span><span class="token value attr-value"><span class="token punctuation">=</span>1</span>
<span class="token key attr-name">handshakeSecond</span><span class="token value attr-value"><span class="token punctuation">=</span>15</span>
<span class="token key attr-name">keepAliveSecond</span><span class="token value attr-value"><span class="token punctuation">=</span>15</span>
<span class="token key attr-name">lowLatency</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>
<span class="token key attr-name">port</span><span class="token value attr-value"><span class="token punctuation">=</span>554</span>
<span class="token key attr-name">rtpTransportType</span><span class="token value attr-value"><span class="token punctuation">=</span>-1</span>
<span class="token key attr-name">sslport</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>

<span class="token section selector"><span class="token punctuation">[</span>shell<span class="token punctuation">]</span></span>
<span class="token key attr-name">maxReqSize</span><span class="token value attr-value"><span class="token punctuation">=</span>1024</span>
<span class="token key attr-name">port</span><span class="token value attr-value"><span class="token punctuation">=</span>0</span>

<span class="token section selector"><span class="token punctuation">[</span>srt<span class="token punctuation">]</span></span>
<span class="token key attr-name">latencyMul</span><span class="token value attr-value"><span class="token punctuation">=</span>4</span>
<span class="token key attr-name">pktBufSize</span><span class="token value attr-value"><span class="token punctuation">=</span>8192</span>
<span class="token key attr-name">port</span><span class="token value attr-value"><span class="token punctuation">=</span>9000</span>
<span class="token key attr-name">timeoutSec</span><span class="token value attr-value"><span class="token punctuation">=</span>5</span>

<span class="token comment">; } ---</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后贴上流程图：<br>
<img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/blog/vedio.png" alt="" loading="lazy"></p>
<p>具体使用配置：<br>
<img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/blog/vedio2.png" alt="" loading="lazy"></p>
</div></template>


