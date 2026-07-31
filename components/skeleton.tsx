export default function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-[#eadbc2]/60 rounded-xl ${className}`} />;
}
