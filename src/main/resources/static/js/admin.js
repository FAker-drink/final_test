new Vue({
    el: "#admin",
    data: function() {
        return {
            host: "/boot/",
            pageNum: 1,
            pageSize: 3,
            total: 0,
            searchObj: {
                clientid: "",
                clientname: "",
                clientpwd: "",
                clientemail: "",
                clientright: "",
                logintime: ""
            },
            mofiIndex: -1,
            tableData: [],
            pageInput: 1
        }
    },
    created: function() {
        this.select();;
    },
    methods: {
        select: function() {
            var _this = this

            var obj = Object.assign(_this.searchObj,{
                pageNum: this.pageNum,
                pageSize: this.pageSize
            })
            $.post({
                url: this.host + "getallusers",
                data: obj,
                success: function(res) {
                    _this.pageInput = _this.pageNum
                    _this.tableData = res.list
                    _this.total = res.total
                }
            })
        },
        del: function(clientId) {
            var _this = this
            $.post({
                url: this.host + "delclient?clientid=" + clientId,
                success: function(res) {
                    if (res) {
                        alert("删除成功")
                        _this.select()
                    } else {
                        alert("删除失败")
                    }
                }
            })
        },
        next: function() {
            if (this.pageNum == Math.ceil(this.total / this.pageSize)) return
            this.pageNum++
            this.select();
        },
        prev: function() {
            if (this.pageNum == 1) return
            this.pageNum--
            this.select()
        },
        pageBlur: function() {
            if (this.pageNum > 0 && this.pageNum < Math.ceil(this.total / this.pageSize) && this.pageNum == parseInt(this.pageNum)) {
                this.select();
            }
        },
        pageChange(i) {
            this.pageNum = i
            this.select()
        },
        go () {
            if (this.pageInput < 1 || this.pageInput > Math.ceil(this.total/this.pageSize) || parseInt(this.pageInput) != this.pageInput) {
                this.pageInput = this.pageNum
                return
            }
            this.pageNum = this.pageInput
            this.select()
        }
    }
})
