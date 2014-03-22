selectMenu
==========
使用方法：
var idbSelectBar = null;

var config = {
  title: '下拉菜单',
  emptyContent: '没数据默认就是它',
  field: 'like', //标示显示哪个数据栏的东西
  onSelectChanged:change, //调用外部方法
  customBar: true, //是否采取自定义滚动条
  maxItem:3, //大于maxItem是
  containerHeight: '160px'
}

idbSelectBar = $("#jqSelect").exIdbSelect(config);
idbSelectBar.setData( jsonData ); // 供外部调用的公共方法
idbSelectBar.setDefaultSelectIndex(2); // 供外部调用的公共方法

$("#menu").exDrapBar({"containerHeight":"100px"})
});

function change(inx, d){
//接收用户选择的结果所对应的JSON数据
console.log(d)
}

//有三个公共方法：
1、setData //接收数据的公共方法
2、getSelectedData //返回被选的数据的obj
3、setDefaultSelectIndex //设置打开默认选中项
