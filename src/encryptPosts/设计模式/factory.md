---
icon: lock
category:
  - 设计模式
tag:
  - 工厂模式
---

# 工厂模式
### 工厂模式一般有三种角色，抽象产品，具体产品，工厂
::: tabs
@tab:active  简单工厂

```java
// 伪代码
/**
 * 定义抽象产品-车
 */
public interface Car {
}

/**
 * 定义具体产品--比亚迪
 */
public class BYDCar implements Car{
}

/**
 * 定义工厂
 */
public class CarFactory {
    /**
     * 生产汽车
     *
     * @return Car
     */
    Car create(String name) {
        if (name.equals("BYD")) {
            return new BYDCar();
        }
    }
}
```

@tab 工厂方法

```java
// 工厂方法是指多了具体产品的工厂，每个工厂有个抽象的工厂接口，定义生产接口

/**
 * 定义抽象产品-车
 */
public interface Car {
}

/**
 * 定义具体产品--比亚迪
 */
public class BYDCar implements Car {
}

/**
 * 抽象工厂
 */
public interface CarFactory {
    /**
     * 生产汽车
     *
     * @return Car
     */
    Car create();
}

/**
 * BYD汽车工厂
 */
public class BYDCarFactory implements CarFactory {
    @java.lang.Override
    public Car create() {
        return new BYDCar();
    }
}
```

@tab 抽象工厂

```java
// 抽象工厂主要是工厂有了更多的功能，不单单只生产汽车，还会生产汽车用品

/**
 * 抽象工厂
 */
public interface CarFactory {
    /**
     * 生产汽车
     *
     * @return Car
     */
    Car create();

    /**
     * 生产轮胎
     *
     * @return O
     */
    Object createLT();
}

/**
 * BYD汽车工厂
 */
public class BYDCarFactory implements CarFactory {
    @java.lang.Override
    public Car create() {
        return new BYDCar();
    }

    @java.lang.Override
    public Object createLT() {
        return "生产轮胎";
    }
}
```

:::






