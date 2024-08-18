import { Avatar } from '../avatar/avatar';
import { FormFields } from '../../types';

type PropsType = {
  user: FormFields;
};
export const UserCard = ({ user }: PropsType) => {
  return (
    <div className="container p-4 md:px-6 shadow-sm bg-card border rounded-lg w-max">
      <div className="flex items-center gap-4">
        <Avatar
          src={typeof user.avatar === 'string' ? user.avatar : 'icons/user.png'}
        />
        <div className="flex flex-col gap-2">
          <h2 className="flex gap-4 items-center text-xl font-bold">
            {user.name}
          </h2>
          <p className="flex text-sm text-muted-foreground items-center gap-2">
            <img
              className="inline-flex w-4 h-4"
              src="/icons/email.png"
              alt="email"
            />
            {user.email}
          </p>
          <p className="flex text-sm text-muted-foreground items-center gap-2">
            <img
              className="inline-flex w-4 h-4"
              src="/icons/padlock.png"
              alt="password"
            />
            {user.password}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <p className="flex text-sm text-muted-foreground items-center gap-2">
              <img
                className="inline-flex w-4 h-4"
                src="/icons/age.png"
                alt="age"
              />
              {user.age}
            </p>
            <p className="flex text-sm text-muted-foreground items-center gap-2">
              <img
                className="inline-flex w-4 h-4"
                src={`/icons/gender-${user.gender}.png`}
                alt="gender"
              />
            </p>
            <p className="flex text-sm text-muted-foreground items-center gap-2">
              <img
                className="inline-flex w-4 h-4"
                src="/icons/countries.png"
                alt="country"
              />
              {user.country}
            </p>

            <p className="flex text-sm text-muted-foreground items-center gap-2">
              <img
                className="inline-flex w-4 h-4"
                src={user.terms ? '/icons/terms.png' : '/icons/terms-not.png'}
                alt="terms"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
