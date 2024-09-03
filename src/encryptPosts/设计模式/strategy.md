---
icon: lock
category:
  - 设计模式
tag:
  - 策略模式
---

# 策略模式

#### 1、策略模式

主要的角色有：工厂类，策略工厂，策略注解，具体策略实现类。<p/>
使用流程是：具体策略类先加载到策略工厂，使用的时候再从策略工厂根据对应的标识获取实际的执行类就好了

1、工厂类
```java
/**
 * @description: WQFactory 全局工厂 接口定义
 * @author: Weichuan.chen
 * @date: 2021/11/22
 */
public interface WQFactory {
    // 没有接口实现，主要为所有 WQ 自定义工厂提供一个入口
}
```

2、单例工厂策略类
```java

/**
 * @description: WQStrategyFactory 策略工厂类，单例模式，用于注册/生成相对应的策略实现类
 * @author: Weichuan.chen
 * @date: 2021/11/22
 */
public class WQStrategyFactory<T extends WQStrategyContext> implements WQFactory {
    /**
     * 实例
     */
    private static volatile WQStrategyFactory<?> instance = null;

    /**
     * 策略集合
     */
    private final Map<Object, Map<Object, T>> strategy = new HashMap<>();

    private WQStrategyFactory() {
    }

    public static WQStrategyFactory<?> getInstance() {
        if (instance == null) {
            instance = new WQStrategyFactory<>();
            synchronized(WQStrategyFactory.class) {
                if (instance == null) {
                    instance = new WQStrategyFactory<>();
                }
            }
        }
        return instance;
    }

    /**
     * 根据策略标识获取相应的处理逻辑，如：根据设备关系策略名和对应的策略flag获取实现类
     *
     * @param flag com.space.iot.device.enums.DeviceRelationEnum
     * @param key {@link WQStrategyKeyEnum}
     * @return 返回实现类
     */
    public T create(Object key, Object flag) {
        return strategy.getOrDefault(key, new HashMap<>(1)).getOrDefault(flag, null);
    }
    
    /**
     * 注册策略，把相应的策略注册上来，在工厂中统一生成
     */
    public void register(Object key, Map<Object, T> sonStrategy) {
        this.strategy.put(key, sonStrategy);
    }
}
```

3、策略注解
```java
/**
 * @description: WQStatisticsScope 策略注解，scope是场景，key是指具体不同策略
 * @author: Weichuan.chen
 * @date: 2021/11/22
 */
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface WQStatisticsScope {
    /**
     * 使用场景
     *
     * @return str
     */
    WQStrategyKeyEnum scope();

    /**
     * 具体策略
     *
     * @return str
     */
    String strategyKey();
}
```

4、策略参数父类
```java
/**
 * @description: WQStrategyContext 策略工厂参数父类
 * @author: Weichuan.chen
 * @date: 2021/11/22
 */
@Getter
@Setter
public abstract class WQStrategyContext {

    public abstract void doSomething();
}

```

5、策略枚举类
```java
/**
 * @description: WQStrategyKeyEnum 每个应用域的策略名称
 * @author: Weichuan.chen
 * @date: 2021/11/22
 */
public enum WQStrategyKeyEnum {
    /**
     * 场景1 ex:设备联动
     **/
    DEVICE("0"),

    /**
     * 场景2 ex:消息通知
     */
    MSG("1"),
    ;

    @Getter
    private final String key;

    WQStrategyKeyEnum(String key) {
        this.key = key;
    }
}
```

6、大概使用流程
```java

/**
 * 策略工厂的实现
 *
 * @author WQ
 * @date 2023/12/8/008
 * @since 1.0.0
 */
public class StrategyDemo {
    WQStrategyFactory<? extends WQStrategyContext> factory = WQStrategyFactory.getInstance();

    public void test() {
        WQStrategyContext sim = factory.create(WQStrategyKeyEnum.DEVICE, "1");

        sim.doSomething();
    }
}

@WQStatisticsScope(scope = WQStrategyKeyEnum.MSG, strategyKey = "1")
class Sim extends WQStrategyContext {
    @Override
    public void doSomething() {
        // 短信推送
    }
}

@WQStatisticsScope(scope = WQStrategyKeyEnum.MSG, strategyKey = "2")
class Sim2 extends WQStrategyContext{
    @Override
    public void doSomething() {
        // 邮件推送
    }
}

@WQStatisticsScope(scope = WQStrategyKeyEnum.DEVICE, strategyKey = "1")
class Device2 extends WQStrategyContext{
    @Override
    public void doSomething() {
        // 设备触发
    }
}

```






