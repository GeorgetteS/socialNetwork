export interface userDTO {
  id: string;
  fullname: string;
  avatar?: string;
  about: string;
}

export class userConstructor {
  public user: userDTO = {
    id: '',
    fullname: '',
    about: '',
    avatar: '',
  };

  constructor(data: any) {
    try {
      this.user.id = data.id;
      this.user.fullname = data.name + ' ' + data.surname;
      this.user.about = data.about;
      this.user.avatar = data.img;
    } catch (e) {
      console.error(e);
    }
  }

  getField() {
    return this.user;
  }
}
