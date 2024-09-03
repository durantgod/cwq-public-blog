<template><div><h3 id="smart-doc是一个无侵入性的框架" tabindex="-1"><a class="header-anchor" href="#smart-doc是一个无侵入性的框架" aria-hidden="true">#</a> smart-doc是一个无侵入性的框架</h3>
<h3 id="_1、简述" tabindex="-1"><a class="header-anchor" href="#_1、简述" aria-hidden="true">#</a> 1、简述</h3>
<p>完全基于接口源码来分析生成接口文档，不采用任何注解侵入到业务代码中。你只需要按照 java-doc 标准编写注释， smart-doc<br>
就能帮你生成一个简易明了的 markdown, html, doc, openai, postman, swagger, torna 等类型的文档。官方文档地址：<br>
<a href="https://smart-doc-group.github.io" target="_blank" rel="noopener noreferrer">https://smart-doc-group.github.io<ExternalLinkIcon/></a></p>
<h3 id="_2、具体使用配置" tabindex="-1"><a class="header-anchor" href="#_2、具体使用配置" aria-hidden="true">#</a> 2、具体使用配置</h3>
<p>pom文件中的具体配置如下</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.github.shalousun<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>smart-doc-maven-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.7.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">></span></span>
                <span class="token comment">&lt;!--指定生成文档的使用的配置文件,配置文件放在自己的项目中--></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configFile</span><span class="token punctuation">></span></span>./src/main/resources/smart-doc.json<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configFile</span><span class="token punctuation">></span></span>
                <span class="token comment">&lt;!--指定项目名称--></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>projectName</span><span class="token punctuation">></span></span>测试<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>projectName</span><span class="token punctuation">></span></span>
                <span class="token comment">&lt;!--smart-doc实现自动分析依赖树加载第三方依赖的源码，如果一些框架依赖库加载不到导致报错，这时请使用excludes排除掉--></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>excludes</span><span class="token punctuation">></span></span>
                    <span class="token comment">&lt;!--格式为：groupId:artifactId;参考如下--></span>
                    <span class="token comment">&lt;!--也可以支持正则式如：com.alibaba:.* --></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclude</span><span class="token punctuation">></span></span>com.alibaba:fastjson<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclude</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>excludes</span><span class="token punctuation">></span></span>
                <span class="token comment">&lt;!--includes配置用于配置加载外部依赖源码,配置后插件会按照配置项加载外部源代码而不是自动加载所有，因此使用时需要注意--></span>
                <span class="token comment">&lt;!--smart-doc能自动分析依赖树加载所有依赖源码，原则上会影响文档构建效率，因此你可以使用includes来让插件加载你配置的组件--></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>includes</span><span class="token punctuation">></span></span>
                    <span class="token comment">&lt;!--格式为：groupId:artifactId;参考如下--></span>
                    <span class="token comment">&lt;!--也可以支持正则式如：com.alibaba:.* --></span>
                    <span class="token comment">&lt;!-- 使用了mybatis-plus的Page分页需要include所使用的源码包 --></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>include</span><span class="token punctuation">></span></span>com.baomidou:mybatis-plus-extension<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>include</span><span class="token punctuation">></span></span>
                    <span class="token comment">&lt;!-- 使用了mybatis-plus的IPage分页需要include mybatis-plus-core--></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>include</span><span class="token punctuation">></span></span>com.baomidou:mybatis-plus-core<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>include</span><span class="token punctuation">></span></span>
                    <span class="token comment">&lt;!-- 如果配置了includes的情况下， 使用了jpa的分页需要include所使用的源码包 --></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>include</span><span class="token punctuation">></span></span>org.springframework.data:spring-data-commons<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>include</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>includes</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>executions</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">></span></span>
                    <span class="token comment">&lt;!--如果不需要在执行编译时启动smart-doc，则将phase注释掉--></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>phase</span><span class="token punctuation">></span></span>compile<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>phase</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goals</span><span class="token punctuation">></span></span>
                        <span class="token comment">&lt;!--smart-doc提供了html、openapi、markdown等goal，可按需配置--></span>
                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">></span></span>html<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goals</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>executions</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>smart-doc.json 具体配置文件如下，该文件放在 resources 目录下即可</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"serverUrl"</span><span class="token operator">:</span> <span class="token string">"http://127.0.0.1"</span><span class="token punctuation">,</span> <span class="token comment">//服务器地址,非必须。导出postman建议设置成http://{{server}}方便直接在postman直接设置环境变量</span>
    <span class="token property">"isStrict"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">//是否开启严格模式</span>
    <span class="token property">"allInOne"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>  <span class="token comment">//是否将文档合并到一个文件中，一般推荐为true</span>
    <span class="token property">"outPath"</span><span class="token operator">:</span> <span class="token string">"D://md2"</span><span class="token punctuation">,</span> <span class="token comment">//指定文档的输出路径</span>
    <span class="token property">"coverOld"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>  <span class="token comment">//是否覆盖旧的文件，主要用于mardown文件覆盖</span>
    <span class="token property">"createDebugPage"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span><span class="token comment">//@since 2.0.0 smart-doc支持创建可以测试的html页面，仅在AllInOne模式中起作用。</span>
    <span class="token property">"packageFilters"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span><span class="token comment">//controller包过滤，多个包用英文逗号隔开</span>
    <span class="token property">"md5EncryptedHtmlName"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span><span class="token comment">//只有每个controller生成一个html文件是才使用</span>
    <span class="token property">"style"</span><span class="token operator">:</span><span class="token string">"xt256"</span><span class="token punctuation">,</span> <span class="token comment">//基于highlight.js的代码高设置,可选值很多可查看码云wiki，喜欢配色统一简洁的同学可以不设置</span>
    <span class="token property">"projectName"</span><span class="token operator">:</span> <span class="token string">"smart-doc"</span><span class="token punctuation">,</span><span class="token comment">//配置自己的项目名称</span>
    <span class="token property">"skipTransientField"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span><span class="token comment">//目前未实现</span>
    <span class="token property">"sortByTitle"</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token comment">//接口标题排序，默认为false,@since 1.8.7版本开始</span>
    <span class="token property">"showAuthor"</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token comment">//是否显示接口作者名称，默认是true,不想显示可关闭</span>
    <span class="token property">"requestFieldToUnderline"</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token comment">//自动将驼峰入参字段在文档中转为下划线格式,//@since 1.8.7版本开始</span>
    <span class="token property">"responseFieldToUnderline"</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token comment">//自动将驼峰入参字段在文档中转为下划线格式,//@since 1.8.7版本开始</span>
    <span class="token property">"inlineEnum"</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token comment">//设置为true会将枚举详情展示到参数表中，默认关闭，//@since 1.8.8版本开始</span>
    <span class="token property">"recursionLimit"</span><span class="token operator">:</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token comment">//设置允许递归执行的次数用于避免一些对象解析卡主，默认是7，正常为3次以内，//@since 1.8.8版本开始</span>
    <span class="token property">"allInOneDocFileName"</span><span class="token operator">:</span><span class="token string">"index.html"</span><span class="token punctuation">,</span><span class="token comment">//自定义设置输出文档名称, @since 1.9.0</span>
    <span class="token property">"requestExample"</span><span class="token operator">:</span><span class="token string">"true"</span><span class="token punctuation">,</span><span class="token comment">//是否将请求示例展示在文档中，默认true，@since 1.9.0</span>
    <span class="token property">"responseExample"</span><span class="token operator">:</span><span class="token string">"true"</span><span class="token punctuation">,</span><span class="token comment">//是否将响应示例展示在文档中，默认为true，@since 1.9.0</span>
    <span class="token property">"urlSuffix"</span><span class="token operator">:</span><span class="token string">".do"</span><span class="token punctuation">,</span><span class="token comment">//支持SpringMVC旧项目的url后缀,@since 2.1.0</span>
    <span class="token property">"displayActualType"</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token comment">//配置true会在注释栏自动显示泛型的真实类型短类名，@since 1.9.6</span>
    <span class="token property">"appKey"</span><span class="token operator">:</span> <span class="token string">"20201216788835306945118208"</span><span class="token punctuation">,</span><span class="token comment">// torna平台对接appKey,, @since 2.0.9</span>
    <span class="token property">"appToken"</span><span class="token operator">:</span> <span class="token string">"c16931fa6590483fb7a4e85340fcbfef"</span><span class="token punctuation">,</span> <span class="token comment">//torna平台appToken,@since 2.0.9</span>
    <span class="token property">"secret"</span><span class="token operator">:</span> <span class="token string">"W.ZyGMOB9Q0UqujVxnfi@.I#V&amp;tUUYZR"</span><span class="token punctuation">,</span><span class="token comment">//torna平台secret，@since 2.0.9</span>
    <span class="token property">"openUrl"</span><span class="token operator">:</span> <span class="token string">"http://localhost:7700/api"</span><span class="token punctuation">,</span><span class="token comment">//torna平台地址，填写自己的私有化部署地址@since 2.0.9</span>
    <span class="token property">"debugEnvName"</span><span class="token operator">:</span><span class="token string">"测试环境"</span><span class="token punctuation">,</span> <span class="token comment">//torna环境名称</span>
    <span class="token property">"debugEnvUrl"</span><span class="token operator">:</span><span class="token string">"http://127.0.0.1"</span><span class="token punctuation">,</span><span class="token comment">//推送torna配置接口服务地址</span>
    <span class="token property">"tornaDebug"</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token comment">//启用会推送日志</span>
    <span class="token property">"ignoreRequestParams"</span><span class="token operator">:</span><span class="token punctuation">[</span> <span class="token comment">//忽略请求参数对象，把不想生成文档的参数对象屏蔽掉，@since 1.9.2</span>
    <span class="token string">"org.springframework.ui.ModelMap"</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"dataDictionaries"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token comment">//配置数据字典，没有需求可以不设置</span>
    <span class="token property">"title"</span><span class="token operator">:</span> <span class="token string">"http状态码字典"</span><span class="token punctuation">,</span> <span class="token comment">//数据字典的名称</span>
    <span class="token property">"enumClassName"</span><span class="token operator">:</span> <span class="token string">"com.power.common.enums.HttpCodeEnum"</span><span class="token punctuation">,</span> <span class="token comment">//数据字典枚举类名称</span>
    <span class="token property">"codeField"</span><span class="token operator">:</span> <span class="token string">"code"</span><span class="token punctuation">,</span><span class="token comment">//数据字典字典码对应的字段名称</span>
    <span class="token property">"descField"</span><span class="token operator">:</span> <span class="token string">"message"</span><span class="token comment">//数据字典对象的描述信息字典</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"errorCodeDictionaries"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token comment">//错误码列表，没有需求可以不设置</span>
    <span class="token property">"title"</span><span class="token operator">:</span> <span class="token string">"title"</span><span class="token punctuation">,</span>
    <span class="token property">"enumClassName"</span><span class="token operator">:</span> <span class="token string">"com.power.common.enums.HttpCodeEnum"</span><span class="token punctuation">,</span> <span class="token comment">//错误码枚举类</span>
    <span class="token property">"codeField"</span><span class="token operator">:</span> <span class="token string">"code"</span><span class="token punctuation">,</span><span class="token comment">//错误码的code码字段名称</span>
    <span class="token property">"descField"</span><span class="token operator">:</span> <span class="token string">"message"</span><span class="token comment">//错误码的描述信息对应的字段名</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"revisionLogs"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token comment">//文档变更记录</span>
    <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"1.0"</span><span class="token punctuation">,</span> <span class="token comment">//文档版本号</span>
    <span class="token property">"revisionTime"</span><span class="token operator">:</span> <span class="token string">"2020-12-31 10:30"</span><span class="token punctuation">,</span> <span class="token comment">//文档修订时间</span>
    <span class="token property">"status"</span><span class="token operator">:</span> <span class="token string">"update"</span><span class="token punctuation">,</span> <span class="token comment">//变更操作状态，一般为：创建、更新等</span>
    <span class="token property">"author"</span><span class="token operator">:</span> <span class="token string">"author"</span><span class="token punctuation">,</span> <span class="token comment">//文档变更作者</span>
    <span class="token property">"remarks"</span><span class="token operator">:</span> <span class="token string">"desc"</span> <span class="token comment">//变更描述</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"customResponseFields"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token comment">//自定义添加字段和注释，api-doc后期遇到同名字段则直接给相应字段加注释，非必须</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"code"</span><span class="token punctuation">,</span><span class="token comment">//覆盖响应码字段</span>
    <span class="token property">"desc"</span><span class="token operator">:</span> <span class="token string">"响应代码"</span><span class="token punctuation">,</span><span class="token comment">//覆盖响应码的字段注释</span>
    <span class="token property">"ownerClassName"</span><span class="token operator">:</span> <span class="token string">"org.springframework.data.domain.Pageable"</span><span class="token punctuation">,</span> <span class="token comment">//指定你要添加注释的类名</span>
    <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"00000"</span><span class="token comment">//设置响应码的值</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"customRequestFields"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token comment">//自定义请求体的注释，@since 2.1.3</span>
    <span class="token property">"name"</span><span class="token operator">:</span><span class="token string">"code"</span><span class="token punctuation">,</span> <span class="token comment">//属性名</span>
    <span class="token property">"desc"</span><span class="token operator">:</span><span class="token string">"状态码"</span><span class="token punctuation">,</span> <span class="token comment">//描述</span>
    <span class="token property">"ownerClassName"</span><span class="token operator">:</span><span class="token string">"com.xxx.constant.entity.Result"</span><span class="token punctuation">,</span> <span class="token comment">//属性对应的类全路径</span>
    <span class="token property">"value"</span><span class="token operator">:</span><span class="token string">"200"</span><span class="token punctuation">,</span> <span class="token comment">//默认值或者mock值</span>
    <span class="token property">"required"</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">//是否必填</span>
    <span class="token property">"ignore"</span><span class="token operator">:</span><span class="token boolean">false</span> <span class="token comment">//是否忽略</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"requestHeaders"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token comment">//设置请求头，没有需求可以不设置</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"token"</span><span class="token punctuation">,</span><span class="token comment">//请求头名称</span>
    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span><span class="token comment">//请求头类型</span>
    <span class="token property">"desc"</span><span class="token operator">:</span> <span class="token string">"desc"</span><span class="token punctuation">,</span><span class="token comment">//请求头描述信息</span>
    <span class="token property">"value"</span><span class="token operator">:</span><span class="token string">"token请求头的值"</span><span class="token punctuation">,</span><span class="token comment">//不设置默认null</span>
    <span class="token property">"required"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span><span class="token comment">//是否必须</span>
    <span class="token property">"since"</span><span class="token operator">:</span> <span class="token string">"-"</span><span class="token comment">//什么版本添加的改请求头</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"rpcApiDependencies"</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token comment">// 项目开放的dubbo api接口模块依赖，配置后输出到文档方便使用者集成</span>
    <span class="token property">"artifactId"</span><span class="token operator">:</span><span class="token string">"SpringBoot2-Dubbo-Api"</span><span class="token punctuation">,</span>
    <span class="token property">"groupId"</span><span class="token operator">:</span><span class="token string">"com.demo"</span><span class="token punctuation">,</span>
    <span class="token property">"version"</span><span class="token operator">:</span><span class="token string">"1.0.0"</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"rpcConsumerConfig"</span><span class="token operator">:</span> <span class="token string">"src/main/resources/consumer-example.conf"</span><span class="token punctuation">,</span><span class="token comment">//文档中添加dubbo consumer集成配置，用于方便集成方可以快速集成</span>
    <span class="token property">"apiObjectReplacements"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token comment">// 自smart-doc 1.8.5开始你可以使用自定义类覆盖其他类做文档渲染，非必须</span>
    <span class="token property">"className"</span><span class="token operator">:</span> <span class="token string">"org.springframework.data.domain.Pageable"</span><span class="token punctuation">,</span>
    <span class="token property">"replacementClassName"</span><span class="token operator">:</span> <span class="token string">"com.power.doc.model.PageRequestDto"</span> <span class="token comment">//自定义的PageRequestDto替换Pageable做文档渲染</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"apiConstants"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token comment">//从1.8.9开始配置自己的常量类，smart-doc在解析到常量时自动替换为具体的值</span>
    <span class="token property">"constantsClassName"</span><span class="token operator">:</span> <span class="token string">"com.power.doc.constants.RequestParamConstant"</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"responseBodyAdvice"</span><span class="token operator">:</span><span class="token punctuation">{</span> <span class="token comment">//自smart-doc 1.9.8起，ResponseBodyAdvice统一返回设置，可用ignoreResponseBodyAdvice tag来忽略</span>
    <span class="token property">"className"</span><span class="token operator">:</span><span class="token string">"com.power.common.model.CommonResult"</span> <span class="token comment">//通用响应体</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"requestBodyAdvice"</span><span class="token operator">:</span><span class="token punctuation">{</span> 自smart-doc <span class="token number">2.1</span>.<span class="token number">4</span> 起，支持设置RequestBodyAdvice统一请求包装类
    <span class="token property">"className"</span><span class="token operator">:</span><span class="token string">"com.power.common.model.CommonResult"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"sourceCodePaths"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token comment">//设置代码路径, 插件已经能够自动下载发布的源码包，没必要配置</span>
    <span class="token property">"path"</span><span class="token operator">:</span> <span class="token string">"src/main/java"</span><span class="token punctuation">,</span>
    <span class="token property">"desc"</span><span class="token operator">:</span> <span class="token string">"测试"</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单配置如下：</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"serverUrl"</span><span class="token operator">:</span> <span class="token string">"http://localhost:8080"</span><span class="token punctuation">,</span>
  <span class="token property">"pathPrefix"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
  <span class="token property">"allInOne"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">"outPath"</span><span class="token operator">:</span> <span class="token string">"D://md2"</span><span class="token punctuation">,</span>
  <span class="token property">"style"</span><span class="token operator">:</span> <span class="token string">"xt256"</span><span class="token punctuation">,</span>
  <span class="token property">"createDebugPage"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">"projectName"</span><span class="token operator">:</span> <span class="token string">"HHD ONLINE API"</span><span class="token punctuation">,</span>
  <span class="token property">"revisionLogs"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"1.0.1"</span><span class="token punctuation">,</span> <span class="token property">"revisionTime"</span><span class="token operator">:</span> <span class="token string">"2023-11-01 10:30"</span><span class="token punctuation">,</span>
      <span class="token property">"status"</span><span class="token operator">:</span> <span class="token string">"创建"</span><span class="token punctuation">,</span> <span class="token property">"author"</span><span class="token operator">:</span> <span class="token string">"Durant"</span><span class="token punctuation">,</span>
      <span class="token property">"remarks"</span><span class="token operator">:</span> <span class="token string">"HHD 接口文档"</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"errorCodeDictionaries"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
    <span class="token property">"title"</span><span class="token operator">:</span> <span class="token string">"title"</span><span class="token punctuation">,</span>
    <span class="token property">"enumClassName"</span><span class="token operator">:</span> <span class="token string">"com.hhd.framework.common.enums.ResultEnum"</span><span class="token punctuation">,</span>
    <span class="token property">"codeField"</span><span class="token operator">:</span> <span class="token string">"code"</span><span class="token punctuation">,</span>
    <span class="token property">"descField"</span><span class="token operator">:</span> <span class="token string">"msg"</span>
  <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"requestHeaders"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"accessKeyId"</span><span class="token punctuation">,</span>
    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span>
    <span class="token property">"desc"</span><span class="token operator">:</span> <span class="token string">"accessKeyId"</span><span class="token punctuation">,</span>
    <span class="token property">"value"</span><span class="token operator">:</span><span class="token string">"your company accessKeyId"</span><span class="token punctuation">,</span>
    <span class="token property">"required"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">"since"</span><span class="token operator">:</span> <span class="token string">"1.0"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span>
      <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"accessSecret"</span><span class="token punctuation">,</span>
      <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span>
      <span class="token property">"desc"</span><span class="token operator">:</span> <span class="token string">"accessSecret"</span><span class="token punctuation">,</span>
      <span class="token property">"value"</span><span class="token operator">:</span><span class="token string">"your company accessSecret"</span><span class="token punctuation">,</span>
      <span class="token property">"required"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token property">"since"</span><span class="token operator">:</span> <span class="token string">"1.0"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、使用技巧" tabindex="-1"><a class="header-anchor" href="#_3、使用技巧" aria-hidden="true">#</a> 3、使用技巧</h3>
<h4 id="_3-1、请求参数忽略-重要" tabindex="-1"><a class="header-anchor" href="#_3-1、请求参数忽略-重要" aria-hidden="true">#</a> 3.1、请求参数忽略 （重要）</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>/**
 *  创建时间
 *  @ignore
 */
private Timestamp createTime;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2、参数模拟-但是目前还不能自动生成符合条件的参数-参数为空" tabindex="-1"><a class="header-anchor" href="#_3-2、参数模拟-但是目前还不能自动生成符合条件的参数-参数为空" aria-hidden="true">#</a> 3.2、参数模拟, 但是目前还不能自动生成符合条件的参数，参数为空</h4>
<h4 id="_3-3、文档变更记录-每一次单独通过版本号记录变更记录-重要-注意-这个可以是列表-也就说能记录每一次更新的内容" tabindex="-1"><a class="header-anchor" href="#_3-3、文档变更记录-每一次单独通过版本号记录变更记录-重要-注意-这个可以是列表-也就说能记录每一次更新的内容" aria-hidden="true">#</a> 3.3、文档变更记录，每一次单独通过版本号记录变更记录（重要）, 注意，这个可以是列表，也就说能记录每一次更新的内容</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>"revisionLogs": [{ //设置文档变更记录，没有需求可以不设置
      "version": "1.0", //文档版本号
      "revisionTime": "2020-12-31 10:30", //文档修订时间
      "status": "update", //变更操作状态，一般为：创建、更新等
      "author": "author", //文档变更作者
      "remarks": "desc" //变更描述
  }],
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-4、字段版本记录" tabindex="-1"><a class="header-anchor" href="#_3-4、字段版本记录" aria-hidden="true">#</a> 3.4、字段版本记录</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> /**
 * @since 1.0
 * 用户名称
 */
private String subUserName;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-5、多模块配置-主要是跨模块注释会引用不到" tabindex="-1"><a class="header-anchor" href="#_3-5、多模块配置-主要是跨模块注释会引用不到" aria-hidden="true">#</a> 3.5、多模块配置，主要是跨模块注释会引用不到</h4>
<h3 id="部分html效果截图如下" tabindex="-1"><a class="header-anchor" href="#部分html效果截图如下" aria-hidden="true">#</a> 部分html效果截图如下</h3>
<figure><img src="https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/hhd/smartDoc.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</div></template>


