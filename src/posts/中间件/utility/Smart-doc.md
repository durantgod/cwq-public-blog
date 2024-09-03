---
title: smart-doc
icon: fire
category:
  - utillity
tag:
  - 文档
---

### smart-doc是一个无侵入性的框架

### 1、简述
完全基于接口源码来分析生成接口文档，不采用任何注解侵入到业务代码中。你只需要按照 java-doc 标准编写注释， smart-doc 
就能帮你生成一个简易明了的 markdown, html, doc, openai, postman, swagger, torna 等类型的文档。官方文档地址：
https://smart-doc-group.github.io


### 2、具体使用配置
pom文件中的具体配置如下
```xml
    <build>
    <plugins>
        <plugin>
            <groupId>com.github.shalousun</groupId>
            <artifactId>smart-doc-maven-plugin</artifactId>
            <version>2.7.0</version>
            <configuration>
                <!--指定生成文档的使用的配置文件,配置文件放在自己的项目中-->
                <configFile>./src/main/resources/smart-doc.json</configFile>
                <!--指定项目名称-->
                <projectName>测试</projectName>
                <!--smart-doc实现自动分析依赖树加载第三方依赖的源码，如果一些框架依赖库加载不到导致报错，这时请使用excludes排除掉-->
                <excludes>
                    <!--格式为：groupId:artifactId;参考如下-->
                    <!--也可以支持正则式如：com.alibaba:.* -->
                    <exclude>com.alibaba:fastjson</exclude>
                </excludes>
                <!--includes配置用于配置加载外部依赖源码,配置后插件会按照配置项加载外部源代码而不是自动加载所有，因此使用时需要注意-->
                <!--smart-doc能自动分析依赖树加载所有依赖源码，原则上会影响文档构建效率，因此你可以使用includes来让插件加载你配置的组件-->
                <includes>
                    <!--格式为：groupId:artifactId;参考如下-->
                    <!--也可以支持正则式如：com.alibaba:.* -->
                    <!-- 使用了mybatis-plus的Page分页需要include所使用的源码包 -->
                    <include>com.baomidou:mybatis-plus-extension</include>
                    <!-- 使用了mybatis-plus的IPage分页需要include mybatis-plus-core-->
                    <include>com.baomidou:mybatis-plus-core</include>
                    <!-- 如果配置了includes的情况下， 使用了jpa的分页需要include所使用的源码包 -->
                    <include>org.springframework.data:spring-data-commons</include>
                </includes>
            </configuration>
            <executions>
                <execution>
                    <!--如果不需要在执行编译时启动smart-doc，则将phase注释掉-->
                    <phase>compile</phase>
                    <goals>
                        <!--smart-doc提供了html、openapi、markdown等goal，可按需配置-->
                        <goal>html</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>

```

