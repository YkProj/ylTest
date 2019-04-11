<template>
  <div class="tabs">
    <ul>
      <router-link to="/home">
        <li>
          <div>
            <i class="iconfont icon-shouye"></i>
          </div>
          <div>
            <span>首页</span>
          </div>
        </li>
      </router-link>
      <router-link to="/shopping">
        <li>
          <div>
            <i class="iconfont icon-shangpu"></i>
          </div>
          <div>
            <span>商城</span>
          </div>
        </li>
      </router-link>
      <router-link to="/myIndex">
        <li>
          <div>
            <i class="iconfont icon-wode"></i>
          </div>
          <div>
            <span>我的</span>
          </div>
        </li>
      </router-link>
    </ul>
  </div>
</template>
<style lang="less">
body {
  margin: 0px;
  padding: 0px;
}
.tabs {
  position: absolute;
  bottom: 0px;
  width: 100%;
  box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.06);
  padding: 5px 0px;
  & ul {
    margin: 0px;
    padding: 0px;
    list-style-type: none;
    width: 100%;
    & li {
      width: 33.3%;
      float: left;
      text-align: center;
      & i {
        font-size: 1.6rem;
        color: #000;
      }
    }
  }
}
</style>


