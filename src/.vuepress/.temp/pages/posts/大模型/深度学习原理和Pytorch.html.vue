<template><div><h2 id="《深度学习原理和pytorch》" tabindex="-1"><a class="header-anchor" href="#《深度学习原理和pytorch》" aria-hidden="true">#</a> 《深度学习原理和pytorch》</h2>
<h3 id="_1、简介" tabindex="-1"><a class="header-anchor" href="#_1、简介" aria-hidden="true">#</a> 1、简介</h3>
<h4 id="_1-3-2、深度网络架构" tabindex="-1"><a class="header-anchor" href="#_1-3-2、深度网络架构" aria-hidden="true">#</a> 1.3.2、深度网络架构</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>深度网络架构主要是网络架构的构建和拓扑连接结构，主要有三种：
1、前馈神经网络
2、卷积神经网络，CNN
3、循环神经网络，RNN
4、新型网络架构
5、人工神经网络（ANN）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/LLM/cnn.png" alt="" loading="lazy"><br>
CNN: 每一个立方体都是一系列规则排列的人工神经元集合。每个神经元到上一层次的连接称为卷积核，这是一种局域的小窗口。图1.6中的小锥形可以理解为从高层的某一<br>
个神经元到低层多个神经元之间的连接。这个小锥形在立方体上逐像素的平移就构成了两层次之间的所有连接。到了最后两层，小立方体被压缩成了一个一维的向量，<br>
这就与普通的前馈神经网络没有任何区别了</p>
<p>RNN: 广泛应用于自然语言处理任务中的循环神经网络, 广泛应用于自然语言处理任务中的循环神经网络.</p>
<p>新型：可微分计算机（或称为神经图灵机），谷歌<em>DeepMind</em>提出的计算机架构。AlphaGo就是该公司在2016年的大作之一。</p>
<h4 id="_1-3-3、gpu" tabindex="-1"><a class="header-anchor" href="#_1-3-3、gpu" aria-hidden="true">#</a> 1.3.3、GPU</h4>
<hr>
<p>名词解析：</p>
<ul>
<li>张量，训练运算的过程可以转换高阶矩阵运算</li>
<li>特征学习，深度神经网络的一个特性是会把不同的信息表达到不同层次的网络单元（权重）之中，并且这一提炼过程完全不需要手动干预，全凭机器学习过程自动完成，这就是feature learning</li>
<li>迁移学习,深度神经网络的另一个重要特性就在于特征提取之后的迁移学习(transfer learning)</li>
</ul>
<hr>
<hr>
<p><img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/LLM/cnnrnn.png" alt="" loading="lazy"><br>
我们首先训练一个CNN，让它能够对图像进行准确分类。之后，我们将前面一半网络（图1.11矩形框中的部分）切下来，作为一个特征提取器。然后，<br>
我们在它的后面连接上一个RNN（可以事先训练好这个网络，使它可以生成自然语言）。最后，只要对拼接起来的新网络稍加训练，它就可以完成看图说话的任务了。</p>
</div></template>


