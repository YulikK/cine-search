type PropsType = {
  name: string;
  children?: React.ReactNode;
};
export const UserFieldWrap = ({ name, children }: PropsType) => (
  <div className="flex items-center gap-2 w-full">
    <img
      className="inline-flex w-4 h-4"
      src={`/icons/${name}.png`}
      alt={name}
    />
    <p className="text-sm text-muted-foreground  overflow-hidden whitespace-nowrap text-ellipsis ">
      {children}
    </p>
  </div>
);
