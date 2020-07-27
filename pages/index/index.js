// 获取应用实例
const app = getApp()

Page({
  data: {
    isBegin: false,
    totalWin: 0,
    isWin: '',
    imgSrc: ['/assets/img/fist.png', '/assets/img/scissors.png', '/assets/img/cloth.png'],
    currentIndex: 0,  // 玩家的选择
    timer: '',
    currentSelect: 0  // 电脑的选择
  },



  // ---------- 监听事件 ----------
  // 监听玩家选择的是 拳头 剪刀 还是布
  handPlayerSelect(event) {
    const index = event.currentTarget.dataset.index;
    this.setData({
      currentIndex: index
    })
  },
  startGame() {
    // 游戏开始
    this.setData({
      isBegin: true
    })
    this.randomSelect();
  },
  endGame() {
    // 游戏结束
    this.setData({
      isBegin: false
    })
    // 停止电脑自动选择
    clearInterval(this.data.timer);
    // 判断输赢
    this.isWin(this.data.currentSelect, this.data.currentIndex);
  },




  // ---------- 自定义函数 ----------
  // 随机更换系统选择
  randomSelect() {
    this.data.timer = setInterval(res => {
      const num = Math.floor(Math.random() * (2 + 1));
      this.setData({
        currentSelect: num
      })
    }, 50)
  },
  // 判断玩家输赢
  isWin(computer, player) {
    switch(computer) {
      case 0:
        if(player == 0) {
          this.changeIsWin(0);
        }else if(player == 1) {
          this.changeIsWin(1);
        }else {
          this.changeIsWin(2);
        }
        break;
        case 1:
          if(player == 0) {
            this.changeIsWin(2);
          }else if(player == 1) {
            this.changeIsWin(0);
          }else {
            this.changeIsWin(1);
          }
          break;
          case 2:
            if(player == 0) {
              this.changeIsWin(1);
            }else if(player == 1) {
              this.changeIsWin(2);
            }else {
              this.changeIsWin(0);
            }
            break;
    }
  },
  changeIsWin(num) {
    // 0: 平局 1: 玩家输了 2: 玩家赢了
    if(num == 0) {
      this.setData({
        isWin: 'Tied!'
      })
    }else if(num == 1) {
      this.setData({
        isWin: 'You Lost!'
      })
    }else {
      this.setData({
        isWin: 'You Win!',
        totalWin: this.data.totalWin + 1
      })
    }
  },




  // 系统事件
  onShareAppMessage(options) {
    return {
      title: '少年，石头剪刀布吧！'
    }
  }
})
