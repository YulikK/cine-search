import { Avatar } from '../avatar/avatar';
import { User } from '../../types';
import { UserFieldWrap } from '../user-field-wrap/user-field-wrap';

type PropsType = {
  user: User;
};
export const UserCard = ({ user }: PropsType) => {
  return (
    <article className="container p-4 md:px-6 shadow-sm bg-card border rounded-lg">
      <div className="flex flex-col justify-center items-center gap-4 w-full ">
        <Avatar src={user.avatar} />
        <div className="flex flex-col gap-2 flex-shrink w-full">
          <div className="flex items-center gap-2 w-full">
            <h2 className="text-xl font-bold overflow-hidden whitespace-nowrap text-ellipsis w-full">
              {user.name}
            </h2>
          </div>
          <UserFieldWrap name="email">{user.email}</UserFieldWrap>
          <UserFieldWrap name="password">{user.password}</UserFieldWrap>
          <UserFieldWrap name="age">{user.age}</UserFieldWrap>
          <UserFieldWrap name="countries"> {user.country}</UserFieldWrap>
          <UserFieldWrap name={`gender-${user.gender}`} />
          <UserFieldWrap name={user.terms ? 'terms' : 'terms-not'} />
        </div>
      </div>
    </article>
  );
};
