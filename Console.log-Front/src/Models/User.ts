interface User {
  id?: number;
  nm_user: string;

  email: string;

  password: string;

  type: string;

  registration: string;

  profile_picture: Buffer;
}

export default User;
