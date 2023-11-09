<template>
    <div class="footer">
        <p class="intro rflex">
            <span>作者: THESHY</span>
            <a :href="github" target="_blank">
                <icon-svg icon-class="iconGithub" />
            </a>
            <span>联系方式：13888888888</span>
        </p>
        <p class="beian">努力奋斗的前端开发工程师</p>
    </div>
</template>

<script>
import { github } from '@/utils/env'

export default {
    name: 'FooterNav',
    data() {
        return {
            github,
        }
    },
    methods: {},
}
</script>

<style lang="scss">
.footer {
  width: 100%;
  padding: 10px 0;
  font-size: 12px;
  text-align: center;
  background: #fff;
  p {
    line-height: 30px;
  }
  .intro {
    width: 240px;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
