import { Gender, Role, User } from '@prisma/client';

type UserInfoWithRelations = {
  address: string | null;
  phoneNumber: string | null;
  university?: { name: string } | null;
  faculty?: { name: string } | null;
};

type SocialMediaAccountWithProvider = {
  url: string;
  provider?: { name: string } | null;
};

export class UserResponseDto {
  id: number;
  username: string;
  fullname: string;
  email: string;
  profile_picture: string | null;
  role: Role;
  gender: Gender;
  level: string | null;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.fullname = user.full_name;
    this.email = user.email;
    this.profile_picture = user.profile_picture;
    this.role = user.role;
    this.gender = user.gender;
    this.level = user.level as string | null;
  }
}

export class UserProfileResponseDto {
  user: UserResponseDto;
  address: string | null;
  phone_number: string | null;
  university: string;
  faculty: string;
  socialMediaAccounts: { name: string; url: string }[];
  createdAt: Date;

  constructor(
    user: User,
    userInfo: UserInfoWithRelations,
    socialMediaAccounts: SocialMediaAccountWithProvider[],
  ) {
    this.user = new UserResponseDto(user);
    this.createdAt = user.createdAt;
    this.address = userInfo.address;
    this.phone_number = userInfo.phoneNumber;
    this.university = userInfo.university?.name || '';
    this.faculty = userInfo.faculty?.name || '';
    this.socialMediaAccounts = socialMediaAccounts.map((account) => ({
      name: account.provider?.name || '',
      url: account.url,
    }));
  }
}
