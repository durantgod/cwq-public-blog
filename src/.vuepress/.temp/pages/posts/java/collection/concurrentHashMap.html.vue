<template><div><h1 id="concurrenthashmap-的前因后果" tabindex="-1"><a class="header-anchor" href="#concurrenthashmap-的前因后果" aria-hidden="true">#</a> ConcurrentHashMap 的前因后果</h1>
<h3 id="_1、concurrenthashmap-作用" tabindex="-1"><a class="header-anchor" href="#_1、concurrenthashmap-作用" aria-hidden="true">#</a> 1、ConcurrentHashMap 作用</h3>
<pre><code>concurrentHashMap 首先是线程安全的，与之相反的是hashMap非线程安全，还有与之类似的hashTable。
</code></pre>
<p>主要作用是再扩容或者新增的过程中保证线程安全， 插入的元素不丢失，获取元素时不报错。</p>
<p>不会像hashMap在扩容过程中， 形成环形链表，导致查询数据时报错。</p>
<p>hashMap的插入逻辑代码截图：<br>
<img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/collection/hashMap.png" alt="" loading="lazy"></p>
<p>hashTable的插入逻辑代码截图：<br>
<img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/collection/hashTable.png" alt="" loading="lazy"></p>
<h3 id="_2、concurrenthashmap-1-8变化" tabindex="-1"><a class="header-anchor" href="#_2、concurrenthashmap-1-8变化" aria-hidden="true">#</a> 2、ConcurrentHashMap 1.8变化</h3>
<p>1.7是采用segment分段锁，数组+链表+红黑树，线程安全是使用ReentrantLock<br>
1.8之后是node数组+链表+红黑树，使用cas+synchronized代替</p>
<pre><code>1、判断Node[]数组是否初始化，没有则进行初始化操作
2、通过hash定位Node[]数组的索引坐标，是否有Node节点，
如果没有则使用CAS进行添加（链表的头结点），添加失败则进入下次循环。

3、检查到内部正在扩容，如果正在扩容，就帮助它一块扩容。

4、如果f!=null，则使用synchronized锁住f元素（链表/红黑二叉树的头元素）
4.1 如果是Node(链表结构)则执行链表的添加操作。
4.2 如果是TreeNode(树型结果)则执行树添加操作。

5、判断链表长度已经达到临界值8 就需要把链表转换为树结构。
</code></pre>
<figure><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/collection/concurrentHashMap.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_3、concurrenthashmap-思考" tabindex="-1"><a class="header-anchor" href="#_3、concurrenthashmap-思考" aria-hidden="true">#</a> 3、ConcurrentHashMap 思考</h3>
<p>1、ConcurrentHashMap 为什么放弃了分段锁，有什么问题吗，你如何设计。</p>
<pre><code>    1、锁竞争，虽然采用分段锁, 针对每段锁粒度还是太大，太重
    2、内存开销，每个段维护一个锁，内存有消耗。
    采用更小粒度的cas+sync代替，效果会更好。可能有人说sync效果比reentrantLock差，实际上经过1.8
    优化后，sync性能和ree差不多。
</code></pre>
<h3 id="_4、concurrenthashmap-总结" tabindex="-1"><a class="header-anchor" href="#_4、concurrenthashmap-总结" aria-hidden="true">#</a> 4、ConcurrentHashMap 总结</h3>
<p>①在jdk1.8，直接摒弃了Segment的概念，直接采用Node数组+链表+红黑树来实现，并发控制使用synchronized和CAS来操作。</p>
<p>②Hashtable则直接对整个结构加锁（synchronized）来保证线程安全，效率非常低下。当一个线程访问同步方法时，其它线程也访问同步方法，可能会进入阻塞或轮询状态，如果使用put添加元素，另一个线程就不能使用put添加元素，也不能使用get。</p>
<p>③不能取代HashMap： Hashtable的任何操作都会把表锁住，是阻塞的，好处是总能够获取最实时的更新，ConcurrentHashMap为非阻塞的，在更新时会局部锁住某部分数据，但不会把整个表都锁住，同步读取操作是完全非阻塞的，在合理条件下效率非常高，坏处是在大量的读取操作时不能保证数据的实时更新。</p>
</div></template>


