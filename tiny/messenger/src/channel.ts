import { Storager } from './storage';

const storager = new Storager(sessionStorage);

const onReceiveMessage = function (e) {
  window.parent.postMessage(e.data, '*')
};
let selfChannelNames = [] as string[];
let selfChannels = [] as Array<{ name: string; instance: BroadcastChannel }>;
let registeredNames = storager.getItem('registered') || [] as string[];
let registeredChannels = registeredNames.map(function (name: string) {
  return {
    name,
    instance: new BroadcastChannel(name)
  }
});
registeredChannels.forEach(function ({ instance: channel }) {
  channel.onmessage = onReceiveMessage
});
const registerChannel = new BroadcastChannel('register');

let gConfig: ConfigType = {
  debug: false
}

const onCommandMessageReceived = function (e) {
  gConfig.debug && console.log(e.data)
  const { data } = e
  const { command, payload, channel: sourceChannel } = data as MessageDataType
  switch (command) {
    // 由上层 window 控制自己发送注册消息
    case 'register': {
      const { channelName } = payload
      if (!channelName) {
        return;
      }
      if (selfChannelNames.indexOf(channelName) > -1) {
        return
      }
      selfChannelNames.push(channelName)
      selfChannels = registeredChannels.filter(function (item) {
        return selfChannelNames.indexOf(item.name) > -1
      })
      registeredChannels = registeredChannels.filter(function (item) {
        return selfChannelNames.indexOf(item.name) < 0
      })
      registerChannel.postMessage({
        channelName
      } as RegisterMessageDataType)
      if (selfChannels.length === 0) {
        selfChannels = selfChannelNames.map(function (name) {
          return {
            name,
            instance: new BroadcastChannel(name)
          }
        })
        selfChannels.forEach(function ({ instance }) {
          instance.onmessage = onReceiveMessage
        })
      }
      window.parent.postMessage({
        command: 'registered',
        payload: channelName
      }, '*')

      if (gConfig.debug) {
        console.log('Channel', channelName, 'registered!')
      }

      break;
    }
    case 'communication': {
      const { target } = payload
      const maybeTargetChannels = selfChannels.filter(function (item) {
        return item.name === sourceChannel
      })
      if (maybeTargetChannels.length < 1) {
        throw new Error(`Channel named #${sourceChannel}# not initialized, please send register message first`)
      }

      if (!target) {
        return;
      }

      // 同个窗口下的应用间通信
      if (selfChannelNames.indexOf(target) > -1) {
        onReceiveMessage({
          data: {
            command: 'communication',
            payload,
            from: sourceChannel
          }
        })
        return
      }

      const selfChannel = maybeTargetChannels[0].instance
      selfChannel.postMessage({
        command,
        payload,
        from: sourceChannel
      })
    }
    default: {
      break;
    }
  }
}

const onRegisterMessageReceived = function (e) {
  const { data } = e
  const { channelName } = data as RegisterMessageDataType

  if (selfChannelNames.indexOf(channelName) > -1) {
    return
  }
  if (registeredChannels.filter(i => i.name === channelName).length > 0) {
    return
  }
  const bc = new BroadcastChannel(channelName)
  bc.onmessage = function (e) {
    window.parent.postMessage({
      command: 'communication',
      payload: e.data
    }, '*')
  }
  registeredChannels.push({
    name: channelName,
    instance: bc
  })
  sessionStorage.setItem('registered', JSON.stringify(registeredChannels.map(i => i.name)))
  if (gConfig.debug) {
    console.log(registeredChannels)
  }
}

export function init(config: CustomConfigType) {
  gConfig = {
    ...gConfig,
    ...config
  };
  window.addEventListener('message', onCommandMessageReceived);
  registerChannel.onmessage = onRegisterMessageReceived;
}

export function teardown() {
  window.removeEventListener('message', onCommandMessageReceived);
  registerChannel.onmessage = null;
}