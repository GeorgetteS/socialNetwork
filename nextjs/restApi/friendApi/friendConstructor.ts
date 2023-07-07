export interface friendDTO {
  id: number;
  status: 'pending' | 'rejected' | 'accepted' | '';
  UserId: number;
  FriendId: number;
  name: string;
  avatar: string;
}

export class FriendConstructor {
  public friend: friendDTO = {
    id: null,
    status: '',
    UserId: null,
    FriendId: null,
    name: '',
    avatar: '',
  };

  constructor(data: any) {
    try {
      this.friend.id = data.id;
      this.friend.status = data.status;
      this.friend.FriendId = data.FriendId;
      this.friend.UserId = data.UserId;
      this.friend.name = data.name;
      this.friend.avatar = data.img && process.env.NEXT_PUBLIC_IMAGES_URL + data.img;
    } catch (e) {
      console.log(e);
    }
  }

  getField() {
    return this.friend;
  }
}
