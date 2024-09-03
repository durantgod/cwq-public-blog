<template><div><h2 id="视频识别项目" tabindex="-1"><a class="header-anchor" href="#视频识别项目" aria-hidden="true">#</a> 视频识别项目</h2>
<h3 id="_1、大体结构主要可以分为四个部分-管理端-分析端-yolov5端-ffmpeg推流端" tabindex="-1"><a class="header-anchor" href="#_1、大体结构主要可以分为四个部分-管理端-分析端-yolov5端-ffmpeg推流端" aria-hidden="true">#</a> 1、大体结构主要可以分为四个部分，管理端，分析端，yoloV5端，ffmpeg推流端</h3>
<p>大体结构图如下：<br>
<img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/LLM/yolo.svg" alt="" loading="lazy"></p>
<h3 id="_2、管理端-主要功能是视频管理、算法管理、布控管理" tabindex="-1"><a class="header-anchor" href="#_2、管理端-主要功能是视频管理、算法管理、布控管理" aria-hidden="true">#</a> 2、管理端，主要功能是视频管理、算法管理、布控管理</h3>
<p>首先项目使用的python版本是3.10，所以提前准备好环境。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 创建虚拟环境</span>
python <span class="token parameter variable">-m</span> venv venv

<span class="token comment"># 切换到虚拟环境</span>
venv<span class="token punctuation">\</span>Scripts<span class="token punctuation">\</span>activate

<span class="token comment"># 更新虚拟环境的pip版本</span>
python <span class="token parameter variable">-m</span> pip <span class="token function">install</span> <span class="token parameter variable">--upgrade</span> pip <span class="token parameter variable">-i</span> https://pypi.tuna.tsinghua.edu.cn/simple

<span class="token comment"># 在虚拟环境中安装依赖库</span>
python <span class="token parameter variable">-m</span> pip <span class="token function">install</span> <span class="token parameter variable">-r</span> requirements.txt <span class="token parameter variable">-i</span> https://pypi.tuna.tsinghua.edu.cn/simple
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>项目地址：<a href="https://github.com/chenweiquan-red/cwq-public-video-admin.git" target="_blank" rel="noopener noreferrer">https://github.com/chenweiquan-red/cwq-public-video-admin.git<ExternalLinkIcon/></a></p>
<p>启动后的展示：<br>
<img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/LLM/videoadmin.png" alt="" loading="lazy"></p>
<h3 id="_3、模型分析端pytorch" tabindex="-1"><a class="header-anchor" href="#_3、模型分析端pytorch" aria-hidden="true">#</a> 3、模型分析端pytorch</h3>
<p>项目地址：<a href="https://github.com/chenweiquan-red/cwq-public-video-pytorch.git" target="_blank" rel="noopener noreferrer">https://github.com/chenweiquan-red/cwq-public-video-pytorch.git<ExternalLinkIcon/></a></p>
<h3 id="_4、分析器-目前是非源码阶段-后续补充" tabindex="-1"><a class="header-anchor" href="#_4、分析器-目前是非源码阶段-后续补充" aria-hidden="true">#</a> 4、分析器，目前是非源码阶段，后续补充</h3>
<p>夸克网盘：<a href="https://pan.quark.cn/s/241663b61805" target="_blank" rel="noopener noreferrer">https://pan.quark.cn/s/241663b61805<ExternalLinkIcon/></a> 提取码：6MXu</p>
<p>ps: 这里是所有打包好的，包括前三步骤，如果执行了前三个步骤，这里可以只跑 VideoAnalyzer.exe<br>
<img src="https://wqknowledge.oss-cn-shenzhen.aliyuncs.com/LLM/vide04.png" alt="" loading="lazy"></p>
<h3 id="_5、推流端" tabindex="-1"><a class="header-anchor" href="#_5、推流端" aria-hidden="true">#</a> 5、推流端</h3>
<p>跑第四步data中的bat</p>
<p>未完待定.....</p>
</div></template>