smart-doc.json 具体配置文件如下，该文件放在 resources 目录下即可
```json
{
    "serverUrl": "http://127.0.0.1", //服务器地址,非必须。导出postman建议设置成http://{{server}}方便直接在postman直接设置环境变量
    "isStrict": false, //是否开启严格模式
    "allInOne": true,  //是否将文档合并到一个文件中，一般推荐为true
    "outPath": "D://md2", //指定文档的输出路径
    "coverOld": true,  //是否覆盖旧的文件，主要用于mardown文件覆盖
    "createDebugPage": true,//@since 2.0.0 smart-doc支持创建可以测试的html页面，仅在AllInOne模式中起作用。
    "packageFilters": "",//controller包过滤，多个包用英文逗号隔开
    "md5EncryptedHtmlName": false,//只有每个controller生成一个html文件是才使用
    "style":"xt256", //基于highlight.js的代码高设置,可选值很多可查看码云wiki，喜欢配色统一简洁的同学可以不设置
    "projectName": "smart-doc",//配置自己的项目名称
    "skipTransientField": true,//目前未实现
    "sortByTitle":false,//接口标题排序，默认为false,@since 1.8.7版本开始
    "showAuthor":true,//是否显示接口作者名称，默认是true,不想显示可关闭
    "requestFieldToUnderline":true,//自动将驼峰入参字段在文档中转为下划线格式,//@since 1.8.7版本开始
    "responseFieldToUnderline":true,//自动将驼峰入参字段在文档中转为下划线格式,//@since 1.8.7版本开始
    "inlineEnum":true,//设置为true会将枚举详情展示到参数表中，默认关闭，//@since 1.8.8版本开始
    "recursionLimit":7,//设置允许递归执行的次数用于避免一些对象解析卡主，默认是7，正常为3次以内，//@since 1.8.8版本开始
    "allInOneDocFileName":"index.html",//自定义设置输出文档名称, @since 1.9.0
    "requestExample":"true",//是否将请求示例展示在文档中，默认true，@since 1.9.0
    "responseExample":"true",//是否将响应示例展示在文档中，默认为true，@since 1.9.0
    "urlSuffix":".do",//支持SpringMVC旧项目的url后缀,@since 2.1.0
    "displayActualType":false,//配置true会在注释栏自动显示泛型的真实类型短类名，@since 1.9.6
    "appKey": "20201216788835306945118208",// torna平台对接appKey,, @since 2.0.9
    "appToken": "c16931fa6590483fb7a4e85340fcbfef", //torna平台appToken,@since 2.0.9
    "secret": "W.ZyGMOB9Q0UqujVxnfi@.I#V&tUUYZR",//torna平台secret，@since 2.0.9
    "openUrl": "http://localhost:7700/api",//torna平台地址，填写自己的私有化部署地址@since 2.0.9
    "debugEnvName":"测试环境", //torna环境名称
    "debugEnvUrl":"http://127.0.0.1",//推送torna配置接口服务地址
    "tornaDebug":false,//启用会推送日志
    "ignoreRequestParams":[ //忽略请求参数对象，把不想生成文档的参数对象屏蔽掉，@since 1.9.2
    "org.springframework.ui.ModelMap"
    ],
    "dataDictionaries": [{ //配置数据字典，没有需求可以不设置
    "title": "http状态码字典", //数据字典的名称
    "enumClassName": "com.power.common.enums.HttpCodeEnum", //数据字典枚举类名称
    "codeField": "code",//数据字典字典码对应的字段名称
    "descField": "message"//数据字典对象的描述信息字典
    }],
    "errorCodeDictionaries": [{ //错误码列表，没有需求可以不设置
    "title": "title",
    "enumClassName": "com.power.common.enums.HttpCodeEnum", //错误码枚举类
    "codeField": "code",//错误码的code码字段名称
    "descField": "message"//错误码的描述信息对应的字段名
    }],
    "revisionLogs": [{ //文档变更记录
    "version": "1.0", //文档版本号
    "revisionTime": "2020-12-31 10:30", //文档修订时间
    "status": "update", //变更操作状态，一般为：创建、更新等
    "author": "author", //文档变更作者
    "remarks": "desc" //变更描述
    }
    ],
    "customResponseFields": [{ //自定义添加字段和注释，api-doc后期遇到同名字段则直接给相应字段加注释，非必须
    "name": "code",//覆盖响应码字段
    "desc": "响应代码",//覆盖响应码的字段注释
    "ownerClassName": "org.springframework.data.domain.Pageable", //指定你要添加注释的类名
    "value": "00000"//设置响应码的值
    }],
    "customRequestFields": [{ //自定义请求体的注释，@since 2.1.3
    "name":"code", //属性名
    "desc":"状态码", //描述
    "ownerClassName":"com.xxx.constant.entity.Result", //属性对应的类全路径
    "value":"200", //默认值或者mock值
    "required":true, //是否必填
    "ignore":false //是否忽略
    }],
    "requestHeaders": [{ //设置请求头，没有需求可以不设置
    "name": "token",//请求头名称
    "type": "string",//请求头类型
    "desc": "desc",//请求头描述信息
    "value":"token请求头的值",//不设置默认null
    "required": false,//是否必须
    "since": "-"//什么版本添加的改请求头
    }],
    "rpcApiDependencies":[{ // 项目开放的dubbo api接口模块依赖，配置后输出到文档方便使用者集成
    "artifactId":"SpringBoot2-Dubbo-Api",
    "groupId":"com.demo",
    "version":"1.0.0"
    }],
    "rpcConsumerConfig": "src/main/resources/consumer-example.conf",//文档中添加dubbo consumer集成配置，用于方便集成方可以快速集成
    "apiObjectReplacements": [{ // 自smart-doc 1.8.5开始你可以使用自定义类覆盖其他类做文档渲染，非必须
    "className": "org.springframework.data.domain.Pageable",
    "replacementClassName": "com.power.doc.model.PageRequestDto" //自定义的PageRequestDto替换Pageable做文档渲染
    }],
    "apiConstants": [{//从1.8.9开始配置自己的常量类，smart-doc在解析到常量时自动替换为具体的值
    "constantsClassName": "com.power.doc.constants.RequestParamConstant"
    }],
    "responseBodyAdvice":{ //自smart-doc 1.9.8起，ResponseBodyAdvice统一返回设置，可用ignoreResponseBodyAdvice tag来忽略
    "className":"com.power.common.model.CommonResult" //通用响应体
    },
    "requestBodyAdvice":{ 自smart-doc 2.1.4 起，支持设置RequestBodyAdvice统一请求包装类
    "className":"com.power.common.model.CommonResult"
    },
    "sourceCodePaths": [{ //设置代码路径, 插件已经能够自动下载发布的源码包，没必要配置
    "path": "src/main/java",
    "desc": "测试"
    }]
}
```

