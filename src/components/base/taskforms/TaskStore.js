export default {

    data: {
        TaskName: "Default",
        TaskMode: "Default",
        TaskSize: 1,
        TaskSettings: {
            nowCheckbox: null,
            everyCheckbox: null,
            onceCheckbox: null,
            betweenCheckbox: null,
            onceDate: null,
            onceTime: null,
            minutes: null,
            randomness: null,
            startTime: null,
            endTime: null,
            message: null,
            listOrder: null,
            count: null,
            searchTerm: null,
            searchType: null,
            likeChance: null,
            replyChance: null,
            retweetChance: null,
            followChance: null,
            scheduleName: null,
            message: null,
            targetId: null,
            proxyProxy: null,
            proxyUser: null,
            proxyPass: null,
            listRandom: null,
        },
        User: {
            userid: null,
            username: null,
            password: null,
            email: null,
            emailpass: null,
            phone: null,
            proxy: null,
            proxyuser: null,
            proxypass: null,
            phone: null,
        },
        ImageList: [],
        DataList: [],
        UserList: [],
    },
    

    convertTaskSettings(obj) {
        Object.keys(obj).forEach(function (key) {
            if (typeof obj[key] === "number") {
                obj[key] = obj[key].toString();
            }
            if (typeof obj[key] === "boolean") {
                obj[key] = obj[key].toString();
            }
            if (obj[key] === null) {
                delete obj[key];
            }
        });
    },

    stripUser(obj) {
        Object.keys(obj).forEach(function (key) {
            if (obj[key] === null) {
                delete obj[key];
            }
        });
    },

    stripUserList() {
        for (let key in this.data.UserList) {
            this.data.UserList[key].id = Number(this.data.UserList[key].id);
            for (let user in this.data.UserList[key]) {
                if (user !== 'id' && user !== 'username') {
                    delete this.data.UserList[key][user];
                }
            }
        }
    },

    stripDataList() {
        //console.log(this.data.DataList);
        let tmpArr = [];
        for (let key in this.data.DataList) {
            for (let sched in this.data.DataList[key]) {
                if (sched === 'id') {
                    tmpArr.push(this.data.DataList[key][sched]);
                }
            }
        }
        //console.log(tmpArr);
        this.data.DataList = tmpArr;
    },

    stripDataListProxy() {
        //console.log(this.data.DataList);
        let tmpArr = [];
        for (let key in this.data.DataList) {
            for (let sched in this.data.DataList[key]) {
                if (sched === 'proxy') {
                    tmpArr.push(this.data.DataList[key][sched]);
                }
            }
        }
        //console.log(tmpArr);
        this.data.DataList = tmpArr;
    },

    resetData() {
        return {
            TaskName: "Default",
            TaskMode: "Default",
            TaskSize: 1,
            TaskSettings: {
                nowCheckbox: null,
                betweenCheckbox: null,
                onceDate: null,
                onceTime: null,
                minutes: null,
                randomness: null,
                betweenTimeOne: null,
                betweenTimeTwo: null,
                message: null,
                listOrder: null,
                count: null,
                searchTerm: null,
                searchType: null,
                likeChance: null,
                replyChance: null,
                retweetChance: null,
                followChance: null,
                scheduleName: null,
                message: null,
                targetId: null,
                proxyProxy: null,
                proxyUser: null,
                proxyPass: null,
                listRandom: null,
            },
            User: {
                username: null,
                password: null,
                email: null,
                emailpass: null,
                phone: null,
                proxy: null,
                proxyuser: null,
                proxypass: null,
                phone: null,},
            ImageList: [],
            DataList: [],
            UserList: [],
        }
    }

}