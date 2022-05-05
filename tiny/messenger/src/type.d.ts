declare type MessageDataType = {
  command: 'register' | 'communication' | undefined;
  payload: MessagePayloadType;
  channel: string;
}

declare type RegisterMessageDataType = {
  channelName: string;
}

declare type ConfigType = {
  debug: boolean;
}

declare type CustomConfigType = {
  debug?: boolean;
}

type MessagePayloadType = {
  channelName?: string;
  target?: string;
  [key: string]: any;
}