简单配置如下：
```json
{
  "serverUrl": "http://localhost:8080",
  "pathPrefix": "",
  "allInOne": true,
  "outPath": "D://md2",
  "style": "xt256",
  "createDebugPage": true,
  "projectName": "HHD ONLINE API",
  "revisionLogs": [
    {
      "version": "1.0.1", "revisionTime": "2023-11-01 10:30",
      "status": "创建", "author": "Durant",
      "remarks": "HHD 接口文档"
    }],
  "errorCodeDictionaries": [{
    "title": "title",
    "enumClassName": "com.hhd.framework.common.enums.ResultEnum",
    "codeField": "code",
    "descField": "msg"
  }],
  "requestHeaders": [{
    "name": "accessKeyId",
    "type": "string",
    "desc": "accessKeyId",
    "value":"your company accessKeyId",
    "required": true,
    "since": "1.0"
  },
   {
      "name": "accessSecret",
      "type": "string",
      "desc": "accessSecret",
      "value":"your company accessSecret",
      "required": true,
      "since": "1.0"
    }
  ]
}
```

### 3、使用技巧

#### 3.1、请求参数忽略 （重要）
```text
/**
 *  创建时间
 *  @ignore
 */
private Timestamp createTime;
```

#### 3.2、参数模拟, 但是目前还不能自动生成符合条件的参数，参数为空

#### 3.3、文档变更记录，每一次单独通过版本号记录变更记录（重要）, 注意，这个可以是列表，也就说能记录每一次更新的内容
```text
"revisionLogs": [{ //设置文档变更记录，没有需求可以不设置
      "version": "1.0", //文档版本号
      "revisionTime": "2020-12-31 10:30", //文档修订时间
      "status": "update", //变更操作状态，一般为：创建、更新等
      "author": "author", //文档变更作者
      "remarks": "desc" //变更描述
  }],
```

#### 3.4、字段版本记录
```text
 /**
 * @since 1.0
 * 用户名称
 */
private String subUserName;
```

#### 3.5、多模块配置，主要是跨模块注释会引用不到

### 部分html效果截图如下
![](https://oss-cwq.oss-rg-china-mainland.aliyuncs.com/hhd/smartDoc.png)


