---
title: leetcode 小技巧
icon: fire
category:
  - 算法
tag:
  - leetcode
---

##  1、做题顺序
- （最好大学就开始，工作如果要冲中大厂也需要学）

按类目去做，先做简单再做复杂。

推荐的顺序：字符串 --> 数组（二维，三维） --> 队列/堆栈 --> 递归 --> 动态规划dp --> 背包等实际问题

这一套学完之后就可以去打周赛，前期不要太在意成绩和时间。（打击人~）

##  2、leetcode 小技巧

### 2.1、取模运算
```text
# 对于任何非负整数X，如果要取后面 N 位，则 X % 10^N = X - (X // 10^N) * 10^N
1999 % 10^3 = 999

# 对于二进制取模，X % 2^N = X的后N位（为什么要知道这个？基因法）
1011 % 010 = 11 % 2^1 = 11 % 2 = 1 
1011 % 110 = 11 % 2^3 = 0011 = 3
1111 % 110 = 15 % 2^3 = 0111 = 7
```
### 2.2、位运算
```java
//异或/或/与/非 等操作， 通常是查询不同的数字等场景会出现

public static int findOdd(int[] nums) {
    int result = 0;
    for (int num : nums) {
        result ^= num; // 累积异或
    }
    return result;
}
```

### 2.3、最大最小值
```java
// 通常比较两个数最大值最小值，或者是边界值划定的时候，
// 都是赋值最大值Integer.MaxValue/Integer.MinValue 求最小值，或相反。

public class BoundaryExample {
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5};

        // 初始化最大值
        int maxValue = Integer.MIN_VALUE;
        for (int num : nums) {
            if (num > maxValue) {
                maxValue = num;
            }
        }
        System.out.println("Max value: " + maxValue);

        // 初始化最小值
        int minValue = Integer.MAX_VALUE;
        for (int num : nums) {
            if (num < minValue) {
                minValue = num;
            }
        }
        System.out.println("Min value: " + minValue);
    }
}
```


