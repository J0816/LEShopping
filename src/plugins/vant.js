// 按需全局引入 vant组件
import Vue from 'vue'
import {Button, List, Cell, 
    Tabbar, TabbarItem,Search,
    Swipe, SwipeItem ,Sticky ,Lazyload ,
	Dialog ,GoodsAction, GoodsActionIcon, GoodsActionButton ,
	SubmitBar, SwipeCell ,card,checkbox,RadioGroup, Radio ,
	Col, Row , Checkbox, CheckboxGroup ,Toast ,Card , PasswordInput, NumberKeyboard,
	Divider 
 } from 'vant'
Vue.use(Button)
Vue.use(Cell)
Vue.use(List)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(Search)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Sticky)
Vue.use(Lazyload)
Vue.use(Dialog)
Vue.use(GoodsAction)
Vue.use(GoodsActionIcon)
Vue.use(GoodsActionButton)
Vue.use(SubmitBar)
Vue.use(SwipeCell)
Vue.use(card)
Vue.use(checkbox)
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Col);
Vue.use(Row);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Toast);
Vue.use(Card);
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.use(Divider);
