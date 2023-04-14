<template>
    <div id="bread_container" class="bread_container">
        <span class="bars" @click="handleLefeMenu">
            <icon-svg
                icon-class="iconmenu-fold"
                :class="{ isactive: changeBarDirection }"
            />
        </span>
        <el-breadcrumb class="breadcrumb" separator="/">
            <el-breadcrumb-item v-for="(name, index) in matchedArr" :key="index">
                {{ name }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data() {
        return {
            changeBarDirection: false,
        }
    },
    computed: {
        matchedArr() {
            let temp = [],
                temps = []
            this.$route.matched.filter((item, index, self) => {
                console.log(item)
                // if(item.meta.title){
                // 	const title = item.meta.title;
                //     temp.push(title);
                // }
                if (item.meta.title) {
                    const name = item.meta.title
                    temp.push(name)
                }
            })
            temp.filter((item, index, self) => {
                if (!temps.includes(item)) {
                    temps.push(item)
                }
            })
            return temps
        },
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {
        handleLefeMenu() {
            this.$store.dispatch('setLeftCollapse') // 折叠菜单
            this.$store.dispatch('handleLeftMenu') // 改变菜单宽度 180->35/35-180
            this.changeBarDirection = !this.changeBarDirection
        },
    },
}
</script>

<style lang="scss">
.bread_container {
  background-color: #eaebec;
  width: 100%;
  .bars {
    float: left;
    margin: 4px 10px;
    cursor: pointer;
    .isactive {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
      transition: 0.38s;
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
    }
  }
  .breadcrumb {
    height: 30px;
    line-height: 30px;
    .breadbutton {
      float: left;
      margin: 4px 5px 0 0;
    }
  }
}
</style>
