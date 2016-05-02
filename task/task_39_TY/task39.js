/**
 * Created by lenovo on 2016-4-27.
 */

var TableTool=(function() {

    function init(opt) {
        var instance = new table(opt);
        return instance;
    }

    function table(opt) {
        this.setOpt(opt);
        this.renderTable();
        this.showTable();
    }

    table.prototype = {
        defaultOpt: {
            append: $('.body'),
            data: {
                thead: [],
                sortSwitch: [],
                tbody: {},
                isSort: true,
                isFrozen: true,
                headColor: 'defaultColor'
            }
        },
        //设置参数
        setOpt: function (opt) {
            if (typeof  opt == 'object') {
                this.opt = $.extend({}, this.defaultOpt, opt);
            }
        },
        renderTable: function () {

            var tableThead = this.opt.data.thead;
            var tableTbody = this.opt.data.tbody;
            var theadStr = '',
                tbodyStr = '',
                tableStr = '';
            //拼接表头数组
            for (var i=0;i<tableThead.length;i++) {
                theadStr += '<th>' + tableThead[i] + '<span></span></th>'
            }

            //拼接表身数组
            for (var x in  tableTbody) {
                var colData = '',
                    rowData = '';
                for (var i = 0; i < tableTbody[x].length; i++) {
                    colData += '<td>' + tableTbody[x][i] + '</td>';
                }
                tbodyStr += '<tr>' + colData + '</tr>';
            }
            tableStr += '<table>'
                + '<thead>'
                + '<tr>'
                + theadStr
                + '</tr>'
                + '</thead>'
                + '<tbody>'
                + tbodyStr
                + '</tbody>'
                + '</table>';
            this.$table = $(tableStr);
            $(this.opt.append).html('');
            $(this.opt.append).append( this.$table);
        },
        showTable: function () {
            if (!this.opt.isSort) {
                this.$table.find('span').hide();
            }
            else {
                for (var i = 0; i < this.opt.data.sortSwitch.length; i++) {
                    if (this.opt.data.sortSwitch[i] === 0) {
                        this.$table.find('span').eq(i).hide();
                    }
                }
            }
            if (this.opt.isFrozen) {
                this.frozenTable();
            }
            if (this.opt.headColor != 'defaultColor') {
                this.$table.find('th').css({
                    background: this.opt.headColor
                });
            }
        },

        frozenTable: function () {
            var $table = this.$table,
                $tableHead = $table.find('thead'),
                tableH = $table.height(),
                headW = $table.width(),
                headStyle = $tableHead.attr('style'),
                headOffsetTop = $tableHead.offset().top;
                headOffsetLeft=$tableHead.offset().left;
            var $headClone = $tableHead.clone().css('opacity', 0).insertBefore($tableHead).hide();

            $(window).on('scroll', function () {
                var scrollTop = $(this).scrollTop();
                if (scrollTop >= (headOffsetTop + tableH)) {
                    if ($tableHead.attr('data-fixed')) {
                        $tableHead.removeAttr('data-fixed').removeAttr('style').attr('style', headStyle);
                        $headClone.hide();
                    }
                }
                    else if (scrollTop > headOffsetTop) {
                        if (!$tableHead.attr('data-fixed')) {
                            $tableHead.attr('data-fixed', true)
                                .css({
                                    position: 'fixed',
                                    top: 0,
                                    left: headOffsetLeft,
                                    'z-index': 9999,
                                    width: headW,
                                    margin: 0
                                });
                            $table.css({
                                'z-index': 8888,
                            });
                            $headClone.show();
                        }
                    }
                    else {
                        if (!!$tableHead.attr('data-fixed')) {
                            $tableHead.removeAttr('data-fixed')
                                .removeAttr('style')
                                .attr('style', headStyle);
                            $headClone.hide();
                        }
                    }

            });

        },

    };
    return {
        init: init
    };

})()

//调用
var table5 = TableTool.init({
    append:$('.table5'),
    data:{
        thead:['姓名','年龄','身高'],
        sortSwitch:[1,1,1],
        tbody:{
            1:['习习',52,180],
            2:['蛤蛤',10000,176],
            3:['丽媛',48,166],
            4:['小平',78,120],
            5:['高富帅',22,188],
            6:['续命',87,182],
            7:['华莱士',43652,153]
        }
    },
    isSort:true,
    isFrozen:true,
    headColor:'#009c4c'//defaultColor















});