export interface propsType {
  view: string;
  setView: (panel: string) => void;
}

export interface propsChatType {
  viewChat: boolean;
  setViewChat: (param: boolean) => void;
}

export interface propsBlockModalType {
  openBlockModal: boolean;
  setOpenBlockModal: (param: boolean) => void;
  roommode: boolean;
}

export interface propsDeleteModalType {
  openDeleteModal: boolean;
  setOpenDeleteModal: (param: boolean) => void;
  deleteSelectedUser: () => Promise<void>;
  roommode: boolean;
}

export interface propsRequestModalType {
  openRequestModal: boolean;
  setOpenRequestModal: (param: boolean) => void;
  sendFriendRequest: () => Promise<void>;
  roommode: boolean;
}

export interface propsFRcontextmenuType {
  value: string;
  isClickedBlock: boolean;
  isClickedDelete: boolean;
  isClickedRequest: boolean;
  setIsClickedBlock: (param: boolean) => void;
  setOpenBlockModal: (param: boolean) => void;
  setShowContextMenu: (param: boolean) => void;
  setIsClickedDelete: (param: boolean) => void;
  setOpenDeleteModal: (param: boolean) => void;
  setOpenRequestModal: (param: boolean) => void;
  setIsClickedRequest: (param: boolean) => void;
  contextMenuPosition: contextmenupositionType;
}

export interface propsUserlistType {
  user: userType;
  index: number;
  numberofunreadmessages: number;
  setShowContextMenu: (param: boolean) => void;
  setContextMenuPosition: (
    contextMenuPosition: contextmenupositionType
  ) => void;
  setView?: (panel: string) => void;
}

export interface contextmenupositionType {
  x: number;
  y: number;
}

export interface propsChatinputfieldType {
  value: string;
  keyperuser: string;
  setValue: (value: string) => void;
}

export interface chatwindowType {
  mode: string;
}

export interface userType {
  onlineStatus: boolean;
  _id: string;
  nickName: string;
  lang: string;
  sxpAddress: string;
  avatar: string;
  notificationStatus: string;
  friend: boolean;
}

export interface ChatMessageType {
  sender_id: string;
  recipient_id: string;
  room_id: string;
  message: string;
  timestamp: number;
  createdAt: number;
  updatedAt: number;
}

export interface ChatHistoryType {
  messages: ChatMessageType[];
}

export interface ChatnotificationType {
  alert: boolean;
  update: boolean;
  sound: boolean;
  unreadmessage: number;
}

export interface ChatMsgType {
  timestamp: number;
  message: string;
  from: string;
  to: string;
}

export interface selecteduserType {
  id: string;
}

export interface scrollDownType {
  down: boolean;
}

export interface alertType {
  _id: string;
  alertType: string;
  note: any;
  receivers: string[];
}

export interface encryptionkeyStoreType {
  encryption_Keys: Object;
}

export interface askEncryptionKeyType {
  sender_id: string;
  recipient_id: string;
}

export interface deliverEncryptionKeyType {
  sender_id: string;
  recipient_id: string;
  key: string;
}

export interface deliveredEncryptionKeyType {
  sender_id: string;
  key: string;
}
export interface ISocketHash {
  socketHash: string;
}

export interface fetchType {
  page: number;
  hasmore: boolean;
  processedPages: Object;
}

export interface chathistoryperUserStoreType {
  history: Object;
}
