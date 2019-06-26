/* eslint-disable */
export default {
  install(Vue) {
    // 添加实例方法
    Vue.prototype.iframeCommunicate = (function iframeCommunicate() {
      let pWindow = null,
        callbackList = [],
        callbackId = 0;

      // 每条消息都有唯一id, 用来一对一回调
      let msgId = 0

      // 目标源
      const TARGET_ORIGIN = window.location.origin;

      // 监听接收信息
      window.addEventListener('message', function recieveMessage(event) {
        if (event.origin !== TARGET_ORIGIN) {
          return;
        }

        let {data, eventName, msgId} = event.data;
        // 存
        callbackList.filter((item) => item.eventName === eventName).forEach((callbackItem) => {
          let {callback} = callbackItem;
          // callback.apply(null, Object.assign({}, data));

          if (typeof data === 'string') {
            callback(data, msgId);
          } else {
            callback(Object.assign({}, data), msgId);
          }
        });
      }, false);

      /**
       * 设置窗口
       * @param window
       */
      function setContentWindow(window) {
        console.log('setContentWindow', window)
        if (pWindow) return;
        pWindow = window;
      }

      /**
       * 发送信息
       * @param eventName
       * @param msg
       * @param msgId: 消息id, 用于一对一回调
       */
      function post(eventName, msg, msgId) {
        pWindow.postMessage({
          eventName,
          data: msg,
          msgId: msgId || 0
        }, TARGET_ORIGIN);
      }

      /**
       * 接收信息
       * @param eventName
       * @param callback
       * @return {unsubscribe}
       */
      function on(eventName, callback) {
        let itemid = callbackId++;
        callbackList.push({
          itemid,
          eventName,
          callback
        });

        return function unsubscribe() {
          let deleteIndex = callbackList.findIndex((item) => item.itemid === itemid);
          callbackList.splice(deleteIndex, 1);
        }
      }

      function off(eventName) {
        callbackList = callbackList.filter(
          (item) =>
            item.eventName !== eventName
        )
      }

      // 80%的通知都是同步的(一个请求一个返回)
      // 所以可以使用这个方法来简化异步调用
      // 注意: 请一定和onAndResponse匹配使用, 否则将产生很多无用listener并且无法销毁
      async function postAndCallback(topic, data) {
        msgId++
        post(topic, data, msgId)
        // 等待异步
        return await new Promise((resolve, reject) => {
          // 闭包问题
          let msgId2 = msgId
          // 在onAndResponse中的回调格式是: {data: rsp, error: error}
          let l = ({data, error}) => {
            // callback once
            off(topic + '_cb@@' + msgId2)
            if (error) {
              reject(error)
              return
            }

            resolve(data)
          }

          // 请配合onAndResponse使用, 否则此listener无法销毁
          on(topic + '_cb@@' + msgId2, l)
        })
      }

      // eg. onAndResponse('topic', {id: 100})
      function onAndResponse(topic, callback) {
        let l = async (data, msgId) => {
          let error = ''
          let rsp = null
          try {
            rsp = await callback(data)
          } catch (e) {
            error = e + ''
          }

          post(topic + '_cb@@' + msgId, {data: rsp, error: error})
        }
        on(topic, l)
      }

      return {
        setContentWindow: setContentWindow,
        post: post,
        on: on,
        off: off,
        onAndResponse,
        postAndCallback
      }
    })();
  }
}
