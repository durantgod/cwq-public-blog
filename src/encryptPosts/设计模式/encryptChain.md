---
icon: lock
category:
  - 设计模式
tag:
  - 责任链模式
---

# 责任链模式

### 1、责任链模式

#### 1.1、首先定义抽象接口类
```java
/**
 * 责任链定义的抽象接口类
 * <p>
 * 1、定义子类执行入口
 * 2、定义下一个处理器的入口
 *
 * @description: AbstractChainHandler
 * @author: WeiQ.chen
 * @date: 2023/2/3
 */
@Slf4j
public abstract class AbstractChainHandler {
    /**
     * 下一个处理器
     */
    @Getter
    @Setter
    AbstractChainHandler nextHandler;

    /**
     * 执行器入口
     *
     * @param param 参数
     */
    abstract void execute(String param);

    /**
     * 定义下一个处理器的入口
     *
     * @param param /
     */
    void nextExecute(String param, HandlerResult result) {
        log.info("上一个过滤的执行结果！{}", result.getMsg());
        if (Objects.nonNull(this.nextHandler)) {
            this.nextHandler.execute(param);
        }
    }
}
```

#### 1.2、定义实际责任链中的每个处理类

```java

/**
 * 责任链中处理器A
 * <p>
 * ps: 应该还需要考虑顺序，分组，并发，禁用
 *
 * @description: 处理器A
 * @author: WeiQ.chen
 * @date: 2023/2/3
 */
@Slf4j
@Handler(order = 1)
@Component
public class AHandler extends AbstractChainHandler {

    @Override
    void execute(String param) {
        log.info("A 处理中...");
        nextExecute(param, HandlerResult.ok());
    }
}



/**
 * @description: B处理器
 * @author: WeiQ.chen
 * @date: 2023/2/3
 */
@Slf4j
@Handler(order = 2)
@Component
public class BHandler extends AbstractChainHandler{

    @Override
    void execute(String param) {
        log.info("B 处理中...");
        nextExecute(param, HandlerResult.error("B 处理失败"));
    }
}
```

#### 1.3、统一处理器入口，逻辑处理类

```java

/**
 * 责任链处理器
 * 统一管理每个处理器，包括加载，存储，排序，处理器入口等
 *
 * @author: WeiQ.chen
 * @date: 2023/2/3
 */
@Service
public class ChainHandler {

    /**
     * 责任链
     */
    List<AbstractChainHandler> chain;

    /**
     * 当前处理器
     */
    AbstractChainHandler currentHandler;

    @Resource
    ApplicationContext applicationContext;

    /**
     * 初始化时获取需要加载的处理器
     */
    @PostConstruct
    void init() {
        // 获取AbstractChainHandler的子类，并且获取对应的顺序和禁用状态 注解
        Map<String, AbstractChainHandler> handlerClass = applicationContext.getBeansOfType(AbstractChainHandler.class);
        if (MapUtils.isEmpty(handlerClass)) {
            throw new RuntimeException("not found AbstractChainHandler");
        }
        chain = new ArrayList<>();
        // 过滤 & 排序
        List<AbstractChainHandler> temp = handlerClass.values().stream()
                .filter(v -> {
                    Handler handler = v.getClass().getAnnotation(Handler.class);
                    return !handler.disable();
                }).sorted((a, b) -> {
                    Class<?> aC = a.getClass();
                    Handler handlerA = aC.getAnnotation(Handler.class);

                    Class<?> bC = b.getClass();
                    Handler handlerB = bC.getAnnotation(Handler.class);

                    return handlerA.order() - handlerB.order();
                }).collect(Collectors.toList());
        // 添加到责任链中
        chain.addAll(temp);

        if (CollectionUtils.isEmpty(chain)) {
            throw new RuntimeException("not found AbstractChainHandler");
        }

        currentHandler = chain.get(0);
        chain.remove(0);

        AbstractChainHandler head = currentHandler;
        for (AbstractChainHandler next : chain) {
           currentHandler.setNextHandler(next);
           currentHandler = currentHandler.getNextHandler();
        }
        currentHandler = head;
    }

    /**
     * 开始执行
     *
     * @param param /
     */
    public void Start(String param) {
        Assert.notNull(currentHandler, "IllegalArgumentException not found order chain handler");
        currentHandler.execute(param);
    }
}
```

#### 1.4、责任链中的工具类，比如：节点中的结果的传递，注解定义顺序或者启用禁用属性

```java
/**
 * 处理器属性定义
 *
 * @author: WeiQ.chen
 * @date: 2023/2/3
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Handler {
    /**
     * 顺序
     *
     * @return /
     */
    int order() default 0;

    /**
     * 是否启用禁用
     *
     * @return /
     */
    boolean disable() default false;
}



/**
 * 处理结果类
 *
 * @author: WeiQ.chen
 * @date: 2023/2/3
 */
@Data
public class HandlerResult {

    private String msg;

    public static HandlerResult ok() {
        HandlerResult res = new HandlerResult();
        res.setMsg("ok");
        return res;
    }

    public static HandlerResult error(String msg) {
        HandlerResult res = new HandlerResult();
        res.setMsg(msg);
        return res;
    }
}

```

