/**
 * =======================================
 * 剧情片段：喝茶
 * 
 * 注意事项：
 * 由于还不太清楚monogatari的命名空间问题，
 * 建议本文件内所有剧情block的名字都带上tea-前缀
 * =======================================
**/

monogatari.characters ({
	
});

monogatari.action ('message').messages ({
	'tea-essay': {
		title: '你乐了吗？不存在问题的东急猪肉',
		subtitle: '',
		body: `
			<p>东京后勤保障处发出公告，称经过食品安全委员会调查，日前出现的猪肉刺身未检出寄生虫。
            但经过笔者的调查，本批次猪肉供应商存在重大经营资质问题，作为供应商的TOYOAJI会社参保人数仅有一人，
            且经营期间曾经因涉嫌虚假标注生产日期、未经许可经营散装食品等违法行为而受到行政处罚……
            </p>
			<p>东急仅发表了关于猪肉的调查结果，却回避了供应商的资质问题，
            是否有避重就轻之嫌？采购环节究竟存在多少猫腻，请东急正面回答……</p>
		`
	},
	
});

monogatari.script ({
	// 喝茶
    'tea':[
		{
			'Conditional': {
				'Condition': function(){
					const {balcony_forward} = monogatari.storage('story');
					const {care} = monogatari.storage('player');
					return balcony_forward & (care >= 3)
				},
				'0': 'jump tea-ending',
				'1': 'next',
			}
		},
        'stop music normal',
        'play sound new_message',
        'p （好友添加申请：辅导员）',
        'i 啊？辅导员找我？',
		'play sound choices',
        {
			'Choice': {
				'Dialog': 'i 是否添加辅导员为好友？',
				'yes': {
					'Text': '没得选，肯定得加',
					'Do': 'jump tea-chat'
				},
			}
		},
    ],
    'tea-chat':[
        'play music sad loop',
		's 你打开了与辅导员的聊天窗口',
        'fdy {{player.name}}啊，我听说前几天的喊楼事件，你在学生群里转发了相关消息，是这样吗？',
        's 你心里不禁开始打鼓。',
		'play sound choices',
        {
			'Choice': {
				'Dialog': 'fdy 你在学生群里转发了喊楼相关消息，是这样吗？',
				'yes': {
					'Text': '没错，我参加了',
					'Do': 'jump tea-admit'
				},
				'no': {
					'Text': '什么事件？我没听说啊？',
					'Do': 'next'
				},
                'evidence': {
					'Text': '请拿出证据',
					'Do': 'next'
				},
			}
		},
        's 辅导员向你出示了社交软件里的聊天截图，你意识到群里的某个人把你给上报了。',
        'jump tea-admit',
    ],
	'tea-admit':[
		's 辅导员要求你承认错误。',
		'play sound choices',
        {
			'Choice': {
				'Dialog': 's 辅导员要求你承认错误',
				'admit': {
					'Text': '知错了，以后不会再犯',
					'Do': 'jump tea-report-or-not'
				},
				'request': {
					'Text': '我只是提出我的合理诉求',
					'Do': 'jump tea-request'
				},
				'ask': {
					'Text': '难道不是学校的问题？',
					'Do': 'next'
				},
			}
		},
		'i 我的确参加了，因为实在受不了啊，我们都经历了些什么啊？',
		'i 十几天出不了门',
		'i 十几天不洗澡不刷牙',
		'i 上厕所要预约',
		'i 盒饭还老吃到奇怪的东西',
		'i 志愿者强行轮班',
		'i 有困难我们都理解，可是这种违反常理的管理手段真的有利于防疫吗？',
		'fdy 我们老师也是一样的啊，大家都很不容易。但是也希望同学们理解，我们只能在防疫手势允许的范围内动作。',
		'fdy 就比如说这几天食品安全的问题吧。食品安全是头等大事，但是同学们也要理解。',
		'fdy 后勤叔叔阿姨每餐要做三万多份便当，还要进行打包和搬运。现在人手不足的情况下，食品处理肯定不能像以前一样精细……',
		'fdy 希望同学们可以体谅一下后勤校工的辛苦',
		'i 这明明就是管理的问题，为什么要用基层人员挡枪？',
		's 辅导员没有直接回应你的质问。',
		'jump tea-ending-0'
	],
	'tea-request':[
		{'Function':{
			'Apply':function(){
				add_sanity(-1);
				add_school(-1);
			},
			'Reverse':function(){
				add_sanity(1);
				add_school(1);
			},
		}},
		's 你被辅导员批评了一通（精神-1）',
		'jump tea-ending',
	],
	'tea-report-or-not':[
		'fdy 学校都是为了学生好，学生应该和学校共同维护校园秩序，你目前的行为完全不顾防疫大局。',
		'fdy 目前学校正在彻查这个事件，始作俑者必须接受处罚，希望你可以配合学校的工作',
		's 辅导员给你一个戴罪立功的机会，让你检举身边的同学',
		'fdy 就我们目前掌握的信息，你是最早转发消息的人。如果你说不出这条消息是谁发给你的，那我们只能认为你就是第一个发的',
        's 你不禁感到后脊发凉，你意识到，这个消息就是你的室友冈田发给你的',
		'fdy 要是学校发现你有隐瞒的行为，处罚就会更加严重。',
		'play sound choices',
		{
			'Choice': {
				'Dialog': 's 要不要举报你的室友冈田？',
				'yes': {
					'Text': '举报',
					'Do': 'jump tea-report'
				},
				'no': {
					'Text': '不举报',
					'Do': 'jump tea-ending-1'
				},
			}
		},
	],
    'tea-report':[
		's 你抵御不住辅导员的压力，向上举报了冈田', 
        's 你关掉了微信，感觉天旋地转。',
        'show character a normal',
        'a 怎么了，脸色这么差？',
        'a 你也别太郁闷了，已经好一阵子没有新的病例出现了，宿舍也解封了，我有预感三日必能出东京！',
        's 你跟冈田还要做这么多年的同学，你已经完全不知道怎么面对他了。',
        's 你收到了一条信息，显示发信人为辅导员',
        's 你慌忙把手机抓起来，但冈田还是看到了发信人',
        'a 原来是辅导员找你麻烦来了？因为之前那事儿？',
        'i （怎么办……）',
        'a 要是你摊上事儿了，也别急，咱们一起想办法。',
        'i 嗯，嗯……我没事。我先看看辅导员说了什么。',
        'a 你也别太往心里去，辅导员也是被领导加码的打工人嘛，人家没想为难你，顺顺毛就大事化小小事化了了。',
        'i （冈田还不知道我把他卖了……怎么办？！！）',
        'hide character a',
        's 你大脑一片空白，打开了辅导员的信息',
        'fdy 你们以前一直抱怨伙食不好、封控条件太差，学校都没有追究。',
        'fdy 但是你觉得你们现在做的这叫什么事情？你知不知道自己问题出在哪？',
        'fdy 学校现在一直在通过努力让大家的生活恢复到正常，你们因为一些小小的不如意，像吃到你们不喜欢的食物，就在网络上大肆宣传，极尽抹黑学校之能事，引发的后果会波及整个学校，大家都会受到更大的影响。',
        'fdy 你们这是害了全校的同学，还以为自己在声张正义呢？',
        'fdy 你得为你的所作所为承担责任。本来是应该给你下处分的，但是这次先不追究你。',
        'fdy 如果以后你知道网络上是谁在恶意抹黑东急，及时向我报告。',
        'i 这……（是要让我出卖更多同学吗？）',
        {
			'Choice': {
				'Dialog': 's 要不要做信息员？',
				'yes': {
					'Text': '答应',
					'Do': 'jump tea-informant'
				},
				'no': {
					'Text': '拒绝',
					'Do': 'jump tea-reject-informant'
				},
			}
		},
	],
	'tea-ending-0':[
		'show scene #000000 with fadeIn',
		's 之后的事情也不消多说，学院领导的批评、联系家长、接受处分……所有的压力都来了。',
        'a 兄弟，别太往心里去，事情做得对不对，咱心里自己清楚。',
        'jump ending-tea',
	],
	'tea-ending-1':[
		'show scene #000000 with fadeIn',
		's 之后的事情也不消多说，学院领导的批评、联系家长、接受处分……所有的压力都来了。',
        'a 兄弟，别太往心里去，事情做得对不对，咱心里自己清楚。',
        's 你自然没有将检举相关的事情告诉你的室友，你看了看窗外，百感交集。',
        'jump ending-tea',
	],
	'tea-informant':[
		{'Function':{
			'Apply':function(){
				add_sanity(-1);
				add_school(1);
				monogatari.storage({
					story:{
						informant: true
					}
				});
			},
			'Reverse':function(){
				add_sanity(1);
				add_school(-1);
				monogatari.storage({
					story:{
						informant: false
					}
				});
			},
		}},
		's 你决定成为一名信息员，但同时心里仿佛时刻被一块大石头压住了（精神-1）',
		'stop music sad',
        'play music normal loop',
        'jump tea-ending',
	],
    'tea-reject-informant':[
		'i 不好意思，做不了。',
        'i 对比隔壁脚痛浦淡，学校客观上就是做得不好，对外粉饰太平也就算了，现在还分化我们让我们互相检举？',
        'i 真当我们是活在60年代？写大字报的活儿还是找别人吧，我干不来。',
        'fdy 你可以不接受。你理解不了我说的话，我也不强求你理解，',
        'fdy 只不过你觉得哪怕挨处分，给你的人生留下污点也没有关系的话，请便。',
        'i 能不能别整天拿处分威胁人了，真好笑，我要是怕处分的话会转那些信息？',
        's 你关掉了微信，没有再理会辅导员的弹窗',
        'i （只是对不起冈田……即使跟他道歉，他也原谅不了我吧）',
        's 冈田也在刷着手机信息，脸色变得有些凝重。你大概可以猜到他收到了什么信息。',
        's 你的大脑淹没在一片噪声之中，你觉得你做出了你这辈子最后悔的决定。',
        'jump ending-tea',
	],
    


    'tea2':[
        {
			'Conditional': {
				'Condition': function(){
					const {informant} = monogatari.storage('story');
					return informant
				},
				'False': 'jump tea2-ending',
				'True': 'next',
			}
		},
		's 你刷着手机，没过多久，围脖上一条热搜消息引起了你的注目。',
		'show message tea-essay',
        'show character a normal', 
        'a {{player.name}}，我看了网上同学的一些分析，他们追查了这家猪肉供应商。', 
        'i ……我也看到这条消息了。', 
        'a 这几天查得这么严，还是顶风发了啊……', 
        'a 辅导员昨天都找到我了。', 
        'i ……也是因为之前转发的那个事儿？', 
        'a 还能是什么事儿，你昨天也是因为这个事儿被联系的吧？', 
        'i （要糟……冈田是来找我算账了！）', 
        'a 我坚持说我没发过，但是他们一副证据确凿的样子。没几个人知道我转发了消息，应该也没人会把我卖了，我怀疑我们ip被查了。', 
        'i ……原来如此，这就说得通了……', 
        'i 辅导员有说要下处分吗？', 
        'a 我装无辜可在行了，这次他们应该没法拿我怎么着，但之后可能会被重点关照。', 
        'a 之后发东西得小心点了，可能得找校外的同学代发之类的，', 
        'a 校外势力坐实了，哈哈……', 
        'i （还好冈田没事）', 
        'a 希望扒供应商的同学别也被找喝茶了。', 
        'a 他们发现这家供应商进口冻肉虽然被海关因为新冠病毒拦下来过，但并无直接证据说明我们吃的这批肉有任何寄生虫这类的严重问题', 
        'a 所以就寄生虫来说，还真可能没有。但猪乳头的确没有按国家标准将它去掉。', 
        'show character a sad', 
        'a 唉，从另一方面来说，猪肉事件这些，平日在东京城里还发生得少吗……只是因为近日情况过于离谱，才让这些见不得台面的东西暴露在聚光灯之下……', 
        'hide character a',
		'i （没心思听他的评论啊……）', 
        'i （我知道这篇文章是谁发的。）', 
        's 想罢，你打开了你微信里的一个群聊',
        'qz 扒供应商的文章上地区热搜第二了！',
        'qya 应该不会查到咱们头上吧？',
        'qz 没事儿，这个群小，文章也是别人代发的，应该不会查到咱们',
        'qz 不过以防万一，咱们就地解散吧，江湖再见！',
        'qyb 互加一下吧',
        'qyc 咱们也算并肩战斗过了，嘿嘿',
        's 群聊[云端步兵]已解散',
        's 你接受了[群主]的好友邀请',
		's 这时你想起辅导员曾经说的话：',
		'fdy 学校现在一直在通过努力让大家的生活恢复到正常，你们却因为一些小小的不如意，像吃到你们不喜欢的食物，就在网络上大肆宣传，极尽抹黑学校之能事，引发的后果会波及整个学校，大家都会受到更大的影响……',
		'fdy 如果以后你知道网络上是谁在恶意抹黑东急，及时向我报告。',
        {
			'Choice': {
				'Dialog': 's 要不要向辅导员报告？',
				'yes': {
					'Text': '报告',
					'Do': 'jump tea2-informant'
				},
				'no': {
					'Text': '不报告',
					'Do': 'jump tea2-reject-informant'
				},
			}
		},
	],
    'tea2-informant':[
		's 趁冈田出去打饭向辅导员举报了发文章的同学', 
        'a {{player.name}}，饭来咯，自从猪肉事件之后伙食好了不少啊', 
        'a ……你在做什么？', 
		'stop music normal',
		'play music sad loop',
        'i ……', 
        'a ……', 
        'a 你在向辅导员打小报告？', 
        'a ……{{player.name}}，不会也是你把我抖给辅导员的吧？', 
        'i 我……', 
        'i （应该向冈田道歉……但……）', 
        'i 我意识到了，我们不应该转那些图的，你知道，学校现在一直在通过努力让大家的生活恢复到正常……', 
        'a 我tm真是个sb，你什么也别说了，好自为之吧。',
        'i （冈田一言不发地转过身去，便当也扔在地上没有拿）', 

		'show scene #000000 with fadeIn',
        'i （接下来的两天，气氛一直僵持着，抗原各做各的，盒饭打回来也是扔在地上自取）', 
        'i （一想到冈田可能会把我告密的事情说出去我就感觉脊背发寒）', 
        'i （但他还是为我保留了最后的颜面，事情没有暴露）', 
        's 就这样，迎来了返乡的一天', 
		'show scene street',
        'i （坐在离校的班车上，什么也感觉不到，今年秋季我还会返回校园，但和冈田的友情已经不可能恢复了）', 
        'i 这几个月来学校里的事，实在是太离谱了……', 
        'i 老师都很认真努力，学生也在尽力配合。大家都想做一个好人，但为什么最后都不满意，都很无奈？', 
        'i 我们应该怪谁？是谁没有做好？', 
		'stop music sad',
        'jump ending-tea',
	],
    'tea2-reject-informant':[
		'i “让人说话，天不会塌下来，自己也不会垮台。不让人讲话呢？那就难免有一天要垮台。”',
		'i 记得中国的哪个历史人物这么说过……',  
		'i 学校之所以对外粉饰太平，尽力压制负面的声音，不是为维护学校生活的安定，更多地是为了避免社会对于学校管理水平的声讨，开脱责任吧？', 
		'i 不让人讲话，把问题都藏着掖着。新闻内外的东急是两个东急，东京内外的东京是两个东京。我们生活的世界分裂成了两个。',
		'i 之前因为辅导员的威逼，脑子一懵把冈田供出去了，这次可不能再犯糊涂了。', 
		's 冈田好像注意到你在发呆，拍了你一下', 
		'a 兄弟，还在烦心辅导员那事儿哪？别太往心里去，事情做得对不对，咱心里自己清楚。', 
		'i 你自然没有将检举相关的事情告诉你的室友。但是你知道应该怎么做了。', 
		'i （之后再跟冈田好好道歉吧……）', 

		's 你向云端步兵群主发起了一个聊天',
		'i 朋友，你还好么？',
		'qz 艹，辅导员找我了，离了个大谱',
		'qz 辅导员说他们能查到我们微信的聊天记录，那换ip有个啥用',
		'i （？冷静点……事情应该不是这样的。毕竟学校找人的手段，我略有了解了不是么？）',
		'i 我觉得更可能是群里有内鬼',
		'i 除非公安立案调查，否则学校应该是没有权利查看学生的微信聊天内容的，基层民警也没有这种权限。如果他们真的调取了，那么就是非法调查手段，',
		'i 既然当时已经找了校外的号代发，群也解散了，按理说他们是没有什么确凿的证据的，只要跟辅导员说自己没做过就是。',
		'qz 你说得在理，我试试啊兄弟',
		's 你关掉了微信',
		
		'i 冈田，我有事要说',
		'show character a normal',
		'a 听着呢',
		's 你向冈田解释了向辅导员举报的经过',
		'show character a sad',
		'a ……',
		'a 我不是没猜想过这种可能，昨天辅导员也问我说是谁发的文章了。我当时也多少想过会不会是你，但不想起疑。你是要气死爸爸吗？',
		'i 抱歉……我当时应该顶下来的。',
		'show character a normal',
		'a 唉。我仔细想了，这事儿倒也不全怪你。',
		'a 当时辅导员拿处分压我，我也慌了，之后要是档案上留下处分，不管评优还是求职估计都够呛吧？我是不太在意评优，但是像你这样一直拿奖学金的，肯定吓懵了。',
		'i ……其实处分对我来说不是最大的威胁，关键是他们还要通知我家长……我真的不想和家人沟通这些事……你…不记恨我？',
		'show character a happy',
		'a 你说什么哪？我要是记恨你，就完蛋了，他们就是想让我们互相猜忌。',
		'show character a normal',
		'a 之前谁经历过这场面呀，体验过了才理解为啥之前有些事情里和学校沟通的同学为什么那么谨慎而委屈。哪怕你什么当面的惩罚都不怕，他们在这个学校里也总是比你有权力，总能给你穿小鞋。',
		'a 我看到过东急某性别社团的同学发fb动态，讲述自己被校内保安跟踪的经历呢。遇上这种事，害怕也是人之常情呀。',
		'a 也算吃一堑长一智吧，我后来仔细想了想，这个处分也不是能随便给的，总要有明确的校规吧，当时可以据理力争的。',
		'a 有的处分一年半载也就取消了，未必有多大影响。而且那个时候真的给咱们处分，反倒是学校下不了台。',
		'a 想来想去，不过是费劲心思扮凶而不去解决实际问题的纸老虎。你也别太往心里去，反正最后也没出什么事。',
		'i ！！真的，后来想想不少话都是在吓唬人，又是诱导提问，又是情绪攻击的，太坏了！过了很久还会不断想起。',
		'i 越是想明白里面的谎言和伎俩，就越会自责为什么当时不能做的更好，保护好自己的朋友……真的不好意思……',
		'show character a sad',
		'a 唉，我也常常会懊悔于一些回答的细节。其实我们并没有做错什么，不是吗？',
		'show character a normal',
		'a 我们可以更理直气壮的，只是缺少了一些经验，没有道理让我们独自在暗处承受这些恐惧和创伤。如果未来有机会的话，希望我们能把这些说出来。',
		'a 诶说真的，经历了这一切，再让你选一次，你还愿意再转发那条喊楼的图片吗？',
		{
			'Choice': {
				'Dialog': 's 你还愿意再转发那条喊楼的图片吗？',
				'yes': {
					'Text': '我……可能会很犹豫',
					'Do': 'next'
				},
				'no': {
					'Text': '嗯…我想我还是愿意的',
					'Do': 'next'
				},
			}
		},
		'a 怎么选我都支持你的。站出来说话确实有风险，未必只有这种方式才能表达自己的态度，我想我们总有自己的方法传递自己的心意和对真相、道理的关切，只是需要彼此支持。',
		'a 你也别一直纠结了。为表歉意，解封了不得请我搓顿好的？',
		'i 必须的！',
		'hide character a',
		
		's 你打开与云端步兵群主的聊天',
		'qz 辅导员好像真没继续纠缠我了',
		'qz 厉害啊兄弟',
		'i 没什么，应该的',

		{'Function':{
			'Apply':function(){
				add_sanity(2);
				add_school(-2);
			},
			'Reverse':function(){
				add_sanity(-2);
				add_school(2);
			},
		}},
		's 你关掉了聊天。随着心里的石头落地，你感受到前所未有的轻松与愉快（精神+2）',
		'i 只要疫情继续下去…不，只要东急还在，发声和封口的追逐战就会不断持续下去吧。',
		'i 也许以我现在的立场不方便在公共平台发表什么言论，但至少我可以试着捍卫别人发声的权利……',
		'i 说起来，真奇怪呀，好像经历了这一切之后，我反倒有了对东急的认同。',
		'i 不是因为那些领导们，而是因为我第一次和那么多身边的人一起参与了这个学校的决策讨论，第一次体会到了那些被喝茶的同学们的难过……那些隐形的一切在疫情之中反倒被揭示。',
		'i 多少有些担心 ，如果疫情结束了，是不是我们的公共生活也就此结束了……',
		{
			'Choice': {
				'Dialog': 'i 如果疫情结束了，是不是我们的公共生活也就此结束了？',
				'yes': {
					'Text': '特殊时期过去了，就要回到日常生活了吧',
					'Do': 'next'
				},
				'no': {
					'Text': '过去那种生活好像再也回不去了，我可能还是期待未来能在这个学校里有更多公共生活',
					'Do': 'next'
				},
			}
		},

        'jump tea2-ending',
	],
});