type Props = {
  size?: number;
};

export default function Logo({ size = 28 }: Props) {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/Logo.png"
        alt="Pathpal AI"
        width={size}
        height={size}
        className="block shrink-0 rounded-[7px] object-contain"
        style={{ width: size, height: size }}
        draggable={false}
      />
      <span className="text-[15px] font-semibold tracking-tight text-white">
        Pathpal AI
      </span>
    </div>
  );
}
