function onSelectAgent() {
    let vm = this,
        allData = this.$refs.agents.getAllData();

    let map = {};

    vm.selected.forEach((sel, index) => {
        map[sel.agent_id] = index;
    });

    allData.forEach(item => {
        const index = map[item.agent_id];

        if (item.checkState === 'checkAll') {
            if (typeof index === "undefined") {
                vm.selected.push(item);
            }
            return;
        }

        if (typeof index === "number") {
            vm.selected.splice(index, 1);
        }
    });
}


/**
 *  allData = [1,2,3,4,5];
 *  selected = [1,2,3];
 */