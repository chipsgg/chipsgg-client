# chipsgg-client
Simple client abstraction for the chipsgg development platform.

## ChipsGG([SOCKET_URL], [AUTH_URL])
Below is an example of how the client library can be initialized with vuejs.

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ChipsGG from 'chipsgg-client'

async function init() {
  const props = await ChipsGG()

  return new Vue({
    router,
    render: createElement =>
      createElement(App, {
        props,
      }),
  }).$mount('#app')
}

init()
```
