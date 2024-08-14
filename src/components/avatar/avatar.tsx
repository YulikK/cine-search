type PropsType = {
  src: string;
};
export const Avatar = (props: PropsType) => {
  const { src } = props;

  const getRandomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * 4) + 1;
    return `/user-avatar/user-${randomIndex}.png`;
  };
  const avatarSrc = src || getRandomAvatar();

  return (
    <span className="relative flex shrink-0 overflow-hidden rounded-full h-24 w-24 bg-white">
      <img
        className="aspect-square h-full w-full"
        alt="avatar"
        src={avatarSrc}
      />
    </span>
  );
};